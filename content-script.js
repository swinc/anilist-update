// content-script.js

console.log('Anilist content script loaded...')

// TODO: detect title and episode on page
chrome.runtime.sendMessage({ detected: true, title: "Attack on Titan", episode: 75});
