import { cloneArray } from "./cloneArray";

test("properly clones array", () => {
  const array = [1, 2, 3];

  // expect(cloneArray(array)).toBe(array);

  expect(cloneArray(array)).toEqual(array);
});
