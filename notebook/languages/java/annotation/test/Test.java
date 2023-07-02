package test;

import test.annotation.FieldInfo;
import test.annotation.MethodInfo;
import test.annotation.Silent;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Objects;

class TestObj {
	@MethodInfo(id = "method1", author = "KrLite", date = "2018-01-01", comment = "Yet another method")
	public void method1() {
		System.out.println("Invoked!");
	}

	@MethodInfo(id = "method2", name = "Foo", date = "2077-07-07")
	private void method2() {
		System.out.println("Invoked!");
	}

	public @Silent String method3() {
		return "Silent!";
	}

	@Silent
	@MethodInfo(id = "method3", date = "null")
	public void method4() {
		System.out.println("Should not be invoked.");
	}

	@FieldInfo(id = "field1")
	public String field1;

	@FieldInfo(id = "field2", name = "A Private Final Field")
	private final String field2 = "This is a string.";

	public final @Silent String field3 = "A special field that should not be printed.";
}

public class Test {
	public static void main(String[] args) {
		TestObj testObj = new TestObj();
		Class<?> testObjClass = testObj.getClass();

		Method[] methods = testObjClass.getDeclaredMethods();
		Arrays.stream(methods).forEach(Test::iteratorAnnotations);

		Field[] fields = testObjClass.getDeclaredFields();
		Arrays.stream(fields).forEach(Test::iteratorAnnotations);
	}

	public static void iteratorAnnotations(Method method) {
		if (method.isAnnotationPresent(Silent.class) || method.getReturnType().isAnnotationPresent(Silent.class)) {
			System.out.println("::silent method::\n");
			return;
		}

		if (method.isAnnotationPresent(MethodInfo.class)) {
			MethodInfo methodInfo = method.getAnnotation(MethodInfo.class);
			printTitle(methodInfo.id(), methodInfo.name());

			try {
				method.setAccessible(true);
				method.invoke(method.getDeclaringClass().getDeclaredConstructor().newInstance());
			} catch (Exception e) {
				throw new RuntimeException(e);
			}

			System.out.println("<author>: " + methodInfo.author());
			System.out.println("<date>: " + methodInfo.date());
			System.out.println("<revision>: " + methodInfo.revision());

			if (!Objects.equals(methodInfo.comment(), "")) {
				System.out.println("<comment>: " + methodInfo.comment());
			}

			System.out.println();
		}
	}

	public static void iteratorAnnotations(Field field) {
		if (field.isAnnotationPresent(Silent.class)) {
			System.out.println("::silent field::\n");
			return;
		}

		if (field.isAnnotationPresent(FieldInfo.class)) {
			FieldInfo fieldInfo = field.getAnnotation(FieldInfo.class);
			printTitle(fieldInfo.id(), fieldInfo.name());

			try {
				field.setAccessible(true);
				System.out.println(field.get(field.getDeclaringClass().getDeclaredConstructor().newInstance()));
			} catch (Exception e) {
				throw new RuntimeException(e);
			}

			System.out.println();
		}
	}

	private static void printTitle(String id, String name) {
		System.out.println("<" + id + ">" + (Objects.equals(name, "") ? "" : ": " + name));
	}
}
