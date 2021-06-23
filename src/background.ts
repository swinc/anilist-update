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
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message == 'do-login') {
    const loginLink = 'https://anilist.co/api/v2/oauth/authorize?client_id=4552&response_type=token'
    chrome.identity.launchWebAuthFlow(
      { url: loginLink, interactive: true },
      function (responseUrl) {
        if (typeof responseUrl !== "string") {
          console.error('Login error: authentication response url was invalid.')
          sendResponse({ accessToken: null })
          return
        }
        // https://regex101.com/r/jDz0sC/1
        const accessTokenRegEx = /access_token=(.+?)(&|$)/
        const tokenTypeRegEx = /token_type=(.+?)(&|$)/
        const expiresInRegEx = /expires_in=(.+?)(&|$)/
        let matches = responseUrl.match(accessTokenRegEx) // first captured group
        const accessToken = matches ? matches[1] : null

        matches = responseUrl.match(tokenTypeRegEx)
        const tokenType = matches ? matches[1] : null

        matches = responseUrl.match(expiresInRegEx)
        const expiresIn = matches ? matches[1] : null

        if (typeof accessToken !== 'string') {
          console.error('Login error: accessToken could not be retrieved.')
          sendResponse({ accessToken: null })
          return
        }

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
        chrome.notifications.create('', options);
        sendResponse({ accessToken: accessToken })
      }
    )
    return true // needed for async message response; see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
  }
})
