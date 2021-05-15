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

export function showContentNotDetected() {
  document.querySelector('#content-not-detected').classList.remove('hidden')
  document.querySelector('#content-detected').classList.add('hidden')

  document.querySelector('#content-ui-block').classList.add('hidden')
}

export function showContentDetected(title, episode) {
  document.querySelector('span#title').innerHTML = title
  document.querySelector('span#episode').innerHTML = episode
  document.querySelector('div#content-ui--title').innerHTML = title

  document.querySelector('#content-not-detected').classList.add('hidden')
  document.querySelector('#content-detected').classList.remove('hidden')

  document.querySelector('#content-ui-block').classList.remove('hidden')
}
