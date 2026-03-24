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

const arrowStylesV2 = `
/* --- ARROW VISIBILITY & HOVER LOGIC --- */
.Product__SlideshowMobileNav {
  display: block !important;
  visibility: visible !important;
  position: static !important;
}

.flickity-page-dots { display: none !important; }

.Product__SlideshowNavArrow, .flickity-prev-next-button {
  width: 48px !important;
  height: 48px !important;
  background: white !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
  border: 1px solid #e1e1e1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: absolute !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  z-index: 20 !important;
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
}

.Product__Gallery:hover .Product__SlideshowNavArrow, 
.Product__Gallery:hover .flickity-prev-next-button {
  opacity: 1 !important;
}

.Product__SlideshowNavArrow--previous, .flickity-prev-next-button.previous { left: 15px !important; right: auto !important; }
.Product__SlideshowNavArrow--next, .flickity-prev-next-button.next { right: 15px !important; left: auto !important; }

.Product__SlideshowNavArrow svg, .flickity-prev-next-button svg {
  width: 12px !important;
  height: auto !important;
  fill: #111111 !important;
  stroke: none !important;
}
`;

pagesToUpdate.forEach(page => {
    const pagePath = path.join(pagesDir, page);
    if (!fs.existsSync(pagePath)) return;
    
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    
    // 1. Remove the 'display:none' parent squash
    pageContent = pageContent.replace(/class="Product__SlideshowMobileNav" style="display:none !important;"/g, 'class="Product__SlideshowMobileNav"');
    
    // 2. Append the V2 styling
    if (!pageContent.includes('/* --- ARROW VISIBILITY')) {
        const styleEndIdx = pageContent.lastIndexOf('</style>');
        if (styleEndIdx !== -1) {
            pageContent = pageContent.substring(0, styleEndIdx) + arrowStylesV2 + pageContent.substring(styleEndIdx);
        }
    }

    fs.writeFileSync(pagePath, pageContent, 'utf8');
    console.log(`Updated ${page}`);
});
console.log("Done.");
