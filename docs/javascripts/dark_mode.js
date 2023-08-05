function updateDarkModeIcon(prefersDarkMode) {
  const icons = document.querySelectorAll(".md-header__button.md-icon");
  Array.from(icons).forEach((icon) => {
    const isAvailable =
      icon.getAttribute("for") && icon.getAttribute("for").includes("palette");
    if (isAvailable) {
      const isDarkMode = icon.getAttribute("for").includes("__palette_1");
      if (
        (isDarkMode && prefersDarkMode) ||
        (!isDarkMode && !prefersDarkMode)
      ) {
        icon.removeAttribute("hidden");
      } else {
        icon.setAttribute("hidden", "");
      }
    }
  });
}

function toggleDarkMode(prefersDarkMode) {
	const data = "data-md-color-scheme";
  const body = document.querySelector("body");
  const currentScheme = body.getAttribute(data);
  const scheme = prefersDarkMode ? "slate" : "default";
  if (currentScheme !== scheme) {
    body.setAttribute(data, scheme);
    updateDarkModeIcon(prefersDarkMode);
    console.log(
      `Successfully toggled color scheme. Currently set to: ${scheme}.`
    );
  }
}

function prefersDarkMode() {
  return (prefersDarkMode =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);
}

// Run initially
toggleDarkMode(prefersDarkMode());

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    toggleDarkMode(e.matches);
  });
