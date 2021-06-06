import { querySearchMedia, queryUserMediaNotes } from '../lib/query-anilist'
import { renderAnilistMatch } from './anilist-match'
import { AppState } from '../lib/types'

function composeContentDetection (state: AppState) {
  if (!state) {
    console.error('ERROR: no state passed to composeContentDetection()')
    return ''
  } else if (!state.userData?.data?.Viewer?.name) { // no user data
    return ''
  } else if (!state.mediaTitle) { // user data but no content data
    return `
      <p>No content detected.<p>
      <p>Search Anilist: <input id="search-box" type="text" value=""></p>
    `
  } else { // we have user data and content data
    return `
      <p>You're watching ${state.mediaTitle}.</p>
      <p>Search Anilist: <input id="search-box" type="text" value="${state.mediaTitle}"></p>
    `
  }
}

export function renderContentDetection (state: AppState) {
  const contentDetectionHtml = composeContentDetection(state)
  document.querySelector('#content-detection').innerHTML = contentDetectionHtml

  const searchBox: HTMLInputElement = document.querySelector('#search-box')
  if (searchBox) {
    searchBox.onkeydown = async function (event) {
      if (event.key === 'Enter') {
        const mediaSearchData = await querySearchMedia(searchBox.value)
        const mediaListData = await queryUserMediaNotes(
          mediaSearchData.data.Media.id,
          state.userData.data.Viewer.name
        )
        renderAnilistMatch({
          ...state,
          mediaSearchData: mediaSearchData,
          searchBoxText: searchBox.value,
          userMediaListData: mediaListData
        })
      }
    }
  }
}
