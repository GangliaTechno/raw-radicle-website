const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const perfectionCSS = `
<style id="mvst-perfection-consolidated">
/* 1. Remove Any Extra/Legacy Arrows */
.Product__SlideshowNavArrow, 
.Product__Gallery .Product__SlideshowNav .flickity-prev-next-button,
.Product__Wrapper > .flickity-prev-next-button {
    display: none !important;
}

/* 2. Main Gallery Arrows - Spread to Edges */
.Product__Slideshow {
    position: relative !important; /* Critical anchoring */
    overflow: hidden !important;
}

.Product__Slideshow .flickity-prev-next-button {
    position: absolute !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    background: white !important;
    border-radius: 50% !important;
    width: 48px !important;
    height: 48px !important;
    box-shadow: 0 4px 15px rgba(0,0,0,0.12) !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1) !important;
    z-index: 100 !important;
    border: none !important;
}

.Product__Slideshow:hover .flickity-prev-next-button {
    opacity: 1 !important;
    visibility: visible !important;
}

.Product__Slideshow .flickity-prev-next-button.previous {
    left: 20px !important;
}

.Product__Slideshow .flickity-prev-next-button.next {
    right: 20px !important;
}

/* 3. Marketplace Button Hover Logic (Branded) */
.Marketplace .Button {
    background-color: transparent !important;
    color: #111 !important;
    border: 1px solid #d0d0d0 !important;
    border-radius: 2px !important; /* Sharp Rectangular */
    transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease !important;
}

.Marketplace .Button:hover {
    color: #fff !important;
}

.Marketplace .Button--blinkit:hover { background-color: #F8CB46 !important; border-color: #F8CB46 !important; }
.Marketplace .Button--zepto:hover { background-color: #FF3269 !important; border-color: #FF3269 !important; }
.Marketplace .Button--amazon:hover { background-color: #FF9900 !important; border-color: #FF9900 !important; }
.Marketplace .Button--instamart:hover { background-color: #FC8019 !important; border-color: #FC8019 !important; }
.Marketplace .Button--flipkart:hover { background-color: #2874F0 !important; border-color: #2874F0 !important; }

/* 4. Size Selector Spacing */
.SizeSelector {
    display: flex !important;
    gap: 15px !important;
    margin-top: 15px !important;
}
.SizeSelector__Item {
    padding: 10px 25px !important;
    margin-right: 5px !important;
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // Clean up all prev blocks
    $('style[id^="mvst-"]').remove();
    
    // Remove the extra arrows if they are static html
    $('.Product__SlideshowMobileNav').remove(); 

    // Inject consolidated fix
    let updatedHtml = $.html();
    updatedHtml = updatedHtml.replace('</body>', perfectionCSS + '</body>');

    fs.writeFileSync(filePath, updatedHtml);
    console.log(\`Ultimate Perfection in \${file}\`);
});
