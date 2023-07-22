import { sum } from "./sum";

it("suming 5 and 2 will return 7", () => {
  const a: number = 5;
  const b: number = 2;
  expect(sum(a, b)).toBe(7);
});
