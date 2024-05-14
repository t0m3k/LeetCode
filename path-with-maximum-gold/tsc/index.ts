function getMaximumGold(grid: number[][]): number {
  let maxSum = 0;
  const m = grid.length;
  const n = grid[0].length;

  const directions = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  function depthFirstSearch(
    x: number,
    y: number,
    goldSoFar: number,
  ): number {
    const currentValue = grid[x][y];
    
    grid[x][y] = 0;
    
    const currentGold = goldSoFar + currentValue;
    let maxGold = currentGold;
    
    
    
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      
      const nxInGrid = nx >= 0 && nx < m;
      const nyInGrid = ny >= 0 && ny < n;
      if (!nxInGrid || !nyInGrid) continue;
      
      const newElementGT0 = grid[nx][ny] > 0;
      
      if (newElementGT0) {
        maxGold = Math.max(maxGold, depthFirstSearch(nx, ny, currentGold));
      }
    }
    
    grid[x][y] = currentValue;

    return maxGold;
  }

  for (let xAxis = 0; xAxis < m; xAxis++) {
    for (let yAxis = 0; yAxis < n; yAxis++) {
      if (grid[xAxis][yAxis] > 0) {
        maxSum = Math.max(maxSum, depthFirstSearch(xAxis, yAxis, 0));
      }
    }
  }

  return maxSum;
}

export default getMaximumGold;