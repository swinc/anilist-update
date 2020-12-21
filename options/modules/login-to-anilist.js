import { updatePageLoginStatus } from './update-page-login-status.js'

/* globals chrome */

export function loginToAnilist (element) {
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

      // save auth
      chrome.storage.sync.set({
        authResponseURL: responseURL,
        accessToken: accessToken,
        tokenType: tokenType,
        expiresIn: expiresIn
      }, function () {
        updatePageLoginStatus()
      })
    }
  )
}
