const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const finalFixCSS = `
<style id="mvst-final-arrow-btn-fix">
/* 1. Remove Extra Arrows */
.Product__SlideshowNavArrow, 
.Product__Gallery .Product__SlideshowNav .flickity-prev-next-button {
    display: none !important;
}

/* 2. Style Main Gallery Arrows */
.Product__Slideshow .flickity-prev-next-button {
    background: white !important;
    border-radius: 50% !important;
    width: 48px !important;
    height: 48px !important;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
    opacity: 0 !important;
    transition: opacity 0.3s ease, background 0.2s ease !important;
    z-index: 10 !important;
}

.Product__Gallery:hover .Product__Slideshow .flickity-prev-next-button {
    opacity: 1 !important;
}

.Product__Slideshow .flickity-prev-next-button:hover {
    background: #f5f5f5 !important;
}

.Product__Slideshow .flickity-prev-next-button.previous {
    left: 20px !important;
}

.Product__Slideshow .flickity-prev-next-button.next {
    right: 20px !important;
}

/* 3. Button Hover Fix */
.Marketplace .Button {
    background-color: transparent !important;
    border: 1px solid #ccc !important;
    color: #111 !important;
    border-radius: 2px !important; /* Rectangular */
    transition: all 0.2s ease !important;
}

.Marketplace .Button:hover {
    background-color: var(--hover-bg, #111) !important;
    border-color: var(--hover-bg, #111) !important;
    color: var(--hover-text, #fff) !important;
}

/* Ensure images inside buttons stay visible */
.Marketplace .Button img {
    filter: none !important;
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // Remove ALL previous style iterations to prevent clash
    $('style[id^="mvst-"]').remove();

    // Fix the marketplace buttons: Strip inline border-radius
    $('.Marketplace__Grid a').each((i, el) => {
        let style = $(el).attr('style') || '';
        // Remove border-radius: 30px;
        let cleanedStyle = style.replace(/border-radius\s*:\s*30px\s*;?/gi, '');
        $(el).attr('style', cleanedStyle);
    });

    // Inject the new consolidated fix block
    let updatedHtml = $.html();
    updatedHtml = updatedHtml.replace('</body>', finalFixCSS + '</body>');

    fs.writeFileSync(filePath, updatedHtml);
    console.log(`Fixed buttons and arrows in ${file}`);
});
