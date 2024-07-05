import { highlight, highlightElement, highlightAll, languages, hooks } from 'prismjs'
// import Prism from 'prismjs';
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

function highlightText(text, lang) {
    lang = lang.toLowerCase()
    let code = highlight(text, languages[lang], lang);
    return code
}

// function highlightEl(element, async, callback) {
//     highlightElement(element, async, callback);
// }

// CoCreatePrism.init();
export default { highlightText, highlightElement, highlightAll, hooks };