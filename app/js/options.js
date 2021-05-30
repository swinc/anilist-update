import { showLoginStatus } from './lib/show-login-status.js';
import { loginToAnilist } from './lib/login-to-anilist.js';
import { queryAnilist } from './lib/query-anilist.js';
/* globals chrome */
/*
 * Set up page depending on status
 */
showLoginStatus(); // whether access token is set
/*
 * All click functionality (buttons and links)
 */
// === login button ===
document.querySelector('#anilist-login-button').onclick = loginToAnilist;
// === logout link ===
document.querySelector('#logout-link').onclick = function (element) {
    chrome.storage.sync.set({ accessToken: null }, function (result) {
        showLoginStatus();
    });
};
// === test login button ===
const testLoginButton = document.querySelector('#anilist-test-button');
testLoginButton.onclick = function (element) {
    testLoginButton.innerHTML = 'Testing...';
    chrome.storage.sync.get('accessToken', function (result) {
        var query = `
    mutation ($language: UserTitleLanguage) {
        UpdateUser (titleLanguage: $language) {
          name
        }
    }
    `;
        var variables = {
            language: 'ENGLISH'
        };
        queryAnilist(query, variables, result.accessToken)
            .then(function (result) {
            document.querySelector('#test-connection-result').innerHTML =
                '<p>Connection success!<br><code>' + JSON.stringify(result) + '</code></p>';
        })
            .catch(function (err) {
            document.querySelector('#test-connection-result').innerHTML =
                '<p>Error!<br><code>' + JSON.stringify(err) + '</code></p>';
        })
            .finally(function () {
            testLoginButton.innerHTML = 'Test Connection';
        });
    });
};
// === test unauth'd API button ===
document.querySelector('#unauth-media-submit').onclick = function (element) {
    element.preventDefault();
    document.querySelector('#unauth-media-submit').value = 'Pulling...';
    var mediaID = document.querySelector('#unauth-media-id').value ||
        document.querySelector('#unauth-media-id').placeholder;
    var query = `
  query ($id: Int) { # Define which variables will be used in the query (id)
    Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
      id
      title {
        romaji
        english
        native
      }
    }
  }
  `;
    var variables = {
        id: mediaID
    };
    queryAnilist(query, variables, null)
        .then(function (result) {
        document.querySelector('#unauth-media-result').innerHTML =
            '<p>Media pulled!<br><code>' + JSON.stringify(result) + '</code></p>';
    })
        .catch(function (err) {
        document.querySelector('#unauth-media-result').innerHTML =
            '<p>Error!<br><code>' + JSON.stringify(err) + '</code></p>';
    })
        .finally(function () {
        document.querySelector('#unauth-media-submit').value = 'Pull Media';
    });
};
// === test auth'd API button ===
document.querySelector('#auth-media-submit').onclick = function (element) {
    element.preventDefault();
    document.querySelector('#auth-media-submit').value = 'Saving...';
    var mediaID = document.querySelector('#auth-media-id').value ||
        document.querySelector('#auth-media-id').placeholder;
    chrome.storage.sync.get('accessToken', function (result) {
        var query = `
    mutation ($mediaId: Int, $status: MediaListStatus) {
        SaveMediaListEntry (mediaId: $mediaId, status: $status) {
            id
            status
        }
    }
    `;
        var variables = {
            mediaId: mediaID,
            status: 'CURRENT'
        };
        queryAnilist(query, variables, result.accessToken)
            .then(function (result) {
            document.querySelector('#auth-media-result').innerHTML =
                '<p>Media saved!<br><code>' + JSON.stringify(result) + '</code></p>';
        })
            .catch(function (err) {
            document.querySelector('#auth-media-result').innerHTML =
                '<p>Error!<br><code>' + JSON.stringify(err) + '</code></p>';
        })
            .finally(function () {
            document.querySelector('#auth-media-submit').value = 'Save Media to Profile';
        });
    });
};
