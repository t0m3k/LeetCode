pub fn mincost_to_hire_workers(quality: Vec<i32>, wage: Vec<i32>, k: i32) -> f64 {
    let mut candidates: Vec<(f64, i32)> = Vec::new();

    for i in 0..quality.len() {
        candidates.push((f64::from(wage[i]) / f64::from(quality[i]), quality[i]));
    }

    candidates.sort_unstable_by(|a, b| a.0.partial_cmp(&b.0).unwrap());

    let mut min_wage = f64::INFINITY;
    let mut total_quality = 0;
    let mut heap = Heap::default();

    for i in 0..candidates.len() {
        total_quality += candidates[i].1;
        heap.insert(candidates[i].1);
        if k < heap.values.len() as i32 {
            total_quality -= heap.extract_max();
        }
        if k == heap.values.len() as i32 {
            min_wage = min_wage.min(f64::from(total_quality) * candidates[i].0)
        }
    }

    return min_wage;
}

struct Heap {
    values: Vec<i32>,
}

impl Default for Heap {
    fn default() -> Self {
        Self {
            values: Vec::with_capacity(16),
        }
    }
}

impl Heap {
    fn extract_max(&mut self) -> i32 {
        let max = self.values[0];
        self.values[0] = self.values.pop().unwrap();
        self.heapify_down();

        max
    }
    fn parent_index(&self, index: usize) -> Option<usize> {
        if self.values.len() == 0 || index == 0 {
            return None;
        }
        Some((index - 1) / 2)
    }

    fn left_child_index(&self, index: usize) -> Option<usize> {
        let result = index * 2 + 1;
        if result > self.values.len() - 1 {
            return None;
        }
        Some(result)
    }

    fn right_child_index(&self, index: usize) -> Option<usize> {
        let result = index * 2 + 2;
        if result > self.values.len() - 1 {
            return None;
        }
        Some(result)
    }

    fn heapify_up(&mut self) {
        if self.values.len() < 2 {
            return;
        }

        let mut index = self.values.len() - 1;
        let mut parent_index = self.parent_index(index).unwrap_or(index);

        while self.values[index] > self.values[parent_index] {
            self.values.swap(index, parent_index);

            index = parent_index;
            parent_index = self.parent_index(index).unwrap_or(index);
        }
    }

    fn heapify_down(&mut self) {
        let mut index = 0;

        while index < self.values.len() {
            let mut largest_index = index;
            if let Some(left_child) = self.left_child_index(index) {
                if self.values[left_child] > self.values[index] {
                    largest_index = left_child;
                }
            }
            if let Some(right_child) = self.right_child_index(index) {
                if self.values[right_child] > self.values[largest_index] {
                    largest_index = right_child;
                }
            }

            if largest_index == index {
                break;
            }
            self.values.swap(index, largest_index);
            index = largest_index;
        }
    }

    fn insert(&mut self, value: i32) {
        self.values.push(value);
        self.heapify_up();
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn check_parent_index() {
        let mut heap = Heap::default();
        assert_eq!(heap.parent_index(1), None);
        heap.insert(1);
        assert_eq!(heap.parent_index(1), Some(0));
        assert_eq!(heap.parent_index(2), Some(0));
        assert_eq!(heap.parent_index(3), Some(1));
        assert_eq!(heap.parent_index(5), Some(2));
        assert_eq!(heap.parent_index(7), Some(3));
        assert_eq!(heap.parent_index(0), None);
    }

    #[test]
    fn test_heap() {
        let mut heap = Heap::default();
        heap.insert(20);
        heap.insert(5);
        heap.insert(10);
        heap.insert(100);

        assert_eq!(heap.values, vec![100, 20, 10, 5]);
    }

    #[test]
    fn example1() {
        assert_eq!(
            mincost_to_hire_workers(vec![10, 20, 5], vec![70, 50, 30], 2),
            105f64
        );
    }

    #[test]
    fn example2() {
        assert_eq!(
            mincost_to_hire_workers(vec![3, 1, 10, 10, 1], vec![4, 8, 2, 2, 7], 3).round(),
            30.66667f64.round()
        );
    }

    #[test]
    fn example3() {
        assert_eq!(
            mincost_to_hire_workers(
                vec![
                    37, 32, 14, 14, 23, 31, 82, 96, 81, 96, 22, 17, 68, 3, 88, 59, 54, 23, 22, 77,
                    61, 16, 46, 22, 94, 50, 29, 46, 7, 33, 22, 99, 31, 99, 75, 67, 95, 54, 31, 48,
                    44, 96, 99, 20, 51, 54, 18, 85, 25, 84
                ],
                vec![
                    453, 236, 199, 359, 107, 45, 150, 433, 32, 192, 433, 94, 113, 200, 293, 31, 48,
                    27, 15, 32, 295, 97, 199, 427, 90, 215, 390, 412, 475, 131, 122, 398, 479, 142,
                    103, 243, 86, 309, 498, 210, 173, 363, 449, 135, 353, 397, 105, 165, 165, 62
                ],
                20
            )
            .round(),
            4947.75000f64.round()
        );
    }
}
