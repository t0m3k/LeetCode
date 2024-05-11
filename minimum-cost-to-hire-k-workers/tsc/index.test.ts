import mincostToHireWorkers from "./index";

describe("testing min cost to hire workers", () => {
  test("provided examples", () => {
    expect(mincostToHireWorkers([10, 20, 5], [70, 50, 30], 2)).toBeCloseTo(105);
    expect(
      mincostToHireWorkers([3, 1, 10, 10, 1], [4, 8, 2, 2, 7], 3)
    ).toBeCloseTo(30.66667);
  });
});
