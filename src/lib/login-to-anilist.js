/* globals chrome */

/**
 *  Returns promise which resolves with true on success / completion
*/
export function loginToAnilist () {
  return new Promise((resolve, reject) => {
    launchAnilistWebAuth()
      .then((authResponse) => {
        chrome.storage.sync.set(
          { accessToken: authResponse.accessToken },
          () => { resolve(true) }
        )
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

function launchAnilistWebAuth () {
  const loginLink = 'https://anilist.co/api/v2/oauth/authorize?client_id=4552&response_type=token'
  console.log('loginLink', loginLink)

  return new Promise((resolve, reject) => {
    chrome.identity.launchWebAuthFlow(
      { url: loginLink, interactive: true },
      function (responseUrl) {
        console.log('responseUrl', responseUrl)
        // https://regex101.com/r/jDz0sC/1
        const accessTokenRegEx = /access_token=(.+?)(&|$)/
        const tokenTypeRegEx = /token_type=(.+?)(&|$)/
        const expiresInRegEx = /expires_in=(.+?)(&|$)/

        const accessToken = responseUrl.match(accessTokenRegEx)[1] // first captured group
        const tokenType = responseUrl.match(tokenTypeRegEx)[1]
        const expiresIn = responseUrl.match(expiresInRegEx)[1]

        if (accessToken == null) {
          const errorMsg = 'Login flow unsuccessful; accessToken is null.'
          console.error(errorMsg)
          reject(new Error(errorMsg))
        } else {
          resolve({
            responseUrl: responseUrl,
            accessToken: accessToken,
            tokenType: tokenType,
            expiresIn: expiresIn
          })
        }
      }
    )
  })
}
