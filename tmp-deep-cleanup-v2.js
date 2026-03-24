const fs = require('fs');
const path = require('path');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const styleInjections = `
<style>
/* 1. Hide Locale Selectors */
.locale-selectors__content {
    justify-content: center;
    display: none !important;
}

/* 2. Marketplace Button Transparency & Hover Fill */
.Marketplace .Button {
    background-color: transparent !important;
    color: #111111 !important;
    border: 1px solid #cfcfcf !important; /* Subtle grey border per MVST */
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1) !important;
}
.Marketplace .Button:hover {
    background-color: var(--hover-bg, #111111) !important;
    color: var(--hover-text, #ffffff) !important;
    border-color: var(--hover-bg, #111111) !important;
}

/* 3. Flickity Navigation Arrows */
.Product__Gallery .flickity-prev-next-button {
    opacity: 0 !important;
    visibility: hidden !important;
    transition: opacity 0.3s ease, visibility 0.3s ease !important;
    background: #ffffff !important;
    color: #111111 !important;
    border: 1px solid #e0e0e0 !important;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
    width: 48px !important;
    height: 48px !important;
    z-index: 20 !important;
    border-radius: 50% !important;
}
.Product__Gallery:hover .flickity-prev-next-button {
    opacity: 1 !important;
    visibility: visible !important;
}
.Product__Gallery .flickity-prev-next-button svg {
    stroke: #111111 !important;
    stroke-width: 1.5px !important;
    fill: none !important;
    width: 14px !important;
    height: 14px !important;
}
.Product__SlideshowMobileNav {
    display: block !important; 
}
.flickity-page-dots {
    display: none !important; /* Hide dots on desktop specifically */
}

/* 4. MVST Gallery Layout - Vertical Thumbnails on Left */
@media screen and (min-width: 1008px) {
    .Product__Gallery.Product__Gallery--withThumbnails {
        display: flex !important;
        align-items: flex-start !important;
        gap: 20px !important;
    }
    .Product__Gallery.Product__Gallery--withThumbnails .Product__Slideshow {
        flex: 1 1 auto !important;
        width: calc(100% - 90px) !important;
        margin: 0 !important;
        order: 2 !important;
        display: block !important; /* Required for Flickity */
    }
    .Product__Gallery.Product__Gallery--withThumbnails .Product__SlideshowNav {
        flex: 0 0 70px !important;
        width: 70px !important;
        margin: 0 !important;
        text-align: left !important;
        order: 1 !important;
        display: block !important;
    }
    .Product__Gallery.Product__Gallery--withThumbnails .Product__SlideshowNavScroller {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
    }
    .Product__Gallery.Product__Gallery--withThumbnails .Product__SlideshowNavImage {
        display: block !important;
        width: 100% !important;
        margin: 0 0 15px 0 !important;
        aspect-ratio: 1;
        flex-shrink: 0 !important; /* Prevent squishing in flex column */
    }
    .Product__SlideItem {
        width: 100% !important; /* Ensure slides fill the carousel */
    }
}
</style>
`;

const scriptInjections = `
<script>
document.addEventListener('DOMContentLoaded', function() {
    // 0. Force Flickity Initialization (bypass theme.js teardown)
    setTimeout(() => {
        const slideshow = document.querySelector('.Product__Slideshow');
        if (slideshow && window.Flickity) {
            let flkty = window.Flickity.data(slideshow);
            if (!flkty) {
                // If theme.js destroyed it, we revive it!
                let config = {};
                try {
                    config = JSON.parse(slideshow.getAttribute('data-flickity-config') || '{}');
                } catch(e) {}
                config.watchCSS = false; // Never watch CSS
                config.prevNextButtons = true;
                
                // Remove trailing classes that theme.js might have left behind
                slideshow.classList.remove('flickity-enabled'); 
                
                flkty = new window.Flickity(slideshow, config);
            }
            
            // Re-bind thumbnail clicks
            const thumbnails = document.querySelectorAll('.Product__SlideshowNavImage');
            thumbnails.forEach((thumb, index) => {
                // Remove old event listeners by cloning
                let newThumb = thumb.cloneNode(true);
                thumb.parentNode.replaceChild(newThumb, thumb);
                
                newThumb.addEventListener('click', function(e) {
                    e.preventDefault();
                    document.querySelectorAll('.Product__SlideshowNavImage').forEach(t => t.classList.remove('is-selected'));
                    this.classList.add('is-selected');
                    flkty.select(index);
                });
            });
            
            flkty.on('change', function(index) {
                 document.querySelectorAll('.Product__SlideshowNavImage').forEach(t => t.classList.remove('is-selected'));
                 let thumbs = document.querySelectorAll('.Product__SlideshowNavImage');
                 if(thumbs[index]) thumbs[index].classList.add('is-selected');
            });
        }
    }, 800); // 800ms gives theme.js plenty of time to finish its setup/teardown routine

    // 1. Fix Quantity Buttons
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-action="increase-quantity"], [data-action="decrease-quantity"]');
      if (!btn) return;
      const input = btn.parentElement.querySelector('.QuantitySelector__CurrentQuantity');
      let val = parseInt(input.value) || 1;
      input.value = btn.getAttribute('data-action') === 'increase-quantity' ? val + 1 : (val > 1 ? val - 1 : 1);
    });

    // 2. Fix Size Selector (Popover)
    const sizeBtn = document.querySelector('[aria-controls*="main-size"]');
    const popover = document.querySelector('[id*="main-size"].Popover');
    if (sizeBtn && popover) {
      sizeBtn.addEventListener('click', () => popover.setAttribute('aria-hidden', 'false'));
      const closeBtn = popover.querySelector('[data-action="close-popover"]');
      if (closeBtn) {
          closeBtn.addEventListener('click', () => popover.setAttribute('aria-hidden', 'true'));
      }
      popover.querySelectorAll('.Popover__Value').forEach(val => {
        val.addEventListener('click', function () {
          const displayEl = document.querySelector('.ProductForm__SelectedValue');
          if (displayEl) displayEl.textContent = this.getAttribute('data-value');
          popover.setAttribute('aria-hidden', 'true');
        });
      });
    }
});
</script>
`;

// Helper regex to extract brand colors from custom.js
const customContent = fs.readFileSync('d:/project2/public/js/custom.js', 'utf8');
const brandColorRegex = /"([^"]+)":\s*{\s*img:[^,]+,\s*color:\s*"([^"]+)",/g;
let brandMap = {};
let match;
while ((match = brandColorRegex.exec(customContent)) !== null) {
  brandMap[match[1]] = match[2];
}

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let original = fs.readFileSync(filePath, 'utf8');
    
    let bodyCloseIndex = original.lastIndexOf('</body>');
    let htmlCloseIndex = original.lastIndexOf('</html>');
    
    if (bodyCloseIndex !== -1 && htmlCloseIndex !== -1 && htmlCloseIndex > bodyCloseIndex) {
        let firstBodyClose = original.indexOf('</body>');
        let preBody = original.substring(0, firstBodyClose);
        
        let cleaned = original;
        
        // Clean old injections
        cleaned = cleaned.replace(/<style>[\s\S]*?<\/style>/g, (m) => {
            if (m.includes('Marketplace Button Transparency') || m.includes('locale-selectors__content') || m.includes('Custom Arrows matching MVST Desktop Slider')) {
                return '';
            }
            return m;
        });
        
        cleaned = cleaned.replace(/<script>[\s\S]*?<\/script>/g, (m) => {
            if (m.includes('Thumbnail Synchronization Logic') || m.includes('Fix Dots (Image Navigation)') || m.includes('Fix Quantity Buttons') || m.includes('Force Flickity Initialization')) {
                return '';
            }
            return m;
        });
        
        cleaned = cleaned.replace(/<\/body>/g, '');
        cleaned = cleaned.replace(/<\/html>[\s\S]*/, '');
        
        let newContent = cleaned.trim() + '\n' + styleInjections + '\n' + scriptInjections + '\n</body>\n</html>\n';
        
        newContent = newContent.replace(/"prevNextButtons":\s*false/g, '"prevNextButtons": true');
        newContent = newContent.replace(/"watchCSS":\s*true/g, '"watchCSS": false');
        newContent = newContent.replace(/Product__Gallery--stack/g, '');
        
        newContent = newContent.replace(/<a([^>]*class="[^"]*Button[^"]*"[^>]*)>([^<]*)<\/a>/g, (fullMatch, attrStr, content) => {
            let brandMatch = attrStr.match(/href="([^"]+)"/);
            if (brandMatch) {
                let href = brandMatch[1];
                let matchingBrand = Object.keys(brandMap).find(brand => href.includes(brand.toLowerCase().replace(/\s/g, '')));
                if (matchingBrand) {
                    let color = brandMap[matchingBrand];
                    let newAttrStr = attrStr;
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
        
        fs.writeFileSync(filePath, newContent);
        console.log(`Cleaned and re-injected ${file}`);
    }
});
console.log('Finished deep cleanup and update version 2.');
