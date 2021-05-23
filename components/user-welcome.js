/* globals alert, chrome */

import { loginToAnilist } from '../lib/login-to-anilist.js'
import { renderPopup } from '../popup.js'

function composeUserWelcome (state) {
  if (state.userData && state.userData.accessToken && state.userData.userName) {
    return `
      <p>Hello <span class='username'>${state.userData.userName}</span>!
      <a id="logout-link" href="#">Log out</a></p>
    `
  } else {
    return `
      <p>Your Anilist account is not connected.</p>
      <p><button id="anilist-login-button">Login to Anilist.co</button></p>
    `
  }
}

export function renderUserWelcome (state) {
  const userWelcomeHtml = composeUserWelcome(state)
  document.querySelector('#user-welcome').innerHTML = userWelcomeHtml

  const loginButton = document.querySelector('#anilist-login-button')
  if (loginButton) { // if rendered
    loginButton.onclick = function () {
      loginButton.innerHTML = 'Opening login window...'
      loginToAnilist()
        .then(() => alert('Successfully authenticated to Anilist.co.'))
        .catch(console.error)
    }
  }
  const logoutLink = document.querySelector('#logout-link')
  if (logoutLink) {
    logoutLink.onclick = function () {
      chrome.storage.sync.clear(async () => await renderPopup())
    }
  }
}
