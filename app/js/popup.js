/* globals chrome */
import { querySearchMedia, queryUserMediaNotes, queryUserData } from './lib/query-anilist.js';
import { getUserData } from './lib/user-data.js';
import { getContentData } from './lib/content-data.js';
import { renderUserWelcome } from './lib/components/user-welcome.js';
import { renderContentDetection } from './lib/components/content-detection.js';
import { renderAnilistMatch } from './lib/components/anilist-match.js';
export async function renderPopup() {
    // TODO: display loading block
    let userData = await getUserData();
    if (userData && userData.accessToken && !userData.userName) {
        const remainingUserData = await queryUserData(userData.accessToken);
        chrome.storage.sync.set({
            userId: remainingUserData.data.Viewer.id,
            userName: remainingUserData.data.Viewer.name,
            userSiteUrl: remainingUserData.data.Viewer.siteUrl
        });
        userData = {
            ...userData,
            userId: remainingUserData.data.Viewer.id,
            userName: remainingUserData.data.Viewer.name,
            userSiteUrl: remainingUserData.data.Viewer.siteUrl
        };
        console.log('new user data', userData);
    }
    const contentData = await getContentData();
    let mediaData = null;
    let userContentData = null;
    if (contentData && contentData.detected && userData && userData.userName) {
        mediaData = await querySearchMedia(contentData.title);
        userContentData = await queryUserMediaNotes(mediaData.data.Media.id, userData.userName);
    }
    console.log('userData:', userData);
    console.log('contentData:', contentData);
    console.log('mediaData:', mediaData);
    console.log('userContentData:', userContentData);
    const state = {
        searchBoxText: '',
        userData: userData,
        contentData: contentData,
        mediaData: mediaData,
        userContentData: userContentData
    };
    renderUserWelcome(state);
    renderContentDetection(state);
    renderAnilistMatch(state);
}
document.addEventListener('DOMContentLoaded', async function () {
    await renderPopup();
});
