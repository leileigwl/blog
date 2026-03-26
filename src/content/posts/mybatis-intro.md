---
title: mybatis入门
published: 2022-07-14
description: 'MyBatis框架入门教程，包含配置、CRUD操作、级联查询、逆向工程等'
tags: [java, mybatis, 数据库]
category: '技术'
draft: false
---

## MyBatis

MyBatis重要核心步骤：省去了建表，写对应的实体类(可以用lombok组件)

```java
//对应实体类
public class Account {
    private long id;
    private String username;
    private String password;
    private int age;
}
```

## 1.创建 MyBatis 的配置文件 config.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration PUBLIC "-//mybatis.org//DTD Config 3.0//EN" "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="account">
        <environment id="account">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis01?useUnicode=true&characterEncoding=UTF-8"/>
                <property name="username" value="111"/>
                <property name="password" value="111"/>
            </dataSource>
        </environment>
    </environments>
</configuration>
```

## 2.通过原生接口实现

### 2.1 Mapper.xml的编写

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="Account.Account">
    <insert id="save" parameterType="Account.Account">
        insert into account (username ,password,age) values (#{username},#{password},#{age});
    </insert>
</mapper>
```

### 2.2 注册mapper.xml

```xml
<mappers>
    <mapper resource="AccountConfig/Mapper.xml"></mapper>
</mappers>
```

### 2.3 调用API

```java
public class Test01 {
    public static void main(String[] args) {
        InputStream inputStream =Test01.class.getResourceAsStream("/config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory build = sqlSessionFactoryBuilder.build(inputStream);
        SqlSession sqlSession = build.openSession();
        Account account = new Account(1L,"张三","root",24);
        String statement ="Account.Account.save";
        sqlSession.insert(statement,account);
        sqlSession.commit();
        sqlSession.close();
    }
}
```

## 3.自定义接口实现(推荐)

### 3.1 编写接口

```java
public interface AccountRepository {
    public int save(Account account);
    public int update (Account account);
    public int deleteById(long id);
    public List<Account> findAll();
    public Account findById(long id);
}
```

### 3.2 创建对应的xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="AccountRepository.AccountRepository">
    <insert id="save" parameterType="Account.Account">
        insert into account (username, password, age) values (#{username}, #{password}, #{age});
    </insert>
    <update id="update" parameterType="Account.Account">
        update account set username =#{username},password =#{password},age =#{age} where id = #{id};
    </update>
    <delete id="deleteById" parameterType="long">
        delete from account where id = #{id};
    </delete>
    <select id="findAll" resultType="Account.Account">
        select * from account;
    </select>
    <select id="findById" resultType="Account.Account">
        select * from account where id = #{id};
    </select>
</mapper>
```

### 3.3 调用API

```java
public static void main(String[] args) {
    InputStream resourceAsStream = Test02.class.getClassLoader().getResourceAsStream("config.xml");
    SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
    SqlSessionFactory build = sqlSessionFactoryBuilder.build(resourceAsStream);
    SqlSession sqlSession = build.openSession();
    AccountRepository mapper = sqlSession.getMapper(AccountRepository.class);
    for (Account account : mapper.findAll()) {
        System.out.println(account);
    }
    sqlSession.commit();
    sqlSession.close();
}
```

## 4.级联查询

### 4.1 一对多

通过学生查班级和学生

```xml
<resultMap id="StudentMap" type="com.Student.Student">
    <id column="id" property="id"></id>
    <result column="name" property="name"></result>
    <association property="classes" javaType="com.Student.Classes">
        <id column="cid" property="id"></id>
        <result column="cname" property="name"></result>
    </association>
</resultMap>
<select id="findById" parameterType="long" resultMap="StudentMap">
    select s.id ,s.name,c.id cid,c.name cname from student s,classes c where s.id = #{id} and c.id =cid;
</select>
```

### 4.2 多对一

通过班级类查询学生

```xml
<resultMap id="ClassesMap" type="com.Student.Classes">
    <id column="id" property="id"></id>
    <result column="name" property="name"></result>
    <collection property="students" ofType="com.Student.Student">
        <id column="sid" property="id"></id>
        <result column="sname" property="name"></result>
    </collection>
</resultMap>
<select id="findById" parameterType="long" resultMap="ClassesMap">
    select s.id sid,s.name sname,c.id,c.name from student s, classes c where c.id =#{id} and cid =c.id;
</select>
```

## 5.逆向工程

### 5.1 导入依赖

```xml
<dependency>
    <groupId>org.mybatis.generator</groupId>
    <artifactId>mybatis-generator-core</artifactId>
    <version>1.4.0</version>
</dependency>
```

### 5.2 创建配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <context id="testTables" targetRuntime="MyBatis3">
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/mybatis01?useUnicode=true&characterEncoding=UTF-8"
                        userId="root"
                        password="root">
        </jdbcConnection>
        <javaModelGenerator targetPackage="com.Lei.pojo" targetProject="./src/main/java"></javaModelGenerator>
        <sqlMapGenerator targetPackage="com.Lei.mapper" targetProject="./src/main/java"></sqlMapGenerator>
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.Lei.mapper"
                             targetProject="./src/main/java"></javaClientGenerator>
        <table tableName="student" domainObjectName="Student"></table>
    </context>
</generatorConfiguration>
```

## 6.延迟加载

```xml
<settings>
    <!-- 打印SQL执行的语句-->
    <setting name="logImpl" value="STDOUT_LOGGING"/>
    <!-- 开启延迟加载-->
    <setting name="lazyLoadingEnabled" value="true"/>
</settings>
```

## 7.MyBatis缓存

- 一级缓存：SqlSession 级别，默认开启，不能关闭。
- 二级缓存：Mapper 级别，默认关闭，可以开启。

```xml
<settings>
    <!-- 开启二级缓存 -->
    <setting name="cacheEnabled" value="true"/>
</settings>
```

## 8.动态SQL

| 标签名 | 作用 |
|--------|------|
| if | 根据表达式的结果来决定是否将对应的语句添加到 SQL 中 |
| where | 自动判断是否要删除语句块中的 and 关键字 |
| choose when | 类似于if和where的连用 |
| trim | 自动删除语句前后的指定值 |
| set | 用于 update 操作，会自动根据参数选择生成 SQL 语句 |
| foreach | 迭代生成一系列值，主要用于 SQL 的 in 语句 |

```xml
<select id="findByAccount" resultType="com.Account.Account" parameterType="com.Account.Account">
    select *from account
    <where>
        <if test="id!=0"> and id= #{id}</if>
        <if test="username!=null"> and username = #{username}</if>
        <if test="password"> and password = #{password}</if>
        <if test="age!=0"> and age = #{age}</if>
    </where>
</select>
```