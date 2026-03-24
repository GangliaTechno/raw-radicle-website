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

const arrowAndHoverStyles = `
/* Custom Circular Slider Arrows (MVST Style) */
.flickity-prev-next-button {
  width: 48px !important;
  height: 48px !important;
  background: white !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
  border: 1px solid #e1e1e1 !important;
  transition: all 0.3s ease !important;
  z-index: 10 !important;
}
.flickity-prev-next-button:hover {
  background: white !important;
  opacity: 1 !important;
  box-shadow: 0 6px 18px rgba(0,0,0,0.15) !important;
}
.flickity-prev-next-button.previous { left: 15px !important; }
.flickity-prev-next-button.next { right: 15px !important; }
.flickity-prev-next-button svg {
  width: 12px !important;
  height: auto !important;
  fill: #111111 !important;
}
.flickity-prev-next-button:disabled { display: none !important; }

/* Brand Hover Styles */
.Button--blinkit { --hover-bg: #F8CB46; --hover-text: #111111; }
.Button--zepto { --hover-bg: #490B65; --hover-text: #ffffff; }
.Button--amazon { --hover-bg: #FF9900; --hover-text: #111111; }
.Button--instamart { --hover-bg: #FC8019; --hover-text: #ffffff; }
.Button--flipkart { --hover-bg: #2874F0; --hover-text: #ffffff; }
`;

pagesToUpdate.forEach(page => {
    const pagePath = path.join(pagesDir, page);
    if (!fs.existsSync(pagePath)) return;
    
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    
    // 1. Enable Flickity Arrows and set Thin Arrow Shape
    pageContent = pageContent.replace(/"prevNextButtons":\s*false/g, '"prevNextButtons": true');
    // Set a thin chevron arrow shape
    pageContent = pageContent.replace(/"arrowShape":\s*\{[^\}]*\}/g, '"arrowShape": {"x0": 30, "x1": 60, "y1": 50, "x2": 60, "y2": 45, "x3": 35}');

    // 2. Update the background-color in the sweep animation to use the variable
    pageContent = pageContent.replace(/background-color: #ffffff;\s+transform: scaleX\(0\);/g, 'background-color: var(--hover-bg, #ffffff);\n  transform: scaleX(0);');
    
    // 3. Update the hover text and border color behavior
    pageContent = pageContent.replace(/\.Marketplace \.Button:hover \{\s*color: #111111 !important;\s*background-color: transparent !important;\s*\}/g, 
        '.Marketplace .Button:hover { color: var(--hover-text, #111111) !important; background-color: transparent !important; border-color: var(--hover-bg, #111111) !important; }');

    // 4. Inject the new CSS rules before the closing style tag of our custom block
    if (!pageContent.includes('/* Custom Circular Slider Arrows (MVST Style) */')) {
        const styleEndIdx = pageContent.lastIndexOf('</style>');
        if (styleEndIdx !== -1) {
            pageContent = pageContent.substring(0, styleEndIdx) + arrowAndHoverStyles + pageContent.substring(styleEndIdx);
        }
    }

    fs.writeFileSync(pagePath, pageContent, 'utf8');
    console.log(`Updated ${page}`);
});
console.log("Done.");
