/* globals chrome */

import { queryAnilist } from './query-anilist.js'

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
  const query = `
    query ($search: String) {
      Media (search: $search, type: ANIME) {
        id
        title {
          english
        }
        episodes
        coverImage {
          medium
        }
      }
    }
  `
  const variables = { search: title }
  queryAnilist(query, variables, null)
    .then((result) => {
      console.log(result)
      if(result.data && result.data.Media) {
        document.querySelector('div#content-ui--title').innerHTML = result.data.Media.title.english
        document.querySelector('img#content-ui--image').src = result.data.Media.coverImage.medium
        document.querySelector('#content-ui--total-episodes').innerHTML = result.data.Media.episodes
      }

      // query user progress for this episode
      const progressQuery = `
        query ($mediaId: Int, $userName: String) {
          MediaList (mediaId: $mediaId, userName: $userName) {
            progress
          }
        }
      `
      // TODO: do not hardcode this userName
      const progressVariables = { mediaId: result.data.Media.id, userName: "FallenInterest"}
      queryAnilist(progressQuery, progressVariables, null)
        .then((result) => {
          console.log(result)
          document.querySelector('#content-ui--episode-progress').innerHTML = result.data.MediaList.progress
        })
        .catch((result) => console.log(result))
    })

}
