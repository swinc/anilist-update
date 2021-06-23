export async function getMediaTitle (): Promise<string> {
  return new Promise(async (resolve) => {
    const activeTabs = await chrome.tabs.query({ active: true })
    const activeTabId = activeTabs[0].id
    if(typeof activeTabId === 'undefined') {
      console.error('Error in getMediaTitle(): activeTabId is undefined.')
      return resolve('')
    }
    chrome.tabs.sendMessage(activeTabId, 'get-media-title', {}, (response) => {
      if (window.chrome.runtime.lastError) {
        return resolve('')
      }
      resolve(response)
    })
  })
}
