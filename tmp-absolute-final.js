const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const mvstAbsoluteFinalCSS = `
<style id="mvst-absolute-final">
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

@media screen and (min-width: 1008px) {
    /* Main Layout */
    .Product__Wrapper {
        display: flex !important;
        max-width: 1400px !important;
        margin: 0 auto !important;
        gap: 60px !important;
    }

    .Product__Gallery {
        flex: 1 1 65% !important; /* Take 65% of space */
        width: auto !important;
        display: flex !important;
        gap: 20px !important;
    }

    .Product__InfoWrapper {
        flex: 0 0 35% !important; /* Take 35% fixed */
        width: auto !important;
        max-width: 450px !important;
        position: relative !important;
    }

    /* Slideshow Fix */
    .Product__Slideshow {
        flex: 1 !important;
        min-height: 600px !important;
        height: 600px !important;
        visibility: visible !important;
        opacity: 1 !important;
        display: block !important;
    }
    
    .flickity-viewport {
        height: 100% !important;
        min-height: 600px !important;
    }

    .Product__SlideItem {
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
    }

    .Product__SlideItem img {
        height: 100% !important;
        width: 100% !important;
        object-fit: contain !important;
    }

    /* Thumbs fix */
    .Product__SlideshowNav {
        width: 80px !important;
        flex-shrink: 0 !important;
    }

    /* Size Boxes fix */
    .SizeSelector {
        display: flex !important;
        flex-direction: row !important;
        gap: 15px !important;
        margin-top: 15px !important;
    }
    .SizeSelector__Item {
        padding: 12px 25px !important;
        border: 1px solid #ddd !important;
        background: white !important;
        cursor: pointer !important;
        border-radius: 4px !important;
        font-family: 'Outfit', sans-serif !important;
    }
    .SizeSelector__Item.is-selected {
        border-color: #111 !important;
        background: #f9f9f9 !important;
    }
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let updated = content;
    // Strip ALL previous attempts
    updated = updated.replace(/<style id=["']mvst-.*?["']>[\s\S]*?<\/style>/g, '');
    
    // Inject CSS
    updated = updated.replace('</body>', mvstAbsoluteFinalCSS + '</body>');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Applied absolute final recovery.');
