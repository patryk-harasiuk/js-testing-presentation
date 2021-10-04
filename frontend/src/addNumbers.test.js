import { addNumbers } from "./addNumbers";

test("add numbers", () => {
  const a = 1;
  const b = 2;

  expect(addNumbers(a, b)).toBe(3);
});
