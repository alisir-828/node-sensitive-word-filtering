class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor(options = {}) {
        this.root = new TrieNode();
        this.replacement = options.replacement || '*';
    }

    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    contains(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    delete(word) {
        const deleteRecursively = (node, word, depth) => {
            if (!node) return false;
            if (depth === word.length) {
                if (node.isEndOfWord) {
                    node.isEndOfWord = false;
                    return Object.keys(node.children).length === 0;
                }
                return false;
            }
            const char = word[depth];
            const childNode = node.children[char];
            const shouldDeleteChild = deleteRecursively(
                childNode,
                word,
                depth + 1
            );
            if (shouldDeleteChild) {
                delete node.children[char];
                return (
                    Object.keys(node.children).length === 0 && !node.isEndOfWord
                );
            }
            return false;
        };
        deleteRecursively(this.root, word, 0);
    }

    filter({ text, ignoreSpaces = false, ignoreCase = false }) {
        const resultArray = [];
        const characters = Array.from(ignoreCase ? text.toLowerCase() : text);
        const originalChars = Array.from(text);
        let i = 0;
        while (i < characters.length) {
            let node = this.root;
            let j = i;
            let matchLength = 0;
            while (j < characters.length) {
                if (ignoreSpaces && characters[j] === ' ') {
                    j++;
                    continue;
                }
                if (!node.children[characters[j]]) {
                    break;
                }
                node = node.children[characters[j]];
                j++;
                if (node.isEndOfWord) {
                    matchLength = j - i;
                }
            }
            if (matchLength > 0) {
                resultArray.push(this.replacement.repeat(matchLength));
                i += matchLength;
            } else {
                resultArray.push(originalChars[i]);
                i++;
            }
        }
        return resultArray.join('');
    }
}

module.exports = Trie;