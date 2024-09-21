import Prism from 'prismjs'
import Observer from '@cocreate/observer';

// import 'prismjs/components/prism-javascript';
// import 'prismjs/components/prism-html';
// import 'prismjs/components/prism-css';

import 'prismjs/components/prism-css-extras.js'
import './themes/prism.css'
import './themes/prism-tomorrow.css'
// import 'prismjs/plugins/inline-color/prism-inline-color.js'
// import 'prismjs/plugins/inline-color/prism-inline-color.css'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

import './index.css';

function init(elements) {
    if (elements && !Array.isArray(elements) && !(elements instanceof HTMLCollection) && !(elements instanceof NodeList))
        elements = [elements]
    if (elements)
        for (let element of elements) {
            highlightElement(element);
        }
    else
        highlightAll()
}

function highlightText(text, lang) {
    lang = lang.toLowerCase()
    let code = Prism.highlight(text, Prism.languages[lang], lang);
    return code
}

function highlightElement(element, async = false, callback = null) {
    // Highlight the element with optional async and callback parameters
    Prism.highlightElement(element, async, callback);

    if (element) {
        let themeEl = element.closest('pre')
        if (themeEl) {
            let theme = themeEl.getAttribute('theme')
            if (!theme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                themeEl.setAttribute('theme', 'tomorrow' || '')
            }
        }
        element.addEventListener('input', function (event) {
            Prism.highlightElement(element, async, callback);
        });
    }

}

function highlightAll() {
    // Highlight the element with optional async and callback parameters
    Prism.highlightAll();
}


Observer.init({
    name: 'CoCreatePrismAddedNodes',
    observe: ['addedNodes'],
    target: "[class*='language-']",
    callback: function (mutation) {
        highlightElement(mutation.target);
    }
})

init();
export default { highlightText, highlightElement, highlightAll, Prism };