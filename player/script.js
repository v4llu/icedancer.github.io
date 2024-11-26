const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playlistButton = document.getElementById("playlist");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playlistSongs = document.getElementById("playlist-songs");
const currentProgress = document.getElementById("current-progress");

//index for songs
let index;

//initially loop=true
let loop = true;

const songsList = [
  {
    name: "SmartWater",
    link: "SmartWater.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "OKK",
    link: "OKK.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Mallwhore Freeestyle",
    link: "Mallwhore Freeestyle.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Be Nice 2 Me",
    link: "Be Nice 2 Me.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Frosty the Snowman",
    link: "Frosty the Snowman.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Inside Out",
    link: "Inside Out.mp3",
    artist: "Bladee & Yung Lean",
    image: "cover.jpg",
  },
  {
    name: "Close",
    link: "Close.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Jaws",
    link: "Jaws.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Cartier'god Icedancer (Intermission)",
    link: "Intermission.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Side by Side",
    link: "Side by Side.mp3",
    artist: "Bladee & Thaiboy Digital",
    image: "cover.jpg",
  },
  {
    name: "Topman",
    link: "Topman.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Waster",
    link: "Waster.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Special Place",
    link: "Special Place.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Dg Jeans",
    link: "Dg Jeans.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Feel Like",
    link: "Feel Like.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Linkdin",
    link: "Linkdin.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "For Nothing",
    link: "For Nothing.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "Anything",
    link: "Anything.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
  {
    name: "The Silent Boy Cries (Ripsquadd Outro)",
    link: "Ripsquadd.mp3",
    artist: "Bladee",
    image: "cover.jpg",
  },
];

//events object
let events = {
  mouse: {
    click: "click",
  },
  touch: {
    click: "touchstart",
  },
};

let deviceType = "";

//Detect touch device

const isTouchDevice = () => {
  try {
    //We try to create TouchEvent(it would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Format time (convert ms to seconds, minutes and add 0 id less than 10)
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//set song
const setSong = (arrayIndex) => {
  //this extracts all the variables from the object
  let { name, link, artist } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  //display duration when metadata loads
  audio.onloadedmetadata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
};

//play song
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//repeat button
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    audio.loop = false;
    console.log("repeat off");
  } else {
    repeatButton.classList.add("active");
    audio.loop = true;
    console.log("repeat on");
  }
});

//Next song
const nextSong = () => {
  //if loop is true then continue in normal order
  if (loop) {
    if (index == songsList.length - 1) {
      //If last song is being played
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);

    playAudio();
  } else {
    //else find a random index and play that song
    let randIndex = Math.floor(Math.random() * songsList.length);
    console.log(randIndex);
    setSong(randIndex);
    playAudio();
  }
};

//pause song
const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//previous song ( you can't go back to a randomly played song)
const previousSong = () => {
  if (index > 0) {
    pauseAudio();
    index -= 1;
  } else {
    //if first song is being played
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

//next song when current song ends
audio.onended = () => {
  nextSong();
};

//Shuffle songs
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
    console.log("shuffle off");
  } else {
    shuffleButton.classList.add("active");
    loop = false;
    console.log("shuffle on");
  }
});

//play button
playButton.addEventListener("click", playAudio);

//next button
nextButton.addEventListener("click", nextSong);

//pause button
pauseButton.addEventListener("click", pauseAudio);

//prev button
prevButton.addEventListener("click", previousSong);

//if user clicks on progress bar
isTouchDevice();
progressBar.addEventListener(events[deviceType].click, (event) => {
  //start of progressBar
  let coordStart = progressBar.getBoundingClientRect().left;
  //mouse click position
  let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  //set width to progress
  currentProgress.style.width = progress * 100 + "%";

  //set time
  audio.currentTime = progress * audio.duration;

  //play
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

//update progress every second
setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
});

//update time
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//Creates playlist
const initializePlaylist = () => {
  for (let i in songsList) {
    playlistSongs.innerHTML += `<li class='playlistSong' onclick='setSong(${i})'>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>`;
  }
};

//display playlist
playlistButton.addEventListener("click", () => {
  playlistContainer.classList.remove("hide");
});

//hide playlist
closeButton.addEventListener("click", () => {
  playlistContainer.classList.add("hide");
});

window.onload = () => {
  //initially first song
  index = 0;
  setSong(index);
  //create playlist
  initializePlaylist();
};
