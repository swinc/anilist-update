import { updateUserMediaNotes } from '../query-anilist.js';
function composeAnilistMatch(state) {
    if (state?.mediaSearchData && state.userMediaListData?.data.MediaList) {
        const title = state.mediaSearchData.data.Media.title.english;
        const imageUrl = state.mediaSearchData.data.Media.coverImage.medium;
        const mediaId = state.mediaSearchData.data.Media.id;
        const mediaUrl = 'https://anilist.co/anime/' + mediaId;
        const episodes = state.mediaSearchData.data.Media.episodes;
        const userProgress = state.userMediaListData.data.MediaList.progress;
        const userScore = state.userMediaListData.data.MediaList.score;
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
    else if (state?.userMediaListData?.data?.MediaList === null) {
        return `
      <p>This title is not on your list.</p>
    `;
    }
    else { // no mediaData or no MediaListData
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
            const mediaId = state.mediaSearchData.data.Media.id;
            updateUserMediaNotes(mediaId, parseInt(episodeProgress), parseInt(userScore), state.accessToken)
                .then(() => {
                updateButton.innerHTML = 'Update';
                document.querySelector('#update-message').innerHTML = 'Updated!';
            });
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbGlzdC1tYXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvY29tcG9uZW50cy9hbmlsaXN0LW1hdGNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFBO0FBRzFELFNBQVMsbUJBQW1CLENBQUUsS0FBZTtJQUMzQyxJQUFJLEtBQUssRUFBRSxlQUFlLElBQUksS0FBSyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDckUsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUE7UUFDNUQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUE7UUFDbkUsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtRQUNuRCxNQUFNLFFBQVEsR0FBRywyQkFBMkIsR0FBRyxPQUFPLENBQUE7UUFDdEQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQTtRQUMxRCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUE7UUFDcEUsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFBO1FBQzlELE9BQU87OzswREFHK0MsUUFBUTs7c0RBRVosT0FBTztxQ0FDeEIsUUFBUSxLQUFLLEtBQUs7aUVBQ1UsUUFBUTs7Ozs7O2tDQU12QyxRQUFROzRCQUNkLFlBQVk7Ozs7b0ZBSTRDLFNBQVM7Ozs7OztLQU14RixDQUFBO0tBQ0Y7U0FBTSxJQUFJLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsU0FBUyxLQUFLLElBQUksRUFBRTtRQUM3RCxPQUFPOztLQUVOLENBQUE7S0FDRjtTQUFNLEVBQUUsbUNBQW1DO1FBQzFDLE9BQU8sRUFBRSxDQUFBO0tBQ1Y7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLGtCQUFrQixDQUFFLEtBQWU7SUFDakQsTUFBTSxvQkFBb0IsR0FBRyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN2RCxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFBO0lBRXpFLE1BQU0sWUFBWSxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUE7SUFDaEYsSUFBSSxZQUFZLEVBQUU7UUFDaEIsWUFBWSxDQUFDLE9BQU8sR0FBRztZQUNyQixZQUFZLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQTtZQUV0QyxNQUFNLGVBQWUsR0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFzQixDQUFDLEtBQUssQ0FBQTtZQUMvRixNQUFNLFNBQVMsR0FBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBc0IsQ0FBQyxLQUFLLENBQUE7WUFDOUUsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQTtZQUNuRCxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLENBQUMsV0FBVyxDQUFDO2lCQUM3RixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNULFlBQVksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO2dCQUNqQyxRQUFRLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQTtZQUNsRSxDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyJ9