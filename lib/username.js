import { queryAnilist } from './query-anilist.js'


export function saveAnilistUserName(accessToken) {
  return new Promise((resolve, reject) => {
    const query =
    `
      query {
        Viewer {
          id
          name
        }
      }
    `
    console.log('Getting user name...')
    console.log('With token ' + accessToken)
    queryAnilist(query, null, accessToken)
      .then(function(result) {
        console.log('Saving username ' + result.data.Viewer.name)
        chrome.storage.sync.set({
          userName: result.data.Viewer.name,
        }, function () {
          resolve(true)
        })
      })
  })
}

export function updateUserName() {
  chrome.storage.sync.get('userName', function (result) {
    if(result && result.userName) {
      document.querySelector('span.username').innerHTML = result.userName
    }
  })
}
