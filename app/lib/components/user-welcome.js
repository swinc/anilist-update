import { renderPopup } from '../../popup/popup.js';
function composeUserWelcome(state) {
    if (state.userData && state.accessToken && state.userData.data.Viewer.name) {
        return `
      <p>Hello <span class='username'>${state.userData.data.Viewer.name}</span>!
      <a id="logout-link" href="#">Log out</a></p>
    `;
    }
    else {
        return `
      <p>Your Anilist account is not connected.</p>
      <p><button id="anilist-login-button">Login to Anilist.co</button></p>
    `;
    }
}
export function renderUserWelcome(state) {
    const userWelcomeHtml = composeUserWelcome(state);
    document.querySelector('#user-welcome').innerHTML = userWelcomeHtml;
    const loginButton = document.querySelector('#anilist-login-button');
    if (loginButton) { // if rendered
        loginButton.onclick = function () {
            loginButton.innerHTML = 'Opening login window...';
            chrome.runtime.sendMessage('do-login');
        };
    }
    const logoutLink = document.querySelector('#logout-link');
    if (logoutLink) {
        logoutLink.onclick = function () {
            chrome.identity.clearAllCachedAuthTokens(() => { });
            chrome.storage.sync.clear(async () => await renderPopup());
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci13ZWxjb21lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnRzL3VzZXItd2VsY29tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUE7QUFHbEQsU0FBUyxrQkFBa0IsQ0FBRSxLQUFlO0lBQzFDLElBQUksS0FBSyxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDMUUsT0FBTzt3Q0FDNkIsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUk7O0tBRWxFLENBQUE7S0FDRjtTQUFNO1FBQ0wsT0FBTzs7O0tBR04sQ0FBQTtLQUNGO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxpQkFBaUIsQ0FBRSxLQUFlO0lBQ2hELE1BQU0sZUFBZSxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pELFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQTtJQUVuRSxNQUFNLFdBQVcsR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBO0lBQ3RGLElBQUksV0FBVyxFQUFFLEVBQUUsY0FBYztRQUMvQixXQUFXLENBQUMsT0FBTyxHQUFHO1lBQ3BCLFdBQVcsQ0FBQyxTQUFTLEdBQUcseUJBQXlCLENBQUE7WUFDakQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDeEMsQ0FBQyxDQUFBO0tBQ0Y7SUFDRCxNQUFNLFVBQVUsR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUM1RSxJQUFJLFVBQVUsRUFBRTtRQUNkLFVBQVUsQ0FBQyxPQUFPLEdBQUc7WUFDbkIsTUFBTSxDQUFDLFFBQVEsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQTtZQUNsRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxNQUFNLFdBQVcsRUFBRSxDQUFDLENBQUE7UUFDNUQsQ0FBQyxDQUFBO0tBQ0Y7QUFDSCxDQUFDIn0=