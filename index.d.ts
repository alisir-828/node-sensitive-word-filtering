declare class Trie {
    /**
     * Inserts a word into the Trie.
     * @param word The word to insert.
     */
    insert(word: string): void;

    /**
     * Checks if the Trie contains the specified word.
     * @param word The word to check.
     * @returns True if the word exists, otherwise false.
     */
    contains(word: string): boolean;

    /**
     * Deletes a word from the Trie.
     * @param word The word to delete.
     */
    delete(word: string): void;

    /**
     * Filters the input text and replaces sensitive words with asterisks.
     * @param options The filter options.
     * @param options.text The input text to filter.
     * @param options.ignoreSpaces Optional. Whether to ignore spaces between characters when matching. Defaults to false.
     * @param options.ignoreCase Optional. Whether to ignore case when matching. Defaults to false.
     * @returns The filtered text.
     */
    filter(options: { text: string; ignoreSpaces?: boolean; ignoreCase?: boolean }): string;
}

export = Trie;