import React from 'react'
import ReactDOM from 'react-dom'

import { getStoredAccessToken } from '../lib/get-stored-access-token'
import { querySearchMedia, queryUserMediaNotes, queryUserData } from '../lib/query-anilist'
import { getMediaTitle } from '../lib/get-media-title'
import { PopupApp } from '../components/PopupApp'
import { AppState, UserData, MediaData, MediaListData } from '../lib/types'

export function renderPopup(state: AppState) {
  ReactDOM.render(
    <PopupApp
      accessToken={state.accessToken}
      mediaSearchData={state.mediaSearchData}
      mediaTitle={state.mediaTitle}
      searchBoxText={state.searchBoxText}
      userData={state.userData}
      userMediaListData={state.userMediaListData}
      showUpdateComplete={state.showUpdateComplete}
    />,
    document.getElementById('popup-app')
  )
}

document.addEventListener('DOMContentLoaded', async function () {
  // get initial state
  const accessToken = await getStoredAccessToken()
  let userData = null as UserData
  if (accessToken) {
    userData = await queryUserData(accessToken)
  }
  const mediaTitle = await getMediaTitle()

  let mediaData = null as MediaData
  let userMediaListData = null as MediaListData
  if (mediaTitle && userData) {
    mediaData = await querySearchMedia(mediaTitle)
    userMediaListData = await queryUserMediaNotes(mediaData.data.Media.id, userData.data.Viewer.name)
  }

  const searchBoxText = ''

  const state: AppState = {
    accessToken: accessToken,
    mediaSearchData: mediaData,
    mediaTitle: mediaTitle,
    searchBoxText: searchBoxText,
    userData: userData,
    userMediaListData: userMediaListData,
    showUpdateComplete: false
  }

  console.log('AppState:', state)

  renderPopup(state)
})
