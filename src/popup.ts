/* globals chrome */

import { getStoredAccessToken } from './lib/get-stored-access-token.js'
import { querySearchMedia, queryUserMediaNotes, queryUserData } from './lib/query-anilist.js'
import { getMediaTitle } from './lib/get-media-title.js'
import { renderUserWelcome } from './lib/components/user-welcome.js'
import { renderContentDetection } from './lib/components/content-detection.js'
import { renderAnilistMatch } from './lib/components/anilist-match.js'
import { AppState, UserData, MediaData, MediaListData } from './lib/types'

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

  renderUserWelcome(state)
  renderContentDetection(state)
  renderAnilistMatch(state)
}

document.addEventListener('DOMContentLoaded', async function () {
  await renderPopup()
})
