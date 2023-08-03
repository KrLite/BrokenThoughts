# Selection sort
def selection_sort(arr) -> list:
	for i in range(len(arr)):
		min_index = i
		for j in range(i+1, len(arr)):
			if arr[min_index] > arr[j]:
				min_index = j
		arr[min_index], arr[i] = arr[i], arr[min_index]
	return arr

# Bubble sort
def bubble_sort(arr) -> list:
	for i in range(len(arr)):
		for j in range(len(arr)-i-1):
			if arr[j] > arr[j+1]:
				arr[j], arr[j+1] = arr[j+1], arr[j]
	return arr

# Insertion sort
def insertion_sort(arr) -> list:
	for i in range(1, len(arr)):
		key = arr[i]
		j = i-1
		while j >= 0 and key < arr[j]:
			arr[j+1] = arr[j]
			j -= 1
		arr[j+1] = key
	return arr