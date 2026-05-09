# @camkerber/typescript-dsa

Implementations of common data structures and algorithms in TypeScript, packaged as a typed ESM library for use in other TypeScript projects.

## Install

```bash
pnpm add @camkerber/typescript-dsa
# or: npm install @camkerber/typescript-dsa
# or: yarn add @camkerber/typescript-dsa
```

Requires an environment that supports ES modules (`"type": "module"` or a bundler).

## Usage

Import everything from the package root, or from one of the subpath exports if you only want one category:

```ts
import {
  Stack,
  PriorityQueue,
  quickSort,
  binarySearch,
} from "@camkerber/typescript-dsa";

// or, scoped imports
import {LinkedList} from "@camkerber/typescript-dsa/data-structures";
import {quickSort} from "@camkerber/typescript-dsa/algorithms";
```

### Example: data structures

```ts
import {Stack, PriorityQueue} from "@camkerber/typescript-dsa";

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.pop(); // 2
stack.peek(); // 1

const pq = new PriorityQueue<string>(); // highest priority first by default
pq.enqueue("low", 1);
pq.enqueue("high", 10);
pq.dequeue(); // "high"
```

### Example: algorithms

```ts
import {quickSort, binarySearch} from "@camkerber/typescript-dsa";

const sorted = quickSort([5, 2, 9, 1, 7]); // [1, 2, 5, 7, 9]
const idx = binarySearch(sorted, 7); // 3
```

## What's included

### Data structures (`@camkerber/typescript-dsa/data-structures`)

Each is a generic class that implements an `IStructureName<T>` interface.

- `Stack<T>`
- `Queue<T>`
- `LinkedList<T>`
- `DoublyLinkedList<T>`
- `BinarySearchTree<T>`
- `Trie`
- `Heap<T>` (generic, comparator-driven)
- `MinHeap<T>` / `MaxHeap<T>`
- `PriorityQueue<T>`

### Algorithms (`@camkerber/typescript-dsa/algorithms`)

Number-array implementations of classic sort and search routines.

- Sort: `bubbleSort`, `insertionSort`, `selectionSort`, `quickSort`
- Search: `binarySearch`, `quickSelect`

All public classes, methods, and functions ship with JSDoc.

## Releases

Versioning and publishing are handled by [Changesets](https://github.com/changesets/changesets). See [.changeset/README.md](.changeset/README.md) for the contribution and release workflow.
