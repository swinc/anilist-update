import { signOutAnilist } from './sign-out-anilist.js'
import { loginToAnilist } from './login-to-anilist.js'

export function clickLoginButton() {
  document.querySelector('#anilist-login-button').innerHTML = "Opening login..."
  loginToAnilist()
}

export function clickLogoutButton() {
  signOutAnilist()
    .then((result) => {
      showLoginStatus()
    })
}

export function clickUpdateButton() {
  alert("you are updating!")
}
