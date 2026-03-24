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

const newStyleBlock = `/* --- GODIVA-INSPIRED LUXURY STYLING OVERRIDES --- */

/* 1. Global Image Constraints */
.Product__Gallery {
  max-height: 85vh !important;
  overflow: hidden !important;
}
.Product__Gallery .AspectRatio {
  max-height: 85vh !important;
}
.Product__Gallery img, .Product__Slideshow .Image--lazyLoaded {
  max-height: 85vh !important;
  width: auto !important;
  margin: 0 auto !important;
  object-fit: contain !important;
}

/* 2. Typography & Dividers */
.ProductMeta__Title {
  font-size: 26px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 3px !important;
  margin-bottom: 8px !important;
  color: #000000 !important;
}

.ProductMeta__Sku {
  font-size: 11px !important;
  letter-spacing: 1.5px !important;
  padding-bottom: 24px !important;
  border-bottom: 1px solid #e0e0e0 !important;
  margin-bottom: 24px !important;
  text-transform: uppercase !important;
  color: #666666 !important;
}

.ProductMeta__Price {
  font-weight: 600 !important;
  color: #000000 !important;
}

.ProductMeta__Description .Rte {
  font-size: 13px !important;
  line-height: 1.7 !important;
  color: #333333 !important;
  margin-bottom: 30px !important;
}

/* 3. Luxury Buttons */
.Marketplace__Grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 25px;
  margin-bottom: 40px;
}
.Marketplace__Grid > :nth-child(5) {
  grid-column: span 2;
}

.Marketplace .Button {
  border-radius: 0 !important; /* Sharp corners */
  background-color: #111111 !important;
  color: #ffffff !important;
  border: 1px solid #111111 !important;
  text-transform: uppercase !important;
  letter-spacing: 2px !important;
  font-weight: 600 !important;
  font-size: 11px !important;
  padding: 16px 16px !important;
  position: relative !important;
  overflow: hidden !important;
  z-index: 1 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.Marketplace .Button img {
  height: 22px !important;
  width: auto !important;
  margin-right: 8px !important;
}

/* Sweep Right Animation */
.Marketplace .Button::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ffffff;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: -1;
}

.Marketplace .Button:hover::before {
  transform: scaleX(1);
}

.Marketplace .Button:hover {
  color: #111111 !important;
  background-color: transparent !important;
}

/* 4. Minimalist Accordions */
.Product__Tabs .Collapsible {
  border: none !important;
  border-top: 1px solid #e0e0e0 !important;
  background: transparent !important;
  margin-bottom: 0 !important;
  padding: 0 !important;
}

.Product__Tabs .Collapsible:last-child {
  border-bottom: 1px solid #e0e0e0 !important;
}

.Product__Tabs .Collapsible__Button {
  padding: 20px 0 !important;
  font-size: 12px !important;
  letter-spacing: 2px !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  color: #000000 !important;
}

.Product__Tabs .Collapsible__Plus {
  font-size: 18px !important;
  font-weight: 300 !important;
  color: #666666 !important;
}

.Product__Tabs .Collapsible__Inner {
  padding: 0 0 20px 0 !important;
  border: none !important;
}

.Product__Tabs .Rte {
  font-size: 13px !important;
  line-height: 1.6 !important;
  color: #555555 !important;
}
</style>
`;

pagesToUpdate.forEach(page => {
    const pagePath = path.join(pagesDir, page);
    if (!fs.existsSync(pagePath)) {
        console.log(`Skipping ${page}, does not exist.`);
        return;
    }
    
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    
    // Exact string manipulation instead of complex regex matching.
    const startToken = '/* --- GODIVA-INSPIRED LUXURY STYLING OVERRIDES --- */';
    const startIndex = pageContent.indexOf(startToken);
    
    if (startIndex !== -1) {
        // Find the first </style> tag AFTER the startIndex
        const endIndex = pageContent.indexOf('</style>', startIndex);
        
        if (endIndex !== -1) {
             const endLength = '</style>'.length;
             pageContent = pageContent.substring(0, startIndex) + newStyleBlock + pageContent.substring(endIndex + endLength);
             fs.writeFileSync(pagePath, pageContent, 'utf8');
             console.log(`Successfully updated styles in ${page}`);
        } else {
             console.log(`Matching </style> not found for block in ${page}`);
        }
    } else {
        console.log(`Style block start token not found in ${page}`);
    }
});
console.log("Done updating styles.");
