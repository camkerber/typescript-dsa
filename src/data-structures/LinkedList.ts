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

export class LinkedList<T> implements ILinkedList<T> {
  private head?: Node<T>;
  public length: number;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

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

  remove(value: T): T | undefined {
    const index = this.indexOf(value);
    return this.removeAt(index);
  }

  get(index: number): T | undefined {
    return this.getNode(index)?.value;
  }

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

  private indexOf(value: T): number {
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

  private getNode(index: number): Node<T> | undefined {
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
