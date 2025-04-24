type Element<T> = {
  value: T;
  next?: Element<T>;
};

export interface IQueue<T> {
  enqueue: (value: T) => void;
  dequeue: () => T | undefined;
  peek: () => T | undefined;
  isEmpty: () => boolean;
  clear: () => void;
}

export class Queue<T> implements IQueue<T> {
  private front?: Element<T>;
  private back?: Element<T>;
  public length: number;

  constructor() {
    this.front = undefined;
    this.length = 0;
  }

  enqueue(value: T): void {
    const newElement: Element<T> = {value};
    this.length++;

    if (!this.back) {
      this.front = this.back = newElement;
      return;
    }

    this.back.next = newElement;
    this.back = newElement;
  }

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

  peek(): T | undefined {
    return this.front?.value;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  clear(): void {
    this.front = undefined;
    this.length = 0;
  }
}
