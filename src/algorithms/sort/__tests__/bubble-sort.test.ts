import {bubbleSort} from "../bubble-sort";

describe("bubble-sort", () => {
  it("should sort", () => {
    const result = bubbleSort([5, 2, 9, 3, 7]);
    expect(result).toStrictEqual([2, 3, 5, 7, 9]);
  });
});
