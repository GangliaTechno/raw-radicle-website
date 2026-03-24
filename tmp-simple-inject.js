const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const brandMap = {
    'blinkit': '#F8CB46',
    'zepto': '#FF3269',
    'amazon': '#FF9900',
    'instamart': '#FC8019',
    'flipkart': '#2874F0'
};

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    let updated = original;
    
    for (let brand in brandMap) {
        let color = brandMap[brand];
        
        // Let's just find the generic Button--brand class
        let classStr = `Button--${brand}"`;
        let parts = updated.split(classStr);
        if (parts.length > 1) {
             for (let i = 0; i < parts.length - 1; i++) {
                 // The next part starts right after Button--brand"
                 // Let's find the first style=" in this part before the >
                 let postStr = parts[i+1];
                 let closeIdx = postStr.indexOf('>');
                 if (closeIdx !== -1) {
                     let inner = postStr.substring(0, closeIdx);
                     if (!inner.includes('--hover-bg')) {
                         let styleIdx = inner.indexOf('style="');
                         if (styleIdx !== -1) {
                             // Inject right after style="
                             let insertAt = styleIdx + 7;
                             postStr = postStr.substring(0, insertAt) + `--hover-bg: ${color}; --hover-text: #fff; ` + postStr.substring(insertAt);
                         } else {
                             // Inject style just before >
                             postStr = ' style="--hover-bg: ' + color + '; --hover-text: #fff;"' + postStr;
                         }
                     }
                 }
                 parts[i+1] = postStr;
             }
             updated = parts.join(classStr);
        }
    }

    if (updated !== original) {
        fs.writeFileSync(filePath, updated);
        console.log(`Successfully injected into ${file}`);
    }
});
