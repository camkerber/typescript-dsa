import {Heap} from "./Heap";

const minCompare = <T>(a: T, b: T): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * A binary min-heap: the smallest value (by `<`) is always at the root.
 * @template T - The type of values stored in the heap.
 */
export class MinHeap<T> extends Heap<T> {
  constructor(values: T[] = []) {
    super(minCompare, values);
  }

  /**
   * Returns the smallest element without removing it.
   */
  findMin(): T | undefined {
    return this.peek();
  }

  /**
   * Removes and returns the smallest element.
   */
  extractMin(): T | undefined {
    return this.pop();
  }

  /**
   * Lowers a key's value, sifting it up toward the root.
   * @returns `true` if a matching element was found and updated.
   */
  decreaseKey(oldValue: T, newValue: T): boolean {
    return this.updateKey(oldValue, newValue);
  }
}
