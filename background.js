'use strict'

/* globals chrome */

var targetSites = ['anilist.co', 'netflix.com', 'hulu.com']

// rule for when to display the extention's page action
var targetPagesRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostContains: targetSites }
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
