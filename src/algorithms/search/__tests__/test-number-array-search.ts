export function testNumberArraySearch(
  fnName: string,
  algorithm: (arr: number[], target: number) => number,
) {
  describe(fnName, () => {
    const ARRAY_SIZE = 50;

    function buildSortedArray() {
      const array: number[] = [];
      for (let i = 1; i <= ARRAY_SIZE; i++) {
        array.push(i);
      }
      return array;
    }

    it("should handle an empty array", () => {
      expect(algorithm([], 1)).toEqual(-1);
    });

    it("should find a target in the first position", () => {
      const array = buildSortedArray();
      expect(algorithm(array, 1)).toEqual(0);
    });

    it("should find a target in the last position", () => {
      const array = buildSortedArray();
      expect(algorithm(array, ARRAY_SIZE)).toEqual(ARRAY_SIZE - 1);
    });

    it("should find a target in any position", () => {
      const array = buildSortedArray();

      for (let value = 1; value <= ARRAY_SIZE; value++) {
        expect(algorithm(array, value)).toEqual(value - 1);
      }
    });
  });
}
