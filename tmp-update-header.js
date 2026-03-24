const fs = require('fs');
const path = require('path');

const publicDir = 'd:/project2/public';
const pagesDir = path.join(publicDir, 'pages');

const indexHtmlPath = path.join(publicDir, 'index.html');
const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Extract the header block from index.html
const headerStartMatch = indexHtmlContent.indexOf('<div class="shopify-section" id="shopify-section-popup">');
const headerEndMatch = indexHtmlContent.indexOf('<main id="main" role="main">');

if (headerStartMatch === -1 || headerEndMatch === -1) {
    console.error("Could not find header boundaries in index.html");
    process.exit(1);
}

let masterHeaderStr = indexHtmlContent.substring(headerStartMatch, headerEndMatch);

// Fix relative paths for subpages
masterHeaderStr = masterHeaderStr.replace(/href="index\.html"/g, 'href="../index.html"');
masterHeaderStr = masterHeaderStr.replace(/href="pages\//g, 'href="');
masterHeaderStr = masterHeaderStr.replace(/src="assets\//g, 'src="../assets/');
masterHeaderStr = masterHeaderStr.replace(/srcset="assets\//g, 'srcset="../assets/');
masterHeaderStr = masterHeaderStr.replace(/href="css\//g, 'href="../css/');

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

pagesToUpdate.forEach(page => {
    const pagePath = path.join(pagesDir, page);
    if (!fs.existsSync(pagePath)) {
        console.log(`Skipping ${page}, does not exist.`);
        return;
    }
    
    let pageContent = fs.readFileSync(pagePath, 'utf8');
    
    const pageStartMatch = pageContent.indexOf('<div class="shopify-section" id="shopify-section-popup">');
    const pageEndMatch = pageContent.indexOf('<main id="main" role="main">');
    
    if (pageStartMatch === -1 || pageEndMatch === -1) {
        console.log(`Could not find header boundaries in ${page}`);
        return;
    }
    
    // Replace the old header with the fixed master header
    pageContent = pageContent.substring(0, pageStartMatch) + masterHeaderStr + pageContent.substring(pageEndMatch);
    
    fs.writeFileSync(pagePath, pageContent, 'utf8');
    console.log(`Successfully updated header in ${page}`);
});
console.log("Done.");
