import { querySearchMedia, queryUserMediaNotes } from '../query-anilist.js';
import { renderAnilistMatch } from './anilist-match.js';
function composeContentDetection(state) {
    if (!state) {
        console.error('ERROR: no state passed to composeContentDetection()');
        return '';
    }
    else if (!state.userData?.data?.Viewer?.name) { // no user data
        return '';
    }
    else if (!state.mediaTitle) { // user data but no content data
        return `
      <p>No content detected.<p>
      <p>Search Anilist: <input id="search-box" type="text" value=""></p>
    `;
    }
    else { // we have user data and content data
        return `
      <p>You're watching ${state.mediaTitle}.</p>
      <p>Search Anilist: <input id="search-box" type="text" value="${state.mediaTitle}"></p>
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
                const mediaSearchData = await querySearchMedia(searchBox.value);
                const mediaListData = await queryUserMediaNotes(mediaSearchData.data.Media.id, state.userData.data.Viewer.name);
                renderAnilistMatch({
                    ...state,
                    mediaSearchData: mediaSearchData,
                    searchBoxText: searchBox.value,
                    userMediaListData: mediaListData
                });
            }
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1kZXRlY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2NvbXBvbmVudHMvY29udGVudC1kZXRlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFDM0UsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0JBQW9CLENBQUE7QUFHdkQsU0FBUyx1QkFBdUIsQ0FBRSxLQUFlO0lBQy9DLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHFEQUFxRCxDQUFDLENBQUE7UUFDcEUsT0FBTyxFQUFFLENBQUE7S0FDVjtTQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsZUFBZTtRQUMvRCxPQUFPLEVBQUUsQ0FBQTtLQUNWO1NBQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRSxnQ0FBZ0M7UUFDOUQsT0FBTzs7O0tBR04sQ0FBQTtLQUNGO1NBQU0sRUFBRSxxQ0FBcUM7UUFDNUMsT0FBTzsyQkFDZ0IsS0FBSyxDQUFDLFVBQVU7cUVBQzBCLEtBQUssQ0FBQyxVQUFVO0tBQ2hGLENBQUE7S0FDRjtBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsc0JBQXNCLENBQUUsS0FBZTtJQUNyRCxNQUFNLG9CQUFvQixHQUFHLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzNELFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxTQUFTLEdBQUcsb0JBQW9CLENBQUE7SUFFN0UsTUFBTSxTQUFTLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7SUFDekUsSUFBSSxTQUFTLEVBQUU7UUFDYixTQUFTLENBQUMsU0FBUyxHQUFHLEtBQUssV0FBVyxLQUFLO1lBQ3pDLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyxPQUFPLEVBQUU7Z0JBQ3pCLE1BQU0sZUFBZSxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUMvRCxNQUFNLGFBQWEsR0FBRyxNQUFNLG1CQUFtQixDQUM3QyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQzdCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2hDLENBQUE7Z0JBQ0Qsa0JBQWtCLENBQUM7b0JBQ2pCLEdBQUcsS0FBSztvQkFDUixlQUFlLEVBQUUsZUFBZTtvQkFDaEMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxLQUFLO29CQUM5QixpQkFBaUIsRUFBRSxhQUFhO2lCQUNqQyxDQUFDLENBQUE7YUFDSDtRQUNILENBQUMsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyJ9