/* globals chrome */

import { querySearchMedia, queryUserMediaNotes, queryUserData } from './lib/query-anilist.js'
import { getUserData } from './lib/user-data.js'
import { getContentTitle } from './lib/get-content-title.js'
import { renderUserWelcome } from './lib/components/user-welcome.js'
import { renderContentDetection } from './lib/components/content-detection.js'
import { renderAnilistMatch } from './lib/components/anilist-match.js'

export async function renderPopup () {
  // TODO: display loading block

  let userData = await getUserData()
  if (userData && userData.accessToken && !userData.userName) {
    const remainingUserData = await queryUserData(userData.accessToken)
    chrome.storage.sync.set({
      userId: remainingUserData.data.Viewer.id,
      userName: remainingUserData.data.Viewer.name,
      userSiteUrl: remainingUserData.data.Viewer.siteUrl
    })
    userData = {
      ...userData,
      userId: remainingUserData.data.Viewer.id,
      userName: remainingUserData.data.Viewer.name,
      userSiteUrl: remainingUserData.data.Viewer.siteUrl
    }
    console.log('new user data', userData)
  }

  const contentTitle = await getContentTitle()

  let mediaData = null
  let usercontentTitle = null
  if (contentTitle && userData && userData.userName) {
    mediaData = await querySearchMedia(contentTitle)
    usercontentTitle = await queryUserMediaNotes(mediaData.data.Media.id, userData.userName)
  }

  console.log('userData:', userData)
  console.log('contentTitle:', contentTitle)
  console.log('mediaData:', mediaData)
  console.log('usercontentTitle:', usercontentTitle)

  const state = {
    searchBoxText: '',
    userData: userData,
    contentTitle: contentTitle,
    mediaData: mediaData,
    usercontentTitle: usercontentTitle
  }

  renderUserWelcome(state)
  renderContentDetection(state)
  renderAnilistMatch(state)
}

document.addEventListener('DOMContentLoaded', async function () {
  await renderPopup()
})
