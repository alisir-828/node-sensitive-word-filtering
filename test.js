const fs = require('fs');
const path = require('path');
const Trie = require('./sensitive-word-trie');

const trie = new Trie({
    replacement: '#',
    ignoreSpaces: true,
    ignoreCase: true
});


const filePath = path.resolve(__dirname, 'en.txt');
const fileContent = fs.readFileSync(filePath, 'utf-8');


fileContent.split(/\r?\n/).forEach((word) => {
    const trimmedWord = word.trim();
    if (trimmedWord) {
        trie.insert(trimmedWord);
    }
});


fileContent.split(/\r?\n/).forEach((word) => {
    const trimmedWord = word.trim();
    if (trimmedWord) {
        const filteredText = trie.filter(trimmedWord);
        console.log(`Original: ${trimmedWord}`);
        console.log(`Filtered: ${filteredText}`);
        console.log('---');
    }
});
