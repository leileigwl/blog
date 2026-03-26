---
title: Css布局模式
published: 2022-08-01
description: 'Flex布局和Grid布局详解'
tags: [CSS, 前端, 布局]
category: '技术'
draft: false
---

[toc]

### 1.flex布局

含义：Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

特点：任何一个容器都可以指定为 Flex 布局。

```css
.box{
    display: flex;
}
```

作用：它的所有子元素自动成为容器成员，称为 Flex 项目

#### 1.1容器属性

##### 1.1.1flex-direction

表示主轴方向,有四种选项

> row(默认) 从左向右排列，水平方向主轴
>
> row-reverse 从右向左，水平方向主轴
>
> column 从上往下，竖直方向主轴
>
> column-reverse 从下往上，竖直方向为主轴

##### 1.1.2flex-wrap

如果本来的容器大小不够本元素放就会需要换行，但是默认不会换行

例：将原来的box容器width改成200,显然这个时候宽度不够放。默认就是nowrap不换行

而定义了flex-wrap:wrap属性后就会换行（这里为了美观将容器的width改成了100px）

##### 1.1.3justify-content(重要)

属性：

> flex-start(默认):相当于就是左对齐
>
> flex-end：右对齐
>
> center：中间对齐
>
> space-between（常用）：左边的靠左，右边的靠右，中间的居中
>
> spcae-evenly：中间分配相等的空余空间

- justify-content: center
- justify-content: space-between
- justify-content: space-evenly

##### 1.1.4align-items

`align-items`属性定义项目在交叉轴上如何对齐。(单根主轴的对齐)

属性

> flex-start：交叉轴的起点对齐。
>
> flex-end：交叉轴的终点对齐。
>
> center交叉轴的中点对齐。
>
> baseline: 项目的第一行文字的基线对齐。
>
> stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

- align-items:flex-end
- align-items:center
- align-items:stretch(这个是将第一个元素的高度取消了固定值)

##### 1.1.5 align-content(多根主轴的对其方式)

如果没有设置这个属性，当元素多了之后的效果

属性：

> flex-start：交叉轴的起点对齐。
>
> flex-end：交叉轴的终点对齐。
>
> center交叉轴的中点对齐。
>
> baseline: 项目的第一行文字的基线对齐。
>
> stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

#### 1.2 flex项目

以下6个属性设置在项目上。

- `order`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`
- `align-self`

##### 1.2.1 order

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

关于这个不是很实用，对应的元素顺序一般该在哪就放哪里去，别整花里胡哨

##### 1.2.2 flex-grow

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.two {flex-grow: 1;}
```

参与比例分配，如果只是一个分配，就是直接按100%；

用途：用于处理横向的分布式布局十分好用

##### 1.2.3 flex-shrink属性

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

按比例收缩，不是很必要，要么换行就好，不同的元素多收缩容易出现比例很难调

##### 1.2.4 align-self

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

很少见：就相当于是只有一个特殊的需要调整

```css
.two {flex-grow: 1;
    align-self: flex-end;
}
```

#### 1.3flex实战小样-九宫格

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .redpackage {
            width: 300px;
            height: 300px;
            outline: 1px solid black;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-content: space-between;
        }
        .redpackage div {
            width: 33%;
            height: 33%;
            background: #e1544a;
            font-size: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            outline: 1px solid white;
            position: relative;
            z-index: 0;
        }
        .redpackage div:after {
            position: absolute;
            content: "";
            display: block;
            width: 80%;
            height: 80%;
            background: #ddbd84;
            border-radius: 50%;
            z-index: -1;
        }
    </style>
</head>
<body>
<div class="redpackage">
    <div>你</div>
    <div>有</div>
    <div>一</div>
    <div>个</div>
    <div></div>
    <div>红</div>
    <div>包</div>
    <div>未</div>
    <div>取</div>
</div>
</body>
</html>
```

### 2.grid布局

注：设为网格布局以后，容器子元素（项目）的`float`、`display: inline-block`、`display: table-cell`、`vertical-align`和`column-*`等设置都将失效。

#### 2.1容器属性

##### 2.1.1grid-template-*

###### 设置网格

```css
grid-template-columns: 100px 100px 100px;
grid-template-rows: 100px 100px 100px 100px;
```

简便写法：效果是一样的

```css
grid-template-columns:repeat(3,100px);
grid-template-rows: repeat(4,100px);
```

###### auto-fill

auto-fill,有时，单元格的大小是固定的，但是容器的大小不确定，这个属性就会自动填充

```css
grid-template-columns:repeat(auto-fill,100px);
grid-template-rows: repeat(auto-fill,100px);
```

基本就是自动填充，可以根据屏幕的长度拉伸

###### fr

为了方便比例关系，这个是grid模型提供的关键字

```css
grid-template-columns:repeat(3,1 fr);
```

###### minmax()

`minmax()`函数产生一个长度范围，表示长度就在这个范围之中。它接受两个参数，分别为最小值和最大值。

```css
grid-template-columns: 1 fr 1 fr minmax(100px, 1 fr);
```

上面代码中，`minmax(100px, 1fr)`表示列宽不小于`100px`，不大于`1fr`。

###### auto

可以自动分配，跟flex模型的flex-grow有点像，但是更好用

```css
grid-template-columns:100px auto 100px;
grid-template-rows: repeat(auto-fill,100px);
```

##### 2.1.2gap

> 项目相互之间的距离
>
> row-gap:行距
>
> column-gap:宽距

```css
row-gap: 20px;
column-gap: 20px;
```

##### 2.1.3area

一个区域由单个或多个单元格组成，由你决定（具体使用，需要在项目属性里面设置）

设置区域：

```css
grid-template-areas: 'a b c' 'd e f' 'g h i';
grid-template-areas: 'a a a' 'b b b' 'c c c';
grid-template-areas: 'a . c' 'b . f' 'g . i';
```

##### 2.1.4 auto-flow

grid-auto-flow

划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，

即先填满第一行，再开始放入第二行（就是子元素的排放顺序）

> row(默认) 按照行排列
>
> column 按照列排

##### 2.1.5对其方式justify(重要)

> justify-items（水平）：容器内每一个元素的对其
>
> align-items(竖直)：网格内每一个元素对其
>
> justify-content：（水平）整个容器的对其
>
> align-content：（竖直）整个容器的对其

#### 2.2项目属性

##### 2.2.1 grid-column/row-start/end

一句话解释：用来指定的items的具体位置，根据在哪根网格线

> `grid-column-start`属性：左边框所在的垂直网格线
>
> `grid-column-end`属性：右边框所在的垂直网格线
>
> `grid-row-start`属性：上边框所在的水平网格线
>
> `grid-row-end`属性：下边框所在的水平网格线

```css
.item-1 {
    background-color: #ef342a;
    grid-column-start: 1;
    grid-column-end: 3;
}
```

简化写法：

```css
.item-1 {
    background-color: #ef342a;
    grid-column: 1/3;
}
```

##### 2.2.2 grid-area

可以根据area改变区域

```css
.item-1 {
    background-color: #ef342a;
    grid-column: 1/3;
    grid-area: b;
}
```

##### 2.2.3justify-self(相当于一个个例)

用法和flex浮动一样

> justify-self属性设置单元格内容的水平位置（左中右)，跟justify-items属性的用法完全一致，
>  但只作用于单个项目（水平方向）
>
> align-self属性设置单元格内容的垂直位置（上中下)，跟align–items)属性的用法完全一致，
>  也是只作用于单个项目（垂直方向）