function getActiveTabId (): Promise<number> {
  return new Promise((resolve) => {
    // should only be one active tab
    chrome.tabs.query({ active: true }, (tabsArray) => { resolve(tabsArray[0].id) })
  })
}

export async function getMediaTitle (): Promise<string> {
  const activeTabId = await getActiveTabId()
  return new Promise((resolve) => {
    try {
      chrome.tabs.sendMessage(activeTabId, 'get-media-title', {}, resolve)
    } catch (e) {
      resolve(e)
      console.log('caught an error:', e)
    }
  })
}
