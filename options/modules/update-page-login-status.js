/* globals chrome */

export function updatePageLoginStatus () {
  chrome.storage.sync.get('accessToken', function (result) {
    if (result.accessToken) { // connected account
      document.querySelector('#account-connected').classList.remove('hidden')
      document.querySelector('#account-not-connected').classList.add('hidden')
    } else {
      document.querySelector('#account-not-connected').classList.remove('hidden')
      document.querySelector('#account-connected').classList.add('hidden')
    }
  })
}
