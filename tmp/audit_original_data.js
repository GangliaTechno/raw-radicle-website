
const fs = require('fs');
const path = require('path');

const pages = [
  'adarkc.html', 'amilkc.html', 'bdarkc.html', 'bmilkc.html', 'cdarkc.html', 'cmilkc.html', 'balm.html', 'shots.html'
];

const results = {};

pages.forEach(file => {
  const filePath = path.join(process.cwd(), 'public', 'pages', file);
  if (!fs.existsSync(filePath)) return;
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract Name (h1)
  const nameMatch = content.match(/<h1 class="ProductMeta__Title[^>]*>([\s\S]*?)<\/h1>/i);
  const name = nameMatch ? nameMatch[1].trim() : 'Unknown';
  
  // Extract Badge
  const badgeMatch = content.match(/<div class="ProductBadge"[^>]*>([\s\S]*?)<\/div>/i);
  const badge = badgeMatch ? badgeMatch[1].trim() : 'Unknown';
  
  // Extract Gallery (first slideshow image)
  const galleryMatches = [...content.matchAll(/class="Image--lazyLoad Image--fadeIn" src="([^"]+)"/ig)];
  const gallery = galleryMatches.map(m => m[1]);

  // Extract Features
  const featureMatches = [...content.matchAll(/<div class="ProductFeatures__Item">[\s\S]*?<img[^>]*src="([^"]+)"[\s\S]*?<h3[^>]*>([\s\S]*?)<\/h3>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/ig)];
  const internalFeatures = featureMatches.map(m => ({
    icon: m[1],
    title: m[2].trim(),
    text: m[3].trim()
  }));

  results[file.replace('.html', '')] = {
    name,
    badge,
    gallery,
    internalFeatures
  };
});

console.log(JSON.stringify(results, null, 2));
