const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const finalRefinedCSS = "<style id='mvst-final-refined-v2'> @media screen and (min-width: 1008px) { .Product__Wrapper { display: flex !important; flex-direction: row !important; align-items: flex-start !important; justify-content: space-between !important; max-width: 1400px !important; margin: 0 auto !important; padding: 40px 20px !important; gap: 60px !important; } .Product__Gallery { flex: 0 0 58% !important; display: flex !important; gap: 20px !important; order: 1 !important; } .Product__InfoWrapper { flex: 0 0 38% !important; order: 2 !important; position: sticky !important; top: 120px !important; text-align: left !important; } .ProductMeta__Title { font-size: 22px !important; letter-spacing: 3px !important; margin-bottom: 20px !important; } .ProductMeta__Price { font-size: 18px !important; margin-bottom: 30px !important; } } .Marketplace .Button { background-color: transparent !important; color: #111 !important; border: 1px solid #d0d0d0 !important; border-radius: 2px !important; transition: border-color 0.3s ease, background-color 0.3s ease !important; font-size: 14px !important; font-weight: 500 !important; padding: 12px 20px !important; } .Marketplace .Button:hover { background-color: rgba(0,0,0,0.03) !important; border-color: #999 !important; color: #111 !important; } .Marketplace .Button img { width: 26px !important; height: auto !important; margin-left: 8px !important; } .SizeSelector { display: flex !important; gap: 15px !important; margin-top: 15px !important; } .SizeSelector__Item { padding: 12px 25px !important; border: 1px solid #ddd !important; background: white !important; cursor: pointer !important; font-family: 'Montserrat', sans-serif !important; border-radius: 0 !important; font-size: 14px !important; transition: all 0.2s ease !important; } .SizeSelector__Item.is-selected { border-color: #111 !important; background: #f9f9f9 !important; font-weight: 600 !important; } </style>";

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let updated = content;
    // Remove all previous refinement attempts
    updated = updated.replace(/<style id=["']mvst-.*?["']>[\s\S]*?<\/style>/g, '');
    
    // Inject the refined CSS
    updated = updated.replace('</body>', finalRefinedCSS + '</body>');
    
    // Logic to update the logo sizes in the HTML if they are hardcoded
    updated = updated.replace(/width:18px/g, 'width:26px');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Final refined layout and buttons applied.');
