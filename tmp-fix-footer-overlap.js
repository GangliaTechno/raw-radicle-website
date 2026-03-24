const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const flexFixCSS = `
    /* Fix Footer Overlap */
    .Product__Wrapper {
        display: flex !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
    }
    .Product__InfoWrapper {
        position: relative !important;
        right: auto !important;
        top: auto !important;
        height: auto !important;
        flex: 0 0 450px !important; /* Fixed width for the info pane */
    }
    .Product__Gallery {
        width: calc(100% - 480px) !important;
    }
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    if (!original.includes('/* Fix Footer Overlap */')) {
        let replacementPattern = '@media screen and (min-width: 1008px) {';
        if (original.includes(replacementPattern)) {
             let updated = original.replace(replacementPattern, replacementPattern + '\n' + flexFixCSS);
             fs.writeFileSync(filePath, updated);
             console.log(`Injected flexbox layout fix into ${file}`);
        } else {
             console.log(`Could not find media query in ${file}`);
        }
    } else {
        console.log(`Fix already present in ${file}`);
    }
});
console.log('Finished injecting layout fixes.');
