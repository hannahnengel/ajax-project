var buttonsWhite = document.querySelectorAll('.button-white');
for (var buttonWhite of buttonsWhite) {
  buttonWhite.addEventListener('mouseover', whiteLogoHover);
  buttonWhite.addEventListener('mouseout', blackSpotifyLogo);
}
function whiteLogoHover(event) {
  var logoImg = buttonWhite.querySelector('.img-logo');
  if (logoImg !== null) {
    logoImg.setAttribute('src', 'images/Spotify-Logo-White.png');
  }

  var headphoneImg = buttonWhite.querySelector('.headphone-img');
  if (headphoneImg !== null) {
    headphoneImg.setAttribute('src', 'images/Headphones-icon-white.png');
  }
}
function blackSpotifyLogo(event) {
  var logoImg = buttonWhite.querySelector('.img-logo');
  if (logoImg !== null) {
    logoImg.setAttribute('src', 'images/Spotify-Logo-Black.png');
  }

  var headphoneImg = buttonWhite.querySelector('.headphone-img');
  if (headphoneImg !== null) {
    headphoneImg.setAttribute('src', 'images/Headphones-icon-black.png');
  }
}
