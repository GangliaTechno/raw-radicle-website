const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const ultraRefinedCSS = "<style id='mvst-ultra-refined'>@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap'); :root { --heading-font-family: 'Outfit', sans-serif; --text-font-family: 'Outfit', sans-serif; } body, .Heading, .Button, .ProductMeta__Title, .QuantitySelector { font-family: 'Outfit', sans-serif !important; } .ProductMeta__Title { font-size: 26px !important; font-weight: 500 !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; color: #111 !important; margin-bottom: 4px !important; margin-top: 0 !important; } .ProductMeta__Sku { margin-bottom: 24px !important; font-size: 11px !important; letter-spacing: 0.15em !important; color: #888 !important; font-weight: 500 !important; } .ProductMeta__Description { margin-top: 24px !important; font-size: 14px !important; line-height: 1.6 !important; color: #444 !important; } .ProductMeta__Price { font-size: 19px !important; letter-spacing: 0.05em !important; color: #111 !important; font-weight: 400 !important; } .SizeSelector { display: flex; gap: 12px; align-items: center; margin-top: 12px; } .SizeSelector__Item { padding: 10px 30px; border: 1px solid #d0d0d0; cursor: pointer; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; background: white; transition: all 0.2s ease; border-radius: 4px; } .is-selected { border-color: #111 !important; background-color: #f5f5f5 !important; } .ProductForm__Label { font-weight: 600 !important; font-size: 14px !important; color: #111 !important; } .Marketplace__Grid { margin-top: 40px !important; grid-template-columns: 1fr 1fr !important; gap: 16px !important; } .Marketplace .Button { border-radius: 50px !important; border: 1.5px solid #d0d0d0 !important; font-weight: 600 !important; font-size: 11px !important; letter-spacing: 0.12em !important; padding: 18px 24px !important; transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1) !important; } .flickity-prev-next-button { background: rgba(255,255,255,0.95) !important; width: 44px !important; height: 44px !important; box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important; border: none !important; } </style>";

const mockSizeBoxes = "<div class='ProductForm__Option'><span class='ProductForm__Label'>Size:</span><div class='SizeSelector'><button type='button' class='SizeSelector__Item is-selected'>Unit</button><button type='button' class='SizeSelector__Item'>Pack</button></div></div>";

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    // Clear old versions
    let updated = original.replace(/<style id='mvst-ultra-refined'>[\s\S]*?<\/style>/g, '');
    updated = updated.replace(/<style id="mvst-ultra-refined">[\s\S]*?<\/style>/g, '');
    updated = updated.replace(/<style id="mvst-perfect-layout">[\s\S]*?<\/style>/g, '');
    
    // Replace the dropdown selector
    updated = updated.replace(/<div class="ProductForm__Variants">[\s\S]*?<\/div>/, mockSizeBoxes);
    
    // Inject CSS
    updated = updated.replace('</body>', ultraRefinedCSS + '</body>');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Applied final ultra refinement.');
