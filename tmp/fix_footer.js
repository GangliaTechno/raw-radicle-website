const fs = require('fs');

const extractFooter = (htmlStr) => {
  const startMarker = '<div class="shopify-section shopify-section--footer" id="shopify-section-footer">';
  const endMarker = '</footer>';
  
  const startIndex = htmlStr.indexOf(startMarker);
  if (startIndex === -1) return null;
  
  const tempStr = htmlStr.slice(startIndex);
  const endMarkerIndex = tempStr.indexOf(endMarker);
  if (endMarkerIndex === -1) return null;
  
  const endIndex = startIndex + endMarkerIndex + endMarker.length;
  // Also include the closing </div> for the shopify-section
  const endDivIndex = htmlStr.indexOf('</div>', endIndex) + 6;
  
  return htmlStr.slice(startIndex, endDivIndex);
};

const indexHtml = fs.readFileSync('d:/project2/public/index.html', 'utf8');
const indexFooter = extractFooter(indexHtml);

if (!indexFooter) {
  console.error("Could not find footer in index.html");
  process.exit(1);
}

// Adjust relative pathings for images or standard links from root to /pages
let adjustedFooter = indexFooter.replace(/src="\.\//g, 'src="../').replace(/href="\.\//g, 'href="../');
// Adjust `index.html` referencing
adjustedFooter = adjustedFooter.replace(/href="\.\/index\.html"/g, 'href="../index.html"');

const aboutHtmlPath = 'd:/project2/public/pages/about.html';
const aboutHtml = fs.readFileSync(aboutHtmlPath, 'utf8');
const aboutFooter = extractFooter(aboutHtml);

if (!aboutFooter) {
  console.error("Could not find footer in about.html");
  process.exit(1);
}

const newAboutHtml = aboutHtml.replace(aboutFooter, adjustedFooter);
fs.writeFileSync(aboutHtmlPath, newAboutHtml, 'utf8');

console.log("Footer successfully copied to about.html");
