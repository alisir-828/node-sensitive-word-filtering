# node-sensitive-word-filtering
基于 node 实现的敏感词过滤脚本（前缀树）
# 示例使用
```js
const trie = new Trie();
trie.insert('敏感词1');
trie.insert('敏感词12');

const inputText = '这里包含敏感词1和其他内容。';
const filteredText = trie.filter(inputText);

console.log(filteredText); // 输出: 这里包含****和其他内容。

const inputText2 = '灵敏';
const filteredText2 = trie.filter(inputText2);
console.log(inputText2); // 输出: 灵敏

```
