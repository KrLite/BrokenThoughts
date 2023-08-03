# 基础排序算法集合

[`↗ 代码实现`](general/general.py)

## 选择排序 `Selection Sort`

- `时间复杂度` $\Theta(n^2)$

选择排序是一种简单直观的不稳定排序算法，它的工作原理如下：

1. 首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置；
2. 再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾；
3. 重复 `步骤 2`，直到所有元素均排序完毕。

```python
def selection_sort(arr) -> list:
	for i in range(len(arr)):
		min_index = i
		for j in range(i+1, len(arr)):
			if arr[min_index] > arr[j]:
				min_index = j
		arr[min_index], arr[i] = arr[i], arr[min_index]
	return arr
```

## 冒泡排序 `Bubble Sort`

- `时间复杂度`
  - `最优` $\Theta(n)$
  - `最坏` $\Theta(n^2)$
  - `平均` $\Theta(n^2)$

冒泡排序是一种稳定排序算法，因为较小（大）的元素会经由交换慢慢“浮”到数列的顶端，所以称作冒泡排序。它的工作原理如下：

1. 比较相邻的元素，如果第一个元素比第二个大（小），则进行交换；
2. 对每一对未排序的相邻元素进行比较和交换，这步做完后，位于这些元素最后的元素会是最大（小）值，此元素完成排序；
3. 针对所有未排序元素重复以上的步骤；
4. 重复 `步骤 1~3`，直到全部元素完成排序。

```python
def bubble_sort(arr) -> list:
	for i in range(len(arr)):
		for j in range(len(arr)-i-1):
			if arr[j] > arr[j+1]:
				arr[j], arr[j+1] = arr[j+1], arr[j]
	return arr
```

## 插入排序 `Insertion Sort`

- `时间复杂度`
  - `最优` $\Theta(n)$
  - `最坏` $\Theta(n^2)$
  - `平均` $\Theta(n^2)$

插入排序是一种稳定排序算法，它的工作原理如下：

1. 从第一个元素开始，该元素可以认为已经被排序；
2. 取出下一个元素（目标元素），在已排序元素序列中从后向前扫描；
3. 如果扫描到某一已排序元素大于（小于）目标元素，则将目标元素插入到此元素之后并当作新的已排序元素；
4. 重复 `步骤 2~3`，直到全部元素完成排序。

```python
def insertion_sort(arr) -> list:
	for i in range(1, len(arr)):
		key = arr[i]
		j = i-1
		while j >= 0 and key < arr[j]:
			arr[j+1] = arr[j]
			j -= 1
		arr[j+1] = key
	return arr
```
