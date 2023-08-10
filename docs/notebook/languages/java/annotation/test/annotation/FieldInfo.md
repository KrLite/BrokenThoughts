---
hide:
  - navigation
  - toc
title: "<code>FieldInfo.java</code>"
---

```java
package test.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface FieldInfo {
	String id();
	String name() default "";
}
```
