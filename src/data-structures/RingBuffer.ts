export interface IRingBuffer<T> {
  enqueue: (value: T) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
  clear: () => void;
  getCapacity: () => number;
}

/**
 * A fixed-capacity FIFO ring (circular) buffer backed by an array.
 * When full, enqueueing a new value overwrites the oldest value.
 * Enqueue, dequeue, and peek are all O(1).
 * @template T - The type of values stored in the buffer.
 */
export class RingBuffer<T> implements IRingBuffer<T> {
  private buffer: (T | undefined)[];
  private readonly capacity: number;
  private head: number;
  private tail: number;
  public length: number;

  constructor(capacity: number) {
    if (!Number.isInteger(capacity) || capacity <= 0) {
      throw new Error("RingBuffer capacity must be a positive integer");
    }

    this.capacity = capacity;
    this.buffer = new Array<T | undefined>(capacity);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  /**
   * Adds a value to the back of the buffer. If the buffer is full,
   * the oldest value is overwritten and the head advances.
   * @param value - The value to enqueue.
   */
  enqueue(value: T): void {
    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;

    if (this.length === this.capacity) {
      this.head = (this.head + 1) % this.capacity;
    } else {
      this.length++;
    }
  }

  /**
   * Removes and returns the value at the front of the buffer.
   * @returns The dequeued value, or `undefined` if the buffer is empty.
   */
  dequeue(): T | undefined {
    if (this.length === 0) {
      return undefined;
    }

    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined;
    this.head = (this.head + 1) % this.capacity;
    this.length--;

    return value;
  }

  /**
   * Returns the value at the front of the buffer without removing it.
   * @returns The front value, or `undefined` if the buffer is empty.
   */
  peek(): T | undefined {
    if (this.length === 0) {
      return undefined;
    }
    return this.buffer[this.head];
  }

  /**
   * Removes all elements from the buffer.
   */
  clear(): void {
    this.buffer = new Array<T | undefined>(this.capacity);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  /**
   * Returns the maximum number of elements the buffer can hold.
   */
  getCapacity(): number {
    return this.capacity;
  }
}
