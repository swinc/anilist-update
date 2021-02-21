'use strict'

/* globals chrome */

// rule for when to display the extention's page action
var targetPagesRule = {
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

/* add a listener for the onPageChanged event and when the page is changed, use the
 * "targetPage" rule above
*/
chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([targetPagesRule])
  })
})
