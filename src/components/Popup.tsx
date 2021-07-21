import React, { useState, useEffect } from 'react'

import {
  queryUserData,
  querySearchMedia,
  queryUserMediaNotes,
  updateUserMediaNotes
} from '../lib/query-anilist'
import { getStoredAccessToken } from '../lib/get-stored-access-token'
import { getMediaTitle } from '../lib/get-media-title'
import { userIsLoggedIn } from '../lib/state-queries'
import { addMediaIdToList } from '../lib/query-anilist'
import { LoggedInMessage } from '../components/LoggedInMessage'
import { LoggedOutMessage } from '../components/LoggedOutMessage'
import { MediaDetectionMessage } from '../components/MediaDetectionMessage'
import { AnilistSearchBox } from '../components/AnilistSearchBox'
import { AnilistSearchResults } from '../components/AnilistSearchResults'
import { AppState, UserData, MediaData, MediaListData, SaveMediaListEntry } from '../lib/types'


export function Popup() {
  const initialState: AppState = {
    appIsLoading: true,
    accessToken: null,
    mediaSearchData: null,
    mediaTitle: null,
    userData: null,
    userMediaListData: null,
    showUpdateComplete: false
  }
  const [appState, setAppState] = useState(initialState)

  // initial state pull
  useEffect(() => {
    const getInitialState = async () => {
      const accessToken = await getStoredAccessToken()
      let userData = null as UserData
      if(accessToken) {
        userData = await queryUserData(accessToken)
      }
      const mediaTitle = await getMediaTitle()
      let mediaData = null as MediaData
      let userMediaListData = null as MediaListData
      if (mediaTitle && userData) {
        mediaData = await querySearchMedia(mediaTitle)
        userMediaListData = await queryUserMediaNotes(mediaData.data.Media.id, userData.data.Viewer.name)
      }
      setAppState({
        ...appState,
        appIsLoading: false,
        accessToken: accessToken,
        userData: userData,
        mediaTitle: mediaTitle,
        mediaSearchData: mediaData,
        userMediaListData: userMediaListData
      })
    }
    getInitialState()
  }, [])

  const doLogin = () => {
    chrome.runtime.sendMessage('do-login', async (response) => {
      let userData = null as UserData
      if (response.accessToken) {
        userData = await queryUserData(response.accessToken)
      }
      setAppState({
        ...appState,
        accessToken: response.accessToken,
        userData: userData
      })
    })
  }

  const doLogout = () => {
    chrome.identity.clearAllCachedAuthTokens(() => {})
    chrome.storage.sync.clear()
    setAppState({
      ...appState,
      accessToken: null,
      userData: null
    })
  }

  const doMediaSearch = async (searchString: string) => {
    const mediaSearchData = await querySearchMedia(searchString)
    const mediaListData = await queryUserMediaNotes(
      mediaSearchData.data.Media.id,
      appState.userData.data.Viewer.name
    )
    setAppState({
      ...appState,
      mediaSearchData: mediaSearchData,
      userMediaListData: mediaListData
    })
  }

  const doUserNotesUpdate = async (episodeProgress: string, userScore: string) => {
    const mediaId = appState.mediaSearchData.data.Media.id
    updateUserMediaNotes(mediaId, parseInt(episodeProgress), parseInt(userScore), appState.accessToken)
      .then((response: SaveMediaListEntry) => {
        setAppState({
          ...appState,
          userMediaListData: {
            data: {
              MediaList: {
                ...appState.userMediaListData.data.MediaList,
                progress: response.data.SaveMediaListEntry.progress,
                score: response.data.SaveMediaListEntry.score
              }
            }
          },
          showUpdateComplete: true
        }) // end setAppState
      }) // end then
  }

  const doAddMediaIdToList = async (mediaId: number) => {
    addMediaIdToList(mediaId, appState.accessToken)
      .then(() => queryUserMediaNotes(mediaId, appState.userData.data.Viewer.name))
      .then((response) => {
        setAppState({
          ...appState,
            userMediaListData: {
              data: {
                MediaList: {
                  progress: response.data.MediaList.progress,
                  score: response.data.MediaList.score,
                  status: response.data.MediaList.status,
              }
            }
          },
        }) // end setAppState
      }) // end then
  }

  if(appState.appIsLoading) {
    return <p>Loading...</p>
  } else {
    return (
      <div>
        {userIsLoggedIn(appState.userData) ?
          <LoggedInMessage userData={appState.userData} onLogout={doLogout} /> :
          <LoggedOutMessage onLogin={doLogin} />
        }
        <MediaDetectionMessage mediaTitle={appState.mediaTitle} />
        { userIsLoggedIn(appState.userData) &&
          <AnilistSearchBox mediaTitle={appState.mediaTitle} onMediaSearch={doMediaSearch} />
        }
        { userIsLoggedIn(appState.userData) &&
          <AnilistSearchResults
            mediaSearchData={appState.mediaSearchData}
            userMediaListData={appState.userMediaListData}
            onUserNotesUpdate={doUserNotesUpdate}
            onAddMediaIdToList={doAddMediaIdToList}
            showUpdateComplete={appState.showUpdateComplete}
            key={appState.mediaSearchData?.data?.Media?.id}
          />
        }
      </div>
    )
  }
}
