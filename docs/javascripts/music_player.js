const playBtn = document.querySelector(".music-player-btn__play");
const prevBtn = document.querySelector(".music-player-btn__prev");
const nextBtn = document.querySelector(".music-player-btn__next");

playBtn.addEventListener("click", () => {
  playBtn.classList.toggle("pause");
});

prevBtn.addEventListener("click", function () {
  prevBtn.classList.add("switch-music");

  prevBtn.addEventListener("animationend", function () {
    prevBtn.classList.remove("switch-music");
  });
});

nextBtn.addEventListener("click", function () {
  nextBtn.classList.add("switch-music");

  nextBtn.addEventListener("animationend", function () {
    nextBtn.classList.remove("switch-music");
  });
});
