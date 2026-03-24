const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html') && !f.includes('index') && !f.includes('about') && !f.includes('search') && !f.includes('contact'));

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Comment out SHIPPING & RETURNS
    // Pattern: <div class="Collapsible Collapsible--large"> ... SHIPPING & RETURNS ... </div> </div> </div>
    // Need to find the specific block.
    
    // Approach: Find the button with SHIPPING & RETURNS and find the surrounding Collapsible div.
    let updated = content;
    
    // Regex to find the SHIPPING & RETURNS block
    // It starts with a Collapsible div and contains the text
    const shippingPattern = /<div class="Collapsible Collapsible--large">[\s\S]*?<button[\s\S]*?>[\s\S]*?SHIPPING &amp; RETURNS[\s\S]*?<\/button>[\s\S]*?<div class="Collapsible__Inner">[\s\S]*?<\/div>[\s\S]*?<\/div>/g;
    
    if (shippingPattern.test(updated)) {
        updated = updated.replace(shippingPattern, (match) => {
            return `<!-- ${match} -->`;
        });
        console.log(`Commented Shipping & Returns in ${file}`);
    } else {
        console.warn(`Could not find Shipping & Returns in ${file}`);
    }

    // 2. Remove SHOP ON in cdark.html and cmilk.html (cdarkc.html and cmilkc.html)
    if (file === 'cdarkc.html' || file === 'cmilkc.html') {
        const shopOnCSSPattern = /<style>[\s\S]*?\/\* ===== SHOP ON SECTION ===== \*\/[\s\S]*?<\/style>/g;
        const shopOnHTMLPattern = /<div class="shopify-section" id="shopify-section-shop-on">[\s\S]*?<\/section>[\s\S]*?<\/div>/g;
        
        updated = updated.replace(shopOnCSSPattern, '');
        updated = updated.replace(shopOnHTMLPattern, '');
        console.log(`Removed SHOP ON section in ${file}`);
    }
    
    fs.writeFileSync(filePath, updated);
});
