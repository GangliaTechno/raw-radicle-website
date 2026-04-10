
const fs = require('fs');
const path = require('path');

const pages = [
  { file: 'adarkc.html', id: 'adarkc' },
  { file: 'amilkc.html', id: 'amilkc' },
  { file: 'bdarkc.html', id: 'bdarkc' },
  { file: 'bmilkc.html', id: 'bmilkc' },
  { file: 'cdarkc.html', id: 'cdarkc' },
  { file: 'cmilkc.html', id: 'cmilkc' }
];

const pagesDir = path.join(process.cwd(), 'public', 'pages');

const successStepHtml = `
      <!-- Success Step -->
      <div class="ReviewModal__Success">
        <div class="ReviewModal__SuccessIcon">
          <svg viewBox="0 0 512 512">
            <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM371.8 211.8l-128 128C238.3 345.3 231.2 348 224 348s-14.3-2.7-19.8-8.2l-64-64c-11-11-11-28.7 0-39.7s28.7-11 39.7 0L224 280.3l108.2-108.2c11-11 28.7-11 39.7 0S382.8 200.8 371.8 211.8z" fill="#000"/>
          </svg>
        </div>
        <h2 class="ReviewModal__StepTitle">Thank you!</h2>
        <p>Your review has been submitted successfully.</p>
      </div>
    </div>`;

pages.forEach(p => {
  const filePath = path.join(pagesDir, p.file);
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Body Attribute
  if (!content.includes(`data-cms-product-id="${p.id}"`)) {
    content = content.replace(/<body([^>]+)>/i, (match, attrs) => {
      if (attrs.includes('data-cms-product-id')) {
         return match.replace(/data-cms-product-id="[^"]*"/, `data-cms-product-id="${p.id}"`);
      }
      return `<body data-cms-product-id="${p.id}"${attrs}>`;
    });
  }

  // 2. Scripts
  if (!content.includes('cms-sync.js')) {
    content = content.replace('</body>', '  <script src="../js/cms-sync.js" defer></script>\n</body>');
  }
  if (!content.includes('reviews.js')) {
    content = content.replace('</body>', '  <script src="../js/reviews.js" defer></script>\n</body>');
  }

  // 3. Review Count Attribute
  if (!content.includes('data-cms-key="reviewCount"')) {
    content = content.replace(/class="ReviewSection__CountNum">[^<]*<\/span>/, 'class="ReviewSection__CountNum"><span data-cms-key="reviewCount">0</span> Reviews</span>');
  }

  // 4. Review List Attribute
  if (!content.includes('data-cms-key="reviews"')) {
    content = content.replace(/class="ReviewSection__List"[^>]*>/, 'class="ReviewSection__List" data-cms-key="reviews">');
  }

  // 5. Inject Success Step if missing
  if (!content.includes('ReviewModal__Success')) {
    // Find the end of the ReviewModal
    content = content.replace(/<\/div>\s*<\/div>\s*<\/section>\s*<!-- Footer -->/i, (match) => {
        // This is a bit risky, let's try finding the ReviewModal specifically
        return successStepHtml + '\n  </section>\n  <!-- Footer -->';
    });
    // Alternative: find Step 4 and inject after it
    if (!content.includes('ReviewModal__Success')) {
        content = content.replace(/<div class="ReviewModal__Step" data-step="4">[\s\S]*?<\/div>\s*<\/div>/i, (match) => {
            return match.replace(/<\/div>$/, successStepHtml);
        });
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${p.file}`);
});
