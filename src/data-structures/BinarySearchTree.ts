type Node<T> = {
  value: T;
  left?: Node<T>;
  right?: Node<T>;
};

export type BSTComparator<T> = (a: T, b: T) => number;

export interface IBinarySearchTree<T> {
  insert: (value: T) => void;
  remove: (value: T) => boolean;
  findMin: () => T | undefined;
  findMax: () => T | undefined;
}

const defaultCompare = <T>(a: T, b: T): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * An unbalanced Binary Search Tree.
 * Average-case insert, remove, findMin, and findMax are O(log n);
 * worst case (fully skewed tree) is O(n).
 * @template T - The type of values stored in the tree.
 */
export class BinarySearchTree<T> implements IBinarySearchTree<T> {
  private root?: Node<T>;
  private compare: BSTComparator<T>;
  public size: number;

  constructor(compare: BSTComparator<T> = defaultCompare) {
    this.root = undefined;
    this.compare = compare;
    this.size = 0;
  }

  /**
   * Inserts a value into the tree. Duplicate values are ignored.
   * @param value - The value to insert.
   */
  insert(value: T): void {
    const newNode: Node<T> = {value};
    if (!this.root) {
      this.root = newNode;
      this.size++;
      return;
    }

    let current = this.root;
    while (true) {
      const cmp = this.compare(value, current.value);
      if (cmp === 0) return;
      if (cmp < 0) {
        if (!current.left) {
          current.left = newNode;
          this.size++;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          this.size++;
          return;
        }
        current = current.right;
      }
    }
  }

  /**
   * Removes a value from the tree.
   * @param value - The value to remove.
   * @returns `true` if the value was found and removed, otherwise `false`.
   */
  remove(value: T): boolean {
    const initialSize = this.size;
    this.root = this.removeNode(this.root, value);
    return this.size < initialSize;
  }

  private removeNode(node: Node<T> | undefined, value: T): Node<T> | undefined {
    if (!node) return undefined;

    const cmp = this.compare(value, node.value);
    if (cmp < 0) {
      node.left = this.removeNode(node.left, value);
      return node;
    }
    if (cmp > 0) {
      node.right = this.removeNode(node.right, value);
      return node;
    }

    this.size--;
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    let successor = node.right;
    while (successor.left) successor = successor.left;
    node.value = successor.value;
    this.size++;
    node.right = this.removeNode(node.right, successor.value);
    return node;
  }

  /**
   * Returns the minimum value in the tree.
   * @returns The smallest value, or `undefined` if the tree is empty.
   */
  findMin(): T | undefined {
    if (!this.root) return undefined;
    let current = this.root;
    while (current.left) current = current.left;
    return current.value;
  }

  /**
   * Returns the maximum value in the tree.
   * @returns The largest value, or `undefined` if the tree is empty.
   */
  findMax(): T | undefined {
    if (!this.root) return undefined;
    let current = this.root;
    while (current.right) current = current.right;
    return current.value;
  }
}
