DARK_THEME_KEY = "darkTheme"
if (localStorage.getItem(DARK_THEME_KEY) == null)
	localStorage.setItem(DARK_THEME_KEY, true);

function initToggleDarkTheme() {
	darkThemeBtn = document.querySelector("div#themer-btn")
	document.getElementById('darkTheme').disabled = JSON.parse(localStorage.getItem(DARK_THEME_KEY))

	darkThemeBtn.onclick = () => {
		enabled = JSON.parse(localStorage.getItem(DARK_THEME_KEY))
		localStorage.setItem(DARK_THEME_KEY, !enabled)
		document.getElementById('darkTheme').disabled = !enabled;
		console.log(`Dark Mode: ${enabled}`)
	}
}
