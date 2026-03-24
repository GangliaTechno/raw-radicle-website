const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const pixelPerfectCSS = `
<style id="mvst-pixel-perfect">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

:root {
    --heading-font-family: 'Montserrat', sans-serif;
    --text-font-family: 'Montserrat', sans-serif;
}

body, .Heading, .Button, .ProductMeta__Title, .QuantitySelector {
    font-family: 'Montserrat', sans-serif !important;
}

@media screen and (min-width: 1008px) {
    .PageContent { 
        padding-top: 60px !important; 
    }
    
    .Product__Wrapper {
        display: flex !important;
        max-width: 1350px !important;
        margin: 0 auto !important;
        gap: 80px !important; /* Increased gap for pixel-perfection */
        align-items: flex-start !important;
    }

    /* Gallery Alignment */
    .Product__Gallery {
        flex: 1 1 55% !important;
        display: flex !important;
        gap: 20px !important;
        max-width: 750px !important;
    }
    
    .Product__Slideshow {
        flex: 1 !important;
        min-height: 600px !important;
        height: auto !important;
        position: relative !important;
    }
    
    .Product__SlideshowNav {
        width: 80px !important;
    }

    /* Info Column */
    .Product__InfoWrapper {
        flex: 0 0 40% !important;
        max-width: 480px !important;
        padding-left: 0 !important;
    }

    /* Typography Match */
    .ProductMeta__Title {
        font-size: 20px !important;
        font-weight: 500 !important;
        letter-spacing: 3.5px !important;
        text-transform: uppercase !important;
        color: #1c1c1c !important;
        margin-bottom: 12px !important;
    }
    
    .ProductMeta__Price {
        font-size: 16px !important;
        letter-spacing: 2px !important;
        color: #1c1c1c !important;
        font-weight: 400 !important;
        display: block !important;
        margin: 15px 0 !important;
    }

    /* Horizontal Line Parity */
    .ProductMeta__PriceList {
        border-bottom: 0.5px solid #eee !important;
        padding-bottom: 25px !important;
        margin-bottom: 25px !important;
    }

    /* Size Selector Rectangular Fix */
    .SizeSelector {
        display: flex !important;
        gap: 10px !important;
        margin-top: 15px !important;
    }
    
    .SizeSelector__Item {
        width: 100px !important;
        height: 48px !important;
        border: 1px solid #e8e8e8 !important;
        border-radius: 0 !important; /* Sharp corners like MVST */
        background: transparent !important;
        font-size: 13px !important;
        font-weight: 400 !important;
        letter-spacing: 1px !important;
        text-transform: capitalize !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
    }
    
    .SizeSelector__Item.is-selected {
        border: 1px solid #1c1c1c !important;
        background: #fdfdfd !important;
        font-weight: 500 !important;
    }

    /* Quantity Selector */
    .QuantitySelector {
        height: 50px !important;
        width: 140px !important;
        border: 1px solid #e8e8e8 !important;
        border-radius: 0 !important; /* Sharp corners */
    }

    /* Marketplace Buttons (Rectangular Fix) */
    .Marketplace__Grid {
        margin-top: 40px !important;
        gap: 12px !important;
    }

    .Marketplace .Button {
        height: 50px !important;
        border-radius: 2px !important; /* User asked for slight rounding, 2px is perfect rect */
        border: 1px solid #ccc !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        letter-spacing: 1.5px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 0 15px !important;
        transition: none !important; /* Instant hover feels more premium */
    }
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    let updated = original;
    // Remove ALL previous iterations
    updated = updated.replace(/<style id=["']mvst-.*?["']>[\s\S]*?<\/style>/g, '');
    
    // Inject pixel perfect CSS
    updated = updated.replace('</body>', pixelPerfectCSS + '</body>');
    
    // Ensure Title is uppercase in content if possible
    // Note: CSS text-transform handles this visually.
    
    fs.writeFileSync(filePath, updated);
});
console.log('Applied Pixel-Perfect MVST styling.');
