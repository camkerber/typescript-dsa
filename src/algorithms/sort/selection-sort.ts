/**
 * This function uses the selection sort algorithm to sort an array of numbers
 *
 * @param arr - Array of numbers to be sorted
 * @returns Sorted (in place) array of numbers
 * @time_complexity quadratic: O(n^2)
 */
export function selectionSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length - 1; i++) {
    let lowestNumberIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowestNumberIndex]) {
        lowestNumberIndex = j;
      }
    }
    if (lowestNumberIndex != i) {
      let temp = arr[i];
      arr[i] = arr[lowestNumberIndex];
      arr[lowestNumberIndex] = temp;
    }
  }
  return arr;
}
