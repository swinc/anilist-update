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

export function Popup() {
  const initialState: AppState = {
    appIsLoading: true,
    accessToken: null,
    searchedMedia: null,
    detectedMediaTitle: null,
    user: null,
    userList: null,
    showUpdateComplete: false
  }
  const [appState, setAppState] = useState(initialState)

  // initial state pull
  useEffect(() => {
    const getInitialState = async () => {
      const accessToken = await getStoredAccessToken()
      let userData = null
      if(accessToken) {
        try { userData = await fetchUserData(accessToken) }
        catch (customError) { console.error(customError.message, customError.data) }
      }
      const mediaTitle = await getMediaTitle()

      let mediaData = null
      if (mediaTitle && userData) {
        try { mediaData = await fetchAnilistMedia(mediaTitle) }
        catch (error) { console.log('fetchAnilistMedia error', error) }
      }

      let userList = null
      if (mediaData && userData) {
        try { userList = await fetchAnilistUserList(mediaData.id, userData.name) }
        catch (error) { console.log('fetchAnilistUserList error', error) }
      }
      setAppState({
        ...appState,
        appIsLoading: false,
        accessToken: accessToken,
        user: userData,
        detectedMediaTitle: mediaTitle,
        searchedMedia: mediaData,
        userList: userList
      })
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

  if(appState.appIsLoading) {
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
