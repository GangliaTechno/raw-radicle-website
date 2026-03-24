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

const arrowStyles = `
/* Re-targeting Circular Arrows to the theme's specific classes */
.Product__SlideshowNavArrow, .flickity-prev-next-button {
  width: 48px !important;
  height: 48px !important;
  background: white !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
  border: 1px solid #e1e1e1 !important;
  transition: all 0.3s ease !important;
  z-index: 10 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: absolute !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
}
.Product__SlideshowNavArrow:hover, .flickity-prev-next-button:hover {
  background: white !important;
  opacity: 1 !important;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15) !important;
}
.Product__SlideshowNavArrow--previous, .flickity-prev-next-button.previous { left: 15px !important; right: auto !important; }
.Product__SlideshowNavArrow--next, .flickity-prev-next-button.next { right: 15px !important; left: auto !important; }

.Product__SlideshowNavArrow svg, .flickity-prev-next-button svg {
  width: 12px !important;
  height: auto !important;
  fill: none !important;
  stroke: #111111 !important;
  stroke-width: 1.5px !important;
}
.Product__SlideshowNavArrow:before { display: none !important; }

/* Ensure the container doesn't clip the arrows and is visible on desktop */
.Product__SlideshowMobileNav {
  display: block !important;
  position: static !important;
}
`;

pagesToUpdate.forEach(page => {
    const pagePath = path.join(pagesDir, page);
    if (!fs.existsSync(pagePath)) return;
    
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    
    // 1. Remove 'hidden-lap-and-up' from the arrows container
    pageContent = pageContent.replace(/class="Product__SlideshowMobileNav hidden-lap-and-up"/g, 'class="Product__SlideshowMobileNav"');
    
    // 2. Disable Flickity's own buttons to use the theme's custom ones (to avoid duplication)
    pageContent = pageContent.replace(/"prevNextButtons":\s*true/g, '"prevNextButtons": false');

    // 3. Update the CSS block to target the correct classes
    if (pageContent.includes('/* Custom Circular Slider Arrows (MVST Style) */')) {
        // Replace previous block
        const startMarker = '/* Custom Circular Slider Arrows (MVST Style) */';
        const endMarker = '/* Brand Button Hooks */';
        const startIdx = pageContent.indexOf(startMarker);
        const endIdx = pageContent.indexOf(endMarker);
        if (startIdx !== -1 && endIdx !== -1) {
            pageContent = pageContent.substring(0, startIdx) + arrowStyles + '\n' + pageContent.substring(endIdx);
        }
    } else if (!pageContent.includes('/* Re-targeting Circular Arrows')) {
         const styleEndIdx = pageContent.lastIndexOf('</style>');
         if (styleEndIdx !== -1) {
            pageContent = pageContent.substring(0, styleEndIdx) + arrowStyles + pageContent.substring(styleEndIdx);
         }
    }

    fs.writeFileSync(pagePath, pageContent, 'utf8');
    console.log(`Updated ${page}`);
});
console.log("Done.");
