// set rules for pages to act upon
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
// entire login function must be inside this file because service workers cannot import
// modules until Chrome 93 (allegedly)
chrome.runtime.onMessage.addListener((message) => {
    if (message == 'do-login') {
        const loginLink = 'https://anilist.co/api/v2/oauth/authorize?client_id=4552&response_type=token';
        chrome.identity.launchWebAuthFlow({ url: loginLink, interactive: true }, function (responseUrl) {
            // https://regex101.com/r/jDz0sC/1
            const accessTokenRegEx = /access_token=(.+?)(&|$)/;
            const tokenTypeRegEx = /token_type=(.+?)(&|$)/;
            const expiresInRegEx = /expires_in=(.+?)(&|$)/;
            const accessToken = responseUrl.match(accessTokenRegEx)[1]; // first captured group
            const tokenType = responseUrl.match(tokenTypeRegEx)[1];
            const expiresIn = responseUrl.match(expiresInRegEx)[1];
            if (!accessToken) {
                console.log("Login error.");
            }
            else {
                chrome.storage.sync.set({
                    accessToken: accessToken,
                    tokenType: tokenType,
                    expiresIn: expiresIn
                });
                const options = {
                    type: 'basic',
                    title: 'Anilist',
                    message: 'You have successfully logged into Anilist.',
                    iconUrl: './images/icon128.png'
                };
                chrome.notifications.create(null, options);
            }
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWNrZ3JvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtDQUFrQztBQUNsQyxNQUFNLGVBQWUsR0FBRztJQUN0QixVQUFVLEVBQUU7UUFDVixJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM3QyxPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7U0FDN0MsQ0FBQztRQUNGLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDO1lBQzdDLE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUU7U0FDekMsQ0FBQztRQUNGLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDO1lBQzdDLE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUU7U0FDdEMsQ0FBQztLQUNIO0lBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUM7Q0FDMUQsQ0FBQTtBQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUNyQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7UUFDN0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0lBQ3JFLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUE7QUFFRix1RkFBdUY7QUFDdkYsc0NBQXNDO0FBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQy9DLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRTtRQUN6QixNQUFNLFNBQVMsR0FBRyw4RUFBOEUsQ0FBQTtRQUNoRyxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUMvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUNyQyxVQUFVLFdBQVc7WUFDbkIsa0NBQWtDO1lBQ2xDLE1BQU0sZ0JBQWdCLEdBQUcseUJBQXlCLENBQUE7WUFDbEQsTUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUE7WUFDOUMsTUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUE7WUFFOUMsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsdUJBQXVCO1lBQ2xGLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEQsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUV0RCxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFBO2FBQzVCO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDdEIsV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLFNBQVMsRUFBRSxTQUFTO29CQUNwQixTQUFTLEVBQUUsU0FBUztpQkFDckIsQ0FBQyxDQUFBO2dCQUNGLE1BQU0sT0FBTyxHQUFHO29CQUNaLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRSxTQUFTO29CQUNoQixPQUFPLEVBQUUsNENBQTRDO29CQUNyRCxPQUFPLEVBQUMsc0JBQXNCO2lCQUNqQyxDQUFDO2dCQUNGLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUMsQ0FDRixDQUFBO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQSJ9