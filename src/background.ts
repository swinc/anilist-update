// set rules for pages to act upon
const targetPagesRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostContains: 'crunchyroll.com' }
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostContains: 'netflix.com' }
    }),
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostContains: 'hulu.com' }
    })
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()]
}
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([targetPagesRule])
  })
})

// entire login function must be inside this file because service workers cannot import
// modules until Chrome 93 (allegedly)
// see https://stackoverflow.com/questions/66114920/service-worker-registration-failed-chrome-extension
chrome.runtime.onMessage.addListener((message) => {
  if (message == 'do-login') {
    const loginLink = 'https://anilist.co/api/v2/oauth/authorize?client_id=4552&response_type=token'
    chrome.identity.launchWebAuthFlow(
      { url: loginLink, interactive: true },
      function (responseUrl) {
        // https://regex101.com/r/jDz0sC/1
        const accessTokenRegEx = /access_token=(.+?)(&|$)/
        const tokenTypeRegEx = /token_type=(.+?)(&|$)/
        const expiresInRegEx = /expires_in=(.+?)(&|$)/

        const accessToken = responseUrl.match(accessTokenRegEx)[1] // first captured group
        const tokenType = responseUrl.match(tokenTypeRegEx)[1]
        const expiresIn = responseUrl.match(expiresInRegEx)[1]

        if (!accessToken) {
          console.log("Login error.")
        } else {
          chrome.storage.sync.set({
            accessToken: accessToken,
            tokenType: tokenType,
            expiresIn: expiresIn
          })
          const options = {
              type: 'basic',
              title: 'Anilist',
              message: 'You have successfully logged into Anilist.',
              iconUrl:'./images/icon128.png'
          };
          chrome.notifications.create(null, options);
        }
      }
    )
  }
})
