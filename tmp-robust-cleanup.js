const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html') && !f.includes('index') && !f.includes('about') && !f.includes('search') && !f.includes('contact'));

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    let content = original;
    
    // 1. Comment out SHIPPING & RETURNS
    // It's a Collapsible block. 
    // We match the open div, the button containing the title, and then follow until we hit the 4 closing divs.
    const shippingBlockRegex = /<div class="Collapsible Collapsible--large">\s*<button[^>]*>[\s\S]*?SHIPPING &amp; RETURNS[\s\S]*?<\/button>[\s\S]*?<\/div>[\s\n\r]*<\/div>[\s\n\r]*<\/div>[\s\n\r]*<\/div>/gi;
    
    if (shippingBlockRegex.test(content)) {
        content = content.replace(shippingBlockRegex, (match) => {
            // Safety check for internal comment nesting
            let cleaned = match.replace(/<!--/g, '[#').replace(/-->/g, '#]');
            return `\n<!-- SHIPPING_RETURNS_START\n${cleaned}\nSHIPPING_RETURNS_END -->\n`;
        });
        console.log(`Commented Shipping & Returns in ${file}`);
    } else {
        // Try fallback with 1 less div or different label
        console.warn(`No standard Shipping & Returns block in ${file}`);
    }

    // 2. Remove SHOP ON for Dark/Milk
    if (file === 'cdarkc.html' || file === 'cmilkc.html') {
        const styleRegex = /<style[^>]*>[\s\S]{0,500}\/\* ===== SHOP ON SECTION ===== \*\/[\s\S]*?<\/style>/gi;
        const htmlRegex = /<div class="shopify-section" id="shopify-section-shop-on">[\s\S]*?<\/div>/gi;
        
        content = content.replace(styleRegex, '');
        content = content.replace(htmlRegex, '');
        console.log(`Removed SHOP ON for ${file}`);
    }
    
    if (content !== original) {
        fs.writeFileSync(filePath, content);
    }
});
