// try to pass message back to extension


console.log('Anlist content script!')

chrome.runtime.sendMessage("a message from the content-script");
