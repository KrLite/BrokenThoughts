# <p align=left><sub>[`←` Java](/notebook/java)</sub></p> <p align=left>Annotation / 注解</p>

`JDK 5.0`

注解[^注解]是Java中的一种特殊接口。类、方法、变量、参数和包等都可以被注解，并可以通过反射获取注解内容。

[^注解]: Annotation，又称标注。

## 1. 注解的定义

如下是对注解类的简单解释：

```java
import java.lang.annotation.*;

@Documented // 使接口在Javadoc中显示；若无，则不显示。
@Inherited // 允许子类继承父类的注解；若无，则不允许。
@Target(ElementType.TYPE) // 类型属性；若无，则可以用于任何地方。
@Retention(RetentionPolicy.RUNTIME) // 策略属性；若无，则默认为RetentionPolicy.CLASS。

public @interface
// 这个类被@interface定义，即实现了java.lang.annotation.Annotation接口。
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

其中 [`Silent ↗`](test/annotation/Silent.java) 较为特殊，既可以标注方法，也可以标注字段，还可以在类型前使用。解释如下：

```java
@Target({
        ElementType.FIELD, // 标注这个注解类可以用于字段。
        ElementType.METHOD, // 标注这个注解类可以用于方法。
        ElementType.TYPE_USE // 标注这个注解类可以用于类型前。
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

可能你也注意到了， [`Silent ↗`](test/annotation/Silent.java) 注解类的 `@Target` 属性中有一个特殊的 `ElementType.TYPE_USE` ，这个属性表示这个注解类可以用于类型前。如下：

```java
public @Silent String str;
private final @Silent int someValue = 1;
// ...
```

#### 使用注解

接下来，让我们来分析 [`Test ↗`](test/Test.java) 类中的代码：

首先，创建一个 `TestObj` 类，并在其中写入一些方法和注解。

```java
class TestObj {
	// 为method1添加了@MethodInfo注解，其中id为"method1"，以此类推。
	@MethodInfo(id = "method1", author = "KrLite", date = "2018-01-01", comment = "Yet another method")
	public void method1() {
		System.out.println("Invoked!");
	}

	// 为method2添加了@MethodInfo注解，其中id为"method2"，以此类推，但这个注解中没有填写非必要的comment字段，故comment为空。
	@MethodInfo(id = "method2", name = "Foo", date = "2077-07-07")
	private void method2() {
		System.out.println("Invoked!");
	}

	// 为method3添加了@MethodInfo注解，但同时也添加了@Silent注解，所以这个方法不应该在反射时被调用。
	@Silent
	@MethodInfo(id = "method3", date = "null")
	public void method3() {
		System.out.println("Should not be invoked.");
	}

	// 为field1添加了@FieldInfo注解，其中仅填写了必要的id字段，其值为"field1"。
	@FieldInfo(id = "field1")
	public String field1;

	// 为field2添加了@FieldInfo注解。
	@FieldInfo(id = "field2", name = "A Private Final Field")
	private final String field2 = "This is a string.";

	// 为field3添加了@FieldInfo注解，但同时也添加了@Silent注解，所以这个字段不应该在反射时被访问。
    	// 这个字段的@Silent注解就是添加在返回类型前的。不过依照我们的代码，它的效果与在字段前添加@Silent注解是相同的。
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
		// 遍历方法，并对其调用iteratorAnnotations(Method method)方法。
		// 如果你对这一行代码感到困惑，可以去看看我的stream和lambda语法学习笔记（coming soon!）。
		Arrays.stream(methods).forEach(Test::iteratorAnnotations);

		// 获取所有（包括私有）字段。
		Field[] fields = testObjClass.getDeclaredFields();
		// 遍历方法，并对其调用iteratorAnnotations(Method method)方法。
		Arrays.stream(fields).forEach(Test::iteratorAnnotations);
	}
}
```

在 `iteratorAnnotations` 方法中，我们对方法或字段进行遍历，然后获取其注解，最后进行解析。

对方法进行遍历的代码如下：

```java
public class Test {
	public static void iteratorAnnotations(Method method /* 传入方法 */) {
		if (method.isAnnotationPresent(Silent.class) /* 判断方法前是否被Silent注解，如果是则为真。 */ || method.getReturnType().isAnnotationPresent(Silent.class)) /* 判断方法的返回类型是否被Silent注解，如果是则为真。 */ {
			System.out.println("::silent method::");
			System.out.println();

			// 如果方法前或方法的返回类型被Silent注解，则不进行解析。
			return;
		}

		if (method.isAnnotationPresent(MethodInfo.class) /* 判断方法前是否被MethodInfo注解，如果是则为真。 */) {
			// 获取MethodInfo注解。
			MethodInfo methodInfo = method.getAnnotation(MethodInfo.class);
			// 打印注解中的id和name属性值。
			printTitle(methodInfo.id(), methodInfo.name());

			try {
				// 尝试访问私有方法。
				method.setAccessible(true);
				// 调用方法。
				method.invoke(method.getDeclaringClass().newInstance());
			} catch (Exception e) {
				e.printStackTrace();
			}

			// 打印注解中的author、date和comment属性值。
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
		if (field.isAnnotationPresent(Silent.class) /* 判断字段前是否被Silent注解，如果是则为真。 */ || field.getType().isAnnotationPresent(Silent.class) /* 判断字段类型是否被Silent注解，如果是则为真。 */) {
			System.out.println("::silent field::");
			System.out.println();

			// 如果字段前或字段类型被Silent注解，则不进行解析。
			return;
		}

		if (field.isAnnotationPresent(FieldInfo.class) /* 判断字段前是否被FieldInfo注解，如果是则为真。 */) {
			// 获取FieldInfo注解。
			FieldInfo fieldInfo = field.getAnnotation(FieldInfo.class);
			// 打印。
			printTitle(fieldInfo.id(), fieldInfo.name());

			try {
				// 同样地，先尝试访问私有字段。
				field.setAccessible(true);
				// 然后打印字段的值（空即为null）。
				System.out.println(field.get(field.getDeclaringClass().newInstance()));
			} catch (IllegalAccessException | InstantiationException e) {
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

<field1>
null

<field2>: A Private Final Field
This is a string.

::silent field::
```
