const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const mvstTrueFinalCSS = `
<style id="mvst-true-final">
/* 
   MVST TRUE FINAL REFINEMENT 
*/

@media screen and (min-width: 1008px) {
    .Product {
        padding-top: 50px !important;
    }

    /* Force Slider Height */
    .Product__Slideshow {
        min-height: 700px !important;
        height: auto !important;
        display: block !important;
    }
    .flickity-viewport {
        min-height: 700px !important;
        height: auto !important;
    }
    .Product__SlideItem {
        min-height: 700px !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
    }
    .Product__SlideItem img {
        max-height: 700px !important;
        width: 100% !important;
        object-fit: contain !important;
    }

    /* Meta Alignment */
    .ProductMeta {
        margin-bottom: 0 !important;
    }
    .ProductMeta__Title {
        font-family: 'Outfit', sans-serif !important;
        font-weight: 500 !important;
        font-size: 30px !important;
        letter-spacing: 0.1em !important;
        margin-bottom: 15px !important;
    }
    .ProductMeta__PriceList {
        margin-top: 20px !important;
        margin-bottom: 20px !important;
    }
    .ProductMeta__Price {
        font-size: 24px !important;
        color: #111 !important;
        font-family: 'Outfit', sans-serif !important;
    }
    
    /* Layout fix for spacing */
    .Product__InfoWrapper {
         padding-left: 60px !important;
    }
    
    /* Quantity */
    .QuantitySelector {
        height: 55px !important;
        width: 160px !important;
    }

    /* Arrows */
    .flickity-prev-next-button {
        top: 50% !important;
        transform: translateY(-50%) !important;
        width: 50px !important;
        height: 50px !important;
    }
}

/* Button Refinement */
.Marketplace .Button {
    height: 55px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 13px !important;
    text-transform: uppercase !important;
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    let updated = original;
    // Remove all previous refinement attempts to avoid bloat/conflicts
    updated = updated.replace(/<style id=["']mvst-ultra-refined["']>[\s\S]*?<\/style>/g, '');
    updated = updated.replace(/<style id=["']mvst-perfect-layout["']>[\s\S]*?<\/style>/g, '');
    updated = updated.replace(/<style id=["']mvst-final-polish["']>[\s\S]*?<\/style>/g, '');
    updated = updated.replace(/<style id=["']mvst-true-final["']>[\s\S]*?<\/style>/g, '');

    // Refine the AdaptiveHeight setting in Flickity config
    updated = updated.replace('"adaptiveHeight": true', '"adaptiveHeight": false');
    
    // Inject at the end
    updated = updated.replace('</body>', mvstTrueFinalCSS + '</body>');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Applied TRUE FINAL REFINEMENT.');
