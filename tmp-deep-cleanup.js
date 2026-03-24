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

/* 2. Marketplace Button Transparency */
.Marketplace .Button {
    background-color: transparent !important;
    color: #111111 !important;
    border: 1px solid #cfcfcf !important; /* Subtle grey border per MVST */
    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1) !important;
}
.Marketplace .Button:hover {
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
    display: block !important; /* Make sure arrows have a place to render if they are here */
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
    }
    .Product__Gallery.Product__Gallery--withThumbnails .Product__SlideshowNav {
        flex: 0 0 70px !important;
        width: 70px !important;
        margin: 0 !important;
        text-align: left !important;
        order: 1 !important;
        /* Force vertical display */
        display: flex !important;
        flex-direction: column !important;
    }
    .Product__Gallery.Product__Gallery--withThumbnails .Product__SlideshowNavImage {
        display: block !important;
        width: 100% !important;
        margin: 0 0 15px 0 !important;
        aspect-ratio: 1;
    }
    .Product__Gallery.Product__Gallery--withThumbnails .Product__SlideshowNavScroller {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
    }
}
</style>
`;

const scriptInjections = `
<script>
document.addEventListener('DOMContentLoaded', function() {
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

    // 3. Thumbnail Synchronization Logic
    const thumbnails = document.querySelectorAll('.Product__SlideshowNavImage');
    const slideshow = document.querySelector('.Product__Slideshow');
    
    if (thumbnails.length > 0 && slideshow) {
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent jump to #Media
                // Update active state on thumbnails
                thumbnails.forEach(t => t.classList.remove('is-selected'));
                this.classList.add('is-selected');
                
                // Select flickity instance and change slide
                const flkty = window.Flickity ? window.Flickity.data(slideshow) : null;
                if (flkty) {
                    flkty.select(index);
                } else {
                    // Fallback to scrolling if Flickity isn't there
                    const slides = slideshow.querySelectorAll('.Product__SlideItem');
                    if(slides[index]) slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
    
    // To clean up the file, we need to extract everything BEFORE the first injected block
    // OR we can just regex away all known <style> and <script> blocks that we appended.
    // It's safer to split the file before the first </body>, remove all subsequent content until </html>, and then reconstruct it.
    
    let bodyCloseIndex = original.lastIndexOf('</body>');
    let htmlCloseIndex = original.lastIndexOf('</html>');
    
    if (bodyCloseIndex !== -1 && htmlCloseIndex !== -1 && htmlCloseIndex > bodyCloseIndex) {
        // Find the FIRST </body> just in case there are multiple
        let firstBodyClose = original.indexOf('</body>');
        let preBody = original.substring(0, firstBodyClose);
        
        // Let's strip out any <style> or <script> blocks that appear right before </body> that we injected
        // Actually, we can just remove all <script> and <style> blocks that contain our signature comments
        let cleaned = original;
        
        // Remove ALL <style> blocks appended at the bottom
        cleaned = cleaned.replace(/<style>[\s\S]*?<\/style>/g, (m) => {
            if (m.includes('Marketplace Button Transparency') || m.includes('locale-selectors__content') || m.includes('Custom Arrows matching MVST Desktop Slider')) {
                return '';
            }
            return m;
        });
        
        // Remove ALL <script> blocks appended at the bottom
        cleaned = cleaned.replace(/<script>[\s\S]*?<\/script>/g, (m) => {
            if (m.includes('Thumbnail Synchronization Logic') || m.includes('Fix Dots (Image Navigation)') || m.includes('Fix Quantity Buttons')) {
                return '';
            }
            return m;
        });
        
        // Remove extra closing body tags that might have accumulated
        cleaned = cleaned.replace(/<\/body>/g, '');
        cleaned = cleaned.replace(/<\/html>[\s\S]*/, ''); // we'll re-add it
        
        let newContent = cleaned.trim() + '\n' + styleInjections + '\n' + scriptInjections + '\n</body>\n</html>\n';
        
        // 1. Enable Flickity Arrows and disable watchCSS
        newContent = newContent.replace(/"prevNextButtons":\s*false/g, '"prevNextButtons": true');
        newContent = newContent.replace(/"watchCSS":\s*true/g, '"watchCSS": false');
        newContent = newContent.replace(/Product__Gallery--stack/g, '');
        
        // 2. Set Button Text to "BUY ON <Brand>" and inject CSS vars for hover
        newContent = newContent.replace(/<a([^>]*class="[^"]*Button[^"]*"[^>]*)>([^<]*)<\/a>/g, (fullMatch, attrStr, content) => {
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
        
        fs.writeFileSync(filePath, newContent);
        console.log(`Cleaned and re-injected ${file}`);
    } else {
        console.log(`Skipped ${file} - could not find proper boundaries`);
    }
});
console.log('Finished deep cleanup and update.');
