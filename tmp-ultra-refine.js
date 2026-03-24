const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const pagesDir = 'd:/project2/public/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const googleFont = '<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&display=swap" rel="stylesheet">';

files.forEach(file => {
    let filePath = path.join(pagesDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(html, { decodeEntities: false });

    // 1. Inject Google Font (Outfit)
    if (!html.includes('fonts.googleapis.com/css2?family=Outfit')) {
        $('head').append(googleFont);
    }

    // 2. Transform Size Selector to Selection Boxes
    const $variantsDiv = $('.ProductForm__Variants');
    if ($variantsDiv.length > 0) {
        $variantsDiv.empty();
        
        // Find options from the hidden select if possible, or use defaults
        // For simplicity in this refinement, we'll build the classic MVST selector structure
        const variantOptions = ['Unit', 'Pack']; // Default for these chocolate slabs
        
        let selectorHtml = `
            <div class="ProductForm__Option">
                <span class="ProductForm__Label">Size:</span>
                <div class="SizeSelector">
                    ${variantOptions.map((opt, i) => `
                        <button type="button" class="SizeSelector__Item ${i === 0 ? 'is-selected' : ''}" data-value="${opt}">${opt}</button>
                    `).join('')}
                    <a href="#" class="SizeSelector__Chart Link Link--underline">Size chart</a>
                </div>
            </div>
        `;
        $variantsDiv.html(selectorHtml);
    }

    // 3. Clean up Title and SKU to match MVST
    $('.ProductMeta__Title').addClass('u-h2').css({
        'text-transform': 'uppercase',
        'letter-spacing': '0.1em',
        'margin-bottom': '10px'
    });
    
    // 4. Update Marketplace Buttons to be more "Premium"
    const $grid = $('.Marketplace__Grid');
    if ($grid.length > 0) {
        // We'll keep the grid but refine the CSS in the global style block
    }

    // 5. Inject the Final Refined CSS block
    const refinedStyles = `
<style id="mvst-ultra-refined">
:root {
    --heading-font-family: 'Outfit', sans-serif;
    --text-font-family: 'Outfit', sans-serif;
}

body, .Heading, .Button, .ProductMeta__Title {
    font-family: 'Outfit', sans-serif !important;
}

.ProductMeta__Title {
    font-size: 24px !important;
    font-weight: 500 !important;
    color: #1c1c1c !important;
}

.ProductMeta__PriceList {
    margin-top: 15px !important;
    margin-bottom: 25px !important;
}

.ProductMeta__Price {
    font-size: 18px !important;
    color: #1c1c1c !important;
    font-weight: 400 !important;
}

/* Size Selector Boxes */
.SizeSelector {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 10px;
    align-items: center;
}

.SizeSelector__Item {
    padding: 8px 24px;
    border: 1px solid #e0e0e0;
    background: transparent;
    cursor: pointer;
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    transition: all 0.2s ease;
    border-radius: 2px;
}

.SizeSelector__Item:hover {
    border-color: #111;
}

.SizeSelector__Item.is-selected {
    border-color: #111;
    background: #f9f9f9;
    font-weight: 500;
}

.SizeSelector__Chart {
    font-size: 12px;
    margin-left: auto;
    color: #666;
    text-decoration: underline;
}

/* Quantity Selector Refinement */
.ProductForm__QuantitySelector {
    margin-top: 30px !important;
}

.QuantitySelector {
    border: 1px solid #e0e0e0 !important;
    border-radius: 2px !important;
    background: #fcfcfc !important;
}

.QuantitySelector__Button {
    padding: 10px 15px !important;
}

/* Button Layout Refinement */
.Marketplace__Grid {
    margin-top: 35px !important;
    gap: 15px !important;
}

.Marketplace .Button {
    border-radius: 50px !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    letter-spacing: 0.1em !important;
    padding: 16px 20px !important;
    text-transform: uppercase !important;
}

/* Arrows */
.flickity-prev-next-button {
    background: white !important;
    width: 44px !important;
    height: 44px !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
}
</style>
`;

    // Add JS to handle Size item switching
    const switcherJS = `
<script>
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.SizeSelector__Item').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.SizeSelector__Item').forEach(b => b.classList.remove('is-selected'));
            this.classList.add('is-selected');
            // Mock variant change if needed
        });
    });
});
</script>
`;

    // Remove previous iterations
    let finalHtml = $.html();
    finalHtml = finalHtml.replace(/<style id="mvst-ultra-refined">[\s\S]*?<\/style>/g, '');
    finalHtml = finalHtml.replace(/<style id="mvst-perfect-layout">[\s\S]*?<\/style>/g, '');
    
    // Inject before </body>
    finalHtml = finalHtml.replace('</body>', refinedStyles + switcherJS + '</body>');

    fs.writeFileSync(filePath, finalHtml);
    console.log(\`Refined \${file} to MVST standards.\`);
});
