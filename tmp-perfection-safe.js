const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const perfectionCSS = "<style id='mvst-perfection-consolidated'>.Product__SlideshowNavArrow, .Product__Gallery .Product__SlideshowNav .flickity-prev-next-button, .Product__Wrapper > .flickity-prev-next-button { display: none !important; } .Product__Slideshow { position: relative !important; overflow: hidden !important; } .Product__Slideshow .flickity-prev-next-button { position: absolute !important; top: 50% !important; transform: translateY(-50%) !important; background: white !important; border-radius: 50% !important; width: 48px !important; height: 48px !important; box-shadow: 0 4px 15px rgba(0,0,0,0.12) !important; opacity: 0 !important; visibility: hidden !important; transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1) !important; z-index: 100 !important; border: none !important; } .Product__Slideshow:hover .flickity-prev-next-button { opacity: 1 !important; visibility: visible !important; } .Product__Slideshow .flickity-prev-next-button.previous { left: 20px !important; } .Product__Slideshow .flickity-prev-next-button.next { right: 20px !important; } .Marketplace .Button { background-color: transparent !important; color: #111 !important; border: 1px solid #d0d0d0 !important; border-radius: 2px !important; transition: background-color 0.4s ease, border-color 0.4s ease, color 0.4s ease !important; } .Marketplace .Button:hover { color: #fff !important; } .Marketplace .Button--blinkit:hover { background-color: #F8CB46 !important; border-color: #F8CB46 !important; } .Marketplace .Button--zepto:hover { background-color: #FF3269 !important; border-color: #FF3269 !important; } .Marketplace .Button--amazon:hover { background-color: #FF9900 !important; border-color: #FF9900 !important; } .Marketplace .Button--instamart:hover { background-color: #FC8019 !important; border-color: #FC8019 !important; } .Marketplace .Button--flipkart:hover { background-color: #2874F0 !important; border-color: #2874F0 !important; } .SizeSelector { display: flex !important; gap: 15px !important; margin-top: 15px !important; } </style>";

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Simple replacements to clean up and inject styling
    let updated = content;
    updated = updated.replace(/<style id=["']mvst-.*?["']>[\s\S]*?<\/style>/g, '');
    
    // Hide extra arrows from static html if they exist
    updated = updated.replace(/<div class="Product__SlideshowMobileNav">[\s\S]*?<\/div>/g, '');
    
    // Inject at the end
    updated = updated.replace('</body>', perfectionCSS + '</body>');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Final parity perfected.');
