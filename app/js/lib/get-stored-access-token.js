export function getStoredAccessToken() {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(['accessToken'], function (response) {
            if (!response) {
                reject(new Error('getStoredAccessToken() returned unexpected value.'));
            }
            else {
                resolve(response.accessToken);
            }
        });
    });
}
//# sourceMappingURL=get-stored-access-token.js.map