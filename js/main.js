
/* global refreshAccessToken */
/* exported refreshAccessToken */
/* global data */
/* exported data */
var $pages = document.querySelectorAll('.page');
var $aTags = document.querySelectorAll('a');
var $headers = document.querySelectorAll('.header');

function openWelcomeHeader() {
  for (const header of $headers) {
    if (header.getAttribute('data-view') === 'welcome-header') {
      header.classList.add('active');
      header.classList.remove('hidden');
    } else {
      header.classList.remove('active');
      header.classList.add('hidden');
    }
  }
}

function openSelectionHeader() {
  for (const header of $headers) {
    if (header.getAttribute('data-view') === 'selection-header') {
      header.classList.add('active');
      header.classList.remove('hidden');
    } else {
      header.classList.remove('active');
      header.classList.add('hidden');
    }
  }
}

function openWelcomePreloginPage() {
  data.view = 'welcome-prelogin';
  openWelcomeHeader();

  for (const page of $pages) {
    if (page.getAttribute('data-view') === 'welcome-prelogin') {
      page.classList.remove('hidden');
      page.classList.add('active');
    } else {
      page.classList.add('hidden');
      page.classList.remove('active');
    }
  }
}

function openWelcomePostLoginPage() {
  data.view = 'welcome-postlogin';
  openWelcomeHeader();

  for (const page of $pages) {
    if (page.getAttribute('data-view') === 'welcome-postlogin') {
      page.classList.remove('hidden');
      page.classList.add('active');
    } else {
      page.classList.add('hidden');
      page.classList.remove('active');
    }
  }
}

function openGenrePage() {
  data.view = 'genre';
  openSelectionHeader();

  for (const a of $aTags) {
    a.setAttribute('data-type', 'genre');
  }
  for (const page of $pages) {
    if (page.getAttribute('data-view') === 'genre') {
      page.classList.remove('hidden');
      page.classList.add('active');
    } else {
      page.classList.add('hidden');
      page.classList.remove('active');
    }
  }
}

function openWorkoutPage() {
  data.view = 'workout-mode';
  openSelectionHeader();

  for (const a of $aTags) {
    a.setAttribute('data-type', 'workout-mode');
  }

  for (const page of $pages) {
    if (page.getAttribute('data-view') === 'workout-mode') {
      page.classList.remove('hidden');
      page.classList.add('active');
    } else {
      page.classList.add('hidden');
      page.classList.remove('active');
    }
  }
}

function openDurationPage() {
  data.view = 'duration';
  openSelectionHeader();

  for (const a of $aTags) {
    a.setAttribute('data-type', 'duration');
  }

  for (const page of $pages) {
    if (page.getAttribute('data-view') === 'duration') {
      page.classList.remove('hidden');
      page.classList.add('active');
    } else {
      page.classList.add('hidden');
      page.classList.remove('active');
    }
  }
}

window.addEventListener('DOMContentLoaded', function (event) {
  if (data.view === 'welcome-prelogin' || data.view === 'welcome-postlogin') {
    openWelcomeHeader();
  }
  if (data.view === 'genre' || data.view === 'workout-mode') {
    openSelectionHeader();
  }

  if (data.view === 'welcome-prelogin') {
    openWelcomePreloginPage();
  }

  if (data.view === 'welcome-postlogin') {
    openWelcomePostLoginPage();
  }
  if (data.view === 'genre') {
    openGenrePage();
  }
  if (data.view === 'workout-mode') {
    openWorkoutPage();
  }
  if (data.view === 'duration') {
    openDurationPage();
  }

});

var $body = document.querySelector('body');
const params = new URLSearchParams(window.location.search);
if (params.has('code')) {
  $body.setAttribute('onload', 'onPageLoad()');
  openWelcomePostLoginPage();
}

var $aTagPinkText = document.querySelector('a.pink-text');
$aTagPinkText.addEventListener('click', function (event) {
  openWelcomePreloginPage();
});

var $startOverButton = document.querySelector('.start-over');
var $selected = document.querySelector('.selected');
$startOverButton.addEventListener('click', function (event) {
  $selected = document.querySelector('.selected');
  goodToProceed = false;
  canSelect = true;
  openWelcomePostLoginPage();
  if ($selected !== null) {
    $selected.classList.remove('selected');
  }
  clearAllData();
});

var $signInButton = document.querySelector('.signin');
var $createPlaylistButton = document.querySelector('.createPlaylist');

$signInButton.addEventListener('mouseover', whiteLogoHover);
$signInButton.addEventListener('mouseout', blackSpotifyLogo);
$createPlaylistButton.addEventListener('mouseover', whiteLogoHover);
$createPlaylistButton.addEventListener('mouseout', blackSpotifyLogo);

$createPlaylistButton.addEventListener('click', function (event) {
  openGenrePage();
});

function whiteLogoHover(event) {
  var logoImg = $signInButton.querySelector('.img-logo');
  if (logoImg !== null) {
    logoImg.setAttribute('src', 'images/Spotify-Logo-White.png');
  }

  var headphoneImg = $createPlaylistButton.querySelector('.headphone-img');
  if (headphoneImg !== null) {
    headphoneImg.setAttribute('src', 'images/Headphones-icon-white.png');
  }
}
function blackSpotifyLogo(event) {
  var logoImg = $signInButton.querySelector('.img-logo');
  if (logoImg !== null) {
    logoImg.setAttribute('src', 'images/Spotify-Logo-Black.png');
  }

  var headphoneImg = $createPlaylistButton.querySelector('.headphone-img');
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

var minSongLength = 1.0;
var maxSongLength = 3.6;
minSongLength = minSongLength * 60000;
maxSongLength = maxSongLength * 60000;

var audioFeaturesMasterList = [];
var $aTagCheckmark = document.querySelector('.checkmark-a');
if ($aTagCheckmark) {
  $aTagCheckmark.addEventListener('click', function (event) {
    event.preventDefault();
    if (goodToProceed === false) {
      window.alert('Must select at least one');
    } else if ((goodToProceed === true) && ($aTagCheckmark.getAttribute('data-type') === 'genre')) {
      data.APIData = {
        catPlaylists: {},
        allSongs: [],
        catPlaylistIDs: [],
        trackIDsMaster: []
      };
      getCategoryPlaylists();
      if ($aTagCheckmark.getAttribute('data-view') === 'genre') {
        $aTagCheckmark.setAttribute('data-type', 'workout-mode');
      }

    } else if ((goodToProceed === true) && ($aTagCheckmark.getAttribute('data-type') === 'workout-mode')) {
      var audioFeaturesMasterListFiltered = [];
      audioFeaturesMasterListFiltered = data.APIData.audioFeaturesMasterList;
      data.FilteredData.audioFeaturesMasterListFiltered = [];
      for (var i = 0; i < audioFeaturesMasterListFiltered.length; i++) {
        if (audioFeaturesMasterListFiltered[i] !== null) {
          if (audioFeaturesMasterListFiltered[i].duration_ms < maxSongLength && audioFeaturesMasterListFiltered[i].duration_ms > minSongLength && audioFeaturesMasterListFiltered[i].duration_ms !== null) {
            data.FilteredData.audioFeaturesMasterListFiltered.push(audioFeaturesMasterListFiltered[i]);
          }
        }
      }

      data.FilteredData.audioFeaturesMasterListFiltered.sort((a, b) => (a.tempo - b.tempo));
      var highestTempoIndex = (data.FilteredData.audioFeaturesMasterListFiltered.length - 1);
      var highestTempo = data.FilteredData.audioFeaturesMasterListFiltered[highestTempoIndex].tempo;
      for (var j = 0; j < data.FilteredData.audioFeaturesMasterListFiltered.length; j++) {
        var normalizedTempo = data.FilteredData.audioFeaturesMasterListFiltered[j].tempo / highestTempo;
        data.FilteredData.audioFeaturesMasterListFiltered[j].normalizedTempo = normalizedTempo;
        var ntempo = data.FilteredData.audioFeaturesMasterListFiltered[j].normalizedTempo;
        var energy = data.FilteredData.audioFeaturesMasterListFiltered[j].energy;
        var danceability = data.FilteredData.audioFeaturesMasterListFiltered[j].danceability;
        data.FilteredData.audioFeaturesMasterListFiltered[j].customValue = (ntempo * 3) + (energy * 5) + (danceability * 2);
      }
      data.FilteredData.audioFeaturesMasterListFiltered.sort((a, b) => (a.customValue - b.customValue));

    }
  });
}

var $selectionContainers = document.querySelectorAll('.selection-container');
var $selectButtons = document.querySelectorAll('button.select-button');
var goodToProceed = false;
var canSelect = true;

for (var $selectionContainer of $selectionContainers) {
  $selectionContainer.addEventListener('click', toggleSelectItem);
}

function toggleSelectItem(event) {
  for (var $selectButton of $selectButtons) {
    if ((event.target === $selectButton) && (canSelect === true) && (!$selectButton.classList.contains('selected'))) {
      if (event.target.getAttribute('data-type') === 'genre') {
        var genre = $selectButton.getAttribute('data-value');
        data.genre = genre;
      }
      if (event.target.getAttribute('data-type') === 'workout-mode') {
        var workoutMode = $selectButton.getAttribute('data-value');
        data.workoutMode = workoutMode;
      }
      $selectButton.classList.add('selected');
      canSelect = false;
    } else if ((event.target === $selectButton) && ($selectButton.classList.contains('selected'))) {
      $selectButton.style.backgroundColor = '';
      $selectButton.classList.remove('selected');
      canSelect = true;
      if (event.target.getAttribute('data-type') === 'genre') {
        data.genre = '';
      }
      if (event.target.getAttribute('data-type') === 'workout-mode') {
        data.workoutMode = '';
      }
    }
    if ($selectButton !== event.target && $selectButton.classList.contains('selected')) {
      $selectButton.style.backgroundColor = '';
      if (event.target.getAttribute('data-type') === 'genre') {
        data.genre = '';
      }
      if (event.target.getAttribute('data-type') === 'workout-mode') {
        data.workoutMode = '';
      }
      $selectButton.classList.remove('selected');
      canSelect = true;
    }

    if ((canSelect === false) && ($selectButton.classList.contains('selected'))) {
      goodToProceed = true;
    } else if ((canSelect === true) && (!$selectButton.classList.contains('selected'))) {
      goodToProceed = false;
    }
  }
}
var $backArrow = document.querySelector('.backArrow');
$backArrow.addEventListener('click', function (event) {
  $selected = document.querySelector('.selected');
  $selected.classList.remove('selected');

  if ($backArrow.getAttribute('data-type') === 'genre') {
    openWelcomePostLoginPage();
    data.genre = '';
  }
  if ($backArrow.getAttribute('data-type') === 'workout-mode') {
    data.view = 'genre';
    openGenrePage();
    data.genre = '';
    data.workoutMode = '';
    data.APIData = {
      catPlaylists: {},
      allSongs: [],
      catPlaylistIDs: [],
      trackIDsMaster: []
    };
    data.FilteredData.audioFeaturesMasterListFiltered = [];
    $selected = document.querySelector('.selected');
    if ($selected !== null) {
      $selected.classList.remove('selected');
    }
    canSelect = true;
    goodToProceed = false;
  }
});

// SPOTIFY API REQUESTS //
var CATPLAYLISTS;
var category;

function getCategoryPlaylists() {
  category = data.genre;
  CATPLAYLISTS = 'https://api.spotify.com/v1/browse/categories/' + category + '/playlists';
  callApi('GET', CATPLAYLISTS, null, handleCatPlaylistResponse);
}

function handleCatPlaylistResponse() {
  if (this.status === 200) {
    data.APIData.catPlaylists = JSON.parse(this.responseText);
    createPlaylistIDs(data.APIData.catPlaylists);
    getPlaylistItems();
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {

    alert(this.responseText);
  }
}

var catPlaylistIDs = [];
function createPlaylistIDs(playlists) {
  catPlaylistIDs = [];
  if (playlists.playlists !== null) {
    for (var i = 0; i < playlists.playlists.items.length; i++) {
      catPlaylistIDs.push(playlists.playlists.items[i].id);
      data.APIData.catPlaylistIDs = catPlaylistIDs;
    }
  }
}

var PLAYLISTITEMS = '';

var trackIDsURLString = '';
function getPlaylistItems() {
  allSongs = [];
  tempList = [];
  trackIDsMaster = [];
  playlistCounter = 0;
  trackAudioFeaturesCounter = 0;
  audioFeaturesMasterList = [];
  for (var i = 0; i < catPlaylistIDs.length; i++) {
    var playlistID = catPlaylistIDs[i];
    PLAYLISTITEMS = 'https://api.spotify.com/v1/playlists/' + playlistID + '/tracks';
    callApi('GET', PLAYLISTITEMS, null, handlePlaylistItemsResponse);
  }
  data.APIData.allSongs = allSongs;
}

function handlePlaylistItemsResponse() {
  if (this.status === 200) {
    data.playlistItems = JSON.parse(this.responseText);
    createTrackIDs(data.playlistItems.items);
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {
    alert(this.responseText);
  }
}
var allSongs = [];
var tempList = [];
var trackIDsMaster = [];
var playlistCounter = 0;
var trackAudioFeaturesCounter = 0;
function createTrackIDs(tracks) {
  trackFeatureList = [];
  for (var i = 0; i < tracks.length; i++) {
    if (tracks[i].track !== null) {
      if (!allSongs.includes(tracks[i].track.id)) { allSongs.push(tracks[i].track.id); }
      data.APIData.allSongs = allSongs;
    }
  }
  playlistCounter++;
  if (playlistCounter === catPlaylistIDs.length) {
    data.APIData.trackIDsMaster = create100TrackIDList(data.APIData.allSongs);
    for (var j = 0; j < data.APIData.trackIDsMaster.length; j++) {
      trackIDsURLString = '';
      createTrackIDsURLString(data.APIData.trackIDsMaster[j]);
      getTrackAudioFeatures(data.APIData.trackIDsURLString);
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
  data.APIData.trackIDsMaster = trackIDsMaster;
  return data.APIData.trackIDsMaster;
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
    trackAudioFeaturesCounter++;
    trackFeatures = JSON.parse(this.responseText);
    trackFeatureList.push(trackFeatures);
    data.APIData.trackFeatures = trackFeatureList;
    if (trackAudioFeaturesCounter === data.APIData.trackIDsMaster.length) {
      for (var k = 0; k < data.APIData.trackFeatures.length; k++) {
        for (var l = 0; l < data.APIData.trackFeatures[k].audio_features.length; l++) {
          audioFeaturesMasterList.push(data.APIData.trackFeatures[k].audio_features[l]);
        }
      }
      data.APIData.audioFeaturesMasterList = audioFeaturesMasterList;
      openWorkoutPage();
    }
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {
    alert(this.responseText);
  }
}

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

function clearAllData() {
  data.genre = '';
  data.workoutMode = '';
  data.duration = '';
  data.playlistTracks = [];
  data.playlistName = '';
  data.APIData = {
    catPlaylists: {},
    allSongs: [],
    catPlaylistIDs: [],
    trackIDsMaster: []
  };
  data.FilteredData.audioFeaturesMasterListFiltered = [];
  data.playlistItems = {};
}
