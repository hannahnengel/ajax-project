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
  openFooter();

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
  canSelect = true;
  goodToProceed = false;
  data.view = 'genre';
  openSelectionHeader();
  hideFooter();

  for (const a of $aTags) {
    a.setAttribute('data-type', 'genre');
    a.classList.remove('hidden');
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
  canSelect = true;
  goodToProceed = false;
  data.view = 'workout-mode';
  openSelectionHeader();
  hideFooter();

  for (const a of $aTags) {
    a.setAttribute('data-type', 'workout-mode');
    a.classList.remove('hidden');
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
  canSelect = true;
  goodToProceed = false;
  data.view = 'duration';
  openSelectionHeader();
  hideFooter();

  for (const a of $aTags) {
    a.setAttribute('data-type', 'duration');
    a.classList.remove('hidden');
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

function openMixItPage() {
  canSelect = false;
  goodToProceed = true;
  data.view = 'mixit';
  openSelectionHeader();
  hideFooter();

  for (const a of $aTags) {
    a.setAttribute('data-type', 'mixit');
    if (a.classList.contains('checkmark-a')) {
      a.classList.add('class', 'hidden');
    }
  }

  for (const page of $pages) {
    if (page.getAttribute('data-view') === 'mixit') {
      page.classList.remove('hidden');
      page.classList.add('active');
    } else {
      page.classList.add('hidden');
      page.classList.remove('active');
    }
  }
  populateSongList();
}

function openUploadPage() {
  data.view = 'upload';
  openSelectionHeader();

  for (const a of $aTags) {
    a.setAttribute('data-type', 'upload');
    if (a.classList.contains('checkmark-a')) {
      a.classList.add('class', 'hidden');
    }
  }

  for (const page of $pages) {
    if (page.getAttribute('data-view') === 'upload') {
      page.classList.remove('hidden');
      page.classList.add('active');
    } else {
      page.classList.add('hidden');
      page.classList.remove('active');
    }
  }
}

function openSuccessPage() {
  data.view = 'success';
  openSelectionHeader();
  hideModal();
  openFooter();
  for (const a of $aTags) {
    a.setAttribute('data-type', 'success');
    if (!a.classList.contains('pink-text')) {
      a.classList.add('class', 'hidden');
    }
  }

  for (const page of $pages) {
    if (page.getAttribute('data-view') === 'success') {
      page.classList.remove('hidden');
      page.classList.add('active');
    } else {
      page.classList.add('hidden');
      page.classList.remove('active');
    }
  }
}

function openFooter() {
  var $footer = document.querySelector('.footer');
  var $startOverButtonDiv = document.querySelector('.div-start-over');
  $footer.classList.remove('hidden');
  $startOverButtonDiv.classList.add('hidden');
}

function hideFooter() {
  var $footer = document.querySelector('.footer');
  var $startOverButtonDiv = document.querySelector('.div-start-over');
  $footer.classList.add('hidden');
  $startOverButtonDiv.classList.remove('hidden');
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

  if (data.view === 'mixit') {
    openMixItPage();
  }

  if (data.view === 'upload') {
    openUploadPage();
  }

  if (data.view === 'success') {
    openSuccessPage();
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
  openWelcomePostLoginPage();
  if ($selected !== null) {
    $selected.classList.remove('selected');
  }
  clearAllData();
  clearDOMSongList();
});

var $createPlaylistButton = document.querySelector('.createPlaylist');
var $createPlaylistButton2 = document.querySelector('.createPlaylist2');
$createPlaylistButton2.addEventListener('click', openUploadPage);
$createPlaylistButton.addEventListener('click', openGenrePage);

var $spotifyButton = document.querySelector('.spotify-button');
var $cancelButton = document.querySelector('.form-button-pink');
$spotifyButton.addEventListener('click', openModal);
$cancelButton.addEventListener('click', hideModal);

var $whiteButtons = document.querySelectorAll('.button-white');
for (const button of $whiteButtons) {
  button.addEventListener('mouseover', whiteLogoHover);
  button.addEventListener('mouseout', blackLogoHover);
}

var $createAnother = document.querySelector('.create-another-playlist-button');
$createAnother.addEventListener('click', function (event) {
  clearAllData();
  openWelcomePostLoginPage();
});

var $playlistNameForm = document.querySelector('.playlistNameForm');
$playlistNameForm.addEventListener('submit', function (event) {
  event.preventDefault();
  var playlistName = $playlistNameForm.elements.playlistName.value;
  data.playlistName = playlistName;
  createPlaylist();

});

function whiteLogoHover(event) {
  if (event.target.tagName === 'IMG') {
    if (event.target.classList.contains('img-logo')) {
      event.target.setAttribute('src', 'images/Spotify-Logo-White.png');
    } else if (event.target.classList.contains('headphone-img')) {
      event.target.setAttribute('src', 'images/Headphones-icon-white.png');
    }
  } else if (event.target.tagName === 'BUTTON') {
    var $img = event.target.querySelector('img');
    if ($img.classList.contains('img-logo')) {
      $img.setAttribute('src', 'images/Spotify-Logo-White.png');
    } else if ($img.classList.contains('headphone-img')) {
      $img.setAttribute('src', 'images/Headphones-icon-white.png');
    }
  }
}

function blackLogoHover(event) {
  if (event.target.tagName === 'IMG') {
    if (event.target.classList.contains('img-logo')) {
      event.target.setAttribute('src', 'images/Spotify-Logo-Black.png');
    }
    if (event.target.classList.contains('headphone-img')) {
      event.target.setAttribute('src', 'images/Headphones-icon-black.png');
    }
  } else if (event.target.tagName === 'BUTTON') {
    var $img = event.target.querySelector('img');
    if ($img.classList.contains('img-logo')) {
      $img.setAttribute('src', 'images/Spotify-Logo-Black.png');
    }
    if ($img.classList.contains('headphone-img')) {
      $img.setAttribute('src', 'images/Headphones-icon-black.png');
    }
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

      openDurationPage();
    } else if ((goodToProceed === true) && ($aTagCheckmark.getAttribute('data-type') === 'duration')) {
      createPlayListIDList(data.FilteredData.audioFeaturesMasterListFiltered, data.workoutMode, data.duration);
    }
  });
}

function createPlayListIDList(trackList, workoutMode, duration) {

  var durationString = duration.slice(0, 2);
  duration = parseInt(durationString) * 60000;

  var sectionBuffer;
  if (durationString === '15') {
    sectionBuffer = 1;
  } else if (durationString === '30') {
    sectionBuffer = 2;
  } else if (durationString === '45') {
    sectionBuffer = 3;
  } else if (durationString === '60') {
    sectionBuffer = 4;
  } else if (durationString === '90') {
    sectionBuffer = 6;
  }
  var numSections = Math.ceil(duration / maxSongLength) + sectionBuffer;
  var randomIndex;

  var potentialPlaylistTracks;
  var allPotentialPlaylists;
  var thirdLength;
  var numSongs;
  var length;
  var songsPerSection;
  var tempList;
  var choppedTracks;

  if (workoutMode === 'ramp-up' || workoutMode === 'ramp-up-n-down') {
    songsPerSection = Math.floor(trackList.length / numSections);

    tempList = [];
    choppedTracks = [];
    for (var i = 0; i < trackList.length; i++) {
      tempList.push(trackList[i]);
      if ((i + 1) % songsPerSection === 0) {
        choppedTracks.push(tempList);
        tempList = [];
      }
    }

    allPotentialPlaylists = [];
    for (var l = 0; l < 100; l++) {
      potentialPlaylistTracks = [];
      for (var j = 0; j < choppedTracks.length; j++) {
        length = choppedTracks[j].length;
        randomIndex = Math.floor(Math.random() * length);
        potentialPlaylistTracks.push(choppedTracks[j][randomIndex]);
      }

      allPotentialPlaylists.push(createPotentialPlaylistObject(potentialPlaylistTracks, duration));
    }
  }

  if (workoutMode === 'hardcore') {
    thirdLength = Math.floor(trackList.length / 3);
    var topThirdList = [];
    for (var o = trackList.length - thirdLength; o < trackList.length; o++) {
      topThirdList.push(trackList[o]);
    }
    numSongs = numSections;

    allPotentialPlaylists = [];
    for (var p = 0; p < 100; p++) {
      var topThirdListShuffled = shuffle(topThirdList);
      potentialPlaylistTracks = topThirdListShuffled.slice(0, numSongs);

      allPotentialPlaylists.push(createPotentialPlaylistObject(potentialPlaylistTracks, duration));
    }

  }

  if (workoutMode === 'chill') {
    thirdLength = Math.floor(trackList.length / 3);
    var bottomThirdList = [];
    for (var t = 0; t < thirdLength; t++) {
      bottomThirdList.push(trackList[t]);
    }
    numSongs = numSections;

    allPotentialPlaylists = [];
    for (var r = 0; r < 100; r++) {
      var bottomThirdListShuffled = shuffle(bottomThirdList);
      potentialPlaylistTracks = bottomThirdListShuffled.slice(0, numSongs);

      allPotentialPlaylists.push(createPotentialPlaylistObject(potentialPlaylistTracks, duration));
    }

  }

  allPotentialPlaylists.sort((a, b) => (a.deviation - b.deviation));
  var chosenPlaylistInfo = allPotentialPlaylists[0].tracks;
  var chosenPlaylistIDs = [];

  for (var n = 0; n < chosenPlaylistInfo.length; n++) {
    chosenPlaylistIDs.push(chosenPlaylistInfo[n].id);
  }

  if (workoutMode === 'ramp-up-n-down') {
    var list1 = [];
    var list2 = [];
    for (var u = 0; u < chosenPlaylistIDs.length; u++) {
      if (u % 2 === 0) {
        list1.push(chosenPlaylistIDs[u]);
      } else {
        list2.push(chosenPlaylistIDs[u]);
      }
    }
    list2.reverse();
    chosenPlaylistIDs = list1.concat(list2);
  }

  data.playlistTrackIDs = chosenPlaylistIDs;
  createFinalTrackIDsURLString(data.playlistTrackIDs);
  getTracks(data.finalTrackIDsURLString);
}

function shuffle(array) {
  let currentIndex = array.length; let randomIndex;
  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function createPotentialPlaylistObject(potentialPlaylistTracks, duration) {
  var potentialPlaylistTotalDuration = 0;
  for (var i = 0; i < potentialPlaylistTracks.length; i++) {
    potentialPlaylistTotalDuration += potentialPlaylistTracks[i].duration_ms;
  }
  var playlistDurationDeviation = Math.abs(potentialPlaylistTotalDuration - duration);
  var potentialPlaylistObject = {
    tracks: potentialPlaylistTracks,
    totalDuration: potentialPlaylistTotalDuration / 60000,
    deviation: playlistDurationDeviation / 60000
  };
  return potentialPlaylistObject;
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
      if (event.target.getAttribute('data-type') === 'duration') {
        var duration = $selectButton.getAttribute('data-value');
        data.duration = duration;
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
      if (event.target.getAttribute('data-type') === 'duration') {
        data.duration = '';
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
      if (event.target.getAttribute('data-type') === 'duration') {
        data.duration = '';
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
  if ($selected) {
    $selected.classList.remove('selected');
  }

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
    if ($selected) {
      $selected.classList.remove('selected');
    }
    canSelect = true;
    goodToProceed = false;
  }
  if ($backArrow.getAttribute('data-type') === 'duration') {
    data.view = 'workout-mode';
    openWorkoutPage();
    data.duration = '';
    data.workoutMode = '';
    data.playlistTrackIDs = [];
    data.playlistName = '';
    data.finalTrackIDsURLString = '';
    data.finalPlaylistCreationURLString = '';
    data.playlistSongList = [];
    data.playlistInfoList = {};
    data.playlistID = '';
    $selected = document.querySelector('.selected');
    if ($selected) {
      $selected.classList.remove('selected');
    }
    canSelect = true;
    goodToProceed = false;
  }
  if ($backArrow.getAttribute('data-type') === 'mixit') {
    data.view = 'duration';
    openDurationPage();
    clearDOMSongList();
    data.duration = '';
    data.playlistTrackIDs = [];
    data.playlistName = '';
    data.finalTrackIDsURLString = '';
    data.finalPlaylistCreationURLString = '';
    data.playlistSongList = [];
    data.playlistInfoList = {};
    data.playlistID = '';
    $selected = document.querySelector('.selected');
    if ($selected) {
      $selected.classList.remove('selected');
    }
    canSelect = true;
    goodToProceed = false;
  }

  if ($backArrow.getAttribute('data-type') === 'upload') {
    data.view = 'mixit';
    openMixItPage();
    data.playlistName = '';
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

var TRACKS = '';
function getTracks(trackIDsURLString) {
  TRACKS = 'https://api.spotify.com/v1/tracks?ids=' + trackIDsURLString;
  callApi('GET', TRACKS, null, handleTracks);
}

function handleTracks() {
  if (this.status === 200) {
    data.playlistInfoList = {};
    data.playlistInfoList = JSON.parse(this.responseText);

    var artist;
    var trackName;
    var id;
    var obj;
    data.playlistSongList = [];
    for (var i = 0; i < data.playlistInfoList.tracks.length; i++) {
      artist = data.playlistInfoList.tracks[i].artists[0].name;
      trackName = data.playlistInfoList.tracks[i].name;
      id = data.playlistInfoList.tracks[i].id;

      obj = {
        artist: artist,
        trackName: trackName,
        id: id
      };
      data.playlistSongList.push(obj);
    }
    openMixItPage();
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {
    alert(this.responseText);
  }
}

function createFinalTrackIDsURLString(playlistTrackIDs) {
  trackIDsURLString = '';
  for (var i = 0; i < playlistTrackIDs.length; i++) {
    if (i !== (playlistTrackIDs.length - 1)) {
      trackIDsURLString += playlistTrackIDs[i] + '%2C';
    } else {
      trackIDsURLString += playlistTrackIDs[i];
    }
  }
  data.finalTrackIDsURLString = trackIDsURLString;
}

function clearAllData() {
  data.genre = '';
  data.workoutMode = '';
  data.duration = '';
  data.playlistTrackIDs = [];
  data.playlistName = '';
  data.finalTrackIDsURLString = '';
  data.finalPlaylistCreationURLString = '';
  data.playlistSongList = [];
  data.playlistInfoList = {};
  data.playlistID = '';
  data.APIData = {
    catPlaylists: {},
    allSongs: [],
    catPlaylistIDs: [],
    trackIDsMaster: []
  };
  data.FilteredData.audioFeaturesMasterListFiltered = [];
  data.playlistItems = {};
}

var CREATEPLAYLIST;
var userID = JSON.parse(localStorage.getItem('user_ID_Number'));
function createPlaylist() {
  var playlistName = data.playlistName;
  CREATEPLAYLIST = 'https://api.spotify.com/v1/users/' + userID + '/playlists';
  const body = {
    name: playlistName,
    description: '',
    public: false
  };
  const JSONbody = JSON.stringify(body);
  callApi('POST', CREATEPLAYLIST, JSONbody, handleCreatePlaylistResponse);
}

function handleCreatePlaylistResponse() {
  if (this.status === 201) {
    data.playlistID = JSON.parse(this.responseText).id;
    data.playlistURI = JSON.parse(this.responseText).uri;
    addSongsToPlaylist();
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {
    alert(this.responseText);
  }
}

var ADDSONGS;
var tracksArray;
var tracks;
function addSongsToPlaylist() {
  tracks = createTracksString();
  ADDSONGS = 'https://api.spotify.com/v1/playlists/' + data.playlistID + '/tracks?uris=' + tracks;
  callApi('POST', ADDSONGS, null, handleAddSongs);
}

function createTracksString() {
  tracks = '';
  tracksArray = [];
  tracksArray = data.playlistTrackIDs;
  for (let i = 0; i < tracksArray.length; i++) {
    if (i !== tracksArray.length) {
      tracks += 'spotify%3Atrack%3A' + tracksArray[i] + '%2C';
    } else tracks += 'spotify%3Atrack%3A' + tracksArray[i];
  }
  return tracks;
}

function handleAddSongs() {
  if (this.status === 201) {
    openSuccessPage();
  } else if (this.status === 401) {
    refreshAccessToken();
  } else {
    alert(this.responseText);
  }
}

function populateSongList() {
  var playlistSongList = data.playlistSongList;
  var $songList = document.querySelector('ol.song-list');

  for (var i = 0; i < playlistSongList.length; i++) {
    var artist = playlistSongList[i].artist;
    var trackName = playlistSongList[i].trackName;

    var li = document.createElement('li');
    li.innerHTML = `Song: ${trackName}, Artist: ${artist}`;
    $songList.appendChild(li);
  }
}

function clearDOMSongList() {
  var $songList = document.querySelector('ol.song-list');
  $songList.innerHTML = '';
}

var $modal = document.querySelector('.modal');
var $blackOverlay = document.querySelector('.black-overlay');
function hideModal() {
  $modal.classList.add('hidden');
  $blackOverlay.classList.add('hidden');
}

function openModal() {
  $modal.classList.remove('hidden');
  $blackOverlay.classList.remove('hidden');
}
