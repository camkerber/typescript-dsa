type Node = {
  children: Map<string, Node>;
  isEnd: boolean;
};

export interface ITrie {
  add: (word: string) => void;
  find: (word: string) => boolean;
}

const createNode = (): Node => ({children: new Map(), isEnd: false});

/**
 * A Trie (prefix tree) for storing strings.
 * Add and find are O(k), where k is the length of the word.
 */
export class Trie implements ITrie {
  private root: Node;
  public size: number;

  constructor() {
    this.root = createNode();
    this.size = 0;
  }

  /**
   * Inserts a word into the trie. Re-adding an existing word is a no-op.
   * @param word - The word to insert.
   */
  add(word: string): void {
    let current = this.root;
    for (const char of word) {
      let next = current.children.get(char);
      if (!next) {
        next = createNode();
        current.children.set(char, next);
      }
      current = next;
    }
    if (!current.isEnd) {
      current.isEnd = true;
      this.size++;
    }
  }

  /**
   * Returns `true` if the exact word has been added to the trie.
   * Prefixes that are not themselves added words return `false`.
   * @param word - The word to look up.
   */
  find(word: string): boolean {
    let current = this.root;
    for (const char of word) {
      const next = current.children.get(char);
      if (!next) return false;
      current = next;
    }
    return current.isEnd;
  }
}
