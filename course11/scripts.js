// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


// build out functions

function togglePlay() {
  // Toogle play
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  const value = this.dataset.skip;
  video.currentTime += parseFloat(value);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const pourcent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${pourcent}%`;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Hook up the event listerners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => addEventListener('change', handleRangeUpdate));
ranges.forEach(range => addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);