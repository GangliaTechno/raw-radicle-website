const fs = require('fs');
const path = require('path');

const publicDir = 'd:/project2/public';
const pagesDir = path.join(publicDir, 'pages');

const pagesToUpdate = [
    'adarkc.html',
    'amilkc.html',
    'bdarkc.html',
    'bmilkc.html',
    'cdarkc.html',
    'cmilkc.html',
    'shots.html',
    'balm.html'
];

pagesToUpdate.forEach(page => {
    const pagePath = path.join(pagesDir, page);
    if (!fs.existsSync(pagePath)) {
        console.log(`Skipping ${page}, does not exist.`);
        return;
    }
    
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    
    // Restore stackProductImages to true, keep showThumbnails true
    pageContent = pageContent.replace(/"stackProductImages":\s*false,/g, '"stackProductImages": true,');
    
    // Restore the --stack class alongside --withThumbnails
    pageContent = pageContent.replace(/class="Product__Gallery Product__Gallery--withThumbnails"/g, 'class="Product__Gallery Product__Gallery--stack Product__Gallery--withThumbnails"');
    
    // Remove the aggressive image height restraints I mistakenly added earlier.
    // They are currently: .Product__Gallery img, .Product__Slideshow .Image--lazyLoaded { max-height: 80vh !important;
    // Let's locate the CSS string and wipe out the max-height and object-fit bounds so the stacked images can be full height.
    pageContent = pageContent.replace(/max-height: 80vh !important;/g, '');
    pageContent = pageContent.replace(/max-height: 85vh !important;/g, '');

    fs.writeFileSync(pagePath, pageContent, 'utf8');
    console.log(`Successfully restored stack configuration on ${page}`);
});
console.log("Done.");
