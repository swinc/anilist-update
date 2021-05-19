/* globals chrome */

window.anilistData = {}  // global object for storing content script message data

// set rule and listener for extension page action
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

// store user data on page if available
chrome.storage.sync.get(['accessToken', 'userName'], function (storage) {
  window.anilistData.accessToken = storage.accessToken
  window.anilistData.userName = storage.userName
})

// listen for content script message
chrome.runtime.onMessage.addListener(
  (payload) => window.anilistData.contentScriptMessage = payload  // store message
);
