/**
 * This function uses the quick select algorithm to find the Kth element of an
 * unsorted array were it to be sorted.
 *
 * @param {number[]} arr - Unsorted arr of numbers
 * @param {number} k - Index in sorted array
 * @return {number} Value at K of sorted array
 * @time_complexity linear: O(n)
 */
export function quickSelect(arr: number[], k: number): number {
  return find(arr, k, 0, arr.length - 1);
}

function find(arr: number[], k: number, left: number, right: number): number {
  if (right - left <= 0) {
    return arr[left];
  }

  let pivotIndex = partition(arr, left, right);

  if (k < pivotIndex) {
    return find(arr, k, left, pivotIndex - 1);
  } else if (k > pivotIndex) {
    return find(arr, k, pivotIndex + 1, right);
  } else {
    // k === pivotIndex
    return arr[pivotIndex];
  }
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
