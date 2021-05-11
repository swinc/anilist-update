/* globals chrome */

export function showConnectedAccount () {
  document.querySelector('#account-connected').classList.remove('hidden')
  document.querySelector('#account-not-connected').classList.add('hidden')
}

export function showDisconnectedAccount() {
  document.querySelector('#account-not-connected').classList.remove('hidden')
  document.querySelector('#account-connected').classList.add('hidden')
}

export function showUserName(userName) {
  if(userName) {
    document.querySelector('span.username').innerHTML = userName
  }
}
