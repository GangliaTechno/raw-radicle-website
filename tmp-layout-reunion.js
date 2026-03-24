const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const absoluteVictoryCSS = `
<style id="mvst-absolute-final-victory-v7">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

/* Reset */
body, .Heading, .Button, .ProductMeta__Title { font-family: 'Montserrat', sans-serif !important; }

/* 2-Column Side-by-Side Force */
@media screen and (min-width: 1008px) {
    /* The core issue: Parent section must be flex if Gallery and Info are separated */
    .Product {
        display: flex !important;
        flex-direction: row !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
        max-width: 1400px !important;
        margin: 0 auto !important;
        padding-top: 60px !important;
        gap: 60px !important;
    }

    /* Wrap the Gallery part */
    .Product__Wrapper {
        flex: 0 0 60% !important;
        width: 60% !important;
        display: block !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    
    .Product__Gallery {
        width: 100% !important;
        display: flex !important;
        gap: 20px !important;
    }

    /* Wrap the Info part */
    .Product__InfoWrapper {
        flex: 0 0 38% !important;
        width: 38% !important;
        margin: 0 !important;
        padding: 0 !important;
        position: sticky !important;
        top: 100px !important;
    }
}

/* Arrows Fix - MVST Edge Positioning */
.Product__Slideshow {
    position: relative !important;
}

.Product__Slideshow .flickity-prev-next-button {
    background: white !important;
    border: none !important;
    border-radius: 50% !important;
    width: 44px !important;
    height: 44px !important;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1) !important;
    position: absolute !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    opacity: 0 !important;
    transition: opacity 0.3s ease !important;
    z-index: 100 !important;
}

.Product__Slideshow:hover .flickity-prev-next-button {
    opacity: 1 !important;
}

.Product__Slideshow .flickity-prev-next-button.previous { left: 20px !important; }
.Product__Slideshow .flickity-prev-next-button.next { right: 20px !important; }

/* Marketplace Button Styles */
.Marketplace .Button {
    background-color: transparent !important;
    border: 1px solid #dcdcdc !important;
    color: #111 !important;
    border-radius: 2px !important;
    height: 52px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.2s ease !important;
}

.Marketplace .Button:hover {
    background-color: #f7f7f7 !important;
    border-color: #333 !important;
}

.Marketplace .Button img {
    width: 28px !important;
    margin-left: 10px !important;
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    let updated = original;
    // Clear all previous attempts
    updated = updated.replace(/<style id=["']mvst-.*?["']>[\s\S]*?<\/style>/g, '');
    
    // Inject the side-by-side force
    updated = updated.replace('</body>', absoluteVictoryCSS + '</body>');
    
    // Safety check for logo width
    updated = updated.replace(/width:18px/g, 'width:28px');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Applied side-by-side layout reunion.');
