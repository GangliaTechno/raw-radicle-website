const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const brandData = [
    { name: 'Blinkit', file: 'blinkit.png', color: '#F8CB46' },
    { name: 'Zepto', file: 'zepto.png', color: '#FF3269' },
    { name: 'Amazon', file: 'amazon.png', color: '#FF9900' },
    { name: 'Instamart', file: 'instamart.png', color: '#FC8019' },
    { name: 'Flipkart', file: 'flipkart.png', color: '#2874F0', span: 2 }
];

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    // Some files might have carriage returns causing issues, normalize to \n
    original = original.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    const $ = cheerio.load(original, { decodeEntities: false });
    
    let modified = false;

    // Find the marketplace grid
    let $grid = $('.Marketplace__Grid');
    if ($grid.length > 0) {
        $grid.empty(); // Clear corrupted/old buttons completely
        
        $grid.attr('style', `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 15px;
            padding-bottom: 20px;
        `);

        brandData.forEach(brand => {
            let spanStyle = brand.span ? `grid-column: span ${brand.span};` : '';
            let btnHtml = `
            <a href="#" target="_blank" class="ProductForm__AddToCart Button Button--secondary Button--full Button--${brand.name.toLowerCase()}"
               style="
                   ${spanStyle}
                   border-radius: 30px;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   gap: 10px;
                   padding: 14px 16px;
                   white-space: nowrap;
                   --hover-bg: ${brand.color};
                   --hover-text: #fff;
               ">
               BUY ON <img src="../assets/${brand.file}" alt="${brand.name}" style="width:18px; height:18px; object-fit:contain; flex-shrink:0;">
            </a>`;
            $grid.append(btnHtml);
        });
        
        modified = true;
    }

    // Also inject the footer clearance!
    let $infoWrapper = $('.Product__InfoWrapper');
    if ($infoWrapper.length > 0) {
        let currentStyle = $infoWrapper.attr('style') || '';
        if (!currentStyle.includes('padding-bottom: 120px')) {
            $infoWrapper.attr('style', currentStyle + ' padding-bottom: 120px !important;');
            modified = true;
        }
    }

    if (modified) {
        // We write out the perfectly reconstructed DOM string
        fs.writeFileSync(filePath, $.html());
        console.log(`Successfully rebuilt buttons and fixed footer clearance in ${file}.`);
    } else {
        console.log(`No .Marketplace__Grid found in ${file}.`);
    }
});
