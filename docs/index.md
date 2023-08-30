---
hide:
  - navigation
  - toc
---

<style>
  .translucent {
	opacity: 0.35;
    color: var(--md-primary-fg-color--auto) !important;
  }

  .sink {
	transform: translateY(-1em);
  }

  .colored-text {
	color: var(--md-primary-fg-color--auto);
  }

  .title {
    width: 100%;
	height: 64vh;
  }

  .title blockquote {
	font-style: italic;
	border-left: 0.2rem solid var(--md-primary-fg-color--auto) !important;
  }

  .container {
	top: 40vh;
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
	position: relative;
  }

  .combined {
    height: auto;
    width: 8em;
    max-height: 100%;
    max-width: calc(30% - 3em);
    margin-left: 1.1em;
    margin-right: 1.9em;
    object-fit: contain;
  }

  .content-flex {
    flex: 1;
  }

  .mdx-switch button {
    cursor: pointer;
    transition: opacity 0.25s;
  }

  .mdx-switch button:focus,
  .mdx-switch button:hover {
    opacity: .75;
  }

  .mdx-switch button > code {
    background-color: var(--md-primary-fg-color);
    color: var(--md-primary-bg-color);
    display: block;
  }

  details {
	margin: 1em 0 !important;
  }

  .tail {
	height: 25vh;
  }
</style>

<section class="title">
  <div class="container">
    <span class="colored combined" style="-webkit-mask-image: url('assets/images/logo.png');">
      <img
          src="assets/images/logo.png"
          alt="一些可有可无的故事"
       />
    </span>
    <div class="content-flex">
      <h1>一些可有可无的故事</h1>
      <blockquote class="translucent sink">
        世界好小，我用两只脚就能走遍。<br />
        世界很大。我活了几百年见证世间喜怒哀乐，而这些树木和岩石，它们愿意花费几百个世纪。
      </blockquote>
    </div>
  </div>
</section>

<div class="divider"></div>

???+ colored-amt inline end "<span class="mdx-switch"><span class="colored-text">换个颜色！</span>&emsp;<button data-md-color-primary="--md-primary-fg-color--auto"><code>清除</code></button></span>"

    <div class="mdx-switch">
        <button data-md-color-primary="red"><code>红</code></button>
        <button data-md-color-primary="pink"><code>粉</code></button>
        <button data-md-color-primary="purple"><code>紫</code></button>
        <button data-md-color-primary="deep-purple"><code>深紫</code></button>
        <button data-md-color-primary="indigo"><code>靛蓝</code></button>
        <button data-md-color-primary="blue"><code>蓝</code></button>
        <button data-md-color-primary="light-blue"><code>浅蓝</code></button>
        <button data-md-color-primary="cyan"><code>青</code></button>
        <button data-md-color-primary="teal"><code>水鸭</code></button>
        <button data-md-color-primary="green"><code>绿</code></button>
        <button data-md-color-primary="light-green"><code>浅绿</code></button>
        <button data-md-color-primary="lime"><code>黄绿</code></button>
        <button data-md-color-primary="yellow"><code>黄</code></button>
        <button data-md-color-primary="amber"><code>琥珀</code></button>
        <button data-md-color-primary="orange"><code>橙</code></button>
        <button data-md-color-primary="deep-orange"><code>深橙</code></button>
        <button data-md-color-primary="brown"><code>棕</code></button>
        <button data-md-color-primary="grey"><code>灰</code></button>
        <button data-md-color-primary="blue-grey"><code>蓝灰</code></button>
        <button data-md-color-primary="black"><code>黑</code></button>
        <button data-md-color-primary="white"><code>白</code></button>
    </div>

<script>
	var buttons = document.querySelectorAll("button[data-md-color-primary]");
	buttons.forEach(function(button) {
		button.addEventListener("click", function() {
			var attr = this.getAttribute("data-md-color-primary");
			document.body.setAttribute("data-md-color-primary", attr);
		});
	});
</script>

人生中总会发生一些事。无论它们是否值得被回忆、被忘却，总有一些事会最终在时间的土壤中完成它们的宿命。  
与其等待它们缓慢消失在记忆的荒漠里，不如将它们在此记下。

毕竟尤说过，_<span class="translucent">记忆这种东西，妨碍我活着。</span>_

<div class="tail"></div>
