const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const ultimateVictoryCSS = `
<style id="mvst-ultimate-victory">
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap');

@media screen and (min-width: 1008px) {
    .PageContent { padding-top: 40px !important; }
    .Product__Wrapper { display: flex !important; max-width: 1350px !important; margin: 0 auto !important; gap: 50px !important; align-items: flex-start !important; }
    .Product__Gallery { flex: 1 1 60% !important; display: flex !important; gap: 20px !important; order: 1 !important; }
    .Product__InfoWrapper { flex: 0 0 40% !important; max-width: 450px !important; order: 2 !important; position: relative !important; text-align: left !important; }
    
    .Product__Slideshow { flex: 1 !important; min-height: 550px !important; height: auto !important; }
    .flickity-viewport { min-height: 550px !important; }
    .Product__SlideItem { width: 100% !important; display: flex !important; align-items: center !important; }
    .Product__SlideItem img { width: 100% !important; height: auto !important; max-height: 650px !important; object-fit: contain !important; }
    .Product__SlideshowNav { width: 80px !important; flex-shrink: 0 !important; }
    
    .ProductMeta__Title { 
        font-family: 'Outfit', sans-serif !important; 
        text-transform: uppercase !important; 
        letter-spacing: 0.15em !important; 
        font-weight: 500 !important; 
        font-size: 26px !important; 
    }
    .ProductMeta__Price { font-size: 22px !important; font-weight: 400 !important; margin-top: 10px !important; color: #111 !important; }
}

.Marketplace .Button { 
    border-radius: 50px !important; 
    border: 1px solid #d0d0d0 !important; 
    transition: background-color 0.3s ease, border-color 0.3s ease !important;
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    let updated = original;
    // Remove all previous refinement attempts
    updated = updated.replace(/<style id=["']mvst-.*?["']>[\s\S]*?<\/style>/g, '');
    
    // Inject victory CSS
    updated = updated.replace('</body>', ultimateVictoryCSS + '</body>');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Applied ULTIMATE MVST PARITY.');
