type Node<T> = {
  value: T;
  next?: Node<T>;
};

export interface ILinkedList<T> {
  prepend: (value: T) => void;
  insertAt: (value: T, index: number) => void;
  append: (value: T) => void;
  remove: (value: T) => T | undefined;
  get: (index: number) => T | undefined;
  removeAt: (index: number) => T | undefined;
}

/**
 * A singly linked list where each node holds a value and a reference to the next node.
 * @template T - The type of values stored in the list.
 */
export class LinkedList<T> implements ILinkedList<T> {
  protected head?: Node<T>;
  public length: number;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  /**
   * Inserts a value at the beginning of the list.
   * @param value - The value to prepend.
   */
  prepend(value: T): void {
    const newNode: Node<T> = {value};

    if (!this.head) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  /**
   * Inserts a value at the specified index.
   * @param value - The value to insert.
   * @param index - The zero-based position at which to insert.
   * @throws {Error} If the index is out of bounds.
   */
  insertAt(value: T, index: number): void {
    if (index < 0 || index > this.length) {
      throw new Error("Index out of bounds");
    }

    if (index === 0) {
      this.prepend(value);
      this.length++;
      return;
    }

    if (index === this.length) {
      this.length++;
      this.append(value);
    }

    const newNode: Node<T> = {value};
    let currentNode = this.head;

    for (let i = 0; i < index - 1; i++) {
      currentNode = currentNode?.next;
    }

    const nextNode = currentNode?.next;
    currentNode!.next = newNode;
    newNode.next = nextNode;

    this.length++;
  }

  /**
   * Appends a value to the end of the list.
   * @param value - The value to append.
   */
  append(value: T): void {
    const newNode: Node<T> = {value};

    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode?.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }

    this.length++;
  }

  /**
   * Removes the first node whose value equals the given value.
   * @param value - The value to remove.
   * @returns The removed value, or `undefined` if not found.
   */
  remove(value: T): T | undefined {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }

  /**
   * Returns the value at the given index without removing it.
   * @param index - The zero-based index to look up.
   * @returns The value at that index, or `undefined` if out of range.
   */
  get(index: number): T | undefined {
    return this.getNode(index)?.value;
  }

  /**
   * Removes and returns the value at the given index.
   * @param index - The zero-based index to remove.
   * @returns The removed value, or `undefined` if out of range.
   * @throws {Error} If the index is out of bounds.
   */
  removeAt(index: number): T | undefined {
    if (index < 0 || index > this.length) {
      throw new Error("Index out of bounds");
    }

    if (index >= 0 && index < this.length) {
      let currentNode = this.head;

      if (index === 0) {
        this.head = currentNode?.next;
      } else {
        const previousNode = this.getNode(index - 1);
        currentNode = previousNode?.next;
        previousNode!.next = currentNode?.next;
      }
      this.length--;
      return currentNode?.value;
    }
    return undefined;
  }

  /**
   * Returns the index of the first node with the given value, or -1 if not found.
   * @param value - The value to search for.
   */
  protected indexOf(value: T): number {
    let currentNode = this.head;
    for (let i = 0; i < this.length && currentNode; i++) {
      if (currentNode.value === value) {
        return i;
      } else {
        currentNode = currentNode.next;
      }
    }

    return -1;
  }

  /**
   * Returns the node at the given index, or `undefined` if out of range.
   * @param index - The zero-based index to look up.
   */
  protected getNode(index: number): Node<T> | undefined {
    if (index < 0 || index >= this.length) {
      return undefined;
    }

    if (!this.head) {
      return undefined;
    }

    let currentNode: Node<T> = this.head;
    for (let i: number = 0; i < index; i++) {
      if (!currentNode.next) {
        return undefined;
      }

      currentNode = currentNode.next;
    }

    return currentNode;
  }
}
