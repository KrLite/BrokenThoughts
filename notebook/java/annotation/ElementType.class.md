```java
package java.lang.annotation;
```

# ElementType.class

`ElementType.class`是一个枚举类，存储了用于定义[注解](annotation.md)类型属性的枚举常量。

## 枚举常量

| 名称               | 意义    | 用途                |
|------------------|-------|-------------------|
| TYPE             | 类型    | 类、接口（包括注释类型）或枚举声明 |
| FIELD            | 字段    | 字段声明（包括枚举常量）      |
| METHOD           | 方法    | 方法声明              |
| PARAMETER        | 参数    | 参数声明              |
| CONSTRUCTOR      | 构造器   | 构造器声明             |
| LOCAL_VARIABLE   | 局部变量  | 局部变量声明            |
| ANNOTATION_TYPE  | 注释类型  | 注释类型声明            |
| PACKAGE          | 包     | 包声明               |
| TYPE_PARAMETER   | 类型参数  |                   |
| TYPE_USE         | 类型使用时 |                   |
| MODULE           | 模块    |                   |
| RECORD_COMPONENT | 记录组件  |                   |
