---
title: Spring2 框架入门
published: 2022-08-01
description: 'Spring框架IoC和AOP详解'
tags: [Java, Spring, 后端]
category: '技术'
draft: false
---

## Spring

- IoC（控制反转）/ DI（依赖注入）
- AOP（面向切面编程）

### 1.创建IOC工程

#### 1.1导入依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.11.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.24</version>
</dependency>
```

IOC框架只需要context依赖就够了

#### 1.2创建实体类

```java
public class Student {
    private long id;
    private String name;
    private int age;
}
```

#### 1.3编写对应的配置文件，Spring.xml(全局）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
       http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd
       ">
    <bean id="student" class="com.Lei.pojo.Student">
        <property name="id" value="0"></property>
        <property name="name" value="张三"></property>
        <property name="age" value="10"></property>
    </bean>
</beans>
```

- 上面的beans是文件头，黏贴就好，然后下面的bean就是写自己的对应的实体类
    - bean标签依据id来对应你需要创建的实体类，需要通过class指定好对应的实体类的路径
    - 下面的`property`就是为值附的属性，如果没有就是默认的结果

#### 1.4主程序调试

```java
public static void main(String[] args) {
    ApplicationContext applicationContext =new ClassPathXmlApplicationContext("Spring.xml");

    Student student = (Student) applicationContext.getBean("student");

    System.out.println(student);
}
```

### 2.配置文件

#### 2.1标准

- 通过配置 `bean` 标签来完成对象的管理。
    - `id`：对象名。
    - `class`：对象的模版类（所有交给 IoC 容器来管理的类必须有无参构造函数，因为 Spring 底层是通过反射机制来创建对象，调用的是无参构造）

- 对象的成员变量通过 `property` 标签完成赋值。
    - `name`：成员变量名。
    - `value`：成员变量值（基本数据类型，String 可以直接赋值，如果是其他引用类型，不能通过 value 赋值）
    - `ref`：将 IoC 中的另外一个 bean 赋给当前的成员变量（DI）

### 3.模拟IOC底层

> 思路
> 1. 解析xml配置文件
> 2. 得到里面的元素，遍历获取对应的id、class路径
> 3. 用类解析反射出整个类，获取构造器，创建对象
> 4. 通过Map键值对存储获取的id和整个类对象
> 5. getBean方法就是通过id来取Map中的对象

### 4.bean的调用

#### 4.1通过运行时类获取 bean

```java
ApplicationContext applicationContext = new ClassPathXmlApplicationContext("spring.xml");
Student student = (Student) applicationContext.getBean(Student.class);
System.out.println(student);
```

这种方式存在一个问题，配置文件中一个数据类型的对象只能有一个实例，否则会抛出异常，因为没有唯一的 bean。还是推荐直接用id获取bean；

#### 4.2通过有参构造创建 bean

- 在实体类中创建对应的有参构造函数。
- 三种方式，推荐下面第一个，如果不写name或者index就需要按对应顺序写

```xml
<bean id="student3" class="com.Lei.pojo.Student">
    <constructor-arg name="id" value="3"></constructor-arg>
    <constructor-arg name="name" value="小明"></constructor-arg>
    <constructor-arg name="age" value="18"></constructor-arg>
    <constructor-arg name="address" ref="address"></constructor-arg>
</bean>
```

#### 4.3给bean注入集合

### 5.作用域

Spring 管理的 bean 是根据 scope 来生成的，表示 bean 的作用域，共4种，默认值是 singleton。

- singleton：单例，表示通过 IoC 容器获取的 bean 是唯一的。
- prototype：原型，表示通过 IoC 容器获取的 bean 是不同的。
- request：请求，表示在一次 HTTP 请求内有效。
- session：回话，表示在一个用户会话内有效。

request 和 session 只适用于 Web 项目，大多数情况下，使用单例和原型较多。

### 6.Spring继承

> 1. 与 Java 的继承不同，Java 是类层面的继承，子类可以继承父类的内部结构信息；Spring 是对象层面的继承，子对象可以继承父对象的属性值。
> 2. Spring 的继承关注点在于具体的对象，而不在于类，即不同的两个类的实例化对象可以完成继承，前提是子对象必须包含父对象的所有属性，同时可以在此基础上添加其他的属性。

### 7.Spring依赖

与继承类似，依赖也是描述 bean 和 bean 之间的一种关系，配置依赖之后，被依赖的 bean 一定先创建，再创建依赖的 bean，A 依赖于 B，先创建 B，再创建 A。

### 8.Spring 的 p 命名空间

p 命名空间是对 IoC / DI 的简化操作，使用 p 命名空间可以更加方便的完成 bean 的配置以及 bean 之间的依赖注入。

```xml
<bean id="student" class="com.southwind.entity.Student" p:id="1" p:name="张三" p:age="22" p:address-ref="address"></bean>
<bean id="address" class="com.southwind.entity.Address" p:id="2" p:name="科技路"></bean>
```

其实和property一样，简化写法

### 9.Spring工厂

IoC 通过工厂模式创建 bean 的方式有两种：

1. 静态工厂
2. 实例工厂

### 10.IoC 自动装载（Autowire）

IoC 负责创建对象，DI 负责完成对象的依赖注入，通过配置 property 标签的 ref 属性来完成，同时 Spring 提供了另外一种更加简便的依赖注入方式：自动装载，不需要手动配置 property，IoC 容器会自动选择 bean 完成注入。自动装载有两种方式：

- byName：通过属性名自动装载，找实体类中属性名与bean中对应的id
- byType：通过属性的数据类型自动装载,找同一致的数据类型

byType 需要注意，如果同时存在两个及以上的符合条件的 bean 时，自动装载会抛出异常。

### 11.Aop切面

AOP：Aspect Oriented Programming 面向切面编程。

> AOP 的优点：

- 降低模块之间的耦合度。
- 使系统更容易扩展。
- 更好的代码复用。
- 非业务代码更加集中，不分散，便于统一管理。
- 业务代码更加简洁存粹，不参杂其他代码的影响。

AOP 是对面向对象编程的一个补充，在运行时，动态地将代码切入到类的指定方法、指定位置上的编程思想就是面向切面编程。将不同方法的同一个位置抽象成一个切面对象，对该切面对象进行编程就是 AOP。