function initToggleDarkTheme() {
	const darkThemeBtn = document.querySelector("div#themer-btn");
	const darkThemeCheckbox = document.getElementById("themer");

	if (!darkThemeBtn || !darkThemeCheckbox) return;

	darkThemeBtn.addEventListener("click", (event) => {
		if (event.target.closest("label")) return;
		darkThemeCheckbox.click();
	});
}
