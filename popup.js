/* globals alert */

import {
  showConnectedAccount,
  showDisconnectedAccount,
  showUserName,
  showContentDetected,
  showContentNotDetected,
  showMediaTitle,
  showMediaCoverImage,
  showMediaEpisodes,
  showUserProgress,
  showUserScore
} from './lib/popup-ui.js'
import { loginToAnilist } from './lib/login-to-anilist.js'
import { clickLoginButton, clickLogoutButton } from './lib/button-handlers.js'
import { querySearchMedia, queryUserMediaNotes } from './lib/query-anilist.js'

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
        querySearchMedia(window.contentScriptMessage.title)
          .then((result) => {
            showMediaCoverImage(result.data.Media.coverImage.medium)
            showMediaTitle(result.data.Media.title.english)
            showMediaEpisodes(result.data.Media.episodes)
            queryUserMediaNotes(result.data.Media.id, storage.userName)
              .then((result) => {
                showUserProgress(result.data.MediaList.progress)
                showUserScore(result.data.MediaList.score)
              })
          })
      } else {
        showContentNotDetected()
      }
    })
  })
})
