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
// see https://stackoverflow.com/questions/66114920/service-worker-registration-failed-chrome-extension
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9iYWNrZ3JvdW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGtDQUFrQztBQUNsQyxNQUFNLGVBQWUsR0FBRztJQUN0QixVQUFVLEVBQUU7UUFDVixJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM3QyxPQUFPLEVBQUUsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUU7U0FDN0MsQ0FBQztRQUNGLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDO1lBQzdDLE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUU7U0FDekMsQ0FBQztRQUNGLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDO1lBQzdDLE9BQU8sRUFBRSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUU7U0FDdEMsQ0FBQztLQUNIO0lBQ0QsT0FBTyxFQUFFLENBQUMsSUFBSSxNQUFNLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLENBQUM7Q0FDMUQsQ0FBQTtBQUNELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztJQUNyQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7UUFDN0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO0lBQ3JFLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUE7QUFFRix1RkFBdUY7QUFDdkYsc0NBQXNDO0FBQ3RDLHVHQUF1RztBQUN2RyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtJQUMvQyxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUU7UUFDekIsTUFBTSxTQUFTLEdBQUcsOEVBQThFLENBQUE7UUFDaEcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FDL0IsRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFDckMsVUFBVSxXQUFXO1lBQ25CLGtDQUFrQztZQUNsQyxNQUFNLGdCQUFnQixHQUFHLHlCQUF5QixDQUFBO1lBQ2xELE1BQU0sY0FBYyxHQUFHLHVCQUF1QixDQUFBO1lBQzlDLE1BQU0sY0FBYyxHQUFHLHVCQUF1QixDQUFBO1lBRTlDLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQSxDQUFDLHVCQUF1QjtZQUNsRixNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3RELE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFFdEQsSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTthQUM1QjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ3RCLFdBQVcsRUFBRSxXQUFXO29CQUN4QixTQUFTLEVBQUUsU0FBUztvQkFDcEIsU0FBUyxFQUFFLFNBQVM7aUJBQ3JCLENBQUMsQ0FBQTtnQkFDRixNQUFNLE9BQU8sR0FBRztvQkFDWixJQUFJLEVBQUUsT0FBTztvQkFDYixLQUFLLEVBQUUsU0FBUztvQkFDaEIsT0FBTyxFQUFFLDRDQUE0QztvQkFDckQsT0FBTyxFQUFDLHNCQUFzQjtpQkFDakMsQ0FBQztnQkFDRixNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDNUM7UUFDSCxDQUFDLENBQ0YsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyxDQUFDLENBQUEifQ==