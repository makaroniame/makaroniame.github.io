// has to be styled in /css/text-vide.css
TEXTVIDE_CLASS_NAME = "text-vide";
window.TEXTVIDE_STATE = false;

function applyTextVide(set=true){
	const paragraphs = document.querySelectorAll("p");
	paragraphs.forEach(
		element => {
			if (set) {
				element.innerHTML = textVide(
					element.innerHTML, {
						sep: [
							`<span class="${TEXTVIDE_CLASS_NAME}">`,
							`</span><!-- ${TEXTVIDE_CLASS_NAME} -->`
						],
						fixationPoint: 5,
						ignoreHtmlTag: true,
					}
				)
			} else {
				element.innerHTML = element.innerHTML.replaceAll(
					`</span><!-- ${TEXTVIDE_CLASS_NAME} -->`,
					'');
				element.innerHTML = element.innerHTML.replaceAll(
					`<span class="${TEXTVIDE_CLASS_NAME}">`,
					'');
				}
			}
		);
}

window.onload = () => {
	// Get in all paragraphs and do TextVide
	textVideBtn = document.querySelector("div#text-vide")
	textVideBtn.onclick = () => {
		window.TEXTVIDE_STATE = !window.TEXTVIDE_STATE
		console.log(window.TEXTVIDE_STATE)
		applyTextVide(window.TEXTVIDE_STATE);
	}
};
