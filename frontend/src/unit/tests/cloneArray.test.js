import { cloneArray } from "../../functions/cloneArray";

it("clones array", () => {
  const array = [1, 2, 3];

  expect(cloneArray(array)).toEqual(array);
});
