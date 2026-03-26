---
title: SSM框架整合
published: 2022-08-31
description: 'Spring+SpringMVC+MyBatis框架整合配置'
tags: [Java, Spring, MyBatis, SSM]
category: '技术'
draft: false
---

### 1.maven配置-->pom.xml

导入依赖及Maven资源过滤设置

### 2.webapp-->web.xml

配置DispatcherServlet和字符编码过滤器

### 3.mybatis与spring整合-->spring.xml

```xml
<context:property-placeholder location="classpath:databases.properties"/>

<bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
    <property name="driverClass" value="${jdbc.driver}"/>
    <property name="jdbcUrl" value="${jdbc.url}"/>
    <property name="user" value="${jdbc.username}"/>
    <property name="password" value="${jdbc.password}"/>
    <property name="maxPoolSize" value="30"/>
    <property name="minPoolSize" value="10"/>
    <property name="autoCommitOnClose" value="false"/>
    <property name="checkoutTimeout" value="1000"/>
    <property name="acquireRetryAttempts" value="2"/>
</bean>

<bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
    <property name="dataSource" ref="dataSource"></property>
    <property name="mapperLocations" value="classpath:com/Lei/dao/*.xml"></property>
    <property name="configLocation" value="classpath:mybatis.xml"></property>
</bean>

<bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <property name="basePackage" value="com.Lei.dao"></property>
</bean>
```

为什么是三个bean：一个是首先jdbc连接数据库的信息填写，第二个是sql工厂，里面包含的东西都是与sql有关的，首先是读取数据源，其次是对mapper.xml文件的扫描（里面包含了底层的sql语句），还有一个是对mybatis文件的解析，第三个bean就是扫描自定义接口，扫的是dao层同级别的

同时这里的整合可以通过

```xml
<context:property-placeholder location="classpath:databases.properties"/>
```

来导入jdbc的连接，对应的databases配置

```properties
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/test?useSSL=true&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
jdbc.username=root
jdbc.password=root
```

### 4.mybatis自己的管理-->mybatis.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <settings>
        <setting name="logImpl" value="STDOUT_LOGGING"/>
    </settings>
    <typeAliases>
        <package name="com.Lei.entity"/>
    </typeAliases>
</configuration>
```

### 5.springmvc的自动扫描和视图配置-->springmvc.xml

```xml
<mvc:annotation-driven></mvc:annotation-driven>
<context:component-scan base-package="com.Lei"></context:component-scan>
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
    <property name="prefix" value="/"></property>
    <property name="suffix" value=".jsp"></property>
</bean>
```

注：改变的是扫描的base-package下面的包包

### 6.controller层

```java
public class UserController {
    @Controller
    @RequestMapping("/user")
    public static class UserHandler {
        @Autowired
        private UserService userService;
        @GetMapping("/findAll")
        public ModelAndView findAll() {
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.setViewName("index");
            modelAndView.addObject("list", userService.findAll());
            return modelAndView;
        }
    }
}
```

### 7.view视图

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<c:forEach items="${list}" var="user">
    ${user.id}--${user.name}--${user.score}<br/>
</c:forEach>
</body>
</html>
```

### 6.注释

对于不同的层存在不同的注释

- dao层不需要添加注释

- service层中对于impl实现类需要添加`@Service`注释，并且要将dao层自动装配

    ```java
    @Autowired
    private UserDao userDao;
    ```

- controller层中首先就是`@Controller`注释表明是controller层并且可以自动扫描；其次就是对于不同的实现方法需要进行不一样的位置跳转，需要requestMapping或者是getMapping还有servlet

    ```java
    @Autowired
    private UserService userService;
    ```

### 7.常见错

对于sqlFactory的报错，一般是因为sqlFacotry扫描到的包不止一个

对于无法依赖数据库我这边出现的错误还是因为c3p0，版本原因，可以换高版本，还有对于jdbc的连接出错

### 7.总要概括

需要改动的部分只有

spring.xml中的两个bean，分别用来读取datasource数据源，对应mapper位置以及mybatis信息的配置，还有另一个bean是用来扫描自定义接口

springmvc.xml中的base-package

jdbc连接的url：

```properties
jdbc.url=jdbc:mysql://localhost:3306/test?useSSL=true&useUnicode=true&characterEncoding=utf8&serverTimezone=Asia/Shanghai
```