/* globals fetch */

// generic query function
export function queryAnilist (query, variables, accessToken) {
  return new Promise((resolve, reject) => {
    var url = 'https://graphql.anilist.co'
    var options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    }

    if (accessToken) { // add to request
      options.headers.Authorization = 'Bearer ' + accessToken
    }

    // make the API request
    fetch(url, options)
      .then(handleResponse)
      .then((result) => resolve(result))
      .catch(reject)

    function handleResponse (response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json)
      })
    }
  })
}

export function querySearchMedia(searchString) {
  return new Promise((resolve, reject) => {
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
    const variables = { search: searchString }
    queryAnilist(query, variables, null)
      .then((result) => resolve(result))
      .catch((error) => reject(error))
  })
}

export function queryUserProgress(mediaId, userName) {
  return new Promise((resolve, reject) => {
    const query = `
      query ($mediaId: Int, $userName: String) {
        MediaList (mediaId: $mediaId, userName: $userName) {
          progress
        }
      }
    `
    const variables = { mediaId: mediaId, userName: userName}
    queryAnilist(query, variables, null)
      .then((result) => resolve(result))
      .catch((error) => reject(error))
  })
}
