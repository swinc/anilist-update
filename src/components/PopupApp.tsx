import React from 'react'

import {
  queryUserData,
  querySearchMedia,
  queryUserMediaNotes,
  updateUserMediaNotes
} from '../lib/query-anilist'
import { UserLoginMessage } from '../components/user-welcome'
import { ContentDetection } from '../components/content-detection'
import { AnilistMatch } from '../components/anilist-match'
import { AppState, UserData, SaveMediaListEntry } from '../lib/types'

export class PopupApp extends React.Component<AppState, AppState> {
  constructor(initialState: AppState) {
    super(initialState)

    this.state = initialState

    this.doLogin = this.doLogin.bind(this)
    this.doLogout = this.doLogout.bind(this)
    this.doMediaSearch = this.doMediaSearch.bind(this)
    this.doUserNotesUpdate = this.doUserNotesUpdate.bind(this)
  }

  doLogin() {
    chrome.runtime.sendMessage('do-login', async (response) => {
      let userData = null as UserData
      if (response.accessToken) {
        userData = await queryUserData(response.accessToken)
      }
      this.setState((prev: AppState) => {
        return {
          ...prev,
          accessToken: response.accessToken,
          userData: userData
        }
      })
    })
  }

  doLogout() {
    chrome.identity.clearAllCachedAuthTokens(() => {})
    chrome.storage.sync.clear()
    this.setState((prev) => {
      return {
        ...prev,
        accessToken: null,
        userData: null
      }
    })
  }

  async doMediaSearch(searchString: string) {
    const mediaSearchData = await querySearchMedia(searchString)
    const mediaListData = await queryUserMediaNotes(
      mediaSearchData.data.Media.id,
      this.state.userData.data.Viewer.name
    )
    console.log('mediaListData: ', mediaListData)
    this.setState((prev) => {
      return {
        ...prev,
        mediaSearchData: mediaSearchData,
        userMediaListData: mediaListData
      }
    })
  }

  async doUserNotesUpdate(episodeProgress: string, userScore: string) {
    console.log('new user progress: ', episodeProgress)
    console.log('new user score: ', userScore)
    const mediaId = this.state.mediaSearchData.data.Media.id
    updateUserMediaNotes(mediaId, parseInt(episodeProgress), parseInt(userScore), this.state.accessToken)
      .then((response: SaveMediaListEntry) => {
        console.log('update response: ', response)
        this.setState((prev) => {
          return {
            ...prev,
            userMediaListData: {
              data: {
                MediaList: {
                  ...this.state.userMediaListData.data.MediaList,
                  progress: response.data.SaveMediaListEntry.progress,
                  score: response.data.SaveMediaListEntry.score
                }
              }
            },
            showUpdateComplete: true
          } // end return
        }) // end setState
      }) // end then
  }

  render() {
    return (
      <div>
        <UserLoginMessage
          accessToken={this.state.accessToken}
          userData={this.state.userData}
          onLogin={this.doLogin}
          onLogout={this.doLogout}
        />
        <ContentDetection
          mediaTitle={this.state.mediaTitle}
          userData={this.state.userData}
          onMediaSearch={this.doMediaSearch}
        />
        <AnilistMatch
          mediaSearchData={this.state.mediaSearchData}
          userMediaListData={this.state.userMediaListData}
          onUserNotesUpdate={this.doUserNotesUpdate}
          showUpdateComplete={this.state.showUpdateComplete}
        />
      </div>
    )
  }
}
