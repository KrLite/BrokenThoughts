---
hide:
  - navigation
  - toc
---

# 试试这个！

<section class="music-player">
<audio src="../assets/music/avid/6d9bfe7c4a2e7decbc9e171779b91c5f.mp3" id="audio"></audio>
<div class="music-player__container-main music-player__padding-around" style="--music-fg-color--light: rgba(128, 23, 66, 1);--music-fg-color--dark: rgba(255, 108, 197, 1);--music-bg-color--light: rgba(128, 23, 66, 0.1);--music-bg-color--dark: rgba(255, 108, 197, 0.1);">
  <div class="music-player__disk" style="--music-disk-image: url('../assets/music/avid/cover.png');"></div>
  <div class="music-player__inner-container-main music-player__padding-sides">
    <div class="music-player__title-container">
	  <h1>
	    <span class="music-player__title">Avid</span>
	    <span class="music-player__artist">澤野弘之</span>
	  </h1>
	  <div class="music-player__controls">
        <button class="music-player-btn__play pause">
          <span></span>
          <span></span>
        </button>
      </div>
	</div>
	<div class="music-player__container">
	  <span class="music-player__time">
	    <span class="music-player__volume music-player__shift">
		  <input type="range" value="0" class="music-player__volume-bar">
		</span>
	    <span class="music-player__time-text"></span>
	  </span>
	  <div class="music-player__inner-container">
	    <div class="music-player__slider music-player__shift">
          <input type="range" value="0" class="music-player__seek-bar">
        </div>
	  </div>
	</div>
  </div>
</div>
</section>

<script src="../javascripts/music_player.js"></script>
