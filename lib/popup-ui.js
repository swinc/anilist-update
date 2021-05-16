/* globals chrome */

import { queryAnilist, querySearchMedia, queryUserProgress } from './query-anilist.js'

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
  // document.querySelector('div#content-ui--title').innerHTML = title

  document.querySelector('#content-not-detected').classList.add('hidden')
  document.querySelector('#content-detected').classList.remove('hidden')

  document.querySelector('#content-ui-block').classList.remove('hidden')

  // query anilist for title, cover art, and episodes
  querySearchMedia(title)
    .then((result) => {
      console.log(result)
      if(result.data && result.data.Media) {
        document.querySelector('div#content-ui--title').innerHTML = result.data.Media.title.english
        document.querySelector('img#content-ui--image').src = result.data.Media.coverImage.medium
        document.querySelector('#content-ui--total-episodes').innerHTML = result.data.Media.episodes
      }

      // query user progress for this episode
      queryUserProgress(result.data.Media.id, "FallenInterest")
        .then((result) => {
          console.log(result)
          document.querySelector('#content-ui--episode-progress').innerHTML = result.data.MediaList.progress
        })
        .catch((result) => console.log(result))
    })

}
