---
hide:
  - navigation
  - toc
---

# 试试这个！

<style>
	.bg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
</style>

<img class="bg" src="https://images.unsplash.com/photo-1635352073050-23999f4022e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80" />

<section class="music-player">
<audio src="../assets/music/avid/6d9bfe7c4a2e7decbc9e171779b91c5f.mp3" id="audio"></audio>
<div class="music-player__container-main music-player__padding-around" style="--music-fg-color--light: rgba(128, 23, 66, 1);--music-fg-color--dark: rgba(255, 108, 197, 1);--music-bg-color--light: rgba(128, 23, 66, 0.3);--music-bg-color--dark: rgba(255, 108, 197, 0.3);">
  <div class="music-player__disk" style="--music-disk-image: url('../assets/music/avid/cover.png');"></div>
  <div class="music-player__inner-container-main music-player__padding-sides">
    <div class="music-player__title-container">
	  <p>
	    <span class="music-player__title">Avid</span>
		<br id="music-player__title-br">
	    <span class="music-player__artist">澤野弘之</span>
	  </p>
	  <div class="music-player__controls">
        <button class="music-player-btn__play pause">
          <span></span>
          <span></span>
        </button>
      </div>
	</div>
	<div class="music-player__container">
	  <span class="music-player__shift music-player__container">
	    <span class="music-player__time">
	      <span class="music-player__volume">
	  	    <input type="range" value="0" class="music-player__volume-bar">
	  	  </span>
	      <span class="music-player__time-text"></span>
	    </span>
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

<section class="music-player">
<audio src="../assets/music/forgive_me/a2724e2509b93d02d3b5aadcb7268659.mp3" id="audio"></audio>
<div class="music-player__container-main music-player__padding-around" style="--music-fg-color--light: rgba(255, 178, 66, 1);--music-fg-color--dark: rgba(255, 219, 120, 1);--music-bg-color--light: rgba(255, 178, 66, 0.3);--music-bg-color--dark: rgba(255, 219, 120, 0.3);">
  <div class="music-player__disk" style="--music-disk-image: url('../assets/music/forgive_me/cover.png');"></div>
  <div class="music-player__inner-container-main music-player__padding-sides">
    <div class="music-player__title-container">
	  <p>
	    <span class="music-player__title">Forgive Me</span>
		<br id="music-player__title-br">
	    <span class="music-player__artist">FN007</span>
	  </p>
	  <div class="music-player__controls">
        <button class="music-player-btn__play pause">
          <span></span>
          <span></span>
        </button>
      </div>
	</div>
	<div class="music-player__container">
	  <span class="music-player__shift music-player__container">
	    <span class="music-player__time">
	      <span class="music-player__volume">
	  	    <input type="range" value="0" class="music-player__volume-bar">
	  	  </span>
	      <span class="music-player__time-text"></span>
	    </span>
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
