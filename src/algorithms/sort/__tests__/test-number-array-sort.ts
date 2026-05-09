export function testNumberArraySort(
  fnName: string,
  algorithm: (arr: number[]) => number[],
) {
  describe(fnName, () => {
    const ARRAY_SIZE = 50;

    function buildSortedArray(): number[] {
      const arr: number[] = [];
      for (let i = 0; i < ARRAY_SIZE; i++) {
        arr.push(i);
      }
      return arr;
    }

    function buildUnsortedArray(): number[] {
      const arr: number[] = [];
      for (let i = ARRAY_SIZE; i > 0; i--) {
        arr.push(i);
      }
      return arr;
    }

    it("should sort a sorted array", () => {
      const input = buildSortedArray();
      const result = algorithm(input);
      for (let i = 0; i < ARRAY_SIZE - 1; i++) {
        expect(result[i] <= result[i + 1]).toBe(true);
      }
    });

    it("should sort an unsorted array", () => {
      const input = buildUnsortedArray();
      const result = algorithm(input);
      for (let i = 0; i < ARRAY_SIZE - 1; i++) {
        expect(result[i] <= result[i + 1]).toBe(true);
      }
    });

    it("should handle an empty array", () => {
      const result = algorithm([]);
      expect(result).toStrictEqual([]);
    });
  });
}
