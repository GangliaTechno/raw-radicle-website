const fs = require('fs');
const path = require('path');

const baseDir = 'd:/project2/public';

const cssLink = '  <link href="../css/features.css" rel="stylesheet">';
const cssLinkRoot = '  <link href="css/features.css" rel="stylesheet">';

const featuresHtml = `
<section class="ProductFeatures Section">
  <div class="Container">
    <header class="ProductFeatures__Header">
      <h2 class="ProductFeatures__Heading u-h6">CRAFTED FOR EXCELLENCE</h2>
    </header>

    <div class="ProductFeatures__Grid">
      <div class="ProductFeatures__Item">
        <div class="ProductFeatures__ImageWrapper">
          <img class="ProductFeatures__Image" src="../assets/features/choco-1.png" alt="Ancient Wisdom">
        </div>
        <h3 class="ProductFeatures__Title">ANCIENT WISDOM</h3>
        <p class="ProductFeatures__Description">Every product is infused with time-tested Ayurvedic herbs for holistic wellness.</p>
      </div>
      <div class="ProductFeatures__Item">
        <div class="ProductFeatures__ImageWrapper">
          <img class="ProductFeatures__Image" src="../assets/features/choco-2.png" alt="Pure Ingredients">
        </div>
        <h3 class="ProductFeatures__Title">PURE INGREDIENTS</h3>
        <p class="ProductFeatures__Description">We source only the finest raw materials, from organic cocoa to potent herbal extracts.</p>
      </div>
      <div class="ProductFeatures__Item">
        <div class="ProductFeatures__ImageWrapper">
          <img class="ProductFeatures__Image" src="../assets/features/choco-3.png" alt="Artisan Quality">
        </div>
        <h3 class="ProductFeatures__Title">ARTISAN QUALITY</h3>
        <p class="ProductFeatures__Description">Small-batch production ensures the highest standards of purity and taste in every bite.</p>
      </div>
    </div>
  </div>
</section>
`;

const luxuryHtmlProducts = `
<section class="ProductLuxurySection">
  <div class="ProductLuxurySection__ImageSide">
    <img class="ProductLuxurySection__Image" src="../assets/features/luxury-chocolate.png" alt="Refined Wellness">
  </div>
  <div class="ProductLuxurySection__TextSide">
    <span class="ProductLuxurySection__Subtitle">REFINED WELLNESS</span>
    <h2 class="ProductLuxurySection__Title">BEYOND ORDINARY</h2>
    <p class="ProductLuxurySection__Description">Experience the pinnacle of Ayurvedic innovation combined with elite craftsmanship.</p>
  </div>
</section>
`;

function processFile(filePath, isRoot = false) {
    console.log(`Processing ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add CSS link if missing
    const link = isRoot ? cssLinkRoot : cssLink;
    if (!content.includes('features.css')) {
        content = content.replace('</head>', `${link}\n</head>`);
        console.log(`- Added features.css link`);
    }

    // 2. Specific for products.html
    if (filePath.endsWith('products.html')) {
        if (!content.includes('ProductFeatures')) {
            content = content.replace('</main>', `</main>\n${featuresHtml}\n${luxuryHtmlProducts}`);
            console.log(`- Injected Features and Luxury sections`);
        }
    }

    fs.writeFileSync(filePath, content);
}

// Process main pages
processFile(path.join(baseDir, 'index.html'), true);
processFile(path.join(baseDir, 'pages/products.html'));
processFile(path.join(baseDir, 'pages/about.html'));
processFile(path.join(baseDir, 'pages/contact.html'));

console.log('Site-wide standardization complete.');
