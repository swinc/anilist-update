export function signOutAnilist() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ accessToken: null }, () => resolve(true) )
  })
}
