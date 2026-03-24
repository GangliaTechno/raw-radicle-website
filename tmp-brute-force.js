const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const brandMap = {
    'blinkit': '#F8CB46',
    'zepto': '#D32E87', // Zepto purple-pink
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
        let searchToken = `Button--${brand}"`; // Look for the end of the class string
        
        // Sometimes it has spaces or newlines after
        // A safer way: find Button--blinkit
        let parts = updated.split(`Button--${brand}`);
        if (parts.length > 1) {
            for (let i = 0; i < parts.length - 1; i++) {
                // Determine if this instance already has hover-bg
                let postStr = parts[i + 1];
                let closeArrowIdx = postStr.indexOf('>');
                if (closeArrowIdx !== -1) {
                    let insideTag = postStr.substring(0, closeArrowIdx);
                    if (!insideTag.includes('--hover-bg')) {
                        // Find where style="" is, or inject it
                        let styleIdx = insideTag.indexOf('style="');
                        if (styleIdx !== -1) {
                            let styleStart = styleIdx + 7;
                            postStr = postStr.substring(0, styleStart) + `--hover-bg: ${color}; --hover-text: #fff; ` + postStr.substring(styleStart);
                        } else {
                            // Inject style just before >
                            postStr = insideTag + ` style="--hover-bg: ${color}; --hover-text: #fff;"` + postStr.substring(closeArrowIdx);
                        }
                    }
                }
                parts[i + 1] = postStr;
            }
            updated = parts.join(`Button--${brand}`);
        }
    }

    if (updated !== original) {
        fs.writeFileSync(filePath, updated);
        console.log(`Injected style strings into ${file}`);
    }
});
