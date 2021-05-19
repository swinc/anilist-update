# AutoUpdate for Anilist / Chrome Extension

This is a Chrome extension for automatically updating your [Anilist.co](https://anilist.co/) profile when you have completed watching a media item.

## Structure

`background.js` runs on extension activation and calls `chrome.declarativeContent.ShowPageAction()` when specific websites are visited. `ShowPageAction()` displays `popup.html` and the corresponding .js and .css files.

Content on individual websites is read by use of a [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/), which is injected into pages that match the given criteria. Content scripts run independently (inside the browser tab) from the extension and therefore can only communicate back to the extension by use of [message passing](https://developer.chrome.com/docs/extensions/mv3/messaging/).

The extension (`background.js`) listens for messages by setting a listener with `chrome.runtime.onMessage.addListener()`.

The content script performs work on the page and passes messages to the extension (`background.js`) by use of `chrome.runtime.sendmessage()`. The background page receives the message and stores in on the global `windows` object.

The popup script retrieves the global windows object with `chrome.runtime.getBackgroundPage()` and thereby accesses the message passed from the content script.

## Content Script

The contact script finds the title and episode of the content on the given page, and then passes this information to the background script as:
```
{ title: String, episode: int }
```