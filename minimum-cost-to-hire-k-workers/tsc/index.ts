function mincostToHireWorkers(
  quality: number[],
  wage: number[],
  k: number
): number {
  const workers = quality.map((quality, i) => ({
    quality,
    wage: wage[i],
    ratio: wage[i] / quality,
  }));

  workers.sort((a, b) => a.ratio - b.ratio);

  let minCost = Infinity;
  let qualitySum = 0;
  const heap = new Heap();

  for (let i = 0; i < workers.length; i++) {
    qualitySum += workers[i].quality;
    heap.insert(workers[i].quality);
    if (heap.size() > k) qualitySum -= heap.extractMax();
    if (heap.size() === k)
      minCost = Math.min(minCost, qualitySum * workers[i].ratio);
  }

  return minCost;
}

class Heap {
  private heap: number[];

  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  insert(value: number) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMax(): number {
    if (this.heap.length === 0) return -1;
    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown();
    return max;
  }

  private heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = this.parentIndex(index);
      if (this.heap[parentIndex] > this.heap[index]) break;
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  private parentIndex(child: number): number {
    return Math.floor((child - 1) / 2);
  }

  private leftChildIndex(parent: number) {
    return parent * 2 + 1;
  }

  private rightChildIndex(parent: number) {
    return parent * 2 + 2;
  }

  private heapifyDown() {
    let index = 0;
    while (index < this.heap.length) {
      const leftIndex = this.leftChildIndex(index);
      const rightIndex = this.rightChildIndex(index);

      let largestIndex = index;

      if (
        leftIndex < this.heap.length &&
        this.heap[leftIndex] > this.heap[index]
      )
        largestIndex = leftIndex;

      if (
        rightIndex < this.heap.length &&
        this.heap[rightIndex] > this.heap[largestIndex]
      )
        largestIndex = rightIndex;

      if (largestIndex === index) break;

      [this.heap[index], this.heap[largestIndex]] = [
        this.heap[largestIndex],
        this.heap[index],
      ];
      index = largestIndex;
    }
  }
}

export default mincostToHireWorkers;
