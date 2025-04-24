import {Stack} from "../../data-structures";

export function reverseString(input: string): string {
  const stack = new Stack();
  for (let char of input) {
    stack.push(char);
  }

  let reversed = "";
  while (stack.length > 0) {
    reversed += stack.pop();
  }
  return reversed;
}
