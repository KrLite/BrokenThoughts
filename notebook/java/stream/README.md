# <p align=left><sub>[`←` Java](/notebook/java)</sub></p> <p align=left>Arrays.stream / 流式处理</p>

`Java 8 Api`

流式处理[^流式处理]使用声明的方式处理数据。

[^流式处理]: Stream Processing。流式处理是一种数据处理方式，它将数据视为流，通过对流的处理，从而实现对数据的处理。

在流式处理中，数据如水流一般在管道中传输，并在节点上进行筛选、排序、聚合等中间操作的处理，最后由终结操作生成结果。

流式处理模式图：

```
【数据源】--→【筛选】→【排序】→【聚合】→ ··· →【收集】--→【结果】
```

## 1. 流式处理是什么？

流是一个支持聚合操作的来自数据源的元素队列。

- **元素**是形成队列的特定类型的对象。流并不会存储元素，而只是按需计算。
- **数据源**是流的来源。可以是集合、数组、`I/O channel`、 `generator` 等。
- **聚合操作**对流进行处理，如 `filter` `map` `reduce` `find` `match` `sorted` 等。

不同于集合操作， 流式操作还有两个基础的特征：

- `管道流` 中间操作都会返回流对象本身。这样一来，多个操作就可以串联成一个管道。这可以方便地对操作进行优化，比如延迟执行[^延迟执行]和短路[^短路]。
- `内部迭代` 以前对集合遍历都是通过 `Iterator` 或 `For-Each` 的方式，以外部迭代方式显式地在集合外部进行迭代。而流式操作则通过访问者模式[^访问者模式]实现了内部迭代。

[^延迟执行]: Laziness，又称惰性化。延迟执行是指在需要结果的时候才执行。

[^短路]: Short-circuiting。短路是指在不需要处理所有元素的情况下就可以结束对元素的处理。

[^访问者模式]: Visitor。访问者模式是一种将数据操作与数据结构分离的设计模式。

## 2. 流式处理的优势

- **声明式**：更简洁、更易读。
- **可复用**：流操作可以像数据结构一样复用。
- **并行化**：流的操作可以很方便地并行化，而无需显式地编写多线程代码。
- **易于优化**：流的延迟执行和短路操作使得流操作可以高效地执行。

## 3. 流式处理的操作

当你有一条流时，你可以对它进行以下操作：

### 中间操作[^中间操作]

[^中间操作]: Intermediate operation。中间操作是指可以对流中的元素进行处理，并且仍返回流的操作。

中间操作会返回一个新的流，且同一个流可以跟随零个或多个中间操作。它们在运行时会打开流，对元素执行各种操作，再合并流并传给下一项中间操作。这类操作都是惰性化[^延迟执行]的，也就是说，在调用这类方法时并不会真正开始对流进行处理。只有当流的[终止操作](#终止操作[^终止操作])被执行时，它们才会随之执行。

#### 筛选 `filter`

筛选操作可以将符合条件的元素从流中筛选出来，形成新的流。

```java
List<String> days = Arrays.asList("Saturday", "Sunday", "Monday");
List<String> result = days.stream() // 将集合转换为流。
        .filter(holiday -> ("Saturday".equals(holiday) || "Sunday".equals(holiday))) // 筛选出属于周末的元素（星期一不是假期😭）。
        .collect(Collectors.toList()); // 收集元素并转换为集合。
```

上述例子中的 `filter` 操作会返回一个新的流，其中包含了不是星期一的元素。这个新的流可以继续进行其他操作，比如 `map` `sorted` 等。

为流中的元素进行筛选时，最后使用 `lambda语法` 。如果你对这种写法感到陌生，可以去看看我的Lambda表达式学习笔记。

当然，你可以用Lambda表达式实现更多的筛选操作，比如：

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9)
List<Integer> result = number.stream()
        .filter(number -> number % 2 == 0) // 筛选出偶数。
        .filter(number -> number > 5) // 筛选出大于5的数。
        .collect(Collectors.toList()); // 显而易见，result数组的元素只有6和8。
```

#### 映射 `map`

映射操作可以将流中的每一个元素分别加工处理、映射为另一个元素，并组成新的流。

一个简单的示例是将字符串数组中的每个字符串转换为大写：

```java
List<String> days = Arrays.asList("Saturday", "Sunday", "Monday");
List<String> result = days.stream()
        .map(String::toUpperCase) // 将每个字符串转换为大写。
        .collect(Collectors.toList()); // 结果为：[SATURDAY, SUNDAY, MONDAY]。
```

当然，你可以将元素映射为任何类型，比如：

```java
List<String> names = Arrays.asList("Tom", "Jerry", "Mike");
List<Integer> result = names.stream()
        .map(String::length) // 将每个字符串映射为字符串的长度。
        .collect(Collectors.toList()); // 结果为：[3, 5, 4]。
```

#### 扁平化映射 `flatMap`

扁平化映射操作可以将多个流中的每一个元素分别处理，并将所有流合并为一个流。

简而言之，你可以将它视为针对多维数组的映射操作。

```java
List<Integer> numbers1 = Arrays.asList(1, 2, 3);
List<Integer> numbers2 = Arrays.asList(4, 5, 6);

List<Integer> result = Stream.of(numbers1, numbers2) // 将两个集合转换为流。
        .flatMap(Collection::stream) // 将两个流合并为一个流。
        .collect(Collectors.toList()); // 结果为：[1, 2, 3, 4, 5, 6]。
```

你可以用扁平化映射大幅简化多条流的合并处理操作。

#### 排序 `sorted`

排序操作可以将流中的元素进行排序，并组成新的流。

如果你不添加参数，则会按照自然排序规则对元素进行排序。

```java
List<Integer> numbers = Arrays.asList(3, 1, 2, 5, 4);
List<Integer> result = numbers.stream()
        .sorted() // 按照自然排序规则对元素进行排序。
        .collect(Collectors.toList()); // 结果为：[1, 2, 3, 4, 5]。
```

如果你想要自定义排序规则，可以使用 `sorted(Comparator)` 方法，比如进行降序排序：

```java
List<Integer> numbers = Arrays.asList(3, 1, 2, 5, 4);
List<Integer> result = numbers.stream()
        .sorted(Comparator.reverseOrder()) // 按照降序排序规则对元素进行排序。
        .collect(Collectors.toList()); // 结果为：[5, 4, 3, 2, 1]。
```

使用 `Comparator` 接口的 `comparing` 方法自定义排序规则：

```java
List<String> names = Arrays.asList("Tom", "Jerry", "Mike");
List<String> result = names.stream()
        .sorted(Comparator.comparing(String::length)) // 按照字符串长度进行排序。
        .collect(Collectors.toList()); // 结果为：[Tom, Mike, Jerry]。
```

如果你想了解有关 `Comparator` 的更多信息，可以去看看我的 `Comparator` 学习笔记（coming soon!）。

#### 聚合 `distinct`

聚合是一个很简单的无参操作，用于去除流中重复的元素。

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 0, 5, 2, 3, 6, 0, 2);
List<Integer> result = numbers.stream()
        .distinct() // 去除重复的元素。
        .collect(Collectors.toList()); // 结果为：[1, 2, 3, 0, 5, 6]。
```

#### 截断 `limit`

截断操作可以将流中的元素截断，只取从前往后指定数量的元素。

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> result = numbers.stream()
        .limit(3) // 截取前三个元素。
        .collect(Collectors.toList()); // 结果为：[1, 2, 3]。
```

#### 跳过 `skip`

跳过操作与截断操作相辅相成，它可以将流中的元素跳过，只取后面的元素。

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> result = numbers.stream()
        .skip(3) // 跳过前三个元素。
        .collect(Collectors.toList()); // 结果为：[4, 5]。
```

你可以引入数组的长度，以实现从后往前截取元素的效果：

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> result = numbers.stream()
        .skip(numbers.size() - 3) // 跳过前两个元素，相当于截取后三个元素。
        .collect(Collectors.toList()); // 结果为：[3, 4, 5]。
```

#### 遍历 `peek`

遍历操作可以对流中的每个元素进行一些操作，但不同于映射操作的是，它仍然返回之前的流。因此，遍历操作前后，元素的类型不会发生变化。

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
List<Integer> result = numbers.stream()
        .peek(number -> number * 2) // 遍历每个元素，并将其乘以二。
        .collect(Collectors.toList()); // 结果为：[2, 4, 6, 8, 10]。
```

### 终止操作[^终止操作]

[^终止操作]: 

终止操作是流的最后一个操作，它会返回一个非流的结果，比如 `List`、`Integer` 等。终止操作会触发流的执行，因此，终止操作之后，流就不能再被使用了。
