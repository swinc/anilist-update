/* globals alert */

import {
  showConnectedAccount,
  showDisconnectedAccount,
  showUserName,
  showContentDetected,
  showContentNotDetected,
  showMediaTitle,
  showMediaCoverImage,
  showUserProgress,
  showUserScore,
  updateTitleLink,
  prepopSearchBox
} from './lib/popup-ui.js'
import { loginToAnilist } from './lib/login-to-anilist.js'
import { clickLoginButton, clickLogoutButton } from './lib/button-handlers.js'
import { querySearchMedia, queryUserMediaNotes } from './lib/query-anilist.js'

document.addEventListener('DOMContentLoaded', function() {
  // button handlers
  document.querySelector('#anilist-login-button').onclick = clickLoginButton
  document.querySelector('#logout-link').onclick = clickLogoutButton

  // querybox
  // onReturn reexecute querySearchMedia with the search box
  document.querySelector('#search-box').onkeydown = function() {
    if(event.key === 'Enter') {
      querySearchMedia(document.querySelector('#search-box').value)
        .then((result) => {
          showMediaCoverImage(result.data.Media.coverImage.medium)
          showMediaTitle(result.data.Media.title.english)
          updateTitleLink(result.data.Media.id)
          chrome.storage.sync.get(['accessToken', 'userName'], function (storage) {
            queryUserMediaNotes(result.data.Media.id, storage.userName)
              .then((result) => {
                showUserProgress(result.data.MediaList.progress)
                showUserScore(result.data.MediaList.score)
              })
            })
        })
    }
  }

  // show page info
  chrome.storage.sync.get(['accessToken', 'userName'], function (storage) {
    if (storage.accessToken) {
      showConnectedAccount()
      showUserName(storage.userName)

      // get web page data
      chrome.runtime.getBackgroundPage((window) => {
        console.log(window.contentScriptMessage)

        if(window.contentScriptMessage && window.contentScriptMessage.detected) {
          showContentDetected(window.contentScriptMessage.title, window.contentScriptMessage.episode)
          prepopSearchBox(window.contentScriptMessage.title)
          querySearchMedia(window.contentScriptMessage.title)
            .then((result) => {
              showMediaCoverImage(result.data.Media.coverImage.medium)
              showMediaTitle(result.data.Media.title.english)
              updateTitleLink(result.data.Media.id)
              queryUserMediaNotes(result.data.Media.id, storage.userName)
                .then((result) => {
                  showUserProgress(result.data.MediaList.progress)
                  showUserScore(result.data.MediaList.score)
                })
                .catch((error) => console.log(error))
            })
        } else {
          showContentNotDetected()
        }
      })
    }
    else {
      showDisconnectedAccount()
    }
  })
})
