const fs = require('fs');
const indexHtml = fs.readFileSync('public/index.html', 'utf8');

const startIndex = indexHtml.indexOf('<div class="shopify-section shopify-section--footer" id="shopify-section-footer">');
const endIndex = indexHtml.indexOf('    <!--Gorgias Chat Widget Start-->');

if (startIndex !== -1 && endIndex !== -1) {
  const footerHtml = indexHtml.substring(startIndex, endIndex).trimRight();
  
  const files = ['public/login.html', 'public/register.html'];
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const targetStart = content.indexOf('<div class="shopify-section shopify-section--footer" id="shopify-section-footer">');
    const targetEnd = content.indexOf('<script defer src="js/custom.js"></script>');
    
    if (targetStart !== -1 && targetEnd !== -1) {
      content = content.substring(0, targetStart) + footerHtml + "\n  " + content.substring(targetEnd);
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`Missing boundaries in ${file}`);
    }
  }
} else {
  console.log("Failed to find index.html boundaries");
}
