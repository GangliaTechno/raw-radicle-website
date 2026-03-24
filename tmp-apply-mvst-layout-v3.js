const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const styleInjections = `
<style>
/* Marketplace Button Transparency */
.Marketplace .Button {
    background-color: transparent !important;
    color: #111111 !important;
    border: 1px solid #cfcfcf !important; /* Subtle grey border per MVST */
}
/* Ensure hover text color is applied during sweep */
.Marketplace .Button:hover {
    color: var(--hover-text) !important;
    border-color: var(--hover-bg) !important;
}

/* Flickity Navigation Arrows */
.Product__Gallery .flickity-prev-next-button {
    opacity: 0 !important;
    visibility: hidden !important;
    transition: opacity 0.3s ease, visibility 0.3s ease !important;
    background: #ffffff !important;
    color: #111111 !important;
    border: 1px solid #e0e0e0 !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
    width: 45px !important;
    height: 45px !important;
    z-index: 10 !important;
}
.Product__Gallery:hover .flickity-prev-next-button {
    opacity: 1 !important;
    visibility: visible !important;
}
/* Thin chevron icon for arrows */
.Product__Gallery .flickity-prev-next-button svg {
    stroke: currentColor !important;
    stroke-width: 1.5px !important;
    fill: none !important;
    width: 14px !important;
    height: 14px !important;
}

/* MVST Gallery Layout - Vertical Thumbnails on Left */
@media screen and (min-width: 1008px) {
    .Product__Gallery.Product__Gallery--withThumbnails {
        display: flex !important;
        align-items: flex-start !important;
        gap: 20px !important;
    }
    /* Main image takes remaining space and order 2 */
    .Product__Gallery.Product__Gallery--withThumbnails .Product__Slideshow {
        flex: 1 1 auto !important;
        width: calc(100% - 90px) !important;
        margin: 0 !important;
        order: 2 !important;
    }
    /* Thumbnails container on the left */
    .Product__Gallery:not(.Product__Gallery--stack).Product__Gallery--withThumbnails .Product__SlideshowNav {
        flex: 0 0 70px !important;
        width: 70px !important;
        margin: 0 !important;
        text-align: left !important;
        order: 1 !important;
    }
    /* Individual thumbnails stacked vertically */
    .Product__Gallery:not(.Product__Gallery--stack).Product__Gallery--withThumbnails .Product__SlideshowNavImage {
        display: block !important;
        width: 100% !important;
        margin: 0 0 15px 0 !important;
        aspect-ratio: 1;
    }
}
</style>
`;

const syncScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
    // Thumbnail Synchronization Logic
    const thumbnails = document.querySelectorAll('.Product__SlideshowNavImage');
    const slideshow = document.querySelector('.Product__Slideshow');
    
    if (thumbnails.length > 0 && slideshow) {
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                // Update active state on thumbnails
                thumbnails.forEach(t => t.classList.remove('is-selected'));
                this.classList.add('is-selected');
                
                // Select flickity instance and change slide
                const flkty = window.Flickity.data(slideshow);
                if (flkty) {
                    flkty.select(index);
                }
            });
        });
        
        // Listen for flickity slide changes to update thumbnail state
        if (window.Flickity) {
             const flkty = window.Flickity.data(slideshow);
             if (flkty) {
                 flkty.on('change', function(index) {
                     thumbnails.forEach(t => t.classList.remove('is-selected'));
                     if(thumbnails[index]) thumbnails[index].classList.add('is-selected');
                 });
             }
        }
    }
    
    // Fix Mobile Nav display none issue specifically for arrows on desktop
    const mobileNav = document.querySelector('.Product__SlideshowMobileNav');
    if (mobileNav) {
        mobileNav.style.setProperty('display', 'block', 'important');
    }
});
</script>
`;

// Helper regex to extract brand colors from shop.js
const shopContent = fs.readFileSync('d:/project2/public/js/shop.js', 'utf8');
const brandColorRegex = /"([^"]+)":\s*{\s*img:[^,]+,\s*color:\s*"([^"]+)",/g;
let brandMap = {};
let match;
while ((match = brandColorRegex.exec(shopContent)) !== null) {
  brandMap[match[1]] = match[2];
}

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    // Remove old inline scripts related to this fix to avoid duplicates
    let updated = original.replace(/<script>[\s\S]*?\/\/ Thumbnail Synchronization Logic[\s\S]*?<\/script>/, '');
    updated = updated.replace(/<style>[\s\S]*?\/\* Marketplace Button Transparency \*\/[\s\S]*?<\/style>/, '');
    
    // 1. Enable Flickity Arrows
    updated = updated.replace(/"prevNextButtons":\s*false/g, '"prevNextButtons": true');
    
    // 2. Set Button Text to "BUY ON <Brand>" and inject CSS vars for hover
    updated = updated.replace(/<a([^>]*class="[^"]*Button[^"]*"[^>]*)>([^<]*)<\/a>/g, (fullMatch, attrStr, content) => {
        // Find href brand
        let brandMatch = attrStr.match(/href="([^"]+)"/);
        if (brandMatch) {
            let href = brandMatch[1];
            let matchingBrand = Object.keys(brandMap).find(brand => href.includes(brand.toLowerCase().replace(/\s/g, '')));
            if (matchingBrand) {
                let color = brandMap[matchingBrand];
                let newAttrStr = attrStr;
                // Add inline styles for CSS variables for hover effects
                if (!newAttrStr.includes('style=')) {
                    newAttrStr += ` style="--hover-bg: ${color}; --hover-text: #fff;" `;
                } else if (!newAttrStr.includes('--hover-bg')) {
                    newAttrStr = newAttrStr.replace(/style="([^"]*)"/, `style="$1 --hover-bg: ${color}; --hover-text: #fff;"`);
                }
                
                return `<a${newAttrStr}>BUY ON ${matchingBrand.toUpperCase()}</a>`;
            }
        }
        return fullMatch;
    });

    // 3. Inject Styles and Script Right before </body>
    if (updated.includes('</body>')) {
        updated = updated.replace('</body>', `${styleInjections}\n${syncScript}\n</body>`);
    } else {
        updated += `\n${styleInjections}\n${syncScript}`;
    }
    
    fs.writeFileSync(filePath, updated);
    console.log(`Processed ${file}`);
});
console.log('Finished updating all product pages.');
