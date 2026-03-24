const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    // Remove the Godiva embedded style block
    let cleaned = original.replace(/<style>\s*\/\* --- GODIVA-INSPIRED LUXURY STYLING OVERRIDES --- \*\/[\s\S]*?<\/style>/g, '');
    
    // Some versions might not have the exact comment but have Godiva styles, let's just make sure we strip any style that has 'GODIVA-INSPIRED'
    cleaned = cleaned.replace(/<style>[^<]*GODIVA-INSPIRED[^<]*<\/style>/ig, '');

    // Let's also check for any other random inline styles inside ProductForm__BuyButtons that shouldn't be there
    // We already have our deep CSS injected at the bottom.

    if (cleaned !== original) {
        fs.writeFileSync(filePath, cleaned);
        console.log(`Removed Godiva styles from ${file}`);
    }
});
console.log('Finished removing embedded Godiva styles.');
