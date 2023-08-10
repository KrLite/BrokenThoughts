---
hide:
  - navigation
  - toc
title: "<code>heap_sort.py</code>"
---

```python
def heap_sort(arr: list) -> list:
	global arrLen
	arrLen = len(arr)

	build_max_heap(arr)

	for(i) in range(len(arr) - 1, 0, -1):
		swap(arr, 0, i)
		arrLen -= 1
		heapify(arr, 0)

	return arr

def heapify(arr: list, i: int):
	largest = i
	left = 2 * i + 1
	right = 2 * i + 2

	if left < arrLen and arr[left] > arr[largest]:
		largest = left

	if right < arrLen and arr[right] > arr[largest]:
		largest = right

	if largest != i:
		swap(arr, i, largest)
		heapify(arr, largest)

def swap(arr: list, i: int, j: int):
	arr[i], arr[j] = arr[j], arr[i]

def build_max_heap(arr: list):
	import math

	for i in range(math.floor(arrLen / 2), -1, -1):
		heapify(arr, i)

arr: list = list(map(int, input().split()))
# Or use this:
# arr: list = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]

print(heap_sort(arr))
```
