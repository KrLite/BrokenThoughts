const musicPlayers = document.querySelectorAll(".music-player");

for (let i = 0; i < musicPlayers.length; i++) {
  const musicPlayer = musicPlayers[i];
  const music = musicPlayer.querySelector("audio");
  const playBtn = musicPlayer.querySelector(".music-player-btn__play");
  const seekBar = musicPlayer.querySelector(".music-player__seek-bar");
  const time = document.querySelector(".music-player__time");

  const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
      min = `0${min}`;
    }
    let sec = Math.floor(time % 60);
    if (sec < 10) {
      sec = `0${sec}`;
    }
    return `${min}:${sec}`;
  };

  seekBar.value = 0;

  music.addEventListener("canplaythrough", () => {
    if (music.paused) {
      playBtn.classList.add("pause");
    } else {
      playBtn.classList.remove("pause");
    }
	seekBar.max = music.duration;
    time.innerHTML = `<code>${formatTime(music.duration)}</code>`;
  });

  playBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      playBtn.classList.remove("pause");
    } else {
      music.pause();
      playBtn.classList.add("pause");
    }
  });

  music.addEventListener("timeupdate", () => {
    if (seekBar.classList.contains("active") === false) {
      seekBar.value = music.currentTime;
      time.innerHTML = `<code>
	${formatTime(music.currentTime)} / ${formatTime(music.duration)}
	</code>`;
    }
  });

  seekBar.addEventListener("input", () => {
    time.innerHTML = `<code>
	${formatTime(seekBar.value)} / ${formatTime(music.duration)}
	</code>`;
  });

  seekBar.addEventListener("change", () => {
    music.currentTime = seekBar.value;
  });

  seekBar.addEventListener("mousedown", () => {
    seekBar.classList.add("active");
  });

  seekBar.addEventListener("mouseup", () => {
    seekBar.classList.remove("active");
  });
}
