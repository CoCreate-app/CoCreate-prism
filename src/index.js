import {highlight, highlightElement, languages} from 'prismjs'
import 'prismjs/themes/prism.css'


function highlightText(text, lang) {
    lang = lang.toLowerCase()
    let code = highlight(text, languages[lang], lang);
    return code	
}

// function highlightEl(element, async, callback) {
//     highlightElement(element, async, callback);
// }

// CoCreatePrism.init();

export default {highlightText, highlightElement};