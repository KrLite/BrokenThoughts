# Lambda 表达式 `λ Expressions`

`Java 8 Api` **`重要特性`**

^^Lambda 表达式^^ (1) 是推动 Java 8 发布的重要特性，它允许把函数作为一个方法的参数，或者说可以将函数作为参数传递进方法中。
{ .annotate }

1.  Lambda 表达式，又称闭包。它是一个匿名函数，可以将代码像数据一样进行传递。

使用 Lambda 表达式可以使代码变得更加简洁紧凑。

## 1&emsp;语法

Lambda 表达式看起来是这样的：

```java
(parameters) -> expression
```

```java
() -> { statements; }
```

```
(param1) -> (param2) -> Foo::bar
```

有没有一头雾水？让我们先提取一下它的组成部分：

```java
(型参列表) -> { 方法体 }
```

原先复杂的方法调用被简化在一行之内了，这就是 Lambda 表达式的魅力所在。

之所以能这么写，是因为 Lambda 表达式的语法是固定的，只有方法体是可变的。 Lambda 表达式基于一种特殊接口： `@FunctionalInferface` 。这种接口可以有多个默认方法，但是只能有一个抽象方法，例如 `Function` 类：

```java
@FunctionalInterface
public interface Function<T, R> {
    R apply(T t);
}
```

这种接口之所以只能有一个抽象方法，是因为在书写 Lambda 表达式的时候，我们会忽略方法名，只关注方法体。如果有多个抽象方法就会产生歧义，不知道到底应该调用哪个了。

## ?&emsp;^^闭包^^ (1) { .annotate }

1.  Closure。它是一种能被调用对象，保存了创建它的作用域的信息。

了解闭包的概念可以帮助你理解 Lambda 表达式的结构和内涵。

**闭包是一个函数，它可以访问自由变量，即在函数外部定义的变量。这个函数和它所在的环境一起构成了一个闭包。**

```java
public class Closure {
    public static void main(String[] args) {
        int a = 10;
        int b = 20;
        doProcess(a, i -> System.out.println(i + b));
    }

    public static void doProcess(int i, Process p) {
        p.process(i);
    }
}
```

!!! note ""

    在这个例子中，`b` 就是一个自由变量，它不是 `doProcess` 方法的局部变量，但是它被 `main` 方法中的 Lambda 表达式所引用。

- 闭包的价值在于可以作为函数对象或者匿名函数，持有上下文数据，作为第一级对象进行传递和保存。
- 闭包广泛用于回调函数、函数式编程中。
- 函数可以访问函数外部的变量，并且与它建立联系，可以修改变量和读取到外部对变量的修改。

???+ example

    ```java
    public class Printer {
        private static int times;

        public Printer() {
            times = 0;
        }

        public Action printAction(String msg) {
            return () -> {
		times++;
		System.out.println(msg + " " + times);
	    };
	}
    }

    interface Action {
        void print();
    }

    public class Office {
	    public static void main(String[] args) {
		    Printer printer = new Printer();
		    Action action = printer.printAction("Hello: ");

		    action.print();
		    action.print();
		    action.print();
	    }
    }
    ```

## 2&emsp;原理

Lambda 表达式是一步步简化而得来的，它的原理是匿名内部类。假设这里有一个 `Operation` 接口：

```java
@FunctionalInterface
public interface Operation {
    int calculate(int a, int b);
}
```

如果我们要实现如上接口的 `calculate` 抽象方法：

```java
public class Calculator {
    public static void main(String[] args) {
        Operation add = new Operation() {
            @Override
            public int calculate(int a, int b) {
                return a + b;    // 实现 calculate 抽象方法，并完成加法操作。
            }
        };

        System.out.println(add.calculate(1, 2));    // 结果为：3。
    }
}
```

但这有点啰嗦，让我们用基础的 Lambda 表达式写法简化一下，你会发现这很符合直觉：

```java
public class Calculator {
    public static void main(String[] args) {
        Operation add = (int a, int b) -> {
            return a + b;    // 同样实现了 calculate 抽象方法，并完成加法操作。
        };

        System.out.println(add.calculate(1, 2));    // 结果为：3。
    }
}
```

这样写的好处是，我们不需要再去关注 `Operation` 接口的实现细节，只需要关注 `calculate` 方法的实现即可。

但这仍然不是最简写法， Lambda 表达式允许我们进一步简化，省略参数类型：

```java
public class Calculator {
    public static void main(String[] args) {
        Operation add = (a, b) -> {
            return a + b;    // 省略了 a 和 b 的参数类型，因为编译器可以推断出来，他们只可能是整型。
        };

        System.out.println(add.calculate(1, 2));    // 结果为：3。
    }
}
```

好，我们接近 Lambda 表达式的最终形态了，只需要最后一步——省略 `return` 关键字和大括号即可：

```java
public class Calculator {
    public static void main(String[] args) {
        Operation add = (a, b) -> a + b;    // 省略了 return 和大括号，因为方法体只有一行代码，可以省略大括号。

        System.out.println(add.calculate(1, 2));    // 结果为：3。
    }
}
```

!!! warning

    当 Lambda 表达式的方法体只有一条语句时，才可以省略大括号。如果有多条语句，则不能省略。

最后，让我们观察一下实现相同功能时，使用 Lambda 表达式前后的代码块变化：

=== "匿名内部类"

    ```java
    Operation add = new Operation() {
        @Override
        public int calculate(int a, int b) {
            return a + b;
        }
    };
    ```

=== "Lambda 表达式"

    ```java
    Operation add = (a, b) -> a + b;
    ```

是不是很神奇？可以看到，Lambda 表达式的写法明显简洁了许多，且更加符合直觉。

如果你的方法没有返回值，你也可以是用同样的方法书写。如下，我们打印出 `a + b` 的结果，而不是返回它：

```java
public class Calculator {
    public static void main(String[] args) {
        Operation add = (a, b) -> System.out.println(a + b);    // 结构相同。

        add.calculate(1, 2);    // 打印结果为：3。
    }
}
```

## 3&emsp;使用

### 3.1&emsp;作为参数

Lambda 表达式可以作为参数传递给方法，或者作为方法的返回值。这种传递行为称为 **函数式编程** 。

让我们看一个例子，我们有一个 `Operation` 接口，它有一个 `calculate` 方法，该方法接受两个整型参数，并返回一个整型结果。我们可以使用 Lambda 表达式来实现 `Operation` 接口，然后将 Lambda 表达式作为参数传递给 `calculate` 方法：

```java
public class Calculator {
    public static void main(String[] args) {
        Operation add = (a, b) -> a + b;
        Operation sub = (a, b) -> a - b;
        Operation mul = (a, b) -> a * b;
        Operation div = (a, b) -> a / b;

        // 使用已定义的 Lambda 表达式。
        System.out.println(calculate(1, 2, add));    // 结果为：3。
        System.out.println(calculate(1, 2, sub));    // 结果为：-1。
        System.out.println(calculate(1, 2, mul));    // 结果为：2。
        System.out.println(calculate(1, 2, div));    // 结果为：0。

        // 传递一个新的 Lambda 表达式。
        System.out.println(calculate(1, 2, (a, b) -> Math.pow(a, b)));    // 结果为：3。
    }

    public static int calculate(int a, int b, Operation operation) {
        return operation.calculate(a, b);
    }
}
```

### 3.2&emsp;方法引用

Lambda 表达式总是奇形怪状：

```java
Consumer<String> printer = System.out::println;
```

`::` 是什么？又是一种从来没有见过的语法！这种语法称为 **方法引用** ，它的作用就是进一步缩短语句长度，但也可能会让代码变得更加难以理解。在上面的例子中，`System.out::println` 与 `System.out.println()` **在效果上** 是等价的。下面是上方代码不使用方法引用时的样子：

```java
Consumer<String> printer = (s) -> System.out.println(s);
```

使用方法引用的代码稍稍简便了一些，对吧？

!!! danger "方法引用的缺陷"

    以上两种写法 **在效果上** 等价，但 **在过程上** 并不完全等价。具体来说，方法引用可能会额外生成对象，这在一些时候可能会导致莫名其妙的崩溃。

方法引用总共支持这些语法：

```java
对象::实例方法
```

```java
类::静态方法
```

```java
类::实例方法
```

让我们来看看这些写法的具体用法。

#### `对象::实例方法`

`对象::实例方法` 的写法可以让你引用一个对象的实例方法。例如，我们可以使用 `String::length` 来引用 `String` 类的 `length` 方法：

```java
public class Calculator {
    public static void main(String[] args) {
        List<String> strings = Arrays.asList("a", "bb", "ccc");

        // 使用方法引用。
        strings.forEach(System.out::println);

        // 不使用方法引用。
        strings.forEach((s) -> System.out.println(s));
    }
}
```

因为 `forEach` 和 `println` 方法的参数列表相同，且都无返回值，所以我们可以使用 `System.out::println` 来引用 `println` 方法，省去了传递参数的中间过程。

???+ tip

    如果你还不了解什么是 `forEach` ，可以去看看我的 [`流式处理 ↗`](stream.md) 笔记。

#### `类::静态方法`

`类::静态方法` 的写法可以让你引用一个类的静态方法。例如，我们可以使用 `Math::pow` 来引用 `Math` 类的 `pow` 静态方法：

```java
public class Calculator {
    public static void main(String[] args) {
        Operation pow = Math::pow;
        System.out.println(pow.calculate(2, 3));    // 结果为：8。
    }
}
```

#### `类::实例方法`

`类::实例方法` 的写法则可以让你引用一个类的实例方法。例如， `String` 类的 `length` 并不是一个静态方法，但我们可以在合适的时机使用 `String::length` 来引用它：

```java
public class Calculator {
    public static void main(String[] args) {
        List<String> strings = Arrays.asList("a", "bb", "ccc");

        // 使用方法引用。
        strings.sort(String::compareToIgnoreCase);

        // 不使用方法引用。
        strings.sort((s1, s2) -> s1.compareToIgnoreCase(s2));
    }
}
```

在上面的例子中，`String::compareToIgnoreCase` 与 `(s1, s2) -> s1.compareToIgnoreCase(s2)` 是等价的。因为 `compareToIgnoreCase` 方法的参数列表与 `sort` 方法的参数列表相同，且都无返回值。其中， `s1` 作为调用者， `s2` 作为参数。

### 构造方法引用

构造方法引用较为特殊，它的写法是： `类名::new` 。例如，我们可以使用 `ArrayList::new` 来引用 `ArrayList` 类的构造方法：

```java
public class Calculator {
    public static void main(String[] args) {
        Supplier<List<String>> supplier = ArrayList::new;
        List<String> strings = supplier.get();
    }
}
```
