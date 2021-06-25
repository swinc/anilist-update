import React, { useState, useEffect } from 'react'

import {
  fetchUserData,
  querySearchMedia,
  queryUserMediaNotes,
  updateUserMediaNotes
} from '../lib/query-anilist'
import { getStoredAccessToken } from '../lib/get-stored-access-token'
import { getMediaTitle } from '../lib/get-media-title'
import { userLoggedIn } from '../lib/state-queries'
import { LoggedInMessage } from '../components/LoggedInMessage'
import { LoggedOutMessage } from '../components/LoggedOutMessage'
import { MediaDetectionMessage } from '../components/MediaDetectionMessage'
import { AnilistSearchBox } from '../components/AnilistSearchBox'
import { AnilistSearchResults } from '../components/AnilistSearchResults'
import { AppState } from '../types/types'

export function Popup() {
  const initialState: AppState = {
    appIsLoading: true,
    accessToken: null,
    mediaSearchData: null,
    mediaTitle: null,
    user: null,
    userMediaListData: null,
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
      let userMediaListData = null
      if (mediaTitle && userData) {
        mediaData = await querySearchMedia(mediaTitle)
        userMediaListData = await queryUserMediaNotes(mediaData.data.Media!.id, userData.name)
      }
      setAppState({
        ...appState,
        appIsLoading: false,
        accessToken: accessToken,
        user: userData,
        mediaTitle: mediaTitle,
        mediaSearchData: mediaData,
        userMediaListData: userMediaListData
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
    const mediaSearchData = await querySearchMedia(searchString)
    let mediaListData = null
    if(userLoggedIn(appState.user) && mediaSearchData?.data?.Media?.id) {
      mediaListData = await queryUserMediaNotes(
        mediaSearchData.data.Media.id, appState.user!.name
      )
    }
    setAppState({
      ...appState,
      mediaSearchData: mediaSearchData,
      userMediaListData: mediaListData
    })
  }

  const doUserNotesUpdate = async (episodeProgress: string, userScore: string) => {
    const mediaId = appState.mediaSearchData?.data.Media?.id
    if(typeof mediaId === 'undefined' || typeof appState.accessToken !== 'string') {
      console.error('Cannot update user notes because mediaId or accessToken are undefined.')
      return
    }
    updateUserMediaNotes(mediaId, parseInt(episodeProgress), parseInt(userScore), appState.accessToken)
      .then((response) => {
        setAppState({
          ...appState,
          userMediaListData: {
            data: {
              MediaList: {
                ...appState.userMediaListData!.data.MediaList,
                progress: response.data.SaveMediaListEntry.progress,
                score: response.data.SaveMediaListEntry.score,
              }
            }
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
        <MediaDetectionMessage mediaTitle={appState.mediaTitle} />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <LoggedInMessage user={appState.user!} onLogout={doLogout} />
        <MediaDetectionMessage mediaTitle={appState.mediaTitle} />
        <AnilistSearchBox mediaTitle={appState.mediaTitle} onMediaSearch={doMediaSearch} />
        <AnilistSearchResults
          mediaSearchData={appState.mediaSearchData}
          userMediaListData={appState.userMediaListData}
          onUserNotesUpdate={doUserNotesUpdate}
          showUpdateComplete={appState.showUpdateComplete}
          key={appState.mediaSearchData?.data?.Media?.id}
        />
      </React.Fragment>
    )
  }
}
