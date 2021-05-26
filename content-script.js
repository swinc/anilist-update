/* globals chrome, XMLSerializer */

// access page source
const generatedSource = new XMLSerializer().serializeToString(document)

// get episode title
const reMediaTitle = /<title>(.+?) Episode/ // https://regex101.com/r/zOb55Y/1
const matchesMediaTitle = generatedSource.match(reMediaTitle)
const contentTitle = matchesMediaTitle[1]

// report to extension
chrome.runtime.sendMessage({ detected: true, title: contentTitle })
