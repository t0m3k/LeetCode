import testedFunction from "./index";

describe("tc0", () => {
  test("example 0", () => {
    expect(
      testedFunction([
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 1],
      ])
    ).toEqual(0);
  });
  test("example 1", () => {
    expect(
      testedFunction([
        [0, 0, 1],
        [0, 0, 0],
        [0, 0, 0],
      ])
    ).toEqual(2);
  });
});
