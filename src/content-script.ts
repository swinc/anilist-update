/* globals chrome, XMLSerializer */

// access page source
const generatedSource = new XMLSerializer().serializeToString(document)

// get episode title
const reMediaTitle = /<title>(.+?) Episode/ // https://regex101.com/r/zOb55Y/1
const matchesMediaTitle = generatedSource.match(reMediaTitle)

let contentTitle: string = null
if (matchesMediaTitle) {
  contentTitle = matchesMediaTitle[1]
}

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message === 'get-media-title') {
    sendResponse(contentTitle)
  }
})
