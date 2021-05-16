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
  // button handlers
  document.querySelector('#anilist-login-button').onclick = clickLoginButton
  document.querySelector('#logout-link').onclick = clickLogoutButton

  // show page info
  chrome.storage.sync.get(['accessToken', 'userName'], function (storage) {
    if (storage.accessToken) { showConnectedAccount() }
    else { showDisconnectedAccount() }
    showUserName(storage.userName)
    // get web page data
    chrome.runtime.getBackgroundPage((window) => {
      console.log(window.contentScriptMessage)

      if(window.contentScriptMessage && window.contentScriptMessage.detected) {
        showContentDetected(window.contentScriptMessage.title, window.contentScriptMessage.episode)
        /*
        querySearchMedia(window.contentScriptMessage.title)
          .then((result) => {
            showMediaTitle()
            showMediaEpisodes()
            queryUserProgress(mediaId, userName))
              .then((result) => showUserProgress())
          })
        */
      } else {
        showContentNotDetected()
      }
    })
  })
})
