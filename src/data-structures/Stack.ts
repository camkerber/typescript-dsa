type Element<T> = {
  value: T;
  next?: Element<T>;
};

export interface IStack<T> {
  push: (value: T) => void;
  pop: () => T | undefined;
  peek: () => T | undefined;
  isEmpty: () => boolean;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  private top?: Element<T>;
  public length: number;

  constructor() {
    this.top = undefined;
    this.length = 0;
  }

  push(value: T): void {
    const newElement: Element<T> = {value};
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

  pop(): T | undefined {
    this.length = Math.max(0, this.length - 1);
    if (this.length === 0) {
      const headRef = this.top;
      this.top = undefined;
      return headRef?.value;
    } else {
      const topElementRef = this.top as Element<T>;
      this.top = topElementRef.next;
      return topElementRef.value;
    }
  }

  peek(): T | undefined {
    return this.top?.value;
  }

  isEmpty(): boolean {
    return this.length === 0;
  }

  clear(): void {
    this.top = undefined;
    this.length = 0;
  }
}
