/* globals chrome */
export function renderAccountUI(userData) {
    if (userData && userData.accessToken) {
        showConnectedAccount(userData.userName);
    }
    else {
        showDisconnectedAccount();
    }
}
export function showConnectedAccount(userName) {
    document.querySelector('span.username').innerHTML = userName;
    document.querySelector('#account-connected').classList.remove('hidden');
    document.querySelector('#account-not-connected').classList.add('hidden');
}
export function showDisconnectedAccount() {
    document.querySelector('#account-not-connected').classList.remove('hidden');
    document.querySelector('#account-connected').classList.add('hidden');
}
export function showContentNotDetected() {
    document.querySelector('#content-not-detected').classList.remove('hidden');
    document.querySelector('#content-detected').classList.add('hidden');
    document.querySelector('#content-ui-block').classList.add('hidden');
}
export function showContentDetected(title, episode) {
    document.querySelector('span#title').innerHTML = title;
    // document.querySelector('div#content-ui--title').innerHTML = title
    document.querySelector('#content-not-detected').classList.add('hidden');
    document.querySelector('#content-detected').classList.remove('hidden');
    document.querySelector('#content-ui-block').classList.remove('hidden');
}
export function showNoContentDetected() {
    document.querySelector('#content-not-detected').classList.remove('hidden');
    document.querySelector('#content-detected').classList.add('hidden');
}
export function showMediaTitle(mediaTitle) {
    document.querySelector('#title-link').innerHTML = mediaTitle;
}
export function showMediaEpisodes(mediaEpisodes) {
    document.querySelector('#total-episodes').innerHTML = mediaEpisodes;
}
export function showMediaCoverImage(coverImageUrl) {
    document.querySelector('img#content-ui--image').src = coverImageUrl;
}
export function showUserProgress(episodeNumber) {
    document.querySelector('#episode-progress').value = episodeNumber;
}
export function showUserScore(userScore) {
    document.querySelector('#score').value = userScore;
}
export function updateTitleLink(id) {
    document.querySelector('#title-link').href = "https://anilist.co/anime/" + id;
    document.querySelector('#content-ui--title').setAttribute('data-MediaId', id);
}
export function prepopSearchBox(searchString) {
    document.querySelector('#search-box').value = searchString;
}
//# sourceMappingURL=popup-ui.js.map