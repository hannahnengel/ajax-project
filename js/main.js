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
  APIData: {
    catPlaylists: {},
    allSongs: [],
    catPlaylistIDs: [],
    trackIDsMaster: []
  }
};

var $aTagCheckmark = document.querySelector('.checkmark-a');
$aTagCheckmark.addEventListener('click', function (event) {
  event.preventDefault();
  if (goodToProceed === false) {
    window.alert('Must select at least one');
  } else {
    getCategoryPlaylists();
    data.genre = objectOfValues.genre;
    data.workoutMode = objectOfValues.workoutMode;
    data.duration = objectOfValues.duration;
    data.APIData.trackIDsMaster = create100TrackIDList(data.APIData.allSongs);
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
  callApi('GET', CATPLAYLISTS, null, handleCatPlaylistResponse);
}

function handleCatPlaylistResponse() {
  if (this.status === 200) {
    objectOfValues.APIData.catPlaylists = JSON.parse(this.responseText);
    data.APIData.catPlaylists = objectOfValues.APIData.catPlaylists;
    catPlaylists = objectOfValues.APIData.catPlaylists;
    createPlaylistIDs(catPlaylists);
    getPlaylistItems();
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {

    alert(this.responseText);
  }
}

var catPlaylistIDs = [];
function createPlaylistIDs(playlists) {
  if (playlists.playlists !== null) {
    for (var i = 0; i < playlists.playlists.items.length; i++) {
      catPlaylistIDs.push(playlists.playlists.items[i].id);
      objectOfValues.APIData.catPlaylistIDs = catPlaylistIDs;
      data.APIData.catPlaylistIDs = objectOfValues.APIData.catPlaylistIDs;
    }
  }
}

var PLAYLISTITEMS = '';
var playlistItems;
var audioFeaturesMasterList = [];
function getPlaylistItems() {
  for (var i = 0; i < catPlaylistIDs.length; i++) {
    var playlistID = catPlaylistIDs[i];
    PLAYLISTITEMS = 'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks';
    callApi('GET', PLAYLISTITEMS, null, handlePlaylistItemsResponse);
  }
  objectOfValues.APIData.allSongs = allSongs;
  data.APIData.allSongs = objectOfValues.APIData.allSongs;

  for (var j = 0; j < data.APIData.trackIDsMaster.length; j++) {
    createTrackIDsURLString(data.APIData.trackIDsMaster[j]);
    getTrackAudioFeatures(data.APIData.trackIDsURLString);
    trackIDsURLString = '';
    data.APIData.trackIDsURLString = trackIDsURLString;
  }
  for (var k = 0; k < data.APIData.trackFeatures.length; k++) {
    for (var l = 0; l < data.APIData.trackFeatures[k].audio_features.length; l++) {
      audioFeaturesMasterList.push(data.APIData.trackFeatures[k].audio_features[l]);
    }
  }
  data.APIData.audioFeaturesMasterList = audioFeaturesMasterList;
}

function handlePlaylistItemsResponse() {
  if (this.status === 200) {
    playlistItems = objectOfValues.playlistItems = JSON.parse(this.responseText);
    createTrackIDs(playlistItems.items);
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {
    alert(this.responseText);
  }
}
var allSongs = [];
var tempList = [];
var trackIDsMaster = [];
function createTrackIDs(tracks) {
  if (tracks.tracks !== null) {
    for (var i = 0; i < tracks.length; i++) {
      if (!allSongs.includes(tracks[i].track.id)) { allSongs.push(tracks[i].track.id); }
      objectOfValues.APIData.allSongs = allSongs;
    }
  }
}
function create100TrackIDList(trackIDs) {
  for (var j = 0; j < trackIDs.length; j++) {
    if ((j % 100 !== 0) && (j !== 0)) {
      tempList.push(trackIDs[j]);
    } else {
      if (j !== 0) { trackIDsMaster.push(tempList); }
      tempList = [];
      tempList.push(trackIDs[j]);
    }
  }
  if (tempList.length > 0) {
    trackIDsMaster.push(tempList);
  }
  objectOfValues.APIData.trackIDsMaster = trackIDsMaster;
  return objectOfValues.APIData.trackIDsMaster;

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

var TRACKAUDIOFEATURES = '';
function getTrackAudioFeatures(trackIDsURLString) {
  TRACKAUDIOFEATURES = 'https://api.spotify.com/v1/audio-features?ids=' + trackIDsURLString;
  callApi('GET', TRACKAUDIOFEATURES, null, handleTrackAudioFeatures);
}

var trackFeatures;
var trackFeatureList = [];
function handleTrackAudioFeatures() {
  if (this.status === 200) {
    trackFeatures = JSON.parse(this.responseText);
    trackFeatureList.push(trackFeatures);
    data.APIData.trackFeatures = trackFeatureList;
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {
    alert(this.responseText);
  }
}

var trackIDsURLString = '';
function createTrackIDsURLString(trackIDsMaster) {
  for (var i = 0; i < trackIDsMaster.length; i++) {
    if (i !== (trackIDsMaster.length - 1)) {
      trackIDsURLString += trackIDsMaster[i] + '%2C';
    } else {
      trackIDsURLString += trackIDsMaster[i];
    }
  }
  data.APIData.trackIDsURLString = trackIDsURLString;
}
