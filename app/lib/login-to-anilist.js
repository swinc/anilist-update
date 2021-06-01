export function launchAnilistWebAuth() {
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
            chrome.runtime.sendMessage('successful-login');
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tdG8tYW5pbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvbG9naW4tdG8tYW5pbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFVBQVUsb0JBQW9CO0lBQ2xDLE1BQU0sU0FBUyxHQUFHLDhFQUE4RSxDQUFBO0lBQ2hHLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQy9CLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQ3JDLFVBQVUsV0FBVztRQUNuQixrQ0FBa0M7UUFDbEMsTUFBTSxnQkFBZ0IsR0FBRyx5QkFBeUIsQ0FBQTtRQUNsRCxNQUFNLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQTtRQUM5QyxNQUFNLGNBQWMsR0FBRyx1QkFBdUIsQ0FBQTtRQUU5QyxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyx1QkFBdUI7UUFDbEYsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0RCxNQUFNLFNBQVMsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRXRELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtTQUM1QjthQUFNO1lBQ0wsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUN0QixXQUFXLEVBQUUsV0FBVztnQkFDeEIsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFNBQVMsRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUE7U0FDL0M7SUFDSCxDQUFDLENBQ0YsQ0FBQTtBQUNILENBQUMifQ==