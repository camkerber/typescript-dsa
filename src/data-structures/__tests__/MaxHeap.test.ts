import {MaxHeap} from "../MaxHeap";

describe("MaxHeap", () => {
  it("keeps the largest value at the root and supports increaseKey", () => {
    const heap = new MaxHeap<number>([5, 3, 8, 1, 9, 2, 7]);

    expect(heap.size).toEqual(7);
    expect(heap.findMax()).toEqual(9);

    heap.push(100);
    expect(heap.findMax()).toEqual(100);

    expect(heap.extractMax()).toEqual(100);
    expect(heap.extractMax()).toEqual(9);

    expect(heap.increaseKey(1, 50)).toEqual(true);
    expect(heap.findMax()).toEqual(50);
    expect(heap.increaseKey(999, 0)).toEqual(false);

    const sorted: number[] = [];
    while (!heap.isEmpty()) sorted.push(heap.extractMax() as number);
    expect(sorted).toEqual([50, 8, 7, 5, 3, 2]);
  });
});
