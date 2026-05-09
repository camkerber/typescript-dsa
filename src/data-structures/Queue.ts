type Node<T> = {
  value: T;
  next?: Node<T>;
};

export interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
  isEmpty: () => boolean;
  clear: () => void;
}

/**
 * A FIFO (first-in, first-out) queue backed by a singly linked list.
 * Enqueue and dequeue are both O(1).
 * @template T - The type of values stored in the queue.
 */
export class Queue<T> implements IQueue<T> {
  private front?: Node<T>;
  private back?: Node<T>;
  public length: number;

  constructor() {
    this.front = undefined;
    this.length = 0;
  }

  /**
   * Adds a value to the back of the queue.
   * @param value - The value to enqueue.
   */
  enqueue(value: T): void {
    const newElement: Node<T> = {value};
    this.length++;

    if (!this.back) {
      this.front = this.back = newElement;
      return;
    }

    this.back.next = newElement;
    this.back = newElement;
  }

  /**
   * Removes and returns the value at the front of the queue.
   * @returns The dequeued value, or `undefined` if the queue is empty.
   */
  dequeue(): T | undefined {
    if (this.length === 0) {
      this.back = undefined;
    }

    if (!this.front) {
      return undefined;
    }

    this.length--;
    const firstElement = this.front;
    this.front = this.front.next;

    return firstElement.value;
  }

  /**
   * Returns the value at the front of the queue without removing it.
   * @returns The front value, or `undefined` if the queue is empty.
   */
  peek(): T | undefined {
    return this.front?.value;
  }

  /**
   * Returns `true` if the queue contains no elements.
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Removes all elements from the queue.
   */
  clear(): void {
    this.front = undefined;
    this.length = 0;
  }
}
