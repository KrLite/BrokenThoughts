var musicPlayers = document.querySelectorAll(".music-player");

Array.from(musicPlayers).forEach(function (musicPlayer) {
  const music = musicPlayer.querySelector("audio");
  const playBtn = musicPlayer.querySelector(".music-player-btn__play");
  const seekBar = musicPlayer.querySelector(".music-player__seek-bar");
  const volumeBar = musicPlayer.querySelector(".music-player__volume-bar");
  const time = musicPlayer.querySelector(".music-player__time-text");
  const volume = musicPlayer.querySelector(".music-player__volume");
  const disk = musicPlayer.querySelector(".music-player__disk");
  const shifts = musicPlayer.querySelectorAll(".music-player__shift");

  var diskRotation = 0;
  var diskRotationDelta = 0;
  var diskRotationDeltaTarget = 0;
  var diskRotationSpeed = 0.1;

  setInterval(() => {
    diskRotationDelta += (diskRotationDeltaTarget - diskRotationDelta) * 0.04;
	diskRotation += diskRotationDelta * diskRotationSpeed;
	diskRotation = diskRotation % 360;
    disk.style.transform = `rotate(${diskRotation}deg)`;
  }, 1000 / 60);

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
  volumeBar.value = 87;
  volumeBar.max = 100;

  music.addEventListener("canplaythrough", () => {
    if (music.paused) {
      playBtn.classList.add("pause");
	  diskRotationDeltaTarget = 0;
    } else {
      playBtn.classList.remove("pause");
	  diskRotationDeltaTarget = 1;
    }
    seekBar.max = music.duration;
    music.volume = volumeBar.value / 100;
    time.innerHTML = `<code>${formatTime(music.duration)}</code>`;
  });

  music.addEventListener("play", () => {
    disk.classList.add("playing");
	diskRotationDeltaTarget = 1;
  });

  music.addEventListener("pause", () => {
    disk.classList.remove("playing");
	diskRotationDeltaTarget = 0;
  });

  playBtn.addEventListener("click", () => {
    if (music.ended) {
      music.currentTime = 0;
    }

    if (music.paused || music.ended) {
      music.play();
      playBtn.classList.remove("pause");
	  diskRotationDelta
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

  setInterval(() => {
    time.style.opacity = 1 - parseFloat(getComputedStyle(volumeBar).opacity);
  }, 100);

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
    time.classList.add("opaque");
  });

  seekBar.addEventListener("mouseup", () => {
    seekBar.classList.remove("active");
    time.classList.remove("opaque");
  });

  music.addEventListener("ended", () => {
    playBtn.classList.add("pause");
  });

  volumeBar.addEventListener("input", () => {
    music.volume = volumeBar.value / 100;
  });

  Array.from(shifts).forEach(function (shift) {
    shift.addEventListener("mousemove", function (event) {
      var rect = shift.getBoundingClientRect();
      var mouseX = event.clientX - rect.left;
      var mouseY = event.clientY - rect.top;

      var width = shift.offsetWidth;
      var height = shift.offsetHeight;
      var shiftX =
        Math.max(-1, Math.min(1, (mouseX - width / 2) / width)) * 0.3;
      var shiftY =
        Math.max(-1, Math.min(1, (mouseY - height / 2) / height)) * 0.3;

      shift.style.setProperty("--shift-x", `${shiftX}em`);
      shift.style.setProperty("--shift-y", `${shiftY}em`);
      shift.style.setProperty("--scale-x", `${1 + Math.abs(shiftX) / 5}`);
      shift.style.setProperty("--scale-y", `${1 + Math.abs(shiftY) / 5}`);
    });
  });
});
