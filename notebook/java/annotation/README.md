### [`←` Java](/notebook/java)

# Annotation : 注解

`JDK 5.0`

注解[^注解]是Java中的一种特殊接口。类、方法、变量、参数和包等都可以被注解，并可以通过反射获取注解内容。

[^注解]: Annotation，又称标注。

## 1. 注解的定义

如下是对注解类的简单解释：

```java
import java.lang.annotation.*;

@Documented // 使接口在 Javadoc 中显示；若无，则不显示。
@Inherited // 允许子类继承父类的注解；若无，则不允许。
@Target(ElementType.TYPE) // 类型属性；若无，则可以用于任何地方。
@Retention(RetentionPolicy.RUNTIME) // 策略属性；若无，则默认为 RetentionPolicy.CLASS 。

public @interface
// 这个类被 @interface 定义，即实现了 java.lang.annotation.Annotation 接口。
AnnotationClass {
    // 很多注解类并不需要具体的内容，只需要作为一个标记即可。
}
```

### @Documented

`@Documented` 注解用于指定注解类是否被Javadoc显示。若注解类没有被 `@Documented` 注解，则在Javadoc中不会显示该注解类。

### @Inherited

`@Inherited` 注解用于指定注解类是否允许子类继承父类的注解。若注解类没有被 `@Inherited` 注解，则子类不会继承父类的注解。

### @Target

`@Target` 注解用于指定注解类的类型属性。若注解类没有被 `@Target` 注解，则可以用于任何地方。

括号中的内容可以为 [`ElementType.class ↗`](ElementType.class.md) 中的枚举常量。

### @Retention

`@Retention` 注解用于指定注解类的策略属性。若注解类没有被 `@Retention` 注解，则默认为 `RetentionPolicy.CLASS` 。

括号中的内容可以为 [`RetentionPolicy.class ↗`](RetentionPolicy.class.md) 中的枚举常量。

## 2. 注解的使用

### 1. 编译检查

注解可以用于编译检查，如下是一个简单的例子：

```java
public class MyClass {
	@Deprecated // 标注这个方法被弃用了，即不建议调用此方法。
	@SuppressWarnings("unchecked") // 隐藏"unchecked"错误。
	public static void method() { // 假设这个方法会报"unchecked"错误，那么这个错误会被隐藏。
		foo.bar1();
		foo.bar2();
    }
}
```

### 2. 在反射中使用注解

注解可以用于反射，如下是 [`test ↗`](/test) 示例的简单解释：

#### 定义注解

在 [`annotation ↗`](test/annotation) 包中定义了三个注解类： [`FieldInfo ↗`](test/annotation/FieldInfo.java) 、 [`MethodInfo ↗`](test/annotation/MethodInfo.java) 和 [`Silent ↗`](test/annotation/Silent.java) 。

其中 [`FieldInfo ↗`](test/annotation/FieldInfo.java) 用于标注字段，解释如下：

```java
@Target(ElementType.FIELD) // 标注这个注解类只能用于字段。
@Retention(RetentionPolicy.RUNTIME) // 标注这个注解类在运行时可以被反射。
public @interface FieldInfo {
	String id(); // 必填字段。
	String name() default ""; // 非必填字段，默认值为空字符串。
}
```

其中 [`MethodInfo ↗`](test/annotation/MethodInfo.java) 用于标注方法，其构造方式和 [`FieldInfo ↗`](test/annotation/FieldInfo.java) 一样，不作解释。

其中 [`Silent ↗`](test/annotation/Silent.java) 较为特殊，既可以标注方法，也可以标注字段。解释如下：

```java
@Target({
        ElementType.FIELD, // 标注这个注解类可以用于字段。
        ElementType.METHOD, // 标注这个注解类可以用于方法。
}) // 可以用数组标注多个类型属性。
@Retention(RetentionPolicy.RUNTIME) // 标注这个注解类在运行时可以被反射。
public @interface Silent {
	// 这个注解类没有实际内容，只是用于标注。
}
```

要在字段和方法前使用注解，只需要在字段或方法前引用注解即可，如下：

```java
@Silent
public void method() {
	@Silent private String str;
}
```

只要是可以用于方法或字段的注解，也都可以写在它们的类型之前：

```java
public @Silent String str;
private final @Silent int someValue = 1;
public @Silent void method() {
}
// ...
```

#### 使用注解

接下来，让我们来分析 [`Test ↗`](test/Test.java) 类中的代码：

首先，创建一个 `TestObj` 类，并在其中写入一些方法和注解。

```java
class TestObj {
	// 为 method1 添加了 @MethodInfo 注解，其中id为"method1"，以此类推。
	@MethodInfo(id = "method1", author = "KrLite", date = "2018-01-01", comment = "Yet another method")
	public void method1() {
		System.out.println("Invoked!");
	}

	// 为 method2 添加了 @MethodInfo 注解，其中id为"method2"，以此类推，但这个注解中没有填写非必要的 comment 字段，故 comment 为空。
	@MethodInfo(id = "method2", name = "Foo", date = "2077-07-07")
	private void method2() {
		System.out.println("Invoked!");
	}

	// 为 method3 添加了 @Silent 注解，它不应该被调用。
	public @Silent String method3() {
		return "Silent!";
	}

	// 为 method4 添加了 @MethodInfo 注解，但同时也添加了 @Silent 注解，所以这个方法不应该在反射时被调用。
	@Silent
	@MethodInfo(id = "method4", date = "null")
	public void method3() {
		System.out.println("Should not be invoked.");
	}

	// 为 field1 添加了 @FieldInfo 注解，其中仅填写了必要的 id 字段，其值为"field1"。
	@FieldInfo(id = "field1")
	public String field1;

	// 为 field2 添加了 @FieldInfo 注解。
	@FieldInfo(id = "field2", name = "A Private Final Field")
	private final String field2 = "This is a string.";

	// 为 field3 添加了 @FieldInfo 注解，但同时也添加了 @Silent 注解，所以这个字段不应该在反射时被访问。
	public final @Silent String field3 = "A special field that should not be printed.";
}
```

接下来，我们可以在 `main` 方法中获取 `TestObj` 中的方法和字段，然后进行反射。

```java
public class Test {
	public static void main(String[] args) {
		TestObj testObj = new TestObj();
		Class<?> testObjClass = testObj.getClass();

		// 获取所有（包括私有）方法。
		Method[] methods = testObjClass.getDeclaredMethods();
		// 遍历方法，并对其调用 iteratorAnnotations(Method method) 方法。
		// 如果你对这一行代码感到困惑，可以去看看我的流式处理和 Lambda 表达式学习笔记。
		Arrays.stream(methods).forEach(Test::iteratorAnnotations);

		// 获取所有（包括私有）字段。
		Field[] fields = testObjClass.getDeclaredFields();
		// 遍历字段，并对其调用 iteratorAnnotations(Field field) 方法。
		Arrays.stream(fields).forEach(Test::iteratorAnnotations);
	}
}
```

[`流式处理 ↗`](/notebook/java/stream) [`Lambda 表达式 ↗`](/notebook/java/lambda)

在 `iteratorAnnotations` 方法中，我们对方法或字段进行遍历，然后获取其注解，最后进行解析。

对方法进行遍历的代码如下：

```java
public class Test {
	public static void iteratorAnnotations(Method method /* 传入方法 */) {
		if (method.isAnnotationPresent(Silent.class) /* 判断方法是否被 @Silent 注解，如果是则为真。 */) {
			// 如果方法前或方法的返回类型被 @Silent 注解，则不进行解析。
			System.out.println("::silent method::\n");
			return;
		}

		if (method.isAnnotationPresent(MethodInfo.class) /* 判断方法前是否被 @MethodInfo 注解，如果是则为真。 */) {
			// 获取 @MethodInfo 注解。
			MethodInfo methodInfo = method.getAnnotation(MethodInfo.class);
			// 打印注解中的 id 和 name 属性值。
			printTitle(methodInfo.id(), methodInfo.name());

			try {
				// 尝试访问私有方法。
				method.setAccessible(true);
				// 调用方法。
				method.invoke(method.getDeclaringClass().getDeclaredConstructor().newInstance());
			} catch (Exception e) {
				throw new RuntimeException(e);
			}

			// 打印注解中的 author 、 date 和 comment 属性值。
			System.out.println("<author>: " + methodInfo.author());
			System.out.println("<date>: " + methodInfo.date());
			System.out.println("<revision>: " + methodInfo.revision());

			if (!Objects.equals(methodInfo.comment(), "")) {
				System.out.println("<comment>: " + methodInfo.comment());
			}

			System.out.println();
		}
	}
}
```

可见，使用反射获取注解中的字段值还是比较简单的。下面是对字段进行遍历的代码：

```java
public class Test {
	public static void iteratorAnnotations(Field field /* 传入字段 */) {
		if (field.isAnnotationPresent(Silent.class) /* 判断字段是否被 @Silent 注解，如果是则为真。 */) {
			// 如果字段前或字段类型被 @Silent 注解，则不进行解析。
			System.out.println("::silent field::\n");
			return;
		}

		if (field.isAnnotationPresent(FieldInfo.class) /* 判断字段前是否被 @FieldInfo 注解，如果是则为真。 */) {
			// 获取FieldInfo注解。
			FieldInfo fieldInfo = field.getAnnotation(FieldInfo.class);
			// 打印。
			printTitle(fieldInfo.id(), fieldInfo.name());

			try {
				// 同样地，先尝试访问私有字段。
				field.setAccessible(true);
				// 然后打印字段的值（空即为"null"）。
				System.out.println(field.get(field.getDeclaringClass().getDeclaredConstructor.newInstance()));
			} catch (Exception e) {
				throw new RuntimeException(e);
			}

			System.out.println();
		}
	}
}
```

你可以动手运行一下，看看效果。正确的输出如下：

```
<method1>
Invoked!
<author>: KrLite
<date>: 2018-01-01
<revision>: 1
<comment>: Yet another method

<method2>: Foo
Invoked!
<author>: N/A
<date>: 2077-07-07
<revision>: 1

::silent method::

::silent method::

<field1>
null

<field2>: A Private Final Field
This is a string.

::silent field::
```
