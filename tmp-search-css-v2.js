const fs = require('fs');
const content = fs.readFileSync('d:/project2/public/css/theme.css', 'utf8');
const lines = content.split('\n');
const targets = ['.Product__Gallery', '.Product__SlideshowNav', '.Product__Slideshow', '.Product__Info'];

const results = [];
targets.forEach(target => {
    results.push(`Searching for ${target}:`);
    lines.forEach((line, index) => {
        if (line.includes(target)) {
            results.push(`Line ${index + 1}: ${line.trim()}`);
        }
    });
    results.push('');
});

fs.writeFileSync('d:/project2/tmp-search-results.txt', results.join('\n'));
console.log('Search completed. Results in tmp-search-results.txt');
