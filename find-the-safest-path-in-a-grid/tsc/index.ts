class PriorityQueue<T> {
  private heap: [number, T][];
  private comparator: (a: [number, T], b: [number, T]) => boolean;

  constructor(comparator: (a: [number, T], b: [number, T]) => boolean) {
    this.heap = [];
    this.comparator = comparator;
  }

  enqueue(priority: number, value: T): void {
    this.heap.push([priority, value]);
    this.heapifyUp();
  }

  dequeue(): T | undefined {
    if (this.size() === 0) return undefined;
    const topValue = this.heap[0][1];
    const bottom = this.heap.pop();
    if (this.size() > 0 && bottom) {
      this.heap[0] = bottom;
      this.heapifyDown();
    }
    return topValue;
  }

  size(): number {
    return this.heap.length;
  }

  private heapifyUp(): void {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex])) {
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index],
        ];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private heapifyDown(): void {
    let index = 0;
    const length = this.size();
    const element = this.heap[0];
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let swapIndex: null | number = null;

      if (
        leftChildIndex < length &&
        this.comparator(this.heap[leftChildIndex], element)
      ) {
        swapIndex = leftChildIndex;
      }
      if (
        rightChildIndex < length &&
        this.comparator(
          this.heap[rightChildIndex],
          swapIndex === null ? element : this.heap[leftChildIndex]
        )
      ) {
        swapIndex = rightChildIndex;
      }

      if (swapIndex === null) break;
      [this.heap[index], this.heap[swapIndex]] = [
        this.heap[swapIndex],
        this.heap[index],
      ];
      index = swapIndex;
    }
  }
}

function maximumSafenessFactor(grid: number[][]): number {
  const n = grid.length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const distanceToThief = Array.from({ length: n }, () =>
    Array(n).fill(Infinity)
  );
  const queue: [number, number][] = [];

  // Step 1: Use BFS to calculate the distance to the nearest thief for each cell
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) {
        queue.push([r, c]);
        distanceToThief[r][c] = 0;
      }
    }
  }

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < n &&
        nc >= 0 &&
        nc < n &&
        distanceToThief[nr][nc] === Infinity
      ) {
        distanceToThief[nr][nc] = distanceToThief[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  // Step 2: Use max-heap to find the path with the maximum safeness factor
  const maxHeap = new PriorityQueue<[number, number]>((a, b) => a[0] > b[0]);
  maxHeap.enqueue(distanceToThief[0][0], [0, 0]);

  const maxSafeness = Array.from({ length: n }, () => Array(n).fill(-1));
  maxSafeness[0][0] = distanceToThief[0][0];

  while (maxHeap.size() > 0) {
    const [minSafeness, [r, c]] = maxHeap.dequeue()!;
    if (r === n - 1 && c === n - 1) return minSafeness;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
        const newSafeness = Math.min(minSafeness, distanceToThief[nr][nc]);
        if (newSafeness > maxSafeness[nr][nc]) {
          maxSafeness[nr][nc] = newSafeness;
          maxHeap.enqueue(newSafeness, [nr, nc]);
        }
      }
    }
  }

  return 0;
}

export default maximumSafenessFactor;
