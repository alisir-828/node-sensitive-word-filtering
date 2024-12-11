const fs = require('fs');
const path = require('path');
const Trie = require('./sensitive-word-trie');

const trie = new Trie({
    replacement: '#',
    ignoreCase: true,
    ignoreSpaces: true,
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

const filteredText1 = trie.filter(' naaaa');
const filteredText2 = trie.filter('button');
const filteredText3 = trie.filter('敏感词语');
console.log(`test1: ${filteredText1}`);
console.log(`test2: ${filteredText2}`);
console.log(`test3: ${filteredText3}`);
