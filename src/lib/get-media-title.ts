function getActiveTabId (): Promise<number | undefined> {
  return new Promise((resolve) => {
    // should only be one active tab
    chrome.tabs.query({ active: true }, (tabsArray) => { resolve(tabsArray[0].id) })
  })
}

export async function getMediaTitle (): Promise<string> {
  return new Promise(async (resolve, reject) => {
    const activeTabId = await getActiveTabId()
    if(typeof activeTabId === 'undefined') {
      console.error('Error getting media title: activeTabId is undefined.')
      reject()
      return
    }
    try {
      chrome.tabs.sendMessage(activeTabId, 'get-media-title', {}, resolve)
    } catch (e) {
      console.error(e)
    }
  })
}
