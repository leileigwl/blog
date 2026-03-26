---
title: java 注释与反射
published: 2022-07-15
description: 'Java注解与反射机制学习笔记'
tags: [java, 注解, 反射]
category: '技术'
draft: false
---

## 注解

### 1. Annotation

1. 注解不是程序本身，但是可以对程序做出解释
2. 注解可以被其他程序（比如：编译器）读取

### 2. 元注解

元注解的作用就是负责注解其他注解，Java定义了4个标准的meta-annotation类型，他们被用来提供对其他annotation类型作说明：

1. Target：描述注解的使用位置
2. Retention：描述注解的生命周期，表示在什么级别保存该注解的信息（3个取值：SOURCE<CLASS<RUNTIME）
3. Document：说明该注解可以被生成在Javadoc中
4. Inherited：说明子类可以继承父类中的该注解

### 3. 自定义注解

使用@interface自定义注解时，自动继承了`java.lang.annotation.Annotation`接口

分析：
- @interface用来声明一个注解，格式：public @interface 注解名{定义内容}
- 其中的每一个方法实际上是声明了一个配置参数
- 方法的名称就是参数的名称
- 返回值类型就是参数的类型（返回值只能是基本类型，Class, String, enum）
- 可以通过default来声明参数的默认值
- 如果只有一个参数成员，一般参数名为value
- 注解元素必须要有值，我们定义注解元素时，经常使用空字符串，0作为默认值

```java
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface DiyAnnotation {
    String name();
    int age() default 3;
}
```

```java
// 获取方法上的自定义注解
public class ServiceImpl {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException {
        Class<?> aClass = Class.forName("com.hxxy.service.ServiceImpl");
        Method method = aClass.getDeclaredMethod("method", Integer.class);
        DiyAnnotation declaredAnnotation = method.getDeclaredAnnotation(DiyAnnotation.class);
        System.out.println(declaredAnnotation);
    }

    @DiyAnnotation(name = "annotation")
    public String method(Integer a){
        System.out.println("method:" + a);
        return "a";
    }
}
```

## 反射

### 1. 反射概述

反射就是Reflection，Java的反射是指程序在运行期可以拿到一个对象的所有信息。

- Reflection(反射)是Java被视为动态语言的关键，反射机制允许程序在执行期借助于Reflection API取得任何类的内部信息，并能直接操作任意对象的内部属性及方法。

```java
Class c = Class.forName("java.lang.String") // 获取String包里的所有东西
```

正常方式：引入需要的"包类"名称 -> 通过new实例化 -> 取得实例化对象

反射方式：实例化对象 -> getClass()方法 -> 得到完整的"包类"名称

**优点：**
- 可以实现动态创建对象和编译，体现出很大的灵活性

**缺点：**
- 对性能有影响。使用反射基本上是一种解释操作，我们可以告诉JVM我们希望做什么并且它满足我们的要求。这类操作总是慢于直接执行相同的操作

### 2. 反射的常用方法

| 方法名 | 功能说明 |
| --- | --- |
| static Class forName(String name) | 返回指定类名name的Class对象 |
| Object newInstance() | 调用缺省构造函数，返回Class对象的一个实例 |
| getName() | 返回此Class对象所表示的实体（类，接口，数组类或void)的名称 |
| Class getSuperClass() | 返回当前Class对象的父类的Class对象 |
| Class[] getInterfaces() | 获取当前Class对象的接口 |
| ClassLoader getClassLoader() | 返回该类的类加载器 |
| Constructor[] getConstructors() | 返回一个包含某些Constructor对象的数组 |
| Method getMethod(String name, Class...T) | 返回一个Method对象，此对象的形参类型为paramType |
| Field[] getDeclaredFields() | 返回Field对象的一个数组 |

### 3. 获取反射对象

1. 若已知具体的类，通过类的class属性获取，该方法最为安全可靠，程序性能最高。

```java
Class clazz = Person.class;
```

2. 已知某个类的实例，调用该实例的getClass()方法获取Class对象

```java
Class clazz = Person.getClass();
```

3. 已知一个类的全类名，且该类在类路径下，可通过Class类的静态方法forName()获取，可能抛出ClassNotFoundException

```java
Class clazz = Class.forName("demo01.Student");
```

### 4. 反射出来的对象的应用

先获取反射的对象，可以同该对象调用很多其方法，获取构造函数，获取字段(属性)，方法……

```java
public class User {
    private String name;
    private int id;
    private int age;
    //还有一些公有的get,set方法和一个无参构造和有参构造+tostring的重写
    ...
}

//测试类
public static void main(String[] args) {
    Class c1 = Class.forName("Reflection.Demo01.User"); // 通过forname获取类的对象
    User user = (User) c1.newInstance(); // 构造一个对象
    System.out.println(user.getAge()); // 通过该对象调用方法

    Constructor constructor = c1.getDeclaredConstructor(String.class, int.class, int.class); // 通过类对象获取有参构造函数
    Object xixi = constructor.newInstance("xixi", 001, 18); // 通过有参构造创建新对象
    System.out.println(xixi);

    User user01 = (User) c1.newInstance();
    Method setName = c1.getDeclaredMethod("setName", String.class); // 通过类对象获取方法字段
    setName.invoke(user01, "haha"); // 方法需要激活invoke方法，然后传入参数（使用的对象，传入实参）
    System.out.println(user01);

    User user02 = (User) c1.newInstance();
    Field name = c1.getDeclaredField("name"); // 通过类对象获取字段
    name.setAccessible(true); // 如果字段是私有不可访问的时候需要开启这个权限才能访问字段的值
    name.set(user02, "none"); // name字段设置值->(使用的对象，传入的实参)
    System.out.println(user02.getName());
}
```