/* exported requestAuthorization */
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

var $selectionContainer = document.querySelector('.selection-container');
var $selectButtons = document.querySelectorAll('button.select-button');

$selectionContainer.addEventListener('click', toggleSelectItem);
function toggleSelectItem(event) {
  for (var $selectButton of $selectButtons) {
    if (event.target === $selectButton) {
      if ($selectButton.style.backgroundColor === '') {
        $selectButton.style.backgroundColor = 'rgba(248, 84, 231, 0.47)';
        var genre = $selectButton.getAttribute('data-value');
        data.genre = genre;
      } else if ($selectButton.style.backgroundColor === 'rgba(248, 84, 231, 0.47)') {
        $selectButton.style.backgroundColor = '';
      }
    }

  }
}
