const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html') && !f.includes('index') && !f.includes('about') && !f.includes('search') && !f.includes('contact'));

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;
    
    // 1. Comment out SHIPPING & RETURNS
    // More robust matching for the label and block
    const shippingBlockRegex = /<div class="Collapsible Collapsible--large">\s*<button[^>]*>[\s\S]*?SHIPPING &amp; RETURNS[\s\S]*?<\/button>[\s\S]*?<div class="Collapsible__Inner">[\s\S]*?<\/div>\s*<\/div>/gi;
    
    if (shippingBlockRegex.test(content)) {
        content = content.replace(shippingBlockRegex, (match) => {
            // Check if already commented
            if (match.trim().startsWith('<!--')) return match;
            // Handle internal comments by replacing them with something inert
            let cleanedMatch = match.replace(/<!--/g, '<!-').replace(/-->/g, '->');
            return `\n<!-- SHIPPING & RETURNS COMMENTED BY ANTIGRAVITY\n${cleanedMatch}\n-->\n`;
        });
        console.log(`Commented Shipping & Returns in ${file}`);
    }

    // 2. Remove SHOP ON in cdarkc.html and cmilkc.html
    if (file === 'cdarkc.html' || file === 'cmilkc.html') {
        // Safe Style Removal: Targeted block
        const shopOnStyleRegex = /<style[^>]*>[\s\S]{0,300}\/\* ===== SHOP ON SECTION ===== \*\/[\s\S]*?<\/style>/gi;
        const shopOnHTMLRegex = /<div class="shopify-section" id="shopify-section-shop-on">[\s\S]*?<\/div>/gi;
        
        let styleMatch = content.match(shopOnStyleRegex);
        if (styleMatch) {
            content = content.replace(shopOnStyleRegex, '');
            console.log(`Removed SHOP ON Style in ${file}`);
        }
        
        let htmlMatch = content.match(shopOnHTMLRegex);
        if (htmlMatch) {
            content = content.replace(shopOnHTMLRegex, '');
            console.log(`Removed SHOP ON HTML in ${file}`);
        }
    }
    
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
    }
});
