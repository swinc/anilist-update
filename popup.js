import { querySearchMedia, queryUserMediaNotes } from './lib/query-anilist.js'
import { getUserData } from './lib/user-data.js'
import { getContentData } from './lib/content-data.js'
import { renderUserWelcome } from './components/user-welcome.js'
import { renderContentDetection } from './components/content-detection.js'
import { renderAnilistMatch } from './components/anilist-match.js'

export async function renderPopup () {
  // TODO: display loading block

  const userData = await getUserData()
  const contentData = await getContentData()

  let mediaData = null
  let userContentData = null
  if (contentData && contentData.detected && userData && userData.userName) {
    mediaData = await querySearchMedia(contentData.title)
    userContentData = await queryUserMediaNotes(mediaData.data.Media.id, userData.userName)
  }

  console.log('userData:', userData)
  console.log('contentData:', contentData)
  console.log('mediaData:', mediaData)
  console.log('userContentData:', userContentData)

  const state = {
    searchBoxText: '',
    userData: userData,
    contentData: contentData,
    mediaData: mediaData,
    userContentData: userContentData
  }

  renderUserWelcome(state)
  renderContentDetection(state)
  renderAnilistMatch(state)
}

document.addEventListener('DOMContentLoaded', async function () {
  await renderPopup()
})
