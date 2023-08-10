---
hide:
  - navigation
  - toc
title: "<code>MethodInfo.java</code>"
---

```java
package test.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface MethodInfo {
	String id();
	String name() default "";
	String author() default "N/A";
	String date();
	int revision() default 1;
	String comment() default "";
}
```
