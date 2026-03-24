const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const ultimateParityCSS = `
<style id="mvst-absolute-final-victory">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');

/* Reset */
body, .Heading, .Button { font-family: 'Montserrat', sans-serif !important; }

/* 2-Column Layout Force */
@media screen and (min-width: 1008px) {
    .Product { padding: 40px 0 !important; }
    
    .Product__Wrapper {
        display: flex !important;
        flex-direction: row !important;
        justify-content: space-between !important;
        max-width: 1350px !important;
        margin: 0 auto !important;
        gap: 60px !important;
        align-items: flex-start !important;
    }

    .Product__Gallery {
        flex: 0 0 58% !important;
        width: 58% !important;
        max-width: 750px !important;
        display: flex !important;
        gap: 20px !important;
    }

    .Product__InfoWrapper {
        flex: 0 0 38% !important;
        width: 38% !important;
        max-width: 480px !important;
        position: sticky !important;
        top: 100px !important;
    }
}

/* Marketplace Buttons - Minimalist & Enlarged Logos */
.Marketplace .Button {
    background-color: transparent !important;
    border: 1px solid #dcdcdc !important;
    color: #111 !important;
    border-radius: 2px !important; /* Sharp corners */
    height: 52px !important;
    font-size: 13px !important;
    font-weight: 500 !important;
    letter-spacing: 2px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    transition: all 0.3s ease !important;
    margin-bottom: 0 !important;
}

.Marketplace .Button:hover {
    background-color: #f9f9f9 !important;
    border-color: #111 !important;
}

.Marketplace .Button img {
    width: 28px !important; /* Bigger logo */
    height: auto !important;
    margin-left: 10px !important;
    object-fit: contain !important;
}

/* Size Blocks - MVST Grid Style */
.SizeSelector {
    display: flex !important;
    gap: 12px !important;
    margin: 20px 0 !important;
}

.SizeSelector__Item {
    flex: 0 0 100px !important;
    height: 48px !important;
    border: 1px solid #e8e8e8 !important;
    background: white !important;
    color: #111 !important;
    font-size: 14px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    border-radius: 0 !important; /* NO rounded edges */
}

.SizeSelector__Item.is-selected {
    border: 1px solid #111 !important;
    background: #fdfdfd !important;
    font-weight: 600 !important;
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    let updated = original;
    // Remove ALL style injections from this session
    updated = updated.replace(/<style id=["']mvst-.*?["']>[\s\S]*?<\/style>/g, '');
    
    // Inject the new absolute final style
    updated = updated.replace('</body>', ultimateParityCSS + '</body>');
    
    // Global replacement for logo sizes in HTML
    updated = updated.replace(/width:18px/g, 'width:28px');
    updated = updated.replace(/height:18px/g, 'height:28px');
    
    fs.writeFileSync(filePath, updated);
});
console.log('Applied absolute final victory layout.');
