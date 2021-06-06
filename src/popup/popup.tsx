import React from 'react'
import ReactDOM from 'react-dom'

import { getStoredAccessToken } from '../lib/get-stored-access-token'
import { querySearchMedia, queryUserMediaNotes, queryUserData } from '../lib/query-anilist'
import { getMediaTitle } from '../lib/get-media-title'
import { UserLoginMessage } from '../components/user-welcome'
import { renderContentDetection } from '../components/content-detection'
import { renderAnilistMatch } from '../components/anilist-match'
import { AppState, UserData, MediaData, MediaListData } from '../lib/types'

export async function renderPopup () {
  // TODO: display loading block
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

  const state: AppState = {
    accessToken: accessToken,
    mediaSearchData: mediaData,
    mediaTitle: mediaTitle,
    searchBoxText: '',
    userData: userData,
    userMediaListData: userMediaListData
  }

  console.log('AppState:', state)

  ReactDOM.render(
    <UserLoginMessage accessToken={state.accessToken} userData={state.userData} />,
    document.getElementById('user-welcome')
  )
  renderContentDetection(state)
  renderAnilistMatch(state)
}

document.addEventListener('DOMContentLoaded', async function () {
  await renderPopup()
})