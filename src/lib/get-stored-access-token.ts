export function getStoredAccessToken(): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['accessToken'],
      function(response) {
        if (!response) {
          reject(new Error('getStoredAccessToken() returned unexpected value.'))
        } else {
          resolve(response.accessToken)
        }
    })
  })
}
