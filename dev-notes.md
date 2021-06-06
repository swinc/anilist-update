# Development Notes

## Directory Structure

`app` is the actual Chrome extension with the `manifest.json` file, image assets, and the compiled javascript code.

`src` contains the TypeScript code which gets compiled to the JavaScript code in `app`.

## Development Tools

`npm run build` to build with Webpack, which uses `ts-loader` for TypeScript.

Webpack has three entry points: `background.ts`, `content-script.ts`, and `popup/popup.tsx`. It compiles all dependencies into respective `.js` files in the `app` directory.

## High-Level Extension Structure

`background.js` is a service worker which runs on extension activation and calls `chrome.declarativeContent.ShowPageAction()` when specific websites are visited. `ShowPageAction()` displays `popup.html` and the corresponding .js and .css files.

Content on individual websites is read by use of a [content script](https://developer.chrome.com/docs/extensions/mv3/content_scripts/), which is injected into pages that match the given criteria. Content scripts run independently (inside the browser tab) from the extension and therefore can only communicate back to the extension by use of [message passing](https://developer.chrome.com/docs/extensions/mv3/messaging/).

When the popup page opens, it sends a message (`get-media-title`) to the content script, which responds with the detected media title if it is available.

Likewise, if a user clicks the login button, popup will send a message (`do-login`) which is received by the background service worker to start the login flow.

The popup page cannot be relied upon to do asynchronous work if there is a chance it will close (i.e. during login). When the popup page closes, code execution stops.
