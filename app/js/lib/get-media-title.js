function getActiveTabId() {
    return new Promise((resolve) => {
        // should only be one active tab
        chrome.tabs.query({ active: true }, (tabsArray) => { resolve(tabsArray[0].id); });
    });
}
export async function getMediaTitle() {
    const activeTabId = await getActiveTabId();
    return new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(activeTabId, 'get-media-title', {}, (response) => {
            if (!response) {
                reject(new Error('No response received.'));
            }
            resolve(response);
        });
    });
}
//# sourceMappingURL=get-media-title.js.map