/* globals chrome */
export function getUserData() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['accessToken', 'userId', 'userName', 'userSiteUrl'], function (userData) {
            resolve({
                accessToken: userData.accessToken,
                userId: userData.userId,
                userName: userData.userName,
                userSiteUrl: userData.userSiteUrl
            });
        });
    });
}
