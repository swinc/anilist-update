/* globals chrome */
import { loginToAnilist } from './lib/login-to-anilist.js';
// set rule and listener for extension page action
const targetPagesRule = {
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: 'crunchyroll.com' }
        }),
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: 'netflix.com' }
        }),
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostContains: 'hulu.com' }
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
};
chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([targetPagesRule]);
    });
});
chrome.runtime.onMessage.addListener(async (message) => {
    if (message === 'start-login') {
        await loginToAnilist();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9iYWNrZ3JvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9CQUFvQjtBQUVwQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUE7QUFFMUQsa0RBQWtEO0FBQ2xELE1BQU0sZUFBZSxHQUFHO0lBQ3RCLFVBQVUsRUFBRTtRQUNWLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDO1lBQzdDLE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRTtTQUM3QyxDQUFDO1FBQ0YsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUM7WUFDN0MsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRTtTQUN6QyxDQUFDO1FBQ0YsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsZ0JBQWdCLENBQUM7WUFDN0MsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRTtTQUN0QyxDQUFDO0tBQ0g7SUFDRCxPQUFPLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztDQUMxRCxDQUFBO0FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTtRQUM3RCxNQUFNLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUE7SUFDckUsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQTtBQUVGLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUU7SUFDckQsSUFBSSxPQUFPLEtBQUssYUFBYSxFQUFFO1FBQzdCLE1BQU0sY0FBYyxFQUFFLENBQUE7S0FDdkI7QUFDSCxDQUFDLENBQUMsQ0FBQSJ9