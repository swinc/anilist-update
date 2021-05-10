# AutoUpdate for Anilist / Chrome Extension

This is a Chrome extension for automatically updating your [Anilist.co](https://anilist.co/) profile when you have completed watching a media item.

## Structure

`background.js` runs on extension activation and calls `ShowPageAction()` when specific websites are visited.

`ShowPageAction()` displays `popup.html` and the corresponding .js and .css files.
