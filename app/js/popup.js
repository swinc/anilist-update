/* globals chrome */
import { getStoredAccessToken } from './lib/get-stored-access-token.js';
import { querySearchMedia, queryUserMediaNotes, queryUserData } from './lib/query-anilist.js';
import { getMediaTitle } from './lib/get-media-title.js';
import { renderUserWelcome } from './lib/components/user-welcome.js';
import { renderContentDetection } from './lib/components/content-detection.js';
import { renderAnilistMatch } from './lib/components/anilist-match.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcG9wdXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsb0JBQW9CO0FBRXBCLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFBO0FBQ3ZFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQTtBQUM3RixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUE7QUFDeEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUE7QUFDcEUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sdUNBQXVDLENBQUE7QUFDOUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sbUNBQW1DLENBQUE7QUFHdEUsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXO0lBQy9CLDhCQUE4QjtJQUU5QixNQUFNLFdBQVcsR0FBRyxNQUFNLG9CQUFvQixFQUFFLENBQUE7SUFDaEQsSUFBSSxRQUFRLEdBQUcsSUFBZ0IsQ0FBQTtJQUMvQixJQUFJLFdBQVcsRUFBRTtRQUNmLFFBQVEsR0FBRyxNQUFNLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtLQUM1QztJQUNELE1BQU0sVUFBVSxHQUFHLE1BQU0sYUFBYSxFQUFFLENBQUE7SUFFeEMsSUFBSSxTQUFTLEdBQUcsSUFBaUIsQ0FBQTtJQUNqQyxJQUFJLGlCQUFpQixHQUFHLElBQXFCLENBQUE7SUFDN0MsSUFBSSxVQUFVLElBQUksUUFBUSxFQUFFO1FBQzFCLFNBQVMsR0FBRyxNQUFNLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzlDLGlCQUFpQixHQUFHLE1BQU0sbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ2xHO0lBRUQsTUFBTSxLQUFLLEdBQWE7UUFDdEIsV0FBVyxFQUFFLFdBQVc7UUFDeEIsZUFBZSxFQUFFLFNBQVM7UUFDMUIsVUFBVSxFQUFFLFVBQVU7UUFDdEIsYUFBYSxFQUFFLEVBQUU7UUFDakIsUUFBUSxFQUFFLFFBQVE7UUFDbEIsaUJBQWlCLEVBQUUsaUJBQWlCO0tBQ3JDLENBQUE7SUFFRCxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUUvQixpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN4QixzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUM3QixrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUMzQixDQUFDO0FBRUQsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLEtBQUs7SUFDakQsTUFBTSxXQUFXLEVBQUUsQ0FBQTtBQUNyQixDQUFDLENBQUMsQ0FBQSJ9