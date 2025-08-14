class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
        this.isWildcard = false;
    }
}

class Trie {
    constructor(options = {}) {
        this.root = new TrieNode();
        this.replacement = options.replacement || '*';
        this.ignoreSpaces = options.ignoreSpaces || false;
        this.ignoreCase = options.ignoreCase || false;
        this.isOpenWildcard = options.isOpenWildcard | false;
    }

    insert(word) {
        const normalizedWord = this.normalizeWord(word);
        let node = this.root;

        const isWildcardPattern = normalizedWord.endsWith('*') && this.isOpenWildcard ;
        const wordToInsert = isWildcardPattern ? normalizedWord.slice(0, -1) : normalizedWord;

        for (const char of wordToInsert) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }

       if (isWildcardPattern) {
            node.isWildcard = true;
        } else {
            node.isEndOfWord = true;
        }
    }

    contains(word) {
        const normalizedWord = this.normalizeWord(word);
        let node = this.root;
        for (const char of normalizedWord) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];

            if (node.isWildcard) {
                return true;
            }
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
            let wildcardPrefixLength = 0;

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

                // 检查是否匹配到通配符节点
                if (node.isWildcard) {
                    wildcardPrefixLength = tempIndices.length; // 记录前缀长度
                    // 继续匹配后续字符直到单词边界
                    let k = j + 1;
                    while (k < characters.length && this.isAlnum(characters[k])) {
                        tempIndices.push(k);
                        k++;
                    }
                    // 检查是否到达单词边界
                    if (k >= characters.length || !this.isAlnum(characters[k])) {
                        matchLength = tempIndices.length;
                        matchedIndices = [...tempIndices];
                    }
                    break;
                }

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
                                // 对于通配符匹配，只替换前缀部分
                                if (wildcardPrefixLength > 0 && (currentPos - i) < wildcardPrefixLength) {
                                    resultArray.push(this.replacement);
                                } else if (wildcardPrefixLength === 0) {
                                    // 普通匹配，全部替换
                                    resultArray.push(this.replacement);
                                } else {
                                    // 通配符匹配的后缀部分，保持原样
                                    resultArray.push(originalCh);
                                }
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
