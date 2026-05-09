import {Trie} from "../Trie";

describe("Trie", () => {
  it("should add and find words while distinguishing prefixes", () => {
    const trie = new Trie();

    expect(trie.find("anything")).toEqual(false);

    ["cat", "car", "cart", "dog", "do"].forEach((w) => trie.add(w));
    expect(trie.size).toEqual(5);

    expect(trie.find("cat")).toEqual(true);
    expect(trie.find("car")).toEqual(true);
    expect(trie.find("cart")).toEqual(true);
    expect(trie.find("do")).toEqual(true);
    expect(trie.find("dog")).toEqual(true);

    expect(trie.find("ca")).toEqual(false);
    expect(trie.find("cars")).toEqual(false);
    expect(trie.find("d")).toEqual(false);
    expect(trie.find("")).toEqual(false);

    trie.add("cat");
    expect(trie.size).toEqual(5);

    trie.add("");
    expect(trie.find("")).toEqual(true);
    expect(trie.size).toEqual(6);
  });
});
