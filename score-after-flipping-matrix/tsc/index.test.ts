import matrixScore from "./index";

describe("testing min cost to hire workers", () => {
  test("provided examples", () => {
    expect(matrixScore([[0]])).toBe(1);
    expect(
      matrixScore([
        [0, 0, 1, 1],
        [1, 0, 1, 0],
        [1, 1, 0, 0],
      ])
    ).toBe(39);
  });
  test("complex example", () => {
    expect(matrixScore([[0]])).toBe(1);
    expect(
      matrixScore([
        [0, 1, 1],
        [1, 1, 1],
        [0, 1, 0],
      ])
    ).toBe(18);
  });
});
