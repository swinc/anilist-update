import React, { useState, useEffect } from 'react'

import {
  fetchUserData,
  fetchAnilistMedia,
  fetchAnilistUserList,
  updateUserList
} from '../lib/query-anilist'
import { getStoredAccessToken } from '../lib/get-stored-access-token'
import { getMediaTitle } from '../lib/get-media-title'
import { userLoggedIn } from '../lib/state-queries'
import { LoggedInMessage } from '../components/LoggedInMessage'
import { LoggedOutMessage } from '../components/LoggedOutMessage'
import { MediaDetectionMessage } from '../components/MediaDetectionMessage'
import { AnilistSearchBox } from '../components/AnilistSearchBox'
import { AnilistSearchResults } from '../components/AnilistSearchResults'
import { AppState } from '../types/application-state'
import { User } from '../types/user-types'
import { AnilistMedia } from '../types/anilist-media-type'
import { AnilistUserList } from '../types/anilist-user-list-type'

export function Popup() {
  const initialState: AppState = {
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
  const [appState, setAppState] = useState(initialState)

  // initial state pull
  useEffect(() => {
    const getInitialState = async () => {
      let accessToken: null | string = null
      let mediaTitle: null | string = null
      let mediaData: null | AnilistMedia = null
      let userData: null | User = null
      let userList: null | AnilistUserList = null
      let showSearchedMediaNotFound: boolean = false
      let showSearchedUserListNotFound: boolean = false

      accessToken = await getStoredAccessToken()
      if (accessToken) { userData = await fetchUserData(accessToken) }
      mediaTitle = await getMediaTitle()

      if (userData) {
        if (mediaTitle) {
          try { mediaData = await fetchAnilistMedia(mediaTitle) }
          catch (error) {
            if (error.data[0].message === "Not Found.") {
              showSearchedMediaNotFound = true
            }
          }
        }

        if (mediaData) {
          try { userList = await fetchAnilistUserList(mediaData.id, userData.name) }
          catch (error) {
            if (error.data[0].message === "Not Found.") {
              showSearchedUserListNotFound = true
            }
          }
        }
      }

      // ready to render
      setAppState(prevState => {
        return {
          ...prevState,
          accessToken: accessToken,
          appIsReady: true,
          detectedMediaTitle: mediaTitle,
          searchedMedia: mediaData,
          showSearchedMediaNotFound: showSearchedMediaNotFound,
          showSearchedUserListNotFound: showSearchedUserListNotFound,
          user: userData,
          userList: userList,
        }
      })
    }
    getInitialState()
  }, [])

  const doLogin = () => {
    chrome.runtime.sendMessage('do-login', async (response) => {
      let userData = null as (null | User)
      if (response.accessToken) {
        userData = await fetchUserData(response.accessToken)
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
    // do media search; if not found, set everything to null
    // if found, do userList search
    let mediaData = null as (null | AnilistMedia)
    try {
      mediaData = await fetchAnilistMedia(searchString)
    } catch (error) {
      if (error.data[0].message === "Not Found.") {
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
        if (error.data[0].message === "Not Found.") {
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
          showUpdateComplete={appState.showUpdateComplete}
          key={appState.searchedMedia?.id}
        />
      </React.Fragment>
    )
  }
}
