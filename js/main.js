// static data
const musicData = [
  {
    id: 1,
    artist_name: "Shahin Najafi",
    album_name: "",
    album_cover: "./img/Ranandegi-dar-Masti.jpg",
    song_title: "Ranandegi dar Masti",
    audio: "./music/Ranandegi-dar-Masti.mp3",
  },
  {
    id: 2,
    artist_name: "Shahin Najafi",
    album_name: "",
    album_cover: "./img/209.jpg",
    song_title: "209",
    audio: "./music/209.mp3",
  },
];

// dynamic data
var index = 0,
  volumeStatus = true,
  shuffleStatus = false,
  repeatStatus = false,
  audioCurrentTime = 0;

// select elements
const audio = document.querySelector("#audio"),
  playBtn = document.querySelector("#play"),
  stopBtn = document.querySelector("#stop"),
  previousBtn = document.querySelector("#previous"),
  nextBtn = document.querySelector("#next"),
  muteBtn = document.querySelector("#volume"),
  shuffleBtn = document.querySelector("#shuffle"),
  repeatBtn = document.querySelector("#repeat");

// time set
setInterval(() => {
  let currentMin = Math.floor((audio.currentTime % 3600) / 60),
    currentSec = Math.floor((audio.currentTime % 3600) % 60);

  let durationTime = Math.floor(audio.duration) - Math.floor(audio.currentTime);

  let durationMin = Math.floor((durationTime % 3600) / 60),
    durationSec = Math.floor((durationTime % 3600) % 60);

  if (currentMin < 10) {
    currentMin = "0" + currentMin;
  }
  if (currentSec < 10) {
    currentSec = "0" + currentSec;
  }
  if (durationMin < 10) {
    durationMin = "0" + durationMin;
  }
  if (durationSec < 10) {
    durationSec = "0" + durationSec;
  }

  document.querySelector(
    ".start-time"
  ).innerHTML = `${currentMin}:${currentSec}`;

  document.querySelector(
    ".end-time"
  ).innerHTML = `${durationMin}:${durationSec}`;
}, 1000);

// play music
playBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playBtn.className = "fas fa-pause play";
  } else {
    audio.pause();
    playBtn.className = "fas fa-play play";
  }
});

// stop music
stopBtn.addEventListener("click", () => {
  audio.pause();
  audio.currentTime = 0;
  playBtn.className = "fas fa-play play";
});

// previous music
previousBtn.addEventListener("click", () => {
  if (index - 1 >= 0) {
    index--;
    getMusicData(index);

    audio.play();
    playBtn.className = "fas fa-pause play";
  } else {
    index = musicData.length - 1;
    getMusicData(index);

    audio.play();
    playBtn.className = "fas fa-pause play";
  }
});

// next music
nextBtn.addEventListener("click", () => {
  if (index + 1 < musicData.length) {
    index++;
    getMusicData(index);

    audio.play();
    playBtn.className = "fas fa-pause play";
  } else {
    index = 0;
    getMusicData(index);

    audio.play();
    playBtn.className = "fas fa-pause play";
  }
});

// muted music
muteBtn.addEventListener("click", () => {
  if (volumeStatus) {
    muteBtn.className = "fas fa-volume-mute";
    audio.volume = 0;
    volumeStatus = false;
  } else {
    muteBtn.className = "fas fa-volume-low";
    audio.volume = 0.4;
    volumeStatus = true;
  }
});

// shuffle music
shuffleBtn.addEventListener("click", () => {
  let status = shuffleStatus ? false : true;

  if (status) {
    if (audio.paused) {
      shuffleBtn.style.color = "#3fbbe9";
      shuffleBtn.style.borderColor = "#3fbbe9";

      index = Math.floor(Math.random() * musicData.length);
      getMusicData(index);
      shuffleStatus = true;
    } else {
      shuffleBtn.style.color = "#3fbbe9";
      shuffleBtn.style.borderColor = "#3fbbe9";

      index = Math.floor(Math.random() * musicData.length);
      getMusicData(index);
      shuffleStatus = true;

      audio.play();
      playBtn.className = "fas fa-pause play";
    }
  } else {
    shuffleBtn.style.color = "#65717e";
    shuffleBtn.style.borderColor = "#65717e";

    shuffleStatus = false;
  }
});

// repeat music
repeatBtn.addEventListener("click", () => {
  let status = repeatStatus ? false : true;

  if (status) {
    repeatBtn.style.color = "#3fbbe9";
    repeatBtn.style.borderColor = "#3fbbe9";

    repeatStatus = true;

    audio.loop = true;
  } else {
    repeatBtn.style.color = "#65717e";
    repeatBtn.style.borderColor = "#65717e";

    repeatStatus = false;

    audio.loop = false;
  }
});

// get music
const getMusicData = async (id = 0) => {
  let songTitle = document.querySelector(".song-title"),
    backDropCover = document.querySelector(".backdrop"),
    artistTitle = document.querySelector(".artist-title"),
    images = document.querySelectorAll("img"),
    song = document.querySelector("#audio"),
    duration = document.querySelector(".end-time");

  audio.volume = 0.4;

  songTitle.innerHTML = musicData[id].song_title;
  artistTitle.innerHTML = musicData[id].artist_name;

  backDropCover.style.backgroundImage = `url(${musicData[id].album_cover})`;

  for (let i = 0; i < images.length; i++)
    images[i].src = musicData[id].album_cover;

  song.src = musicData[id].audio;
};

// call function
getMusicData();
