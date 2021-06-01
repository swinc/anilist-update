import { getStoredAccessToken } from '../lib/get-stored-access-token.js';
import { querySearchMedia, queryUserMediaNotes, queryUserData } from '../lib/query-anilist.js';
import { getMediaTitle } from '../lib/get-media-title.js';
import { renderUserWelcome } from '../lib/components/user-welcome.js';
import { renderContentDetection } from '../lib/components/content-detection.js';
import { renderAnilistMatch } from '../lib/components/anilist-match.js';
export async function renderPopup() {
    // TODO: display loading block
    const accessToken = await getStoredAccessToken();
    let userData = null;
    if (accessToken) {
        userData = await queryUserData(accessToken);
    }
    const mediaTitle = await getMediaTitle();
    let mediaData = null;
    let userMediaListData = null;
    if (mediaTitle && userData) {
        mediaData = await querySearchMedia(mediaTitle);
        userMediaListData = await queryUserMediaNotes(mediaData.data.Media.id, userData.data.Viewer.name);
    }
    const state = {
        accessToken: accessToken,
        mediaSearchData: mediaData,
        mediaTitle: mediaTitle,
        searchBoxText: '',
        userData: userData,
        userMediaListData: userMediaListData
    };
    console.log('AppState:', state);
    renderUserWelcome(state);
    renderContentDetection(state);
    renderAnilistMatch(state);
}
document.addEventListener('DOMContentLoaded', async function () {
    await renderPopup();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcG9wdXAvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLG1CQUFtQixFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFBO0FBQzlGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQTtBQUNyRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQTtBQUMvRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQTtBQUd2RSxNQUFNLENBQUMsS0FBSyxVQUFVLFdBQVc7SUFDL0IsOEJBQThCO0lBQzlCLE1BQU0sV0FBVyxHQUFHLE1BQU0sb0JBQW9CLEVBQUUsQ0FBQTtJQUNoRCxJQUFJLFFBQVEsR0FBRyxJQUFnQixDQUFBO0lBQy9CLElBQUksV0FBVyxFQUFFO1FBQ2YsUUFBUSxHQUFHLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0tBQzVDO0lBQ0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQTtJQUV4QyxJQUFJLFNBQVMsR0FBRyxJQUFpQixDQUFBO0lBQ2pDLElBQUksaUJBQWlCLEdBQUcsSUFBcUIsQ0FBQTtJQUM3QyxJQUFJLFVBQVUsSUFBSSxRQUFRLEVBQUU7UUFDMUIsU0FBUyxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDOUMsaUJBQWlCLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7S0FDbEc7SUFFRCxNQUFNLEtBQUssR0FBYTtRQUN0QixXQUFXLEVBQUUsV0FBVztRQUN4QixlQUFlLEVBQUUsU0FBUztRQUMxQixVQUFVLEVBQUUsVUFBVTtRQUN0QixhQUFhLEVBQUUsRUFBRTtRQUNqQixRQUFRLEVBQUUsUUFBUTtRQUNsQixpQkFBaUIsRUFBRSxpQkFBaUI7S0FDckMsQ0FBQTtJQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRS9CLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ3hCLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQzdCLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQzNCLENBQUM7QUFFRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsS0FBSztJQUNqRCxNQUFNLFdBQVcsRUFBRSxDQUFBO0FBQ3JCLENBQUMsQ0FBQyxDQUFBIn0=