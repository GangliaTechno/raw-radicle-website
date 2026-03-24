const fs = require('fs');
const path = require('path');

const publicDir = 'd:/project2/public';
const pagesDir = path.join(publicDir, 'pages');

const pagesToUpdate = [
    'adarkc.html',
    'amilkc.html',
    'bdarkc.html',
    'bmilkc.html',
    'cdarkc.html',
    'cmilkc.html',
    'shots.html',
    'balm.html'
];

const arrowStyles = `

/* Custom Arrows matching MVST Desktop Slider */
.Product__SlideshowNavArrow {
  width: 48px !important;
  height: 48px !important;
  background: #ffffff !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
  border: 1px solid #e0e0e0 !important;
  transition: all 0.3s ease !important;
}
.Product__SlideshowNavArrow:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.15) !important;
}
.Product__SlideshowNavArrow svg {
  width: 14px !important;
  height: auto !important;
  color: #111111 !important;
}
.Product__SlideshowNavArrow:before {
  display: none !important;
}

/* Brand Button Hooks */
.Button--blinkit { --hover-bg: #F8CB46; --hover-text: #111111; }
.Button--zepto { --hover-bg: #490B65; --hover-text: #ffffff; }
.Button--amazon { --hover-bg: #FF9900; --hover-text: #111111; }
.Button--instamart { --hover-bg: #FC8019; --hover-text: #ffffff; }
.Button--flipkart { --hover-bg: #2874F0; --hover-text: #ffffff; }
`;

pagesToUpdate.forEach(page => {
    const pagePath = path.join(pagesDir, page);
    if (!fs.existsSync(pagePath)) {
        console.log(`Skipping ${page}, does not exist.`);
        return;
    }
    
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    
    // 1. Slider Restoration
    pageContent = pageContent.replace(/"stackProductImages":\s*true,/g, '"stackProductImages": false,');
    pageContent = pageContent.replace(/class="Product__Gallery Product__Gallery--stack Product__Gallery--withThumbnails"/g, 'class="Product__Gallery Product__Gallery--withThumbnails"');

    // 2. CSS Injection for Hover sweeps and Arrows
    // Append my new CSS rules just before the closing </style> of our custom block.
    // Wait, let's fix the sweep animation vars first!
    pageContent = pageContent.replace(/background-color: #ffffff;\\n\\s*transform: scaleX\\(0\\);/g, 'background-color: var(--hover-bg, #ffffff);\\n  transform: scaleX(0);');
    
    const hoverColorRegex = /.Marketplace .Button:hover \\{\\s*color: #111111 !important;\\s*background-color: transparent !important;\\s*\\}/g;
    pageContent = pageContent.replace(hoverColorRegex, '.Marketplace .Button:hover { color: var(--hover-text, #111111) !important; background-color: transparent !important; border-color: var(--hover-bg, #111111) !important; }');
    
    const styleEndIdx = pageContent.lastIndexOf('</style>');
    if (styleEndIdx !== -1) {
        pageContent = pageContent.substring(0, styleEndIdx) + arrowStyles + pageContent.substring(styleEndIdx);
    }

    // 3. Button Markup Restructure
    // Replaces 'Buy on XYZ' with 'BUY ON' strictly before the image.
    // Finding Blinkit
    let regexB = /(<a[^>]+class="[^"]*?)("[^>]*>\s*)(<img[^>]+src="\.\.\/assets\/blinkit\.png"[^>]*>)\s*Buy on Blinkit\s*(<\/a>)/ig;
    pageContent = pageContent.replace(regexB, '$1 Button--blinkit$2BUY ON $3$4');

    // Finding Zepto
    let regexZ = /(<a[^>]+class="[^"]*?)("[^>]*>\s*)(<img[^>]+src="\.\.\/assets\/zepto\.png"[^>]*>)\s*Buy on Zepto\s*(<\/a>)/ig;
    pageContent = pageContent.replace(regexZ, '$1 Button--zepto$2BUY ON $3$4');

    // Finding Amazon
    let regexA = /(<a[^>]+class="[^"]*?)("[^>]*>\s*)(<img[^>]+src="\.\.\/assets\/amazon\.png"[^>]*>)\s*Buy on Amazon\s*(<\/a>)/ig;
    pageContent = pageContent.replace(regexA, '$1 Button--amazon$2BUY ON $3$4');

    // Finding Instamart
    let regexI = /(<a[^>]+class="[^"]*?)("[^>]*>\s*)(<img[^>]+src="\.\.\/assets\/instamart\.png"[^>]*>)\s*Buy on Instamart\s*(<\/a>)/ig;
    pageContent = pageContent.replace(regexI, '$1 Button--instamart$2BUY ON $3$4');

    // Finding Flipkart
    let regexF = /(<a[^>]+class="[^"]*?)("[^>]*>\s*)(<img[^>]+src="\.\.\/assets\/flipkart\.png"[^>]*>)\s*BUY ON FLIPKART\s*(<\/a>)/ig;
    pageContent = pageContent.replace(regexF, '$1 Button--flipkart$2BUY ON $3$4');

    // Special case for alternate formatting
    let regexFA = /(<a[^>]+class="[^"]*?)("[^>]*>\s*)(<img[^>]+src="\.\.\/assets\/flipkart\.png"[^>]*>)\s*Buy on Flipkart\s*(<\/a>)/ig;
    pageContent = pageContent.replace(regexFA, '$1 Button--flipkart$2BUY ON $3$4');

    fs.writeFileSync(pagePath, pageContent, 'utf8');
    console.log(`Successfully updated styles and buttons on ${page}`);
});
console.log("Done.");
