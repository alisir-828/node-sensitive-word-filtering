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
        const normalizedWord = this.normalizeWord(word);
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
        const deleteRecursively = (node, w, depth) => {
            if (!node) return false;
            if (depth === w.length) {
                if (node.isEndOfWord) {
                    node.isEndOfWord = false;
                    return Object.keys(node.children).length === 0;
                }
                return false;
            }
            const char = w[depth];
            const childNode = node.children[char];
            const shouldDeleteChild = deleteRecursively(
                childNode,
                w,
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

    isAlnum(ch) {
        return ch && /\p{L}|\p{N}/u.test(ch);
    }

    normalizeWord(word) {
        let normalizedWord = word;
        if (this.ignoreSpaces) {
            normalizedWord = normalizedWord.replace(/\s+/g, '');
        }
        if (this.ignoreCase) {
            // 使用Unicode规范化来处理特殊字符
            normalizedWord = normalizedWord.normalize('NFKD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase();
        }
        return normalizedWord;
    }

    filter(text) {
        const normalizedText = this.ignoreCase ? text.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : text;
        const originalChars = Array.from(text);
        const characters = Array.from(normalizedText);

        let resultArray = [];
        let i = 0;

        while (i < characters.length) {
            let node = this.root;
            let j = i;
            let matchLength = 0;
            let matchedIndices = [];
            let tempIndices = [];

            while (j < characters.length) {
                const ch = characters[j];
                const originalCh = originalChars[j];

                if (this.ignoreSpaces && /\s/.test(originalCh)) {
                    tempIndices.push(j);
                    j++;
                    continue;
                }

                if (!node.children[ch]) {
                    break;
                }
                node = node.children[ch];
                tempIndices.push(j);
                if (node.isEndOfWord) {
                    matchLength = tempIndices.length;
                    matchedIndices = [...tempIndices];
                }
                j++;
            }

            if (matchLength > 0) {
                const startIndex = matchedIndices[0];
                const endIndex = matchedIndices[matchedIndices.length - 1];

                const prevChar = startIndex > 0 ? originalChars[startIndex - 1] : null;
                const nextChar = endIndex < originalChars.length - 1 ? originalChars[endIndex + 1] : null;

                const startBoundary = !this.isAlnum(prevChar);
                const endBoundary = !this.isAlnum(nextChar);

                if (startBoundary && endBoundary) {
                    for (let currentPos = i; currentPos <= endIndex; currentPos++) {
                        if (matchedIndices.includes(currentPos)) {
                            const originalCh = originalChars[currentPos];
                            if (this.ignoreSpaces && /\s/.test(originalCh)) {
                                resultArray.push(originalCh);
                            } else {
                                resultArray.push(this.replacement);
                            }
                        } else {
                            resultArray.push(originalChars[currentPos]);
                        }
                    }
                    i = endIndex + 1;
                    continue;
                }
            }
            resultArray.push(originalChars[i]);
            i++;
        }

        return resultArray.join('');
    }
}

module.exports = Trie;
