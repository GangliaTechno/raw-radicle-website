const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const finalPolishCSS = "<style id='mvst-final-polish'> @media screen and (min-width: 1008px) { .Product__Slideshow { min-height: 500px !important; } .Product__Gallery.Product__Gallery--withThumbnails .Product__Slideshow { width: calc(100% - 100px) !important; flex: 1 !important; } .ProductMeta__Title { font-size: 28px !important; line-height: 1.2 !important; margin-bottom: 8px !important; } .ProductMeta__Price { font-size: 22px !important; color: #111 !important; margin-top: 10px !important; } .ProductForm__QuantitySelector { margin-top: 40px !important; } .QuantitySelector { height: 50px !important; width: 140px !important; } .Marketplace__Grid { margin-top: 50px !important; } .flickity-prev-next-button { transform: translateY(-50%) !important; opacity: 1 !important; visibility: visible !important; } } </style>";

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    let updated = original;
    // Remove previous iterations to keep clean
    updated = updated.replace(/<style id='mvst-final-polish'>[\s\S]*?<\/style>/g, '');
    
    // Inject before </body>
    updated = updated.replace('</body>', finalPolishCSS + '</body>');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Applied final polish for gallery visibility.');
