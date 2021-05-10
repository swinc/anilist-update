/* globals fetch */

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
