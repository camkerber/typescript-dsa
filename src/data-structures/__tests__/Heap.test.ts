import {Heap} from "../Heap";

describe("Heap", () => {
  it("supports the full heap surface as a min-heap", () => {
    const heap = new Heap<number>();

    expect(heap.isEmpty()).toEqual(true);
    expect(heap.peek()).toEqual(undefined);
    expect(heap.pop()).toEqual(undefined);
    expect(heap.size).toEqual(0);

    [5, 3, 8, 1, 9, 2, 7, 4, 6].forEach((v) => heap.push(v));
    expect(heap.size).toEqual(9);
    expect(heap.peek()).toEqual(1);
    expect(heap.isEmpty()).toEqual(false);

    expect(heap.pop()).toEqual(1);
    expect(heap.pop()).toEqual(2);
    expect(heap.peek()).toEqual(3);
    expect(heap.size).toEqual(7);

    expect(heap.replace(0)).toEqual(3);
    expect(heap.peek()).toEqual(0);

    const fromArray = new Heap<number>(undefined, [10, 4, 15, 20, 0, 8, 25]);
    expect(fromArray.peek()).toEqual(0);
    fromArray.heapify([100, 50, 75, 25]);
    expect(fromArray.peek()).toEqual(25);
    expect(fromArray.size).toEqual(4);

    expect(fromArray.remove(75)).toEqual(true);
    expect(fromArray.size).toEqual(3);
    expect(fromArray.remove(999)).toEqual(false);

    expect(fromArray.updateKey(100, 1)).toEqual(true);
    expect(fromArray.peek()).toEqual(1);
    expect(fromArray.updateKey(999, 0)).toEqual(false);

    const drained: number[] = [];
    while (!fromArray.isEmpty()) drained.push(fromArray.pop() as number);
    expect(drained).toEqual([1, 25, 50]);
  });

  it("supports merge (preserving) and meld (destroying) two heaps", () => {
    const a = new Heap<number>(undefined, [5, 1, 9]);
    const b = new Heap<number>(undefined, [3, 7, 2]);

    const merged = a.merge(b);
    expect(merged.size).toEqual(6);
    expect(a.size).toEqual(3);
    expect(b.size).toEqual(3);
    const mergedSorted: number[] = [];
    while (!merged.isEmpty()) mergedSorted.push(merged.pop() as number);
    expect(mergedSorted).toEqual([1, 2, 3, 5, 7, 9]);

    a.meld(b);
    expect(a.size).toEqual(6);
    expect(b.size).toEqual(0);
    expect(b.isEmpty()).toEqual(true);
    const aSorted: number[] = [];
    while (!a.isEmpty()) aSorted.push(a.pop() as number);
    expect(aSorted).toEqual([1, 2, 3, 5, 7, 9]);
  });

  it("works with a custom comparator (max-heap behavior)", () => {
    const maxHeap = new Heap<number>((x, y) => y - x);
    [3, 1, 4, 1, 5, 9, 2, 6].forEach((v) => maxHeap.push(v));
    expect(maxHeap.peek()).toEqual(9);
    expect(maxHeap.pop()).toEqual(9);
    expect(maxHeap.pop()).toEqual(6);
    expect(maxHeap.pop()).toEqual(5);
  });
});
