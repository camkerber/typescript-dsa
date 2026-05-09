import {BinarySearchTree} from "../BinarySearchTree";

describe("BinarySearchTree", () => {
  it("should insert, find min/max, and remove nodes", () => {
    const bst = new BinarySearchTree<number>();

    expect(bst.findMin()).toEqual(undefined);
    expect(bst.findMax()).toEqual(undefined);

    [10, 5, 15, 3, 7, 12, 20, 1, 8].forEach((v) => bst.insert(v));
    expect(bst.size).toEqual(9);

    bst.insert(10);
    expect(bst.size).toEqual(9);

    expect(bst.findMin()).toEqual(1);
    expect(bst.findMax()).toEqual(20);

    expect(bst.remove(1)).toEqual(true);
    expect(bst.findMin()).toEqual(3);
    expect(bst.size).toEqual(8);

    expect(bst.remove(20)).toEqual(true);
    expect(bst.findMax()).toEqual(15);

    expect(bst.remove(5)).toEqual(true);
    expect(bst.size).toEqual(6);

    expect(bst.remove(10)).toEqual(true);
    expect(bst.findMin()).toEqual(3);
    expect(bst.findMax()).toEqual(15);
    expect(bst.size).toEqual(5);

    expect(bst.remove(999)).toEqual(false);
    expect(bst.size).toEqual(5);

    [3, 7, 8, 12, 15].forEach((v) => expect(bst.remove(v)).toEqual(true));
    expect(bst.size).toEqual(0);
    expect(bst.findMin()).toEqual(undefined);
    expect(bst.findMax()).toEqual(undefined);
  });
});
