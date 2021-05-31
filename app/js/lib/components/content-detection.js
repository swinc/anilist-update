import { querySearchMedia, queryUserMediaNotes } from '../query-anilist.js';
import { renderAnilistMatch } from './anilist-match.js';
function composeContentDetection(state) {
    if (!state) {
        console.error('ERROR: no state passed to composeContentDetection()');
        return '';
    }
    else if (!state.userData || !state.userData.userName) { // no user data
        return '';
    }
    else if (!state.contentTitle) { // user data but no content data
        return `
      <p>No content detected.<p>
      <p>Search Anilist: <input id="search-box" type="text" value=""></p>
    `;
    }
    else { // we have user data and content data
        return `
      <p>You're watching ${state.contentTitle}.</p>
      <p>Search Anilist: <input id="search-box" type="text" value="${state.contentTitle}"></p>
    `;
    }
}
export function renderContentDetection(state) {
    const contentDetectionHtml = composeContentDetection(state);
    document.querySelector('#content-detection').innerHTML = contentDetectionHtml;
    const searchBox = document.querySelector('#search-box');
    if (searchBox) {
        searchBox.onkeydown = async function (event) {
            if (event.key === 'Enter') {
                const contentTitle = searchBox.value;
                const mediaData = await querySearchMedia(contentTitle);
                const userName = state.userData.userName;
                const usercontentTitle = await queryUserMediaNotes(mediaData.data.Media.id, userName);
                renderAnilistMatch({
                    searchBoxText: contentTitle,
                    userData: state.userData,
                    contentTitle: null,
                    mediaData: mediaData,
                    usercontentTitle: usercontentTitle
                });
            }
        };
    }
}
//# sourceMappingURL=content-detection.js.map