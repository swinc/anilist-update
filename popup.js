/* globals alert */

import { showLoginStatus } from './lib/show-login-status.js'
import { loginToAnilist } from './lib/login-to-anilist.js'
import { clickLoginButton, clickLogoutButton } from './lib/button-handlers.js'
import { updateUserName } from './lib/username.js'

document.addEventListener('DOMContentLoaded', function() {
  showLoginStatus()
  updateUserName()

  // button handlers
  document.querySelector('#anilist-login-button').onclick = clickLoginButton
  document.querySelector('#logout-link').onclick = clickLogoutButton

  // TODO: attempt to detect content on page
})
