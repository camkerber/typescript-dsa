type Node<T> = {
  value: T;
  next?: Node<T>;
};

export interface IStack<T> {
  push: (value: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
  isEmpty: () => boolean;
  clear: () => void;
}

/**
 * A LIFO (last-in, first-out) stack backed by a singly linked list.
 * Push and pop are both O(1).
 * @template T - The type of values stored in the stack.
 */
export class Stack<T> implements IStack<T> {
  private top?: Node<T>;
  public length: number;

  constructor() {
    this.top = undefined;
    this.length = 0;
  }

  /**
   * Pushes a value onto the top of the stack.
   * @param value - The value to push.
   */
  push(value: T): void {
    const newElement: Node<T> = {value};
    this.length++;
    if (!this.top) {
      this.top = newElement;
      return;
    } else {
      newElement.next = this.top;
      this.top = newElement;
      return;
    }
  }

  /**
   * Removes and returns the value at the top of the stack.
   * @returns The popped value, or `undefined` if the stack is empty.
   */
  pop(): T | undefined {
    this.length = Math.max(0, this.length - 1);
    if (this.length === 0) {
      const headRef = this.top;
      this.top = undefined;
      return headRef?.value;
    } else {
      const topElementRef = this.top as Node<T>;
      this.top = topElementRef.next;
      return topElementRef.value;
    }
  }

  /**
   * Returns the value at the top of the stack without removing it.
   * @returns The top value, or `undefined` if the stack is empty.
   */
  peek(): T | undefined {
    return this.top?.value;
  }

  /**
   * Returns `true` if the stack contains no elements.
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Removes all elements from the stack.
   */
  clear(): void {
    this.top = undefined;
    this.length = 0;
  }
}
