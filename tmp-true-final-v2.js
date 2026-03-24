const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const mvstTrueFinalCSS = `
<style id="mvst-true-final">
/* 
   MVST TRUE FINAL REFINEMENT 
*/
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

@media screen and (min-width: 1008px) {
    .Product {
        padding-top: 50px !important;
    }

    /* Force Slider Height */
    .Product__Slideshow {
        min-height: 600px !important;
        height: auto !important;
        display: block !important;
    }
    .flickity-viewport {
        min-height: 600px !important;
        height: auto !important;
    }
    .Product__SlideItem {
        min-height: 600px !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }
    .Product__SlideItem img {
        max-height: 600px !important;
        width: auto !important;
        max-width: 100% !important;
        object-fit: contain !important;
    }
    
    /* Meta Spacing */
    .ProductMeta__Title {
        font-family: 'Outfit', sans-serif !important;
        font-weight: 500 !important;
        font-size: 28px !important;
        letter-spacing: 0.1em !important;
        margin-bottom: 8px !important;
    }
    
    .Product__InfoWrapper {
         padding-left: 50px !important;
    }

    /* Arrows */
    .flickity-prev-next-button {
        background: white !important;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        width: 44px !important;
        height: 44px !important;
        border: none !important;
        opacity: 0.8 !important;
    }
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let updated = content;
    // Remove all previous refinement attempts to avoid bloat/conflicts
    updated = updated.replace(/<style id=["']mvst-ultra-refined["']>[\s\S]*?<\/style>/g, '');
    updated = updated.replace(/<style id=["']mvst-perfect-layout["']>[\s\S]*?<\/style>/g, '');
    updated = updated.replace(/<style id=["']mvst-final-polish["']>[\s\S]*?<\/style>/g, '');
    updated = updated.replace(/<style id=["']mvst-true-final["']>[\s\S]*?<\/style>/g, '');

    // Refine the AdaptiveHeight setting in Flickity config (encoded version)
    updated = updated.replace('&quot;adaptiveHeight&quot;: true', '&quot;adaptiveHeight&quot;: false');
    
    // Inject CSS
    updated = updated.replace('</body>', mvstTrueFinalCSS + '</body>');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Fixed AdaptiveHeight and applied final styles.');
