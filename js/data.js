/* exported data */
/* exported requestAuthorization */
/* exported onPageLoadInitial */
/* global requestAccessToken */
/* exported requestAccessToken */

var data = {
  view: 'prelogin-welcome',
  genre: '',
  workoutMode: '',
  duration: '',
  playlistItems: {},
  playlistTrackIDs: [],
  playlistName: '',
  APIData: {
    catPlaylists: {},
    allSongs: [],
    catPlaylistIDs: [],
    trackIDsMaster: []
  },
  FilteredData: {
    audioFeaturesMasterListFiltered: []
  }
};

var previousDataJSON = localStorage.getItem('data');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data', dataJSON);
});

// SPOTIFY AUTORIZATION CODE //
var redirectUri = 'http://127.0.0.1:5500/index.html';

var clientId = 'eee70f43701b49e893b70270e4e93447';
var clientSecret = '9ffca18e2fa54e4c84bb08141c3b8c5b';

var AUTHORIZE = 'https://accounts.spotify.com/authorize/';
var TOKEN = 'https://accounts.spotify.com/api/token';

function onPageLoadInitial() {
  localStorage.setItem('client_id', clientId);
  localStorage.setItem('client_secret', clientSecret);
}
function onPageLoad() {
  clientId = localStorage.getItem('client_id', clientId);
  clientSecret = localStorage.getItem('client_secret', clientSecret);
  if (window.location.search.length > 0) {
    handleRedirect();
  }
}

function handleRedirect() {
  var code = getCode();
  fetchAccessToken(code);
  window.history.pushState('', '', redirectUri);
}

function fetchAccessToken(code) {
  var body = 'grant_type=authorization_code';
  body += '&code=' + code;
  body += '&redirect_uri=' + encodeURI(redirectUri);
  body += '&client_id=' + clientId;
  body += '&client-secret=' + clientSecret;
  callAuthorizationApi(body);
}

function refreshAccessToken() {
  var refreshToken = localStorage.getItem('refresh_token');
  var body = 'grant_type=refresh_token';
  body += '&refresh_token=' + refreshToken;
  body += '&client_id=' + clientId;
  callAuthorizationApi(body);
}

function callAuthorizationApi(body) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', TOKEN, true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.setRequestHeader('Authorization', 'Basic ' + btoa(clientId + ':' + clientSecret));
  xhr.send(body);
  xhr.onload = handleAuthorizationResponse;
}

function handleAuthorizationResponse() {
  if (this.status === 200) {
    var accessData = JSON.parse(this.responseText);
    if (accessData.access_token !== undefined) {
      var accessToken = accessData.access_token;
      localStorage.setItem('access_token', accessToken);
    }
    if (accessData.refresh_token !== undefined) {
      var refreshToken = accessData.refresh_token;
      localStorage.setItem('refresh_token', refreshToken);
    }
    onPageLoad();
    getUserID();
  } else {
    alert(this.responseText);
  }
}

function getCode() {
  var code = null;
  var queryString = window.location.search;
  if (queryString.length > 0) {
    var urlParams = new URLSearchParams(queryString);
    code = urlParams.get('code');
  }
  return code;
}

function requestAuthorization() {
  localStorage.setItem('client_id', clientId);
  localStorage.setItem('client_secret', clientSecret);

  var url = AUTHORIZE;
  url += '?client_id=' + clientId;
  url += '&response_type=code';
  url += '&redirect_uri=' + encodeURI(redirectUri);
  url += '&show_dialog=true';
  url += '&scope=user-read-private playlist-modify-private playlist-modify-public user-read-email user-library-modify';
  window.location.href = url;
}

var USERID = 'https://api.spotify.com/v1/me';
function getUserID() {
  callApi('GET', USERID, null, handlegetUserIDResponse);
}
function handlegetUserIDResponse() {
  if (this.status === 200) {
    var userID = JSON.parse(this.responseText);
    localStorage.setItem('user_ID', userID.display_name);
    signedInAs();
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {
    alert(this.responseText);
  }
}

function callApi(method, url, body, callback) {
  var accessToken = localStorage.getItem('access_token');
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  xhr.send(body);
  xhr.onload = callback;
}

function signedInAs() {
  var $userDisplayNameSpan = document.querySelector('span.user-display-name');
  var userID = localStorage.getItem('user_ID');
  if ($userDisplayNameSpan !== null) {
    $userDisplayNameSpan.innerHTML = userID;
  }
}
