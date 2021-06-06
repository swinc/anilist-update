import { updateUserMediaNotes } from '../lib/query-anilist'
import { AppState } from '../lib/types'

function composeAnilistMatch (state: AppState) {
  if (state?.mediaSearchData && state.userMediaListData?.data.MediaList) {
    const title = state.mediaSearchData.data.Media.title.english
    const imageUrl = state.mediaSearchData.data.Media.coverImage.medium
    const mediaId = state.mediaSearchData.data.Media.id
    const mediaUrl = 'https://anilist.co/anime/' + mediaId
    const episodes = state.mediaSearchData.data.Media.episodes
    const userProgress = state.userMediaListData.data.MediaList.progress
    const userScore = state.userMediaListData.data.MediaList.score
    return `
      <p>Closest match:</p>
      <div id="content-block">
        <img id="anilist-match--image" width="100" src="${imageUrl}">
        <div id="content-ui">
          <div id="content-ui--title" data-mediaId="${mediaId}">
          <a id="title-link" href="${mediaUrl}">${title}</a></div>
          <div id="content-ui--total-episodes">Total Episodes: ${episodes}</div>
          <div id="content-ui--progress">
            Episode Progress
            <input type="number"
                   id="episode-progress"
                   name="Episode Progress"
                   min="0" max="${episodes}"
                   value="${userProgress}">
          </div>
          <div id="content-ui--score">
            Score
            <input type="number" id="score" name="Score" min="0" max="100" value="${userScore}">
          </div>
          <button id="update-button">Update</button>
          <div id="update-message"></div>
        </div>
      </div>
    `
  } else if (state?.userMediaListData?.data?.MediaList === null) {
    return `
      <p>This title is not on your list.</p>
    `
  } else { // no mediaData or no MediaListData
    return ''
  }
}

export function renderAnilistMatch (state: AppState) {
  const contentDetectionHtml = composeAnilistMatch(state)
  document.querySelector('#anilist-match').innerHTML = contentDetectionHtml

  const updateButton: HTMLButtonElement = document.querySelector('#update-button')
  if (updateButton) {
    updateButton.onclick = function () {
      updateButton.innerHTML = 'Updating...'

      const episodeProgress = (document.querySelector('#episode-progress') as HTMLInputElement).value
      const userScore = (document.querySelector('#score') as HTMLInputElement).value
      const mediaId = state.mediaSearchData.data.Media.id
      updateUserMediaNotes(mediaId, parseInt(episodeProgress), parseInt(userScore), state.accessToken)
        .then(() => {
          updateButton.innerHTML = 'Update'
          document.querySelector('#update-message').innerHTML = 'Updated!'
        })
    }
  }
}
