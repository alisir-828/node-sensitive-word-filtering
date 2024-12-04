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
        this.ignoreSpaces = options.ignoreSpaces || false;
        this.ignoreCase = options.ignoreCase || false;
    }

    insert(word) {
        const normalizedWord = this.normalizeWord(word);
        let node = this.root;
        for (const char of normalizedWord) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    contains(word) {
        const normalizedWord = this.normalizeWord(word); // 预处理敏感词
        let node = this.root;
        for (const char of normalizedWord) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    delete(word) {
        const normalizedWord = this.normalizeWord(word);
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
        deleteRecursively(this.root, normalizedWord, 0);
    }

    filter(text) {
        const normalizedText = this.normalizeWord(text);
        const resultArray = [];
        const characters = Array.from(normalizedText);
        const originalChars = Array.from(text);
        let i = 0;

        while (i < characters.length) {
            let node = this.root;
            let j = i;
            let matchLength = 0;

            while (j < characters.length) {
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

    normalizeWord(word) {
        let normalizedWord = word;
        if (this.ignoreSpaces) {
            normalizedWord = normalizedWord.replace(/\s+/g, '');
        }
        if (this.ignoreCase) {
            normalizedWord = normalizedWord.toLowerCase();
        }
        return normalizedWord;
    }
}

module.exports = Trie;
