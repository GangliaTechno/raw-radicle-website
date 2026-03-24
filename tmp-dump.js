const fs = require('fs');

const content = fs.readFileSync('d:/project2/public/pages/cdarkc.html', 'utf8');

let mIdx = content.indexOf('ProductForm__BuyButtons');
if (mIdx !== -1) {
    let snippet = content.substring(mIdx, mIdx + 3000); 
    fs.writeFileSync('d:/project2/tmp-dump.txt', snippet);
    console.log("Dumped to tmp-dump.txt");
} else {
    console.log("NOT FOUND");
}
