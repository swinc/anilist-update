/* globals chrome, XMLSerializer */

function getMediaTitle() {
  let contentTitle: string = 'nothing'

  if (hostName == 'www.hulu.com') {
    const span = document.querySelector('div.PlayerMetadata__title > div > div > span')
    contentTitle = span.textContent
  } else if (hostName == 'www.crunchyroll.com' || hostName == 'beta.crunchyroll.com') {
    // access page source
    const generatedSource = new XMLSerializer().serializeToString(document)

    // get episode title
    const reMediaTitle = /<title>(.+?) Episode/ // https://regex101.com/r/zOb55Y/1
    const matchesMediaTitle = generatedSource.match(reMediaTitle)

    if (matchesMediaTitle) {
      contentTitle = matchesMediaTitle[1]
    }
  }
  return contentTitle
}


const hostName = window.location.hostname

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message === 'get-media-title') {
    const mediaTitle = getMediaTitle()
    sendResponse(mediaTitle)
  }
})
