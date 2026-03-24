const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const absoluteFinalCleanupCSS = `
<style id="mvst-absolute-final-cleanup">
/* 1. Hide the extra floating arrows definitely */
.Product__SlideshowNavArrow, 
.Product__SlideshowNavArrow--prev, 
.Product__SlideshowNavArrow--next,
[data-direction="prev"], 
[data-direction="next"] { 
    display: none !important; 
    opacity: 0 !important;
    visibility: hidden !important;
}

/* 2. Restore Size Selection Blocks & Rectangular styling */
.SizeSelector {
    display: flex !important;
    gap: 15px !important;
    margin: 15px 0 !important;
}

.SizeSelector__Item {
    flex: 0 0 100px !important;
    height: 44px !important;
    border: 1px solid #ddd !important;
    background: white !important;
    color: #111 !important;
    font-size: 14px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    border-radius: 2px !important; /* Minimalist rounding like MVST */
}

.SizeSelector__Item.is-selected {
    border: 1px solid #111 !important;
    background: #fdfdfd !important;
    font-weight: 600 !important;
}

/* 3. Button Logos - Perfect Enlargement */
.Marketplace .Button img {
    width: 28px !important;
    height: auto !important;
}
</style>
`;

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let updated = content;
    // Remove ALL style injections from this session to ensure clean state
    updated = updated.replace(/<style id=["']mvst-.*?["']>[\s\S]*?<\/style>/g, '');
    
    // Inject the final cleanup block
    updated = updated.replace('</body>', absoluteFinalCleanupCSS + '</body>');
    
    // Ensure the size buttons have the classes if they were stripped
    // This is hard to do with regex reliably if the HTML changed, but I'll add the CSS.
    
    fs.writeFileSync(filePath, updated);
});
console.log('Final absolute cleanup applied.');
