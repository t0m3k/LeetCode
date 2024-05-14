import testedFunction from "./index";

describe("testing min cost to hire workers", () => {
  test("provided examples", () => {
    expect(testedFunction([
    [0, 6, 0],
    [5, 8, 7],
    [0, 9, 0]
])).toEqual(24);
  });
});
