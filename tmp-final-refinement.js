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

const finalStyles = `
/* --- FINAL REFINEMENTS (TRANSPARENCY & HOVER ARROWS) --- */
.Marketplace .Button {
  background-color: transparent !important;
  color: #111111 !important;
  border: 1px solid #cfcfcf !important;
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1) !important;
}

.Marketplace .Button:hover {
  color: var(--hover-text, #ffffff) !important;
  border-color: var(--hover-bg, #111111) !important;
}

/* Hide Arrows by default, show on Gallery Hover */
.Product__Gallery .flickity-prev-next-button {
  opacity: 0 !important;
  transition: opacity 0.3s ease !important;
  visibility: visible !important;
}

.Product__Gallery:hover .flickity-prev-next-button {
  opacity: 1 !important;
}

/* Circular Arrow overrides (Ensuring persistence) */
.flickity-prev-next-button {
  width: 48px !important;
  height: 48px !important;
  background: white !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
  border: 1px solid #e1e1e1 !important;
}
.flickity-prev-next-button svg {
  width: 12px !important;
  height: auto !important;
  fill: #111111 !important;
}
`;

const syncScript = `
<script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.Product__Slideshow');
  if (!carousel) return;
  
  const initSync = () => {
    const flkty = Flickity.data(carousel);
    if (!flkty) return;
    
    const thumbs = document.querySelectorAll('.Product__SlideshowNavImage');
    thumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        flkty.select(index);
      });
    });
    
    flkty.on('select', () => {
      thumbs.forEach((t, i) => {
        if (i === flkty.selectedIndex) t.classList.add('is-selected');
        else t.classList.remove('is-selected');
      });
    });
  };

  // Multiple attempts to ensure Flickity is ready
  setTimeout(initSync, 500);
  setTimeout(initSync, 1500);
});
</script>
`;

pagesToUpdate.forEach(page => {
    const pagePath = path.join(pagesDir, page);
    if (!fs.existsSync(pagePath)) return;
    
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    
    // 1. Transparent Buttons Logic
    // We already have .Marketplace .Button { ... } in the file. We need to replace it.
    // Let's find the closing brace of the previous .Marketplace .Button block.
    // Actually, I'll just append my Final Refinements block at the end of the <style> tag.
    if (!pageContent.includes('/* --- FINAL REFINEMENTS')) {
        const styleEndIdx = pageContent.lastIndexOf('</style>');
        if (styleEndIdx !== -1) {
            pageContent = pageContent.substring(0, styleEndIdx) + finalStyles + pageContent.substring(styleEndIdx);
        }
    }

    // 2. Enable Flickity Arrows (Ensure native buttons are used)
    pageContent = pageContent.replace(/"prevNextButtons":\s*false/g, '"prevNextButtons": true');
    
    // 3. Hide the custom theme arrows (Product__SlideshowMobileNav) to avoid confusion
    pageContent = pageContent.replace(/class="Product__SlideshowMobileNav"/g, 'class="Product__SlideshowMobileNav" style="display:none !important;"');

    // 4. Inject the Sync Script at the end of <body>
    if (!pageContent.includes('// Multiple attempts to ensure Flickity is ready')) {
        const bodyEndIdx = pageContent.lastIndexOf('</body>');
        if (bodyEndIdx !== -1) {
            pageContent = pageContent.substring(0, bodyEndIdx) + syncScript + pageContent.substring(bodyEndIdx);
        }
    }

    fs.writeFileSync(pagePath, pageContent, 'utf8');
    console.log(`Updated ${page}`);
});
console.log("Done.");
