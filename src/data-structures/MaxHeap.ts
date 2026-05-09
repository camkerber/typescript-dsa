import {Heap} from "./Heap";

const maxCompare = <T>(a: T, b: T): number => {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
};

/**
 * A binary max-heap: the largest value (by `<`) is always at the root.
 * @template T - The type of values stored in the heap.
 */
export class MaxHeap<T> extends Heap<T> {
  constructor(values: T[] = []) {
    super(maxCompare, values);
  }

  /**
   * Returns the largest element without removing it.
   */
  findMax(): T | undefined {
    return this.peek();
  }

  /**
   * Removes and returns the largest element.
   */
  extractMax(): T | undefined {
    return this.pop();
  }

  /**
   * Raises a key's value, sifting it up toward the root.
   * @returns `true` if a matching element was found and updated.
   */
  increaseKey(oldValue: T, newValue: T): boolean {
    return this.updateKey(oldValue, newValue);
  }
}
