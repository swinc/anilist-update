import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { getInitialState } from './popup-helpers'
import {
  fetchAnilistMedia,
  fetchAnilistUserList,
  updateUserList,
} from '../lib/query-anilist'
import { addMediaIdToList } from '../lib/query-anilist'
import { getUserData } from '../lib/get-user-data'
import { userLoggedIn } from '../lib/state-queries'
import { LoggedInMessage } from '../components/LoggedInMessage'
import { LoggedOutMessage } from '../components/LoggedOutMessage'
import { MediaDetectionMessage } from '../components/MediaDetectionMessage'
import { AnilistSearchBox } from '../components/AnilistSearchBox'
import { AnilistSearchResults } from '../components/AnilistSearchResults'
import { AppState } from '../types/application-state'
import { User } from '../types/user-types'
import { AnilistMedia } from '../types/anilist-media-type'

export function Popup() {
  const defaultState: AppState = {
    accessToken: null,
    appIsReady: false,
    detectedMediaTitle: null,
    searchedMedia: null,
    showSearchedMediaNotFound: false,
    showSearchedUserListNotFound: false,
    showUpdateComplete: false,
    user: null,
    userList: null,
  }
  const [appState, setAppState] = useState(defaultState)

  // initial state pull
  useEffect(() => {
    // wrap function because useEffect cannot handle async function
    (async function() {
      const initialState = await getInitialState()
      setAppState(prevState => {
        return {
          ...prevState,
          ...initialState,
          appIsReady: true
        }
      })
    }()) // end async
  }, [])

  const doLogin = () => {
    chrome.runtime.sendMessage('do-login', async (response) => {
      let userData: null | User = null
      if (response.accessToken) {
        userData = await getUserData(response.accessToken)
      }
      setAppState(prevState => {
        return { ...prevState, accessToken: response.accessToken, user: userData }
      })
    })
  }

  const doLogout = () => {
    chrome.identity.clearAllCachedAuthTokens(() => {})
    chrome.storage.sync.clear()
    setAppState(prevState => { return { ...prevState, accessToken: null, user: null } })
  }

  const doMediaSearch = async (searchString: string) => {
    let mediaData: null | AnilistMedia = null
    try {
      mediaData = await fetchAnilistMedia(searchString)
    } catch (error) {
      if (error.is404()) {
        setAppState(prevState => {
          return {
            ...prevState,
            searchedMedia: null,
            userList: null,
            showSearchedMediaNotFound: true,
            showSearchedUserListNotFound: false
          }
        })
        return
      } else { // unknown error
        console.error('doMediaSearch() error', error)
      }
    }

    if(userLoggedIn(appState.user) && mediaData?.id) {
      try {
        const userList = await fetchAnilistUserList(mediaData.id, appState.user!.name)
        setAppState(prevState => {
          return {
            ...prevState,
            searchedMedia: mediaData,
            userList: userList,
            showSearchedMediaNotFound: false,
            showSearchedUserListNotFound: false
          }
        })
      } catch (error) {
        if (error.is404()) {
          setAppState(prevState => {
            return {
              ...prevState,
              searchedMedia: mediaData,
              userList: null,
              showSearchedMediaNotFound: false,
              showSearchedUserListNotFound: true
            }
          })
        } else { // unknown error
          console.error('doMediaSearch() error', error)
        }
      }
    }
  }

  const doUserNotesUpdate = async (episodeProgress: string, userScore: string) => {
    const mediaId = appState.searchedMedia?.id
    if(typeof mediaId === 'undefined' || typeof appState.accessToken !== 'string') {
      console.error('Cannot update user notes because mediaId or accessToken are undefined.')
      return
    }
    updateUserList(mediaId, parseInt(episodeProgress), parseInt(userScore), appState.accessToken)
      .then((response) => {
        setAppState({
          ...appState,
          userList: {
            ...appState.userList!,
            progress: response.data.SaveMediaListEntry.progress,
            score: response.data.SaveMediaListEntry.score,
          },
          showUpdateComplete: true
        }) // end setAppState
      }) // end then
  }

  const doAddMediaToList = async (mediaId: number) => {
    addMediaIdToList(mediaId, appState.accessToken!)
      .then((userList) => {
        console.log('updating state')
        setAppState((prevState) => {
          return {
            ...prevState,
            userList: userList,
            showSearchedUserListNotFound: false
          }
        })
      })
  }

  if(!appState.appIsReady) {
    return <div id="app-loading">Loading...</div>
  } else if (!userLoggedIn(appState.user)) {
    return (
      <React.Fragment>
        <LoggedOutMessage onLogin={doLogin} />
        <MediaDetectionMessage mediaTitle={appState.detectedMediaTitle} />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <LoggedInMessage user={appState.user!} onLogout={doLogout} />
        <MediaDetectionMessage mediaTitle={appState.detectedMediaTitle} />
        <AnilistSearchBox mediaTitle={appState.detectedMediaTitle} onMediaSearch={doMediaSearch} />
        <AnilistSearchResults
          searchedMedia={appState.searchedMedia}
          showSearchedMediaNotFound={appState.showSearchedMediaNotFound}
          showSearchedUserListNotFound={appState.showSearchedUserListNotFound}
          userList={appState.userList}
          onUserListUpdate={doUserNotesUpdate}
          onAddMediaIdToList={doAddMediaToList}
          showUpdateComplete={appState.showUpdateComplete}
          key={appState.searchedMedia?.id}
        />
      </React.Fragment>
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(
    <Popup />,
    document.getElementById('popup-app')
  )
})
