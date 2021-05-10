import { saveAnilistUserName } from './username.js'

/* globals chrome */

/**
* returns a promise that resolves to true if login successful, false otherwise
*
*/
export function loginToAnilist () {
  return new Promise((resolve, reject) => {
    const loginLink = 'https://anilist.co/api/v2/oauth/authorize?client_id=4552&response_type=token'

    chrome.identity.launchWebAuthFlow(
      { url: loginLink, interactive: true },
      function (responseURL) {
        // https://regex101.com/r/jDz0sC/1
        const accessTokenRegEx = /access_token=(.+?)(&|$)/
        const tokenTypeRegEx = /token_type=(.+?)(&|$)/
        const expiresInRegEx = /expires_in=(.+?)(&|$)/

        const accessToken = responseURL.match(accessTokenRegEx)[1] // first captured group
        const tokenType = responseURL.match(tokenTypeRegEx)[1]
        const expiresIn = responseURL.match(expiresInRegEx)[1]

        if(accessToken == null) {
          reject(false); // login unsuccessful
        } else {
          // save auth
          chrome.storage.sync.set({
            authResponseURL: responseURL,
            accessToken: accessToken,
            tokenType: tokenType,
            expiresIn: expiresIn
          }, function () {
            saveAnilistUserName(accessToken)
            resolve(true)
          })
        }
      }
    )
  })
}
