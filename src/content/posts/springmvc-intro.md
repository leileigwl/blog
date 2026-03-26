---
title: springmvc框架入门
published: 2022-07-17
description: 'Spring MVC框架入门教程，包含核心组件、数据绑定、REST风格等'
tags: [java, spring, springmvc]
category: '技术'
draft: false
---

## SpringMvc

Spring MVC 是目前主流的实现 MVC 设计模式的企业级开发框架，Spring 框架的一个子模块，无需整合，开发起来更加便捷。

## 1.SpringMvc核心思想

### 1.1 Spring MVC 的核心组件

- DispatcherServlet：前置控制器，是整个流程控制的核心，控制其他组件的执行，进行统一调度，降低组件之间的耦合性，相当于总指挥。
- Handler：处理器，完成具体的业务逻辑，相当于 Servlet 或 Action。
- HandlerMapping：DispatcherServlet 接收到请求之后，通过 HandlerMapping 将不同的请求映射到不同的 Handler。
- HandlerInterceptor：处理器拦截器，是一个接口，如果需要完成一些拦截处理，可以实现该接口。
- HandlerExecutionChain：处理器执行链，包括两部分内容：Handler 和 HandlerInterceptor。
- HandlerAdapter：处理器适配器，Handler 执行业务方法之前，需要进行一系列的操作。
- ModelAndView：装载了模型数据和视图信息，作为 Handler 的处理结果，返回给 DispatcherServlet。
- ViewResolver：视图解析器，DispatcheServlet 通过它将逻辑视图解析为物理视图。

### 1.2 Spring MVC 的工作流程

1. 客户端请求被 DisptacherServlet 接收。
2. 根据 HandlerMapping 映射到 Handler。
3. 生成 Handler 和 HandlerInterceptor。
4. Handler 和 HandlerInterceptor 以 HandlerExecutionChain 的形式一并返回给 DisptacherServlet。
5. DispatcherServlet 通过 HandlerAdapter 调用 Handler 的方法完成业务逻辑处理。
6. Handler 返回一个 ModelAndView 给 DispatcherServlet。
7. DispatcherServlet 将获取的 ModelAndView 对象传给 ViewResolver 视图解析器。
8. ViewResovler 返回一个 View 给 DispatcherServlet。
9. DispatcherServlet 根据 View 进行视图渲染。
10. DispatcherServlet 将渲染后的结果响应给客户端。

## 2.创建一个SpringMvc工程

### 2.1 导入依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.0.11.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aop</artifactId>
    <version>5.0.11.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-aspects</artifactId>
    <version>5.0.11.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.0.11.RELEASE</version>
</dependency>
```

### 2.2 配置springmvc的xml文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
       http://www.springframework.org/schema/mvc
       http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd">
    <context:component-scan base-package="com.Lei"></context:component-scan>
    <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/"></property>
        <property name="suffix" value=".jsp"></property>
    </bean>
</beans>
```

### 2.3 编写web.xml注册springmvc的servlet

```xml
<!DOCTYPE web-app PUBLIC
        "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
        "http://java.sun.com/dtd/web-app_2_3.dtd" >
<web-app>
    <servlet>
        <servlet-name>DispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springmvc.xml</param-value>
        </init-param>
    </servlet>
    <servlet-mapping>
        <servlet-name>DispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
</web-app>
```

### 2.4 编写测试主程序

```java
@Controller
@RequestMapping("/hello")
public class HelloHandler {
    @RequestMapping(value = "index",params = {"name","id"})
    public String index(String name,int id){
        System.out.println(name);
        System.out.println(id);
        return "index";
    }
}
```

## 3.Spring MVC 注解

### @RequestMapping

- value：指定 URL 请求的实际地址
- method：指定请求的 method 类型，GET、POST、PUT、DELETE
- params：指定请求中必须包含某些参数

```java
@RequestMapping(value = "/index",method = RequestMethod.GET,params = {"name","id=10"})
```

### @Controller

在类定义处添加，将该类交给 IoC 容器来管理

## 4.Spring MVC 数据绑定

### 4.1 基本数据类型

```java
@RequestMapping("/baseType")
@ResponseBody
public String baseType(int id){
    return id+"";
}
```

### 4.2 包装类

```java
@RequestMapping("/packageType")
@ResponseBody
public String packageType(@RequestParam(value = "num",required = false,defaultValue = "0") Integer id){
    return id+"";
}
```

### 4.3 数组

```java
@RestController
@RequestMapping("/data")
public class DataBindHandler {
    @RequestMapping("/array")
    public String array(String[] name){
        String str = Arrays.toString(name);
        return str;
    }
}
```

## 5.Spring MVC 模型数据解析

### 5.1 Map

```java
@RequestMapping("/map")
public String map(Map<String, User> map){
    User user = new User();
    user.setId(6);
    user.setName("老六");
    map.put("user",user);
    return "view";
}
```

### 5.2 Model

```java
@RequestMapping("/model")
public String model(Model model){
    User user = new User();
    user.setId(6);
    user.setName("老六");
    model.addAttribute("user",user);
    return "view";
}
```

### 5.3 ModelAndView（重要）

```java
@RequestMapping("/modelandview")
public ModelAndView modelAndView(){
    User user = new User();
    user.setId(6);
    user.setName("老六");
    ModelAndView modelAndView = new ModelAndView("view");
    modelAndView.addObject("user",user);
    return modelAndView;
}
```

## 6.REST风格

- GET 用来表示获取资源
- POST 用来表示新建资源
- PUT 用来表示修改资源
- DELETE 用来表示删除资源

## 7.文件上传下载

### 7.1 单文件上传

```java
@Controller
@RequestMapping("/file")
public class fileHandler {
    @RequestMapping("/upload")
    public String upload(MultipartFile img, HttpServletRequest request) throws IOException {
        String filename = img.getOriginalFilename();
        String path = request.getServletContext().getRealPath("file");
        File file = new File(path,filename);
        img.transferTo(file);
        String newPath ="/file/"+filename;
        request.getSession().setAttribute("path", newPath);
        return "upload";
    }
}
```

### 7.2 多文件上传

```java
@RequestMapping("/uploads")
public String uploads(MultipartFile[] imgs, HttpServletRequest request) throws IOException {
    List<String> files = new ArrayList<>();
    for (MultipartFile img : imgs) {
        String filename = img.getOriginalFilename();
        String path = request.getServletContext().getRealPath("file");
        File file = new File(path, filename);
        img.transferTo(file);
        files.add("/file/" + filename);
    }
    request.getSession().setAttribute("paths", files);
    return "uploads";
}
```

## 8.SpringMvc表单后台校验

### 8.1 Validator接口

```java
public class AccountValidator implements Validator {
    @Override
    public boolean supports(Class<?> aClass) {
        return Account.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        ValidationUtils.rejectIfEmpty(errors,"name",null,"用户名不能为空");
        ValidationUtils.rejectIfEmpty(errors,"password",null,"密码不能为空");
    }
}
```

### 8.2 Annotation JSR-303 标准

```java
@Data
public class Person {
    @NotEmpty(message = "用户名不能为空")
    private String username;
    @Size(min = 6, max = 12, message = "密码6-12位")
    private String password;
    @Email(regexp = "^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$", message = "请输入正确的邮箱格式")
    private String email;
}
```

### 常用注解

| 注释名 | 效果 |
| --- | --- |
| @Null | 被注解的元素必须为null |
| @NotNull | 被注解的元素不能为null |
| @Min(value) | 被注解的元素必须是一个数字，其值必须大于等于指定的最小值 |
| @Max(value) | 被注解的元素必须是一个数字，其值必须小于等于指定的最大值 |
| @Email | 被注解的元素必须是电子邮箱地址 |
| @Pattern | 被注解的元素必须符合对应的正则表达式 |
| @Length | 被注解的元素的大小必须在指定的范围内 |
| @NotEmpty | 被注解的字符串的值必须非空 |