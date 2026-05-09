import {MinHeap} from "../MinHeap";

describe("MinHeap", () => {
  it("keeps the smallest value at the root and supports decreaseKey", () => {
    const heap = new MinHeap<number>([5, 3, 8, 1, 9, 2, 7]);

    expect(heap.size).toEqual(7);
    expect(heap.findMin()).toEqual(1);

    heap.push(0);
    expect(heap.findMin()).toEqual(0);

    expect(heap.extractMin()).toEqual(0);
    expect(heap.extractMin()).toEqual(1);

    expect(heap.decreaseKey(8, -5)).toEqual(true);
    expect(heap.findMin()).toEqual(-5);
    expect(heap.decreaseKey(999, 0)).toEqual(false);

    const sorted: number[] = [];
    while (!heap.isEmpty()) sorted.push(heap.extractMin() as number);
    expect(sorted).toEqual([-5, 2, 3, 5, 7, 9]);
  });
});
