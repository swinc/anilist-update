/* globals chrome, alert, fetch */

// if access token exists, show connected message
function updateLoginDisplay () {
  chrome.storage.sync.get('accessToken', function (result) {
    if (result.accessToken) { // connected account
      document.querySelector('#account-connected').classList.remove('hidden')
      document.querySelector('#account-not-connected').classList.add('hidden')
    } else {
      document.querySelector('#account-not-connected').classList.remove('hidden')
      document.querySelector('#account-connected').classList.add('hidden')
    }
  })
}

updateLoginDisplay()

document.querySelector('#logout-link').onclick = function (element) {
  chrome.storage.sync.set({ accessToken: null }, function (result) {
    console.log(result)
    updateLoginDisplay()
  })
}

// test connection button
const testConnButton = document.querySelector('#anilist-test-button')
testConnButton.onclick = function (element) {
  chrome.storage.sync.get('accessToken', (result) => {
    var query = `
    mutation ($language: UserTitleLanguage) {
        UpdateUser (titleLanguage: $language) {
          name
        }
    }
    `

    var variables = {
      language: 'ENGLISH'
    }

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co'
    var options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + result.accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    }

    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
      .then(handleData)
      .catch(handleError)

    function handleResponse (response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json)
      })
    }

    function handleData (data) {
      console.log(data)
      document.querySelector('#test-connection-result').innerHTML =
        'Success! Return value: <code>' + JSON.stringify(data) + '</code>'
    }

    function handleError (error) {
      alert('Error, check console')
      console.error(error)
    }
  })
}

const loginLink = 'https://anilist.co/api/v2/oauth/authorize?client_id=4552&response_type=token'
const loginButton = document.getElementById('anilist-login-button')

loginButton.onclick = function (element) {
  chrome.identity.launchWebAuthFlow(
    { url: loginLink, interactive: true },
    (responseURL) => {
      // https://regex101.com/r/jDz0sC/1
      const accessTokenRegEx = /access_token=(.+?)(&|$)/
      const tokenTypeRegEx = /token_type=(.+?)(&|$)/
      const expiresInRegEx = /expires_in=(.+?)(&|$)/

      const accessToken = responseURL.match(accessTokenRegEx)[1] // first captured group
      const tokenType = responseURL.match(tokenTypeRegEx)[1]
      const expiresIn = responseURL.match(expiresInRegEx)[1]

      // save auth
      chrome.storage.sync.set({
        authResponseURL: responseURL,
        accessToken: accessToken,
        tokenType: tokenType,
        expiresIn: expiresIn
      }, function () {
        console.log('Anilist auth details saved.')
        updateLoginDisplay()
      })

      // test
      chrome.storage.sync.get('accessToken', (result) => { console.log(result) })
    }
  )
}

// ==============
// unauth test
// ==============
const unauthSubmit = document.getElementById('unauth-media-submit')

unauthSubmit.onclick = function (element) {
  element.preventDefault()
  var mediaID = document.getElementById('unauth-media-id').value

  var query = `
  query ($id: Int) { # Define which variables will be used in the query (id)
    Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
    }
  }
  `

  var variables = {
    id: mediaID
  }

  // Define the config we'll need for our Api request
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

  // Make the HTTP Api request
  fetch(url, options).then(handleResponse)
    .then(handleData)
    .catch(handleError)

  function handleResponse (response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json)
    })
  }

  function handleData (data) {
    console.log(data)
    document.getElementById('unauth-media-result').innerHTML = '<code>' + JSON.stringify(data) + '</code>'
  }

  function handleError (error) {
    alert('Error, check console')
    console.error(error)
  }
}

// ==============
// auth test
// ==============
const authSubmit = document.getElementById('auth-media-submit')

authSubmit.onclick = function (element) {
  element.preventDefault()
  var mediaID = document.getElementById('auth-media-id').value
  chrome.storage.sync.get('accessToken', (result) => {
    console.log('Got access token: ' + result.accessToken)

    var query = `
    mutation ($mediaId: Int, $status: MediaListStatus) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status) {
            id
            status
        }
    }
    `

    var variables = {
      mediaId: mediaID,
      status: 'CURRENT'
    }

    // Define the config we'll need for our Api request
    var url = 'https://graphql.anilist.co'
    var options = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + result.accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query,
        variables: variables
      })
    }

    // Make the HTTP Api request
    fetch(url, options).then(handleResponse)
      .then(handleData)
      .catch(handleError)

    function handleResponse (response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json)
      })
    }

    function handleData (data) {
      console.log(data)
      document.querySelector('#auth-media-result').innerHTML =
        '<code>' + JSON.stringify(data) + '</code>'
    }

    function handleError (error) {
      alert('Error, check console')
      console.error(error)
    }
  })
}
