/* exported requestAuthorization */
/* global refreshAccessToken */
/* exported refreshAccessToken */
/* global data */
/* exported data */

var $buttonsWhite = document.querySelectorAll('.button-white');
for (var $buttonWhite of $buttonsWhite) {
  $buttonWhite.addEventListener('mouseover', whiteLogoHover);
  $buttonWhite.addEventListener('mouseout', blackSpotifyLogo);
}

function whiteLogoHover(event) {
  var logoImg = $buttonWhite.querySelector('.img-logo');
  if (logoImg !== null) {
    logoImg.setAttribute('src', 'images/Spotify-Logo-White.png');
  }

  var headphoneImg = $buttonWhite.querySelector('.headphone-img');
  if (headphoneImg !== null) {
    headphoneImg.setAttribute('src', 'images/Headphones-icon-white.png');
  }
}
function blackSpotifyLogo(event) {
  var logoImg = $buttonWhite.querySelector('.img-logo');
  if (logoImg !== null) {
    logoImg.setAttribute('src', 'images/Spotify-Logo-Black.png');
  }

  var headphoneImg = $buttonWhite.querySelector('.headphone-img');
  if (headphoneImg !== null) {
    headphoneImg.setAttribute('src', 'images/Headphones-icon-black.png');
  }
}

function signedInAs() {
  var $userDisplayNameSpan = document.querySelector('span.user-display-name');
  if ($userDisplayNameSpan !== null) {
    $userDisplayNameSpan.innerHTML = localStorage.getItem('user_ID');
  }
}
signedInAs();

var objectOfValues = {
  genre: '',
  workoutMode: '',
  duration: '',
  playlistTracks: [],
  playlistName: '',
  catPlaylists: {}
};

var $aTagCheckmark = document.querySelector('.checkmark-a');
$aTagCheckmark.addEventListener('click', function (event) {
  event.preventDefault();
  data.genre = objectOfValues.genre;
  data.workoutMode = objectOfValues.workoutMode;
  data.duration = objectOfValues.duration;
  data.catPlaylists = objectOfValues.catPlaylists;

  if (goodToProceed === false) {
    window.alert('Must select at least one');
  } else {
    getCategoryPlaylists();
  }

});

var $selectionContainer = document.querySelector('.selection-container');
var $selectButtons = document.querySelectorAll('button.select-button');
var goodToProceed;

$selectionContainer.addEventListener('click', toggleSelectItem);
function toggleSelectItem(event) {
  var canSelect = true;
  for (var $selectButton of $selectButtons) {
    if ((event.target === $selectButton) && (canSelect === true) && ($selectButton.style.backgroundColor !== 'rgba(248, 84, 231, 0.47)')) {
      $selectButton.style.backgroundColor = 'rgba(248, 84, 231, 0.47)';
      var genre = $selectButton.getAttribute('data-value');
      objectOfValues.genre = genre;
      $selectButton.classList.add('selected');
      canSelect = false;
    } else if ((event.target === $selectButton) && ($selectButton.style.backgroundColor === 'rgba(248, 84, 231, 0.47)')) {
      $selectButton.style.backgroundColor = '';
      objectOfValues.genre = '';
      $selectButton.classList.remove('selected');
      canSelect = true;
    }
    if ($selectButton !== event.target && $selectButton.style.backgroundColor === 'rgba(248, 84, 231, 0.47)') {
      $selectButton.style.backgroundColor = '';
      data.genre = '';
      $selectButton.classList.remove('selected');
      canSelect = true;
    }

    if ((canSelect === false) && ($selectButton.style.backgroundColor === 'rgba(248, 84, 231, 0.47)')) {
      goodToProceed = true;
    } else if ((canSelect === true) && ($selectButton.style.backgroundColor !== 'rgba(248, 84, 231, 0.47)')) {
      goodToProceed = false;
    }
  }
}

// SPOTIFY API REQUESTS //
var CATPLAYLISTS;
var category;
var catPlaylists;

function getCategoryPlaylists() {
  category = objectOfValues.genre;
  CATPLAYLISTS = 'https://api.spotify.com/v1/browse/categories/' + category + '/playlists';
  // getPlaylistItems();
  callApi('GET', CATPLAYLISTS, null, handleCatPlaylistResponse);
}

function handleCatPlaylistResponse() {
  if (this.status === 200) {
    catPlaylists = objectOfValues.catPlaylists = JSON.parse(this.responseText);
    createPlaylistIDs(catPlaylists);
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {

    alert(this.responseText);
  }
}

var catPlaylistIDs = [];
function createPlaylistIDs(playlists) {
  for (var i = 0; i < playlists.playlists.items.length; i++) {
    catPlaylistIDs.push(playlists.playlists.items[i].id);
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
