const songs = [
  { title: "Song 1", src: "song1.mp3" },
  { title: "Song 2", src: "song2.mp3" },
  { title: "Song 3", src: "song3.mp3" },
];

let currentSongIndex = 0;
const audio = document.getElementById("audio-player");
const title = document.getElementById("song-title");
const progressBar = document.getElementById("progress-bar");
const playPauseBtn = document.querySelector(".controls button:nth-child(2)");

function loadSong(index) {
  audio.src = songs[index].src;
  title.innerText = songs[index].title;
  audio.play();
  playPauseBtn.innerText = "⏸️";
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.innerText = "⏸️";
  } else {
    audio.pause();
    playPauseBtn.innerText = "▶️";
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
}

audio.addEventListener("timeupdate", () => {
  progressBar.value = (audio.currentTime / audio.duration) * 100;
});

progressBar.addEventListener("input", () => {
  audio.currentTime = (progressBar.value / 100) * audio.duration;
});

loadSong(currentSongIndex);
