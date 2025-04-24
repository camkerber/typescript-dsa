import {reverseString} from "../reverse-string";

describe("reverseString", () => {
  it("should reverse a string", () => {
    expect(reverseString("Pied Piper")).toEqual("repiP deiP");
    expect(reverseString("abc")).toEqual("cba");
    expect(reverseString("a")).toEqual("a");
    expect(reverseString("")).toEqual("");
  });
});
