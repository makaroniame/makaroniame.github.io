// has to be styled in /css/text-vide.css
TEXTVIDE_CLASS_NAME = "text-vide";
TEXTVIDE_KEY = "text-vide";
if (localStorage.getItem(TEXTVIDE_KEY) == null)
	localStorage.setItem(TEXTVIDE_KEY, false);

TEXTVIDE_TAGS = {
	"open": `<span class="${TEXTVIDE_CLASS_NAME}">`,
	"close": `</span><!-- ${TEXTVIDE_CLASS_NAME} -->`,
}

function applyTextVide(set=true){
	const paragraphs = document.querySelectorAll("p");
	paragraphs.forEach(
		element => {
			if (set) {
				element.innerHTML = textVide(
					element.innerHTML, {
						sep: [
							TEXTVIDE_TAGS["open"],
							TEXTVIDE_TAGS["close"],
						],
						fixationPoint: 5,
						ignoreHtmlTag: true,
					}
				)
			} else {
				element.innerHTML = element.innerHTML.replaceAll(
					TEXTVIDE_TAGS["close"],
					'');
				element.innerHTML = element.innerHTML.replaceAll(
					TEXTVIDE_TAGS["open"],
					'');
				}
			}
		);
}

function initToggleTextVide() {
	// Get in all paragraphs and do TextVide
	textVideBtn = document.querySelector("div#text-vide-btn")

	applyTextVide(JSON.parse(localStorage.getItem(TEXTVIDE_KEY)))
	textVideBtn.onclick = () => {
		enabled = JSON.parse(localStorage.getItem(TEXTVIDE_KEY))
		localStorage.setItem(TEXTVIDE_KEY, !enabled)
		applyTextVide(!enabled);
		console.log(`Text-Vide: ${!enabled}`)
	}
};
