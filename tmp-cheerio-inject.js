const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

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
    
    // Load with cheerio, not altering formatting drastically if possible
    // actually cheerio might alter formatting slightly, but it guarantees DOM accuracy
    const $ = cheerio.load(original, { decodeEntities: false });
    
    let modified = false;

    // Loop through each brand and find matching buttons
    for (let brand in brandMap) {
        let color = brandMap[brand];
        let $btns = $(`a.Button--${brand}`);
        
        $btns.each((i, el) => {
            let existingStyle = $(el).attr('style') || '';
            if (!existingStyle.includes('--hover-bg')) {
                $(el).attr('style', existingStyle + ` --hover-bg: ${color}; --hover-text: #fff;`);
                modified = true;
            }
        });
    }

    if (modified) {
        fs.writeFileSync(filePath, $.html());
        console.log(`Successfully injected into ${file} using Cheerio.`);
    }
});
