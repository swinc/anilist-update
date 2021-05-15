/* globals alert */

import { showConnectedAccount, showDisconnectedAccount, showUserName } from './lib/popup-ui.js'
import { loginToAnilist } from './lib/login-to-anilist.js'
import { clickLoginButton, clickLogoutButton } from './lib/button-handlers.js'

document.addEventListener('DOMContentLoaded', function() {
  // account linkage
  chrome.storage.sync.get(['accessToken', 'userName'], function (storage) {
    if (storage.accessToken) { showConnectedAccount() }
    else { showDisconnectedAccount() }
    showUserName(storage.userName)
  })

  // button handlers
  document.querySelector('#anilist-login-button').onclick = clickLoginButton
  document.querySelector('#logout-link').onclick = clickLogoutButton

  // TODO: attempt to detect content on page
  chrome.runtime.getBackgroundPage((window) => console.log(window.data))
})
