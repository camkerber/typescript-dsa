import {RingBuffer} from "../RingBuffer";

describe("RingBuffer", () => {
  it("should enqueue, dequeue, peek, wrap around, and clear", () => {
    const buffer = new RingBuffer<number>(3);

    expect(buffer.getCapacity()).toEqual(3);
    expect(buffer.peek()).toEqual(undefined);
    expect(buffer.dequeue()).toEqual(undefined);
    expect(buffer.length).toEqual(0);

    buffer.enqueue(1);
    buffer.enqueue(2);
    buffer.enqueue(3);
    expect(buffer.length).toEqual(3);
    expect(buffer.peek()).toEqual(1);

    // Overwrite oldest when full
    buffer.enqueue(4);
    expect(buffer.length).toEqual(3);
    expect(buffer.peek()).toEqual(2);

    expect(buffer.dequeue()).toEqual(2);
    expect(buffer.dequeue()).toEqual(3);
    expect(buffer.dequeue()).toEqual(4);
    expect(buffer.dequeue()).toEqual(undefined);
    expect(buffer.length).toEqual(0);

    // Wrap around with interleaved enqueue/dequeue
    buffer.enqueue(10);
    buffer.enqueue(20);
    expect(buffer.dequeue()).toEqual(10);
    buffer.enqueue(30);
    buffer.enqueue(40);
    expect(buffer.length).toEqual(3);
    expect(buffer.peek()).toEqual(20);
    expect(buffer.dequeue()).toEqual(20);
    expect(buffer.dequeue()).toEqual(30);
    expect(buffer.dequeue()).toEqual(40);

    // Clear
    buffer.enqueue(99);
    buffer.clear();
    expect(buffer.length).toEqual(0);
    expect(buffer.peek()).toEqual(undefined);
    expect(buffer.dequeue()).toEqual(undefined);
    expect(buffer.getCapacity()).toEqual(3);
  });

  it("should throw on invalid capacity", () => {
    expect(() => new RingBuffer<number>(0)).toThrow();
    expect(() => new RingBuffer<number>(-1)).toThrow();
    expect(() => new RingBuffer<number>(1.5)).toThrow();
  });
});
