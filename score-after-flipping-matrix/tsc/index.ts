function matrixScore(grid: number[][]): number {
  let result = setFirstColumn(grid);
  result = setColumns(result);

  return result.reduce((pv, cv) => pv + binarySum(cv), 0);
}

function setColumns(grid: number[][]): number[][] {
  const rows = grid.length;
  for (let index = 1; index < grid[0].length; index++) {
    const average = grid.reduce((pv, cv) => pv + cv[index], 0) / rows;
    if (average < 0.5) grid = flipColumn(grid, index);
  }
  return grid;
}

function setFirstColumn(grid: number[][]): number[][] {
  for (let index = 0; index < grid.length; index++) {
    const element = grid[index][0];
    if (element === 0) grid = flipRow(grid, index);
  }
  return grid;
}

function flipRow(matrix: number[][], index: number): number[][] {
  return matrix.map((row, i) => {
    if (index === i) return row.map((value) => Math.abs(value - 1));
    return row;
  });
}

function flipColumn(matrix: number[][], index: number): number[][] {
  return matrix.map((row, i) => {
    const newRow = [...row];
    newRow[index] = Math.abs(row[index] - 1);
    return newRow;
  });
}

function binarySum(numbers: number[]): number {
  return parseInt(numbers.join(""), 2);
}

export default matrixScore;
