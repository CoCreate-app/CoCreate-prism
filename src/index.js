import Prism from "prismjs";
import Observer from "@cocreate/observer";

import "prismjs/components/prism-css-extras.js";
import "./themes/prism.css";
import "./themes/prism-tomorrow.css";
// import "prismjs/plugins/inline-color/prism-inline-color.js";
// import "prismjs/plugins/inline-color/prism-inline-color.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import "./index.css";

function init(elements) {
	if (
		elements &&
		!Array.isArray(elements) &&
		!(elements instanceof HTMLCollection) &&
		!(elements instanceof NodeList)
	)
		elements = [elements];
	if (elements)
		for (let element of elements) {
			highlightElement(element);
		}
	else highlightAll();
}

function loadPrismLanguage(lang) {
	// Map language to Prism component path (assumes you're using a CDN or module loader)
	const componentPath = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;

	return new Promise((resolve, reject) => {
		// Dynamically load the script
		const script = document.createElement("script");
		script.src = componentPath;
		script.onload = resolve;
		script.onerror = () =>
			reject(new Error(`Failed to load Prism language: ${lang}`));
		document.head.appendChild(script);
	});
}

async function highlightText(text, lang) {
	lang = lang.toLowerCase();

	if (!Prism.languages[lang]) {
		try {
			await loadPrismLanguage(lang);
		} catch (error) {
			console.error(error);
			return `Error: Language "${lang}" not supported.`;
		}
	}

	try {
		// Highlight the text using Prism.js
		return Prism.highlight(text, Prism.languages[lang], lang);
	} catch (error) {
		console.error("Highlighting failed:", error);
		return `Error: Unable to highlight text.`;
	}
}

function highlightElement(element, async = false, callback = null) {
	if (element) {
		let pre = element.closest("pre");
		if (pre) {
			let theme = pre.getAttribute("theme");
			if (theme) {
				// if (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				pre.setAttribute("theme", theme);
			}
			let lineNumbers = pre.getAttribute("line-numbers");
			if (
				(lineNumbers && lineNumbers !== "false") ||
				lineNumbers === ""
			) {
				pre.classList.add("line-numbers");
			}
			// pre.classList.add("line-numbers");
		}

		// Highlight the element with optional async and callback parameters
		Prism.highlightElement(element, async, callback);
		if (Prism.plugins.lineNumbers) {
			Prism.plugins.lineNumbers.resize(element);
		}

		element.addEventListener("input", function (event) {
			Prism.highlightElement(element, async, callback);
			if (Prism.plugins.lineNumbers) {
				Prism.plugins.lineNumbers.resize(element);
			}
		});
	}
}

function highlightAll() {
	// Highlight the element with optional async and callback parameters
	Prism.highlightAll();
}

Observer.init({
	name: "CoCreatePrismAddedNodes",
	observe: ["addedNodes"],
	selector: "pre[class*='language-'], code[class*='language-']",
	callback: function (mutation) {
		highlightElement(mutation.target);
	}
});

init();
export default { highlightText, highlightElement, highlightAll, Prism };
