import {LinkedList} from "./LinkedList";

type DoubleNode<T> = {
  value: T;
  next?: DoubleNode<T>;
  prev?: DoubleNode<T>;
};

/**
 * A doubly linked list where each node holds references to both the next and previous nodes.
 * Extends {@link LinkedList} with O(1) tail access and bidirectional traversal.
 * @template T - The type of values stored in the list.
 */
export class DoublyLinkedList<T> extends LinkedList<T> {
  protected head?: DoubleNode<T>;
  private tail?: DoubleNode<T>;

  constructor() {
    super();
    this.tail = undefined;
  }

  /**
   * Inserts a value at the beginning of the list.
   * @param value - The value to prepend.
   */
  prepend(value: T): void {
    const node: DoubleNode<T> = {value};

    this.length++;
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  /**
   * Inserts a value at the specified index.
   * @param value - The value to insert.
   * @param idx - The zero-based position at which to insert.
   * @throws {Error} If the index is out of bounds.
   */
  insertAt(value: T, idx: number): void {
    if (idx > this.length) {
      throw new Error("Index out of bounds");
    } else if (idx === this.length) {
      this.append(value);
      return;
    } else if (idx === 0) {
      this.prepend(value);
      return;
    }

    this.length++;
    let current = this.head;
    for (let i = 0; current && i < idx; i++) {
      current = current.next;
    }
    current = current as DoubleNode<T>;
    const node: DoubleNode<T> = {value};

    node.next = current;
    node.prev = current?.prev;
    current.prev = node;

    if (current.prev) {
      current.prev.next = current;
    }
  }

  /**
   * Appends a value to the end of the list in O(1) time using the tail pointer.
   * @param value - The value to append.
   */
  append(value: T): void {
    const node: DoubleNode<T> = {value};

    this.length++;
    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }

    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  /**
   * Removes the first node whose value equals the given value.
   * @param value - The value to remove.
   * @returns The removed value, or `undefined` if the list is empty.
   * @throws {Error} If the value is not found in the list.
   */
  remove(value: T): T | undefined {
    let current = this.head;
    for (let i = 0; current && i < this.length; i++) {
      if (current.value === value) {
        break;
      }
      current = current.next;
    }

    if (!current) {
      throw new Error("Index out of bounds");
    }

    this.length--;

    if (this.length === 0) {
      const out = this.head?.value;
      this.head = this.tail = undefined;
      return out;
    }

    if (current.prev) {
      current.prev.next = current.next;
    }

    if (current.next) {
      current.next.prev = current.prev;
    }

    if (current === this.head) {
      this.head = current.next;
    }
    if (current === this.tail) {
      this.tail = current.prev;
    }

    current.prev = current.next = undefined;
    return current.value;
  }
}
