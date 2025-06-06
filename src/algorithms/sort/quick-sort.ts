/**
 * This function uses the quick sort algorithm to sort an array of numbers
 *
 * @param {number[]} arr - Array of numbers to be sorted
 * @return {number[]} Sorted array of numbers
 * @time_complexity linear: O(n log n)
 */
export function quickSort(arr: number[]): number[] {
  return sort(arr, 0, arr.length - 1);
}

function sort(arr: number[], left: number, right: number) {
  if (left < right) {
    let pivot = partition(arr, left, right);
    sort(arr, left, pivot - 1);
    sort(arr, pivot + 1, right);
  }
  return arr;
}

function partition(arr: number[], left: number, right: number): number {
  let pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  return i + 1;
}
