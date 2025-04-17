/**
 * This function uses the insertion sort algorithm to sort an array of numbers
 *
 * @param arr - Array of numbers to be sorted
 * @returns Sorted (in place) array of numbers
 * @time_complexity quadratic: O(n^2)
 */
export function insertionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    const temp = arr[i];
    let position = i - 1;
    while (position >= 0) {
      if (arr[position] > temp) {
        arr[position + 1] = arr[position];
        position = position - 1;
      } else {
        break;
      }
    }
    arr[position + 1] = temp;
  }
  return arr;
}
