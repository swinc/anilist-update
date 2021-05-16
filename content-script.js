// access page source
const generatedSource = new XMLSerializer().serializeToString(document);

// get episode title
const reMediaTitle = /"mediaTitle":"(.+?)"/  // https://regex101.com/r/zOb55Y/1
let matchesMediaTitle = generatedSource.match(reMediaTitle)
const contentTitle = matchesMediaTitle[1]

// get episode number
const reEpisodeNumber = /"episodeNumber":"(\d+?)"/
let matchesEpisodeNumber = generatedSource.match(reEpisodeNumber)
const episodeNumber = matchesEpisodeNumber[1]

// report to extension
chrome.runtime.sendMessage({ detected: true, title: contentTitle, episode: episodeNumber});
