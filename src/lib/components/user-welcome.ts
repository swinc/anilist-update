import { renderPopup } from '../../popup/popup.js'
import { AppState } from '../types'

function composeUserWelcome (state: AppState) {
  if (state.userData && state.accessToken && state.userData.data.Viewer.name) {
    return `
      <p>Hello <span class='username'>${state.userData.data.Viewer.name}</span>!
      <a id="logout-link" href="#">Log out</a></p>
    `
  } else {
    return `
      <p>Your Anilist account is not connected.</p>
      <p><button id="anilist-login-button">Login to Anilist.co</button></p>
    `
  }
}

export function renderUserWelcome (state: AppState) {
  const userWelcomeHtml = composeUserWelcome(state)
  document.querySelector('#user-welcome').innerHTML = userWelcomeHtml

  const loginButton: HTMLButtonElement = document.querySelector('#anilist-login-button')
  if (loginButton) { // if rendered
    loginButton.onclick = function () {
      loginButton.innerHTML = 'Opening login window...'
      chrome.runtime.sendMessage('do-login')
    }
  }
  const logoutLink: HTMLAnchorElement = document.querySelector('#logout-link')
  if (logoutLink) {
    logoutLink.onclick = function () {
      chrome.identity.clearAllCachedAuthTokens(() => {})
      chrome.storage.sync.clear(async () => await renderPopup())
    }
  }
}
