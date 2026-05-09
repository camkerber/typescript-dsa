import {PriorityQueue} from "../PriorityQueue";

describe("PriorityQueue", () => {
  it("dequeues highest-priority items first by default", () => {
    const pq = new PriorityQueue<string>();

    expect(pq.isEmpty()).toEqual(true);
    expect(pq.peek()).toEqual(undefined);
    expect(pq.dequeue()).toEqual(undefined);

    pq.enqueue("low", 1);
    pq.enqueue("high", 10);
    pq.enqueue("mid", 5);
    pq.enqueue("urgent", 100);

    expect(pq.size).toEqual(4);
    expect(pq.peek()).toEqual("urgent");
    expect(pq.dequeue()).toEqual("urgent");
    expect(pq.dequeue()).toEqual("high");
    expect(pq.dequeue()).toEqual("mid");
    expect(pq.dequeue()).toEqual("low");
    expect(pq.isEmpty()).toEqual(true);
  });

  it("can reprioritize an item via increasePriority", () => {
    const pq = new PriorityQueue<string>();
    pq.enqueue("a", 1);
    pq.enqueue("b", 2);
    pq.enqueue("c", 3);

    expect(pq.peek()).toEqual("c");
    expect(pq.increasePriority("a", 100)).toEqual(true);
    expect(pq.peek()).toEqual("a");
    expect(pq.increasePriority("missing", 50)).toEqual(false);

    expect(pq.dequeue()).toEqual("a");
    expect(pq.dequeue()).toEqual("c");
    expect(pq.dequeue()).toEqual("b");
  });

  it("can be configured to dequeue lowest-priority first", () => {
    const pq = new PriorityQueue<string>(false);
    pq.enqueue("a", 5);
    pq.enqueue("b", 1);
    pq.enqueue("c", 3);

    expect(pq.dequeue()).toEqual("b");
    expect(pq.dequeue()).toEqual("c");
    expect(pq.dequeue()).toEqual("a");
  });
});
