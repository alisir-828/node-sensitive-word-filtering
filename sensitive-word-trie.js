class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
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

      // 如果已经达到单词的末尾
      if (depth === word.length) {
        // 仅在节点确实是单词结尾时设置 isEndOfWord 为 false
        if (node.isEndOfWord) {
          node.isEndOfWord = false;
          // 如果没有任何子节点，则可以删除此节点
          return Object.keys(node.children).length === 0;
        }
        return false;
      }

      const char = word[depth];
      const childNode = node.children[char];

      // 递归删除子节点
      const shouldDeleteChild = deleteRecursively(
        childNode,
        word,
        depth + 1
      );

      if (shouldDeleteChild) {
        delete node.children[char];
        // 如果当前节点不是单词结尾并且没有其他子节点，可以删除
        return (
          Object.keys(node.children).length === 0 && !node.isEndOfWord
        );
      }

      return false;
    };

    deleteRecursively(this.root, word, 0);
  }

  filter(text) {
    let result = '';
    let i = 0;

    while (i < text.length) {
      let node = this.root;
      let j = i;
      let matchLength = 0;

      while (j < text.length && node.children[text[j]]) {
        node = node.children[text[j]];
        j++;
        if (node.isEndOfWord) {
          matchLength = j - i;
        }
      }

      if (matchLength > 0) {
        result += '*'.repeat(matchLength);
        i += matchLength;
      } else {
        result += text[i];
        i++;
      }
    }

    return result;
  }
}
