---
title: css入门
published: 2022-07-21
description: 'CSS基础知识入门，包含选择器、样式美化、盒子模型等'
tags: [css, 前端]
category: '技术'
draft: false
---

## Css

### 优先级

内嵌样式优先级是最高的，后面外联和行内看定义时候的就近原则

补充：
- 块级元素：要分段的
- 行内元素：不要分段的

### 选择器（重点）

#### 1.基本选择器

**标签选择器**

选了之后，所有这个标签就是统一的样式，太死了

```css
<style>
    标签{
        ;
        ;
    }
</style>
```

**类选择器**

可跨，方便

```css
<style>
    .类名{
        ;
        ;
        ;
    }
</style>
```

**id选择器**

id只能有一个，有点局限

```css
<style>
    #id名{
        ;
        ;
        ;
    }
</style>
```

优先级：id选择器 > class选择器 > 标签选择器，不遵循就近原则

#### 2.层次选择器

**后代选择器**

在某个元素的后面，这一代的后面所有

```css
/*后代选择器*/
body 标签名{
    ;
    ;
}
```

**子选择器**

在这个元素的后面，但是只有后面一代

```css
/* 子代选择器 */
body>标签名{
    ;
}
```

**相邻兄弟选择器**

选择这一代的下一个，不能隔着东西

```css
.类名 +下面的一个标签{
    ;
    ;
}
```

**通用选择器**

这个类的下面的所有这个标签

```css
.类名~下面的标签{
    ;
    ;
}
```

#### 3.结构伪类选择器

`标签:` 的形式，用来过滤一些条件

```css
ul li:first-child {
    /* 选择ul标签下的li标签中第一个元素 */
    background-color: blue;
}
ul li:last-child{
    /* 选择ul标签下的li标签中最后一个元素 */
    color: red;
}
p:nth-of-type(x){
    /* p的上级标签下面选择p标签的第x个 */
    background-color: red;
}
```

#### 4.属性选择器

- `=` 绝对等于
- `*=` 包含
- `^=` 以这个符号开头
- `$=` 以这个符号结尾

```css
a[herf^=http]/*选择a标签中的herf属性开头是http*/
/*标签[属性/id/class 表达式]*/
```

### 样式美化

#### 1.字体样式

```css
/*
font-family:字体
font-size:字体大小
font-weight:字体粗细
color:字体颜色
*/
body{
    font-family:"Arial Black",楷体;
    color:#a13d30;
}
h1{
    font-size: 50px;
}
.p1{
    font-weight:bolder;
}
```

#### 2.文本样式

```css
/* 颜色 color rgb rgba
   文本对齐的方式 text-align=center
   首行缩进 text-indent:2em;
   行高 line-height
   装饰 text-decoration->删除a标签的下划线
   文本图片水平对齐 vertical-align:middle
*/
p {
    color: brown;
    text-align: center;
    text-indent: 2em;
    line-height: 2em;
}
a {
    text-decoration: none;
}
```

#### 3.超链接伪类

```css
/*超连接伪类，还有阴影*/
a {
    text-decoration: none;
    color: black;
}
/* 鼠标悬浮颜色,也只要记住这个 */
a:hover {
    color: orange;
    font-size: 30px;
}
```

#### 4.阴影效果

```css
/* text-shadow: 阴影颜色，水平偏移，垂直偏移，阴影半径 */
p {
    text-shadow: #3cc7f5 10px -10px 2px;
}
```

### 盒子模型

所谓**盒子模型**就是把HTML页面中的元素看作是一个矩形的盒子，也就是一个盛装内容的容器。每个矩形都是由元素的内容（content）、内边距（padding）、边框（border）和外边距（margin）组成。

- margin:外边距
- padding:内边距
- border:边框

```css
.box {
    width: 200px;
    height: 100px;
    padding: 20px;
    box-sizing: border-box;
    background-color: blue;
}
```

盒子的大小=外边距+内边距+边框+内容