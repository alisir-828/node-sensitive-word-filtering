# node-sensitive-word-filtering

[中文](#中文) | [English](#English)

---

## 中文

基于 Node.js 实现的敏感词过滤脚本，使用前缀树（Trie）结构，支持高效匹配、大小写忽略、空格忽略功能。

### 特性

- 🌟 高效的敏感词过滤（基于前缀树）。
- 🌟 支持大小写忽略匹配。
- 🌟 支持过滤时忽略空格。
- 🌟 支持动态添加、删除敏感词。

### 安装

使用 NPM 安装：

```bash
npm install sensitive-word-filtering
```

### 示例使用

#### JavaScript 示例

```js
const Trie = require('sensitive-word-filtering');

const trie = new Trie();

// 添加敏感词
trie.insert('敏感词1');
trie.insert('敏感词12');

// 过滤文本
const inputText = '敏 感 词1 和其他内容。';
const filteredText = trie.filter({
    text: inputText,
    ignoreCase: true, // 忽略大小写
    ignoreSpaces: true, // 忽略空格
});
console.log(filteredText); // 输出: **** 和其他内容
```

#### TypeScript 示例

```ts
import Trie from 'sensitive-word-filtering';

const trie = new Trie();

// 插入敏感词
trie.insert('SensitiveWord');
trie.insert('BadWord');

// 测试文本
const text = 'This text contains SensitiveWord and other stuff.';
const result = trie.filter({ text, ignoreCase: true });
console.log(result); // 输出: This text contains ************ and other stuff.
```

### 方法说明

**insert(word: string): void**

- 功能: 插入敏感词。
- 参数: word - 要插入的敏感词。

**contains(word: string): boolean**

- 功能: 检查敏感词是否存在。
- 参数: word - 要检查的敏感词。
- 返回值: 如果敏感词存在，返回 true，否则返回 false。

**delete(word: string): void**

- 功能: 删除敏感词。
- 参数: word - 要删除的敏感词。

**filter(options: { text: string; ignoreCase?: boolean; ignoreSpaces?: boolean }): string**

- 功能: 过滤文本中的敏感词。

- 参数:

  - text: 要过滤的文本。

  - ignoreCase: 是否忽略大小写（默认为 false）。

  - ignoreSpaces: 是否忽略空格（默认为 false）。

- 返回值: 过滤后的文本。

## English

A sensitive word filtering script implemented in Node.js, using a prefix tree (Trie) structure. Supports efficient matching, case-insensitivity, and space-insensitivity.

### Features

🌟 Efficient sensitive word filtering (Trie-based).
🌟 Supports case-insensitive matching.
🌟 Supports ignoring spaces during filtering.
🌟 Dynamically add and remove sensitive words.

### Installation

Install via NPM:

```bash
npm install sensitive-word-filtering
```

### Example Usage

#### JavaScript Example

```js
const Trie = require('sensitive-word-filtering');

const trie = new Trie();

// Add sensitive words
trie.insert('SensitiveWord1');
trie.insert('SensitiveWord12');

// Filter text
const inputText = 'This contains SensitiveWord1 and some other text.';
const filteredText = trie.filter({
    text: inputText,
    ignoreCase: true, // Ignore case
    ignoreSpaces: true, // Ignore spaces
});
console.log(filteredText); // Output: This contains **** and some other text.

```

#### TypeScript Example

```ts
import Trie from 'sensitive-word-filtering';

const trie = new Trie();

// Insert sensitive words
trie.insert('SensitiveWord');
trie.insert('BadWord');

// Test text
const text = 'This text contains SensitiveWord and other stuff.';
const result = trie.filter({ text, ignoreCase: true });
console.log(result); // Output: This text contains ************ and other stuff.

```

### Method Descriptions

**insert(word: string): void**

- Function: Insert a sensitive word.
- Parameters: word - The sensitive word to insert.

**contains(word: string): boolean**

- Function: Check if a sensitive word exists.
- Parameters: word - The sensitive word to check.
- Returns: true if the word exists, otherwise false.

**delete(word: string): void**

- Function: Delete a sensitive word.
- Parameters: word - The sensitive word to delete.

**filter(options: { text: string; ignoreCase?: boolean; ignoreSpaces?: boolean }): string**

- Function: Filter sensitive words in the text.

- Parameters:

  - text: The text to filter.

  - ignoreCase: Whether to ignore case (default false).

  - ignoreSpaces: Whether to ignore spaces (default false).

- Returns: The filtered text.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.