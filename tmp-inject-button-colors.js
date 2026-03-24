const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const brandMap = {
    'Blinkit': '#F8CB46',
    'Zepto': '#FF3269', // Using their distinct pink/purple
    'Amazon': '#FF9900',
    'Instamart': '#FC8019', // Swiggy orange
    'Flipkart': '#2874F0'
};

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    // Replace all <a> tags that have class containing "Button"
    let updated = original.replace(/<a\s+([^>]*class="[^"]*Button[^"]*"[^>]*)>([\s\S]*?)<\/a>/gi, (fullMatch, attrStr, content) => {
        // Find which brand class is present
        let matchedBrand = null;
        for (let brand in brandMap) {
            let brandClassRegex = new RegExp(`Button--${brand.toLowerCase().replace(/\\s/g, '')}`, 'i');
            if (brandClassRegex.test(attrStr)) {
                matchedBrand = brand;
                break;
            }
        }
        
        // Also fallback to checking href or outer image alt tag if brand class is missing
        if (!matchedBrand) {
            let hrefMatch = attrStr.match(/href="([^"]+)"/i);
            if (hrefMatch) {
                let href = hrefMatch[1];
                matchedBrand = Object.keys(brandMap).find(brand => href.toLowerCase().includes(brand.toLowerCase().replace(/\s/g, '')));
            }
        }
        if (!matchedBrand) {
            let imgMatch = content.match(/alt="([^"]+)"/i);
            if (imgMatch) {
                let alt = imgMatch[1];
                matchedBrand = Object.keys(brandMap).find(brand => alt.toLowerCase().includes(brand.toLowerCase()));
            }
        }

        if (matchedBrand) {
            let color = brandMap[matchedBrand];
            let newAttrStr = attrStr;
            
            // Inject or override the style variable
            if (newAttrStr.includes('--hover-bg')) {
                 newAttrStr = newAttrStr.replace(/--hover-bg:[^;]+;/, `--hover-bg: ${color};`);
            } else {
                if (!newAttrStr.includes('style=')) {
                    newAttrStr += ` style="--hover-bg: ${color}; --hover-text: #fff;"`;
                } else {
                    // Inject at the end of existing style string
                    // Handle multi-line styles!
                    newAttrStr = newAttrStr.replace(/style="([^"]*)"/i, `style="$1 --hover-bg: ${color}; --hover-text: #fff;"`);
                    // Handle single quote case if any
                    newAttrStr = newAttrStr.replace(/style='([^']*)'/i, `style='$1 --hover-bg: ${color}; --hover-text: #fff;'`);
                }
            }
            return `<a ${newAttrStr}>${content}</a>`;
        }
        return fullMatch; // unchanged if no brand found
    });

    if (updated !== original) {
        fs.writeFileSync(filePath, updated);
        console.log(`Injected button hover colors into ${file}`);
    }
});
console.log('Finished injecting hover colors.');
