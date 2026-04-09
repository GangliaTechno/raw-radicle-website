
const fs = require('fs');
const path = require('path');

const auditData = JSON.parse(fs.readFileSync('tmp/audit_results_utf8.json', 'utf8'));
const productsPath = 'products.json';
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

Object.keys(auditData).forEach(id => {
  if (products[id]) {
    products[id].name = auditData[id].name;
    products[id].badge = auditData[id].badge;
    products[id].gallery = auditData[id].gallery;
    products[id].internalFeatures = auditData[id].internalFeatures;
    
    // Also ensure certifications/specs have ../ if they are in pages/
    // Actually, I'll just fix the speculative icons in certifications too
    if (products[id].certifications) {
      products[id].certifications.forEach(cert => {
        if (cert.icon.includes('/quality/')) {
           // We found these were missing. Let's use generic ones or the feature ones
           // For now, let's keep them but make sure the path is at least possible
           cert.icon = cert.icon.replace('../assets/quality/', '../assets/features/'); 
           // Safety icons like choco-1.png are better than broken icons
        }
      });
    }
  }
});

fs.writeFileSync(productsPath, JSON.stringify(products, null, 2), 'utf8');
console.log('Restoration of products.json completed.');
