const fs = require('fs');
const content = fs.readFileSync('d:/project2/public/pages/cdarkc.html', 'utf8');

let mIdx = content.indexOf('ProductForm__BuyButtons');
if (mIdx !== -1) {
    let snippet = content.substring(mIdx, mIdx + 2000); // 2000 chars should cover the buttons
    console.log("Found BuyButtons section:");
    console.log(snippet);
} else {
    console.log("ProductForm__BuyButtons NOT FOUND!");
}
