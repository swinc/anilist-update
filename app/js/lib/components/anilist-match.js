import { updateUserMediaNotes } from '../query-anilist.js';
function composeAnilistMatch(state) {
    if (state && state.mediaData && state.userContentData && state.userContentData.data.MediaList) {
        const title = state.mediaData.data.Media.title.english;
        const imageUrl = state.mediaData.data.Media.coverImage.medium;
        const mediaId = state.mediaData.data.Media.id;
        const mediaUrl = 'https://anilist.co/anime/' + mediaId;
        const episodes = state.mediaData.data.Media.episodes;
        const userProgress = state.userContentData.data.MediaList.progress;
        const userScore = state.userContentData.data.MediaList.score;
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
    `;
    }
    else if (state && state.userContentData && state.userContentData.data.MediaList == null) {
        return `
      <p>This title is not on your list.</p>
    `;
    }
    else { // no mediaData or no userContentData
        return '';
    }
}
export function renderAnilistMatch(state) {
    const contentDetectionHtml = composeAnilistMatch(state);
    document.querySelector('#anilist-match').innerHTML = contentDetectionHtml;
    const updateButton = document.querySelector('#update-button');
    if (updateButton) {
        updateButton.onclick = function () {
            updateButton.innerHTML = 'Updating...';
            const episodeProgress = document.querySelector('#episode-progress').value;
            const userScore = document.querySelector('#score').value;
            const mediaId = state.mediaData.data.Media.id;
            const accessToken = state.userData.accessToken;
            updateUserMediaNotes(mediaId, episodeProgress, userScore, accessToken)
                .then(() => {
                updateButton.innerHTML = 'Update';
                document.querySelector('#update-message').innerHTML = 'Updated!';
            });
        };
    }
}
