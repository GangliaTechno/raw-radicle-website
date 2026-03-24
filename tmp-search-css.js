const fs = require('fs');
const content = fs.readFileSync('d:/project2/public/css/theme.css', 'utf8');
const lines = content.split('\n');
const targets = ['.Product__Gallery', '.Product__SlideshowNav', '.Product__Slideshow', '.Product__Info'];

targets.forEach(target => {
    console.log(`Searching for ${target}:`);
    lines.forEach((line, index) => {
        if (line.includes(target)) {
            console.log(`Line ${index + 1}: ${line.trim()}`);
        }
    });
});
