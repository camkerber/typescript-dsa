import {Heap} from "./Heap";

type PQNode<T> = {
  value: T;
  priority: number;
};

export interface IPriorityQueue<T> {
  enqueue: (value: T, priority: number) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
  isEmpty: () => boolean;
  increasePriority: (value: T, newPriority: number) => boolean;
}

/**
 * A priority queue backed by a binary heap. By default, the highest-priority
 * element is dequeued first; pass `highestFirst = false` for the opposite.
 * enqueue and dequeue are O(log n); peek is O(1).
 * @template T - The type of values stored in the queue.
 */
export class PriorityQueue<T> implements IPriorityQueue<T> {
  private heap: Heap<PQNode<T>>;

  constructor(highestFirst: boolean = true) {
    const compare = highestFirst
      ? (a: PQNode<T>, b: PQNode<T>) => b.priority - a.priority
      : (a: PQNode<T>, b: PQNode<T>) => a.priority - b.priority;
    this.heap = new Heap<PQNode<T>>(compare);
  }

  /**
   * The number of items currently in the queue.
   */
  get size(): number {
    return this.heap.size;
  }

  /**
   * Adds a value with the given priority.
   */
  enqueue(value: T, priority: number): void {
    this.heap.push({value, priority});
  }

  /**
   * Removes and returns the highest- (or lowest-) priority value.
   */
  dequeue(): T | undefined {
    return this.heap.pop()?.value;
  }

  /**
   * Returns the next-to-dequeue value without removing it.
   */
  peek(): T | undefined {
    return this.heap.peek()?.value;
  }

  /**
   * Returns `true` when the queue contains no items.
   */
  isEmpty(): boolean {
    return this.heap.isEmpty();
  }

  /**
   * Updates the priority of the first item equal to `value` (by `===`) and
   * rebalances. The new priority can be higher or lower; the name reflects
   * the typical use case of bumping an item closer to the front.
   * @returns `true` if a matching item was found and reprioritized.
   */
  increasePriority(value: T, newPriority: number): boolean {
    return this.heap.updateWhere((node) => node.value === value, {
      value,
      priority: newPriority,
    });
  }
}
