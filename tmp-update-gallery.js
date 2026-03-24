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
    
    // 1. Update JSON configurations (using flex regex for spacing/newlines)
    pageContent = pageContent.replace(/"stackProductImages":\s*true,/g, '"stackProductImages": false,');
    pageContent = pageContent.replace(/"showThumbnails":\s*false,/g, '"showThumbnails": true,');
    
    // 2. Update Gallery Classes
    pageContent = pageContent.replace(/Product__Gallery--stack Product__Gallery--withDots/g, 'Product__Gallery--withThumbnails');
    // Ensure that if it was already updated, we don't duplicate. Wait, the previous replacement might have already removed them, but it's safe.

    // 3. Extract slides to build thumbnails
    // We need to parse all <div class="Product__SlideItem ... id="MediaXXX"> ... <img ... src="YYY" />
    const slideRegex = /id="(Media\d+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"/g;
    let match;
    let thumbnailHtml = `            <div class="Product__SlideshowNav Product__SlideshowNav--thumbnails">\n              <div class="Product__SlideshowNavScroller">\n`;
    let isFirst = true;

    while ((match = slideRegex.exec(pageContent)) !== null) {
        const mediaId = match[1];
        const imgSrc = match[2];
        const selectedClass = isFirst ? ' is-selected' : '';
        thumbnailHtml += `                <a class="Product__SlideshowNavImage AspectRatio${selectedClass}" style="--aspect-ratio: 1.0" href="#${mediaId}">\n`;
        thumbnailHtml += `                  <img src="${imgSrc}" />\n`;
        thumbnailHtml += `                </a>\n`;
        isFirst = false;
    }
    thumbnailHtml += `              </div>\n            </div>`;

    // 4. Find and replace the dots navigation block entirely.
    // Searching from `<div class="Product__SlideshowNav Product__SlideshowNav--dots">` down to its closing `</div></div>`
    const dotsStartStr = '<div class="Product__SlideshowNav Product__SlideshowNav--dots">';
    const dotsStartIndex = pageContent.indexOf(dotsStartStr);
    
    if (dotsStartIndex !== -1) {
        // The block looks like:
        // <div class="Product__SlideshowNav Product__SlideshowNav--dots">
        //   <div class="Product__SlideshowNavScroller">
        //      ... <a></a> ...
        //   </div>
        // </div>
        // We can just find the immediate next `<div class="Product__Slideshow ` (which starts the main carousel) to know the boundary.
        const dotsEndStr = '<div class="Product__Slideshow ';
        const dotsEndIndex = pageContent.indexOf(dotsEndStr, dotsStartIndex);
        
        if (dotsEndIndex !== -1) {
            // Include capturing preceding whitespaces for proper indentation replacement
            pageContent = pageContent.substring(0, dotsStartIndex) + thumbnailHtml + '\n\n            ' + pageContent.substring(dotsEndIndex);
            fs.writeFileSync(pagePath, pageContent, 'utf8');
            console.log(`Successfully refactored gallery in ${page}`);
        } else {
            console.log(`Could not find the end of dots nav in ${page}`);
        }
    } else {
        console.log(`Dots nav not found in ${page}. Already upgraded or structurally different?`);
    }
});
console.log("Done.");
