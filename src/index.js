import {highlight, highlightElement, languages, hooks} from 'prismjs'
import 'prismjs/components/prism-css-extras.js'
import './themes/prism.css'
import './themes/prism-tomorrow.css'
// import 'prismjs/plugins/inline-color/prism-inline-color.js'
// import 'prismjs/plugins/inline-color/prism-inline-color.css'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
// import 'prismjs/plugins/line-numbers/prism-line-numbers.css'


function highlightText(text, lang) {
    lang = lang.toLowerCase()
    let code = highlight(text, languages[lang], lang);
    return code	
}

// function highlightEl(element, async, callback) {
//     highlightElement(element, async, callback);
// }

// CoCreatePrism.init();
export default {highlightText, highlightElement, hooks};