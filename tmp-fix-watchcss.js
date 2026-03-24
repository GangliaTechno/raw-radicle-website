const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Disable watchCSS to force Flickity carousel instead of stack layout
    let updated = content.replace(/"watchCSS":\s*true/g, '"watchCSS": false');
    
    // Also ensuring no hardcoded --stack class exists in HTML (just in case)
    updated = updated.replace(/Product__Gallery--stack/g, '');
    
    if (content !== updated) {
        fs.writeFileSync(filePath, updated);
        console.log(`Updated watchCSS in ${file}`);
    }
});
console.log('Finished updating watchCSS.');
