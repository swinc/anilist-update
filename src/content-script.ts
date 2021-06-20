function getMediaTitle() {
  let contentTitle: string = null

  if (hostName == 'www.hulu.com') {
    contentTitle = document.querySelector('div.PlayerMetadata__title > div > div > span').textContent
  } else if (hostName == 'www.crunchyroll.com' || hostName == 'beta.crunchyroll.com') {
    contentTitle = document.querySelector('div.showmedia-header > h1 > a > span').textContent
  } else if (hostName == 'www.netflix.com') {
    contentTitle = document.querySelector('div.video-title > div > h4').textContent
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
