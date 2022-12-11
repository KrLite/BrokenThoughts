# <p align=left>[← Java](/notebook)</p> <p align=left>Annotation / 注解</p>

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

`@Documented`注解用于指定注解类是否被Javadoc显示。若注解类没有被`@Documented`注解，则在Javadoc中不会显示该注解类。

### @Inherited

`@Inherited`注解用于指定注解类是否允许子类继承父类的注解。若注解类没有被`@Inherited`注解，则子类不会继承父类的注解。

### @Target

`@Target`注解用于指定注解类的类型属性。若注解类没有被`@Target`注解，则可以用于任何地方。

括号中的内容可以为[`ElementType.class ↗`](ElementType.class.md)中的枚举常量。

### @Retention

`@Retention`注解用于指定注解类的策略属性。若注解类没有被`@Retention`注解，则默认为`RetentionPolicy.CLASS`。

括号中的内容可以为[`RetentionPolicy.class ↗`](RetentionPolicy.class.md)中的枚举常量。

## 2. 注解的使用

### 1. 编译检查

### 2. 在反射中使用注解

我们有一个注解：

```java
import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAnnotation {
    String name(); // 无默认值，在使用注解时必须为其赋值。
    String message() default "Hello"; // 有默认值："Hello"。
}
```

它包含了两个返回值为字符串的方法，分别是没有默认值的`name()`和有默认值`Hello`的`message()`。

因为使用了`Target`注解，并且限定目标为`METHOD`，所以我们只能在方法声明时使用它。

下面为使用示例：

```java
import java.lang.reflect.Method;

class Test {
	@MyAnnotation(name = "Test1") // 仅填写了必须初始化的"name"值，这是被允许的。
	// 特殊地，假如某个注解只有唯一一个属性，且该属性的名称为"value()"，则可以省略"value = "。
	public void test1(String objName) {
		System.out.println("Hello World, " + objName + "!");
	}

	@MyAnnotation(name = "Test2", message = "Hi") // 填写了所有属性的值。
	public void test2(String objName) {
		System.out.println("Look, " + objName + ", Another Test!");
	}
}

public class AnnotationTest {
	// 主方法，会在运行时注册新的Test实例，并调用反射方法。
	public static void main(String[] args) {
		// 注册新的Test实例。
		Test test = new Test();
		Class<Test> testClass = Test.class;
		
		// 获取Test类中的所有方法。
		Method[] methods = testClass.getMethods();
		
		// 遍历所有方法，并对每一个方法使用反射。
		for (Method method : methods) {
			iteratorAnnotations(method);
		}
	}
	
	// 反射方法，用于遍历每一个方法的所有注解并打印。
	public static void iteratorAnnotations(Method method) {
		if (method.isAnnotationPresent(MyAnnotation.class)) { // 判断该方法是否拥有@MyAnnotation注解。
			// 调用该方法，并传进参数"Steve"。
			method.invoke("Steve");
			
			// 获取该方法的@MyAnnotation注解，因为我们已经进行判断，所以这里不会返回空指针。
			MyAnnotation myAnnotation = method.getAnnotation(MyAnnotation.class);
			
			// 打印注解的属性值。
			System.out.println("name: " + myAnnotation.name());
			System.out.println("message: " + myAnnotation.message());
			System.out.println("---");
		}
	}
}
```

上述程序的执行结果应该是：

```
Hello World, Steve!
name: Test1
message: Hello // 未填写的属性会使用默认值。
---
Look, Steve, Another Test!
name: Test2
message: Hi
---
```
