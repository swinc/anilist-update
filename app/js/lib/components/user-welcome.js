/* globals chrome */
import { renderPopup } from '../../popup.js';
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
            chrome.runtime.sendMessage('start-login');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci13ZWxjb21lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9jb21wb25lbnRzL3VzZXItd2VsY29tZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxvQkFBb0I7QUFFcEIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBRzVDLFNBQVMsa0JBQWtCLENBQUUsS0FBZTtJQUMxQyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQzFFLE9BQU87d0NBQzZCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJOztLQUVsRSxDQUFBO0tBQ0Y7U0FBTTtRQUNMLE9BQU87OztLQUdOLENBQUE7S0FDRjtBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUUsS0FBZTtJQUNoRCxNQUFNLGVBQWUsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNqRCxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUE7SUFFbkUsTUFBTSxXQUFXLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtJQUN0RixJQUFJLFdBQVcsRUFBRSxFQUFFLGNBQWM7UUFDL0IsV0FBVyxDQUFDLE9BQU8sR0FBRztZQUNwQixXQUFXLENBQUMsU0FBUyxHQUFHLHlCQUF5QixDQUFBO1lBQ2pELE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzNDLENBQUMsQ0FBQTtLQUNGO0lBQ0QsTUFBTSxVQUFVLEdBQXNCLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDNUUsSUFBSSxVQUFVLEVBQUU7UUFDZCxVQUFVLENBQUMsT0FBTyxHQUFHO1lBQ25CLE1BQU0sQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUE7WUFDbEQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsTUFBTSxXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBQzVELENBQUMsQ0FBQTtLQUNGO0FBQ0gsQ0FBQyJ9