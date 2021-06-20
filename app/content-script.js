/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./src/content-script.ts ***!
  \*******************************/
function getMediaTitle() {
    let contentTitle = null;
    if (hostName == 'www.hulu.com') {
        contentTitle = document.querySelector('div.PlayerMetadata__title > div > div > span').textContent;
    }
    else if (hostName == 'www.crunchyroll.com' || hostName == 'beta.crunchyroll.com') {
        contentTitle = document.querySelector('div.showmedia-header > h1 > a > span').textContent;
    }
    else if (hostName == 'www.netflix.com') {
        contentTitle = document.querySelector('div.video-title > div > h4').textContent;
    }
    return contentTitle;
}
const hostName = window.location.hostname;
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message === 'get-media-title') {
        const mediaTitle = getMediaTitle();
        sendResponse(mediaTitle);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC1zY3JpcHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY29udGVudC1zY3JpcHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsU0FBUyxhQUFhO0lBQ3BCLElBQUksWUFBWSxHQUFXLElBQUksQ0FBQTtJQUUvQixJQUFJLFFBQVEsSUFBSSxjQUFjLEVBQUU7UUFDOUIsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsOENBQThDLENBQUMsQ0FBQyxXQUFXLENBQUE7S0FDbEc7U0FBTSxJQUFJLFFBQVEsSUFBSSxxQkFBcUIsSUFBSSxRQUFRLElBQUksc0JBQXNCLEVBQUU7UUFDbEYsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxXQUFXLENBQUE7S0FDMUY7U0FBTSxJQUFJLFFBQVEsSUFBSSxpQkFBaUIsRUFBRTtRQUN4QyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQTtLQUNoRjtJQUNELE9BQU8sWUFBWSxDQUFBO0FBQ3JCLENBQUM7QUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQTtBQUV6QyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxFQUFFO0lBQ3RFLElBQUksT0FBTyxLQUFLLGlCQUFpQixFQUFFO1FBQ2pDLE1BQU0sVUFBVSxHQUFHLGFBQWEsRUFBRSxDQUFBO1FBQ2xDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQTtLQUN6QjtBQUNILENBQUMsQ0FBQyxDQUFBIn0=
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hbmlsaXN0LXVwZGF0ZS8uL3NyYy9jb250ZW50LXNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELDJDQUEyQywyaEMiLCJmaWxlIjoiLi9hcHAvY29udGVudC1zY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRNZWRpYVRpdGxlKCkge1xuICAgIGxldCBjb250ZW50VGl0bGUgPSBudWxsO1xuICAgIGlmIChob3N0TmFtZSA9PSAnd3d3Lmh1bHUuY29tJykge1xuICAgICAgICBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuUGxheWVyTWV0YWRhdGFfX3RpdGxlID4gZGl2ID4gZGl2ID4gc3BhbicpLnRleHRDb250ZW50O1xuICAgIH1cbiAgICBlbHNlIGlmIChob3N0TmFtZSA9PSAnd3d3LmNydW5jaHlyb2xsLmNvbScgfHwgaG9zdE5hbWUgPT0gJ2JldGEuY3J1bmNoeXJvbGwuY29tJykge1xuICAgICAgICBjb250ZW50VGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuc2hvd21lZGlhLWhlYWRlciA+IGgxID4gYSA+IHNwYW4nKS50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgZWxzZSBpZiAoaG9zdE5hbWUgPT0gJ3d3dy5uZXRmbGl4LmNvbScpIHtcbiAgICAgICAgY29udGVudFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LnZpZGVvLXRpdGxlID4gZGl2ID4gaDQnKS50ZXh0Q29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnRlbnRUaXRsZTtcbn1cbmNvbnN0IGhvc3ROYW1lID0gd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lO1xuY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBfc2VuZGVyLCBzZW5kUmVzcG9uc2UpID0+IHtcbiAgICBpZiAobWVzc2FnZSA9PT0gJ2dldC1tZWRpYS10aXRsZScpIHtcbiAgICAgICAgY29uc3QgbWVkaWFUaXRsZSA9IGdldE1lZGlhVGl0bGUoKTtcbiAgICAgICAgc2VuZFJlc3BvbnNlKG1lZGlhVGl0bGUpO1xuICAgIH1cbn0pO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKbWFXeGxJam9pWTI5dWRHVnVkQzF6WTNKcGNIUXVhbk1pTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdUxpOXpjbU12WTI5dWRHVnVkQzF6WTNKcGNIUXVkSE1pWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFc1UwRkJVeXhoUVVGaE8wbEJRM0JDTEVsQlFVa3NXVUZCV1N4SFFVRlhMRWxCUVVrc1EwRkJRVHRKUVVVdlFpeEpRVUZKTEZGQlFWRXNTVUZCU1N4alFVRmpMRVZCUVVVN1VVRkRPVUlzV1VGQldTeEhRVUZITEZGQlFWRXNRMEZCUXl4aFFVRmhMRU5CUVVNc09FTkJRVGhETEVOQlFVTXNRMEZCUXl4WFFVRlhMRU5CUVVFN1MwRkRiRWM3VTBGQlRTeEpRVUZKTEZGQlFWRXNTVUZCU1N4eFFrRkJjVUlzU1VGQlNTeFJRVUZSTEVsQlFVa3NjMEpCUVhOQ0xFVkJRVVU3VVVGRGJFWXNXVUZCV1N4SFFVRkhMRkZCUVZFc1EwRkJReXhoUVVGaExFTkJRVU1zYzBOQlFYTkRMRU5CUVVNc1EwRkJReXhYUVVGWExFTkJRVUU3UzBGRE1VWTdVMEZCVFN4SlFVRkpMRkZCUVZFc1NVRkJTU3hwUWtGQmFVSXNSVUZCUlR0UlFVTjRReXhaUVVGWkxFZEJRVWNzVVVGQlVTeERRVUZETEdGQlFXRXNRMEZCUXl3MFFrRkJORUlzUTBGQlF5eERRVUZETEZkQlFWY3NRMEZCUVR0TFFVTm9SanRKUVVORUxFOUJRVThzV1VGQldTeERRVUZCTzBGQlEzSkNMRU5CUVVNN1FVRkZSQ3hOUVVGTkxGRkJRVkVzUjBGQlJ5eE5RVUZOTEVOQlFVTXNVVUZCVVN4RFFVRkRMRkZCUVZFc1EwRkJRVHRCUVVWNlF5eE5RVUZOTEVOQlFVTXNUMEZCVHl4RFFVRkRMRk5CUVZNc1EwRkJReXhYUVVGWExFTkJRVU1zUTBGQlF5eFBRVUZQTEVWQlFVVXNUMEZCVHl4RlFVRkZMRmxCUVZrc1JVRkJSU3hGUVVGRk8wbEJRM1JGTEVsQlFVa3NUMEZCVHl4TFFVRkxMR2xDUVVGcFFpeEZRVUZGTzFGQlEycERMRTFCUVUwc1ZVRkJWU3hIUVVGSExHRkJRV0VzUlVGQlJTeERRVUZCTzFGQlEyeERMRmxCUVZrc1EwRkJReXhWUVVGVkxFTkJRVU1zUTBGQlFUdExRVU42UWp0QlFVTklMRU5CUVVNc1EwRkJReXhEUVVGQkluMD0iXSwic291cmNlUm9vdCI6IiJ9