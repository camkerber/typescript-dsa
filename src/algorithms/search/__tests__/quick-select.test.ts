import {quickSelect} from "../quick-select";

const testArray = [3, 7, 1, 9, 2, 0, 6]; // [0, 1, 2, 3, 6, 7, 9]

describe("quickSelect", () => {
  it.each([
    [0, 0],
    [1, 1],
    [5, 7],
    [6, 9],
  ])("should find value at index k of unsorted array", (k, expected) => {
    expect(quickSelect(testArray, k)).toBe(expected);
  });
});
