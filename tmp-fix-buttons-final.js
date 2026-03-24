const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const brandMap = {
    'Blinkit': '#F8CB46',
    'Zepto': '#FF3269',
    'Amazon': '#FF9900',
    'Instamart': '#FC8019',
    'Flipkart': '#2874F0'
};

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    // We will find all Button--[brand] strings
    let updated = original;
    
    for (let brand in brandMap) {
        let color = brandMap[brand];
        let brandClass = `Button--${brand.toLowerCase()}`;
        
        updated = updated.replace(new RegExp(`<a([^>]*?${brandClass}[^>]*?)>`, 'ig'), (match, attr) => {
             if (attr.includes('--hover-bg')) return match; // Already injected
             
             let newAttr = attr;
             if (newAttr.includes('style="')) {
                 newAttr = newAttr.replace('style="', `style="--hover-bg: ${color}; --hover-text: #fff; `);
             } else if (newAttr.includes("style='")) {
                 newAttr = newAttr.replace("style='", `style='--hover-bg: ${color}; --hover-text: #fff; `);
             } else {
                 newAttr += ` style="--hover-bg: ${color}; --hover-text: #fff;" `;
             }
             return `<a${newAttr}>`;
        });
    }

    if (updated !== original) {
        fs.writeFileSync(filePath, updated);
        console.log(`Injected style into ${file}`);
    }
});

// Also fix the layout issue!
// In the MVST layout, the .Product__InfoWrapper must clear the footer or have a max-height
// Let's add padding-bottom to Product__InfoWrapper so it doesn't overlap the footer
files.forEach(file => {
   let filePath = path.join(pagesDir, file);
   let content = fs.readFileSync(filePath, 'utf8');
   
   if (!content.includes('padding-bottom: 120px !important; /* Footer clear */')) {
       content = content.replace('.Product__SlideshowMobileNav {', `
.Product__InfoWrapper { padding-bottom: 120px !important; /* Footer clear */ }
.Product__Gallery { margin-bottom: 80px !important; }
.Product__SlideshowMobileNav {
`);
       fs.writeFileSync(filePath, content);
       console.log(`Fixed formatting in ${file}`);
   }
});
