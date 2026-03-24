const fs = require('fs');
const path = require('path');

const absoluteFinalVictoryCSS = `
<style id="mvst-final-structural-victory">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

/* Reset */
body, .Heading, .Button, .ProductMeta__Title { font-family: 'Montserrat', sans-serif !important; }

/* 2-Column Side-by-Side Force at the SECTION level */
@media screen and (min-width: 1008px) {
    section.Product.Product--large {
        display: flex !important;
        flex-direction: row !important;
        align-items: flex-start !important;
        justify-content: space-between !important;
        max-width: 1400px !important;
        margin: 0 auto !important;
        padding-top: 60px !important;
        gap: 60px !important;
    }

    /* Column 1: Gallery */
    .Product__Wrapper {
        flex: 0 0 58% !important;
        width: 58% !important;
        margin: 0 !important;
        padding: 0 !important;
    }
    
    .Product__Gallery {
        width: 100% !important;
        display: flex !important;
        flex-direction: row !important;
        gap: 20px !important;
    }

    /* Column 2: Info */
    .Product__InfoWrapper {
        flex: 0 0 38% !important;
        width: 38% !important;
        margin: 0 !important;
        padding: 0 !important;
        position: sticky !important;
        top: 100px !important;
    }
    
    .ProductMeta__Title {
        font-size: 20px !important;
        letter-spacing: 3.5px !important;
        text-transform: uppercase !important;
        margin-bottom: 12px !important;
    }
}

/* Arrows Fix - MVST Edge Positioning */
.Product__Slideshow { position: relative !important; }
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
.Product__Slideshow:hover .flickity-prev-next-button { opacity: 1 !important; }
.Product__Slideshow .flickity-prev-next-button.previous { left: 20px !important; }
.Product__Slideshow .flickity-prev-next-button.next { right: 20px !important; }

/* Marketplace Buttons - Minimalist & Enlarged Logos */
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
    padding: 0 15px !important;
}
.Marketplace .Button:hover {
    background-color: #f7f7f7 !important;
    border-color: #333 !important;
}
.Marketplace .Button img {
    width: 28px !important;
    margin-left: 10px !important;
}

/* Cleanup extra arrows */
.Product__SlideshowNavArrow, [data-direction="prev"], [data-direction="next"] {
    display: none !important;
}

/* Restore Size Selection blocks */
.SizeSelector { display: flex !important; gap: 12px !important; margin: 15px 0 !important; }
.SizeSelector__Item {
    width: 100px !important;
    height: 44px !important;
    border: 1px solid #ddd !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 0 !important;
}
.SizeSelector__Item.is-selected { border-color: #111 !important; background: #fdfdfd !important; font-weight: 600 !important; }
</style>
`;

const pagesDir = 'd:/project2/public/pages';
const filenames = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html') && !f.includes('index') && !f.includes('about') && !f.includes('search') && !f.includes('contact'));

filenames.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    // Safety check: already applied?
    if (original.includes('id="mvst-final-structural-victory"')) {
        console.log(`Already applied to ${file}`);
        return;
    }

    // Injection Marker
    let marker = original.includes('</body>') ? '</body>' : (original.includes('</html>') ? '</html>' : null);
    
    if (marker) {
        let content = original.replace(marker, absoluteFinalVictoryCSS + marker);
        fs.writeFileSync(filePath, content);
        console.log(`Applied to ${file}`);
    } else {
        console.warn(`No injection marker found for ${file}`);
    }
});
