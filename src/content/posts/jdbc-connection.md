---
title: jdbc连接
published: 2022-07-01
description: 'JDBC连接数据库的完整流程和具体实现'
tags: [java, jdbc, 数据库]
category: '技术'
draft: false
---

## jdbc的连接过程

### 1.加载JDBC驱动程序：

### 2.提供JDBC连接的URL

### 3.创建数据库的连接

### 4.创建一个Statement

### 5.执行SQL语句

### 6.处理结果

### 7.关闭JDBC对象

## 具体实现：

### 1.加载JDBC驱动程序：

```java
//加载MySql的驱动类
Class.forName("com.mysql.jdbc.Driver") ;
//成功加载后，会将Driver类的实例注册到DriverManager类中。
```

### 2.提供JDBC连接的URL

注意事项：

1. 连接URL定义了连接数据库时的协议、子协议、数据源标识。
2. 书写形式：协议：子协议：数据源标识
3. 协议：在JDBC中总是以jdbc开始
4. 子协议：是桥连接的驱动程序或是数据库管理系统名称。
5. 数据源标识：标记找到数据库来源的地址与连接端口。

```java
//利用mysql连接：
jdbc:mysql:
//localhost:3306/test?useUnicode=true&characterEncoding=gbk ;
// useUnicode=true：表示使用Unicode字符集。如果characterEncoding设置为
// gb2312或GBK，本参数必须设置为true 。characterEncoding=gbk：字符编码方式。
```

### 3.创建数据库的连接

要连接数据库，需要向java.sql.DriverManager请求并获得Connection对象， 该对象就代表一个数据库的连接。

使用DriverManagerget的Connectin(String url,String username,String password)方法传入指定的欲连接的数据库的路径、数据库的用户名和 密码来获得。

```java
//连接MySql数据库，用户名和密码都是root
String url = "jdbc:mysql://localhost:3306/test" ;
String username = "root" ;
String password = "root" ;
Connection con =DriverManager.getConnection(url , username , password ) ;
System.out.println("数据库连接失败！");
```

### 4.创建一个Statement

要执行SQL语句，必须获得java.sql.Statement实例，Statement实例分为以下3种类型：

1. 执行静态SQL语句。通常通过Statement实例实现。
2. 执行动态SQL语句。通常通过PreparedStatement实例实现。
3. 执行数据库存储过程。通常通过CallableStatement实例实现。

具体实现方法：

```java
Statement stmt = con.createStatement() ;
PreparedStatement pstmt = con.prepareStatement(sql) ;
CallableStatement cstmt = con.prepareCall("{CALL demoSp(? , ?)}") ;
```

### 5.执行SQL语句

Statement接口提供了三种执行SQL语句的方法：executeQuery、executeUpdate 和execute

1. ResultSet executeQuery(String sqlString)：执行查询数据库的SQL语句返回一个结果集（ResultSet）对象。
2. int executeUpdate(String sqlString)：用于执行INSERT、UPDATE或 DELETE语句以及SQL DDL语句
3. execute(sqlString):用于执行返回多个结果集、多个更新计数或二者组合的语句。

具体实现代码：

```java
ResultSet rs = stmt.executeQuery("SELECT * FROM ...") ;
int rows = stmt.executeUpdate("INSERT INTO ...") ;
boolean flag = stmt.execute(String sql) ;
```

### 6.处理结果

两种情况：

- 执行更新返回的是本次操作影响到的记录数。
- 执行查询返回的结果是一个ResultSet对象。

ResultSet包含符合SQL语句中条件的所有行，并且它通过一套get方法提供了对这些行中数据的访问。

使用结果集（ResultSet）对象的访问方法获取数据：

```java
while(rs.next()){
    String name = rs.getString("name") ;
    String pass = rs.getString(1) ; // 此方法比较高效
}
//（列是从左到右编号的，并且从列1开始）
```

### 7.关闭JDBC对象

1. 关闭记录集
2. 关闭声明
3. 关闭连接对象