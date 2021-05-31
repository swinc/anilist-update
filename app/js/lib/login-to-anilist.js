/**
 *  Returns promise which resolves with true on success / completion
*/
export function loginToAnilist() {
    return new Promise((resolve, reject) => {
        launchAnilistWebAuth()
            .then((authResponse) => {
            chrome.storage.sync.set({ accessToken: authResponse.accessToken }, () => {
                alert("You have successfully logged into Anilist.");
                resolve(true);
            });
        })
            .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}
function launchAnilistWebAuth() {
    const loginLink = 'https://anilist.co/api/v2/oauth/authorize?client_id=4552&response_type=token';
    console.log('loginLink', loginLink);
    return new Promise((resolve, reject) => {
        chrome.identity.launchWebAuthFlow({ url: loginLink, interactive: true }, function (responseUrl) {
            console.log('responseUrl', responseUrl);
            // https://regex101.com/r/jDz0sC/1
            const accessTokenRegEx = /access_token=(.+?)(&|$)/;
            const tokenTypeRegEx = /token_type=(.+?)(&|$)/;
            const expiresInRegEx = /expires_in=(.+?)(&|$)/;
            const accessToken = responseUrl.match(accessTokenRegEx)[1]; // first captured group
            const tokenType = responseUrl.match(tokenTypeRegEx)[1];
            const expiresIn = responseUrl.match(expiresInRegEx)[1];
            if (accessToken == null) {
                const errorMsg = 'Login flow unsuccessful; accessToken is null.';
                console.error(errorMsg);
                reject(new Error(errorMsg));
            }
            else {
                resolve({
                    responseUrl: responseUrl,
                    accessToken: accessToken,
                    tokenType: tokenType,
                    expiresIn: expiresIn
                });
            }
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4tdG8tYW5pbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbG9naW4tdG8tYW5pbGlzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTs7RUFFRTtBQUNGLE1BQU0sVUFBVSxjQUFjO0lBQzVCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsb0JBQW9CLEVBQUU7YUFDbkIsSUFBSSxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7WUFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUNyQixFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLEVBQ3pDLEdBQUcsRUFBRTtnQkFDSCxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQTtnQkFDbkQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQUMsQ0FBQyxDQUNsQixDQUFBO1FBQ0gsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDZixPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNmLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQsU0FBUyxvQkFBb0I7SUFDM0IsTUFBTSxTQUFTLEdBQUcsOEVBQThFLENBQUE7SUFDaEcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFFbkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUMvQixFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxFQUNyQyxVQUFVLFdBQVc7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUE7WUFDdkMsa0NBQWtDO1lBQ2xDLE1BQU0sZ0JBQWdCLEdBQUcseUJBQXlCLENBQUE7WUFDbEQsTUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUE7WUFDOUMsTUFBTSxjQUFjLEdBQUcsdUJBQXVCLENBQUE7WUFFOUMsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBLENBQUMsdUJBQXVCO1lBQ2xGLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDdEQsTUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUV0RCxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLE1BQU0sUUFBUSxHQUFHLCtDQUErQyxDQUFBO2dCQUNoRSxPQUFPLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUN2QixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTthQUM1QjtpQkFBTTtnQkFDTCxPQUFPLENBQUM7b0JBQ04sV0FBVyxFQUFFLFdBQVc7b0JBQ3hCLFdBQVcsRUFBRSxXQUFXO29CQUN4QixTQUFTLEVBQUUsU0FBUztvQkFDcEIsU0FBUyxFQUFFLFNBQVM7aUJBQ3JCLENBQUMsQ0FBQTthQUNIO1FBQ0gsQ0FBQyxDQUNGLENBQUE7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMifQ==