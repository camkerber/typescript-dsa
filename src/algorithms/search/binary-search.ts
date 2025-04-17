/**
 * This function uses the binary search algorithm to sort an array of numbers
 *
 * @param arr - Sorted array of numbers
 * @param target - Number to search for
 * @returns Index of the `target` param or `-1` if it cannot be found
 * @time_complexity quadratic: O(log n)
 */
export function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const midpoint = Math.floor((high + low) / 2);
    const middleValue = arr[midpoint];

    if (middleValue === target) {
      return midpoint;
    } else if (target < middleValue) {
      high = midpoint - 1;
    } else if (target > middleValue) {
      low = midpoint + 1;
    }
  }
  return -1;
}
