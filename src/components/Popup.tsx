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
      const accessToken = await getStoredAccessToken()
      setAppState(prevState => { return { ...prevState, accessToken: accessToken } })

      let userData = null as (User | null)
      if(accessToken) {
        try {
          userData = await fetchUserData(accessToken)
          setAppState(prevState => { return { ...prevState, user: userData } })
        }
        catch (error) { console.error(error.message, error.data) }
      }

      const mediaTitle = await getMediaTitle()
      setAppState(prevState => { return { ...prevState, detectedMediaTitle: mediaTitle } })

      if (mediaTitle && userData) {
        try {
          const mediaData = await fetchAnilistMedia(mediaTitle)
          setAppState(prevState => { return { ...prevState, searchedMedia: mediaData } })
        } catch (error) {
          console.log('fetchAnilistMedia error', error)
        }
      }

      if (appState.searchedMedia && userData) {
        try {
          const userList = await fetchAnilistUserList(appState.searchedMedia.id, userData.name)
          setAppState(prevState => { return { ...prevState, userList: userList } })
        }
        catch (error) { console.log('fetchAnilistUserList error', error) }
      }

      // ready to render
      setAppState(prevState => { return { ...prevState, appIsReady: true } })
    }
    getInitialState()
  }, [])

  const doLogin = () => {
    chrome.runtime.sendMessage('do-login', async (response) => {
      let userData = null
      if (response.accessToken) {
        userData = await fetchUserData(response.accessToken)
      }
      setAppState({
        ...appState,
        accessToken: response.accessToken,
        user: userData
      })
    })
  }

  const doLogout = () => {
    chrome.identity.clearAllCachedAuthTokens(() => {})
    chrome.storage.sync.clear()
    setAppState({
      ...appState,
      accessToken: null,
      user: null
    })
  }

  const doMediaSearch = async (searchString: string) => {
    let mediaSearchData = null
    try { mediaSearchData = await fetchAnilistMedia(searchString) }
    catch (error) { console.log('doMediaSearch error', error) }

    let userList = null
    if(userLoggedIn(appState.user) && mediaSearchData?.id) {
      try {
        userList = await fetchAnilistUserList(mediaSearchData.id, appState.user!.name)
      } catch (error) { console.log('fetchAnilistUserList error', error) }
    }

    setAppState({
      ...appState,
      searchedMedia: mediaSearchData,
      userList: userList
    })
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
          userList={appState.userList}
          onUserListUpdate={doUserNotesUpdate}
          showUpdateComplete={appState.showUpdateComplete}
          key={appState.searchedMedia?.id}
        />
      </React.Fragment>
    )
  }
}
