/* globals alert */

import {
  showConnectedAccount,
  showDisconnectedAccount,
  showUserName,
  showContentDetected,
  showContentNotDetected
} from './lib/popup-ui.js'
import { loginToAnilist } from './lib/login-to-anilist.js'
import { clickLoginButton, clickLogoutButton } from './lib/button-handlers.js'

document.addEventListener('DOMContentLoaded', function() {
  // show account
  chrome.storage.sync.get(['accessToken', 'userName'], function (storage) {
    if (storage.accessToken) { showConnectedAccount() }
    else { showDisconnectedAccount() }
    showUserName(storage.userName)
  })

  // button handlers
  document.querySelector('#anilist-login-button').onclick = clickLoginButton
  document.querySelector('#logout-link').onclick = clickLogoutButton

  // get web page data
  chrome.runtime.getBackgroundPage((window) => {
    console.log(window.contentScriptMessage)

    if(window.contentScriptMessage && window.contentScriptMessage.detected) {
      showContentDetected(window.contentScriptMessage.title, window.contentScriptMessage.episode)
    } else {
      showContentNotDetected()
    }
  })
})
