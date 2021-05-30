/* globals chrome */
export function getContentData() {
    return new Promise((resolve, reject) => {
        chrome.runtime.getBackgroundPage(function (bgWindow) {
            resolve(bgWindow.contentData);
        });
    });
}
