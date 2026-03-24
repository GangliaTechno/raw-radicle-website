const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const refinerCSS = `
<style id="mvst-perfect-layout">
/* MVST Perfect Layout Constraints */
@media screen and (min-width: 1008px) {
    /* Main Layout */
    .Product__Wrapper {
        display: flex !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
        max-width: 1400px !important;
        margin: 0 auto !important;
        padding: 0 40px !important;
    }
    
    .Product__Gallery {
        width: 60% !important;
        margin-bottom: 0 !important;
        padding-right: 40px !important;
    }

    .Product__InfoWrapper {
        position: relative !important;
        right: auto !important;
        top: auto !important;
        width: 40% !important;
        max-width: 500px !important;
        flex: 0 0 auto !important;
        padding-bottom: 80px !important;
    }

    /* Vertical Thumbnails */
    .Product__Gallery.Product__Gallery--withThumbnails {
        display: flex !important;
        align-items: flex-start !important;
        gap: 24px !important;
    }

    .Product__Gallery.Product__Gallery--withThumbnails .Product__SlideshowNav {
        width: 80px !important;
        flex: 0 0 80px !important;
        order: 1 !important;
        margin: 0 !important;
    }

    .Product__SlideshowNavImage {
        width: 100% !important;
        border: 1px solid transparent !important;
        border-radius: 4px !important;
        margin-bottom: 12px !important;
        aspect-ratio: 1 / 1 !important;
        overflow: hidden !important;
        display: block !important;
    }
    .Product__SlideshowNavImage.is-selected {
        border-color: #111111 !important;
    }
    
    .Product__SlideshowNavImage img {
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
    }

    /* Main Slideshow */
    .Product__Gallery.Product__Gallery--withThumbnails .Product__Slideshow {
        width: calc(100% - 104px) !important; /* 100% - (80px + 24px gap) */
        flex: 1 1 auto !important;
        order: 2 !important;
        position: relative !important; /* Crucial for arrows */
        border-radius: 8px !important;
        overflow: hidden !important;
        margin: 0 !important;
    }
    
    .Product__SlideItem {
        width: 100% !important;
    }

    .Product__SlideItem .AspectRatio {
        aspect-ratio: auto !important; 
        padding-bottom: 0 !important; 
    }
    
    .Product__SlideItem img {
        width: 100% !important;
        height: auto !important;
        object-fit: contain !important;
        max-height: 800px !important;
    }

    /* Fix Arrows Pos */
    .Product__Gallery .flickity-prev-next-button {
        position: absolute !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        z-index: 100 !important;
    }
    .Product__Gallery .flickity-prev-next-button.previous {
        left: 20px !important;
    }
    .Product__Gallery .flickity-prev-next-button.next {
        right: 20px !important;
    }
}

/* Button Defaults Ensure Transparent */
.Marketplace .Button {
    background-color: transparent !important;
    color: #111111 !important;
    border: 1px solid #cfcfcf !important;
}
.Marketplace .Button:hover {
    background-color: var(--hover-bg, #111111) !important;
    color: var(--hover-text, #ffffff) !important;
    border-color: var(--hover-bg, #111111) !important;
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    let cleaned = original.replace(/<style id="mvst-perfect-layout">[\s\S]*?<\/style>/g, '');
    let updated = cleaned;
    
    let insertionPoint = updated.lastIndexOf('</body>');
    if (insertionPoint !== -1) {
        updated = updated.substring(0, insertionPoint) + refinerCSS + '\n' + updated.substring(insertionPoint);
        fs.writeFileSync(filePath, updated);
        console.log(`Perfected layout in ${file}`);
    }
});
