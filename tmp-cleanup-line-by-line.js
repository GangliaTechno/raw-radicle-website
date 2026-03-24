const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html') && !f.includes('index') && !f.includes('about') && !f.includes('search') && !f.includes('contact'));

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    let lines = original.split(/\r?\n/);
    let newLines = [];
    
    let inShipping = false;
    let shippingStartIndex = -1;
    let shippingEndIndex = -1;

    // 1. Find Shipping & Returns Block
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('SHIPPING &amp; RETURNS')) {
            // Found the label. Now look UP for the start.
            for (let j = i; j >= 0; j--) {
                if (lines[j].includes('class="Collapsible Collapsible--large"')) {
                    shippingStartIndex = j;
                    break;
                }
            }
            // Now look DOWN for the end (4th </div>)
            let divCount = 0;
            for (let k = i; k < lines.length; k++) {
                if (lines[k].includes('<div class="Collapsible__Inner">')) {
                   // Continue down
                }
                if (lines[k].includes('</div>')) {
                    // Check how many </div> are in this line
                    let matches = lines[k].match(/<\/div>/g);
                    if (matches) divCount += matches.length;
                    
                    if (divCount >= 4) {
                        shippingEndIndex = k;
                        break;
                    }
                }
            }
            break; 
        }
    }

    if (shippingStartIndex !== -1 && shippingEndIndex !== -1) {
        // Comment it out
        lines[shippingStartIndex] = '<!-- SHIPPING_RETURNS_START\n' + lines[shippingStartIndex];
        lines[shippingEndIndex] = lines[shippingEndIndex] + '\nSHIPPING_RETURNS_END -->';
        console.log(`Commented Shipping & Returns in ${file}`);
    }

    // 2. Remove SHOP ON for Dark/Milk
    if (file === 'cdarkc.html' || file === 'cmilkc.html') {
        let inShopHTML = false;
        let shopHTMLStart = -1;
        let shopHTMLEnd = -1;
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('id="shopify-section-shop-on"')) {
                shopHTMLStart = i;
                // Find next </div>
                for (let j = i; j < lines.length; j++) {
                    if (lines[j].includes('</section>')) {
                        // Usually followed by a </div> on next line or same
                    }
                    if (lines[j].includes('</div>')) {
                        shopHTMLEnd = j;
                        break;
                    }
                }
                break;
            }
        }
        
        if (shopHTMLStart !== -1 && shopHTMLEnd !== -1) {
            for (let i = shopHTMLStart; i <= shopHTMLEnd; i++) {
                lines[i] = ''; // Mark for removal
            }
            console.log(`Removed SHOP ON HTML in ${file}`);
        }
        
        // Remove Style
        let inStyle = false;
        let styleStart = -1;
        let styleEnd = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('/* ===== SHOP ON SECTION ===== */')) {
                // Look UP for <style
                for (let j = i; j >= 0; j--) {
                    if (lines[j].includes('<style')) {
                        styleStart = j;
                        break;
                    }
                }
                // Look DOWN for </style>
                for (let k = i; k < lines.length; k++) {
                    if (lines[k].includes('</style>')) {
                        styleEnd = k;
                        break;
                    }
                }
                break;
            }
        }
        if (styleStart !== -1 && styleEnd !== -1) {
            for (let i = styleStart; i <= styleEnd; i++) {
                lines[i] = ''; // Mark for removal
            }
            console.log(`Removed SHOP ON Style in ${file}`);
        }
    }

    let finalContent = lines.filter(l => l !== null).join('\n');
    if (finalContent !== original) {
        fs.writeFileSync(filePath, finalContent);
    }
});
