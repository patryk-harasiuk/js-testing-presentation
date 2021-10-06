import { addNumbers } from "../../functions/addNumbers";

it("adds two numbers", () => {
  const a = 1;
  const b = 2;

  expect(addNumbers(a, b)).toBe(3);
});
