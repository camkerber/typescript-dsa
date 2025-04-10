/**
 * This function uses the bubble sort algorithm to sort an array of numbers
 *
 * @param arr - Array of numbers to be sorted
 * @returns Sorted (in place) array of numbers
 * @time_complexity quadratic: O(n^2)
 */
export function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}
