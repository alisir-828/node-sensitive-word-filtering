declare class Trie {
    /**
     * Creates a new instance of the Trie.
     * @param options The global options for the Trie.
     * @param options.replacement Optional. The replacement character or string for sensitive words. Defaults to '*'.
     * @param options.ignoreSpaces Optional. Whether to ignore spaces between characters when matching. Defaults to false.
     * @param options.ignoreCase Optional. Whether to ignore case when matching. Defaults to false.
     */
    constructor(options?: { replacement?: string; ignoreSpaces?: boolean; ignoreCase?: boolean });

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
     * Filters the input text and replaces sensitive words with the configured replacement string.
     * @param text The input text to filter.
     * @returns The filtered text.
     */
    filter(text: string): string;
}

export = Trie;