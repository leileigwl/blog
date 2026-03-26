---
title: javaweb
published: 2022-07-06
description: 'JavaWeb开发基础知识整理'
tags: [java, javaweb, servlet]
category: '技术'
draft: false
---

## 1.编写Servlet

- 重要补充：request是从服务器获取数据，response是从服务器向浏览器返回数据

- 通过配置的maven新建`webapp`模板工程并且配置pom.xml文件(是mvn的核心文件)来导入Servlet的依赖

```xml
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
</dependency>
```

- 创建一个类继承HttpServlet，并重写Service方法

```java
public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
    res.getWriter().write("Hello servlet");//通过浏览器窗口输出Hello servlet
}
```

- 在web.xml里编写映射

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
                      http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1"
         metadata-complete="true">
</web-app>
```

## 2.ServletContext

1. 解释：每一个web应用都有且仅有一个ServletContext对象，又称Application对象，从名称中可知，该对象是与应用程序相关的。在WEB容器启动的时候，会为每一个WEB应用程序创个对应的ServletContext对象。

2. 作用：**共享数据**，可以通过一方来保存，另一方可以读取

3. 两个小方法：
```java
getServletContext//设置储存的信息，以键值对的形式
getAttribute//获取储存的信息，需要键的名为对象
```

## 3.请求转发

- 不改变原来的地址，但是能够改变跳转的位置

```java
ServletContext context = this.getServletContext();//先获取context对象
context.getRequestDispatcher("/cf").forward(req,resp);//调用getRequestDispatcher方法输入请求转发的地址
```

## 4.通过Servletcontext读取配置文件

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    ServletContext context = this.getServletContext();
    Properties prop = new Properties();
    InputStream ras = context.getResourceAsStream("/WEB-INF/classes/db.properties");
    prop.load(ras);
    String username = prop.getProperty("username");
    String pwd = prop.getProperty("password");
    resp.getWriter().write(username+":"+pwd);
}
```

## 5.Response

### 5.1 下载

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    String realPath = "D:\\project\\java\\execrise\\project02\\src\\main\\resources\\a.jpg";
    String fileName = realPath.substring(realPath.lastIndexOf("\\") + 1);
    resp.setHeader("Content-Disposition", "attachment;filename=" +fileName );//最重要的设置头，表明下载
    FileInputStream fis = new FileInputStream(realPath);
    ServletOutputStream os = resp.getOutputStream();//获取流去读写
    byte[] buffer = new byte[1024];
    int len ;
    while((len = fis.read(buffer))!=-1){
        os.write(len);
    }
    os.close();
    fis.close();
}
```

### 5.2 重定向

```java
public class Demo02 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.sendRedirect("/cf/demo03");//重定向的地址
    }
}
```

## 6.Request

```java
public class Demo06 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("进入了这个服务");
        String username = req.getParameter("username");//获取username信息
        String password = req.getParameter("password");//获取password信息
        System.out.println(username+":"+password);
    }
}
```

## 7.Cookies

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    resp.setContentType("text/html;charset = utf-8");//设置服务器返回编码
    Cookie[] cookies = req.getCookies();//先获取cookies
    PrintWriter writer = resp.getWriter();//浏览器输出
    boolean flag =false;
    for (Cookie cookie : cookies) {
        if (cookie.getName().equals("lastTime")){
            Long timer = Long.valueOf(cookie.getValue());//还原原来的日期格式
            Date date = new Date(timer);
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            String currentTime = sdf.format(date);
            writer.write("你上一次访问本站的时间是:"+currentTime);
            flag =true;
        }
    }
    if (!flag)   writer.write("这是你第一次访问,我们为您创建了cookie，方便下次访问");
    Cookie lastTime = new Cookie("lastTime", System.currentTimeMillis() + "");//Cookie都是以键值对的形式存在
    resp.addCookie(lastTime);
}
```

## 8.Session

```java
protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    req.setCharacterEncoding("utf-8");
    resp.setContentType("text/html;charset = utf-8");
    HttpSession session = req.getSession();
    session.setAttribute("username", new Person("借口",18));
}
```

## 9.JSP

### 9.1 Jsp语法

整个JSP的内容实际上是一个HTML，但是稍有不同：

- 包含在`<%--`和`--%>`之间的是JSP的注释；
- 包含在`<%`和`%>`之间的是Java代码，可以编写任意Java代码；
- 如果使用`<%= xxx %>`则可以快捷输出一个变量的值。
- `<%! %>`可以写java代码（作用域更高的，相当于全局），称之为声明

### 9.2 内置9大对象

```
PageContext        //存东西，级别最次
Request            //存东西，级别次
Response
Session            //存东西，级别中
Application->SerlvetContext  //存东西，级别高
config->SerlvetConfig
out
page
exception
```

## 10.Filter过滤器

```java
public class FilterDemo01 implements Filter {
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        servletRequest.setCharacterEncoding("utf-8");//请求编码
        servletResponse.setContentType("text/html;charset = utf-8");//响应编码
        System.out.println("doFilter进入前面");
        filterChain.doFilter(servletRequest,servletResponse);//主要方法，看成一条链，传递原来的req和resp对象
        System.out.println("doFilter进入后面");
    }
}
```

## 11.Listener

```java
public void sessionCreated(HttpSessionEvent se) {//创建方法
    ServletContext context = se.getSession().getServletContext();
    Integer onlineCnt = (Integer) context.getAttribute("onlineCnt");//获取onlineCnt的字段
    if (onlineCnt==null){
        onlineCnt= 1;
    }else {
        onlineCnt = onlineCnt+1;
    }
    context.setAttribute("onlineCnt",onlineCnt);//每次添加这字段
}
```

## 12.JDBC

### 12.1 配置信息

```java
String url = "jdbc:mysql://localhost:3306/test01?useUnicode=true&characterEncoding=UTF-8&serverTimezone=UTC";
String username = "root";
String password = "root";
```

### 12.2 加载驱动

```java
Class.forName("com.mysql.cj.jdbc.Driver") ;
```

### 12.3 连接数据库

```java
Connection connection = DriverManager.getConnection(url, username, password);
```

### 12.4 向数据库发送statement请求，CRUD

```java
Statement statement = connection.createStatement();
```

### 12.5 写sql

```java
String sql ="select *from person";
```

### 12.6 执行sql

```java
ResultSet res = statement.executeQuery(sql);
while (res.next()){
    System.out.println("id："+ res.getObject("id"));
    System.out.println("name："+ res.getObject("name"));
    System.out.println("password："+ res.getObject("password"));
    System.out.println("email："+ res.getObject("email"));
    System.out.println("birthday："+ res.getObject("birthday"));
}
```

### 12.7 关闭连接

```java
res.close();
statement.close();
connection.close();
```