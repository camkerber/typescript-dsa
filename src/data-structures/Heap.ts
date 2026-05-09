export type HeapComparator<T> = (a: T, b: T) => number;

export interface IHeap<T> {
  peek: () => T | undefined;
  push: (value: T) => void;
  pop: () => T | undefined;
  replace: (value: T) => T | undefined;
  heapify: (values: T[]) => void;
  merge: (other: Heap<T>) => Heap<T>;
  meld: (other: Heap<T>) => void;
  isEmpty: () => boolean;
  remove: (value: T) => boolean;
  updateKey: (oldValue: T, newValue: T) => boolean;
  updateWhere: (predicate: (value: T) => boolean, newValue: T) => boolean;
}

const defaultMinCompare = <T>(a: T, b: T): number => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

/**
 * A binary heap implemented over an array. The supplied comparator decides
 * ordering: a min-heap uses the natural comparator, a max-heap inverts it.
 * peek is O(1); push, pop, replace, updateKey, and remove are O(log n);
 * heapify, merge, and meld are O(n).
 * @template T - The type of values stored in the heap.
 */
export class Heap<T> implements IHeap<T> {
  protected heap: T[];
  protected compare: HeapComparator<T>;

  constructor(
    compare: HeapComparator<T> = defaultMinCompare,
    values: T[] = [],
  ) {
    this.compare = compare;
    this.heap = [];
    if (values.length > 0) this.heapify(values);
  }

  /**
   * The number of elements currently in the heap.
   */
  get size(): number {
    return this.heap.length;
  }

  /**
   * Returns the root element (min or max depending on comparator) without removing it.
   */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Inserts a new value into the heap.
   * @param value - The value to insert.
   */
  push(value: T): void {
    this.heap.push(value);
    this.siftUp(this.heap.length - 1);
  }

  /**
   * Removes and returns the root element.
   * @returns The root element, or `undefined` if the heap is empty.
   */
  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const root = this.heap[0];
    const last = this.heap.pop() as T;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDown(0);
    }
    return root;
  }

  /**
   * Pops the root and pushes a new value in a single rebalance pass.
   * @param value - The replacement value.
   * @returns The popped root, or `undefined` if the heap was empty.
   */
  replace(value: T): T | undefined {
    if (this.heap.length === 0) {
      this.push(value);
      return undefined;
    }
    const root = this.heap[0];
    this.heap[0] = value;
    this.siftDown(0);
    return root;
  }

  /**
   * Replaces the heap's contents with the supplied array, rebuilt as a valid heap.
   * @param values - The values to load into the heap.
   */
  heapify(values: T[]): void {
    this.heap = [...values];
    for (let i = (this.heap.length >> 1) - 1; i >= 0; i--) {
      this.siftDown(i);
    }
  }

  /**
   * Returns a new heap containing all elements from this heap and `other`,
   * leaving both originals untouched.
   * @param other - The other heap to merge with.
   */
  merge(other: Heap<T>): Heap<T> {
    const merged = new Heap<T>(this.compare);
    merged.heapify([...this.heap, ...other.heap]);
    return merged;
  }

  /**
   * Absorbs all elements from `other` into this heap and empties `other`.
   * @param other - The heap whose contents will be drained into this heap.
   */
  meld(other: Heap<T>): void {
    this.heapify([...this.heap, ...other.heap]);
    other.heap = [];
  }

  /**
   * Returns `true` when the heap contains no elements.
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Removes the first element equal (by comparator) to `value`.
   * @returns `true` if a matching element was found and removed.
   */
  remove(value: T): boolean {
    const index = this.heap.findIndex((v) => this.compare(v, value) === 0);
    if (index === -1) return false;
    const last = this.heap.pop() as T;
    if (index === this.heap.length) return true;
    this.heap[index] = last;
    this.siftDown(index);
    this.siftUp(index);
    return true;
  }

  /**
   * Replaces the first element equal to `oldValue` with `newValue` and
   * restores the heap property in whichever direction is needed.
   * @returns `true` if the key was found and updated.
   */
  updateKey(oldValue: T, newValue: T): boolean {
    return this.updateWhere((v) => this.compare(v, oldValue) === 0, newValue);
  }

  /**
   * Replaces the first element matching `predicate` with `newValue` and
   * restores the heap property. Useful when the comparator alone can't
   * uniquely identify the element to update.
   * @returns `true` if a matching element was found and updated.
   */
  updateWhere(predicate: (value: T) => boolean, newValue: T): boolean {
    const index = this.heap.findIndex(predicate);
    if (index === -1) return false;
    this.heap[index] = newValue;
    this.siftDown(index);
    this.siftUp(index);
    return true;
  }

  protected siftUp(index: number): void {
    while (index > 0) {
      const parent = (index - 1) >> 1;
      if (this.compare(this.heap[index], this.heap[parent]) < 0) {
        [this.heap[index], this.heap[parent]] = [
          this.heap[parent],
          this.heap[index],
        ];
        index = parent;
      } else {
        break;
      }
    }
  }

  protected siftDown(index: number): void {
    const n = this.heap.length;
    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let best = index;
      if (left < n && this.compare(this.heap[left], this.heap[best]) < 0)
        best = left;
      if (right < n && this.compare(this.heap[right], this.heap[best]) < 0)
        best = right;
      if (best === index) break;
      [this.heap[index], this.heap[best]] = [this.heap[best], this.heap[index]];
      index = best;
    }
  }
}
