export function getUserData() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['accessToken', 'userId', 'userName', 'userSiteUrl'], function (userData) {
            if (!userData) {
                reject(new Error('getUserData() returned null.'));
            }
            else {
                resolve({
                    accessToken: userData.accessToken,
                    userId: userData.userId,
                    userName: userData.userName,
                    userSiteUrl: userData.userSiteUrl
                });
            }
        });
    });
}
//# sourceMappingURL=user-data.js.map