---
title: 前端结构设计
published: 2022-08-21
description: '前端开发查漏补缺，包含浮动、display、选择器、盒子模型、定位等知识点'
tags: [css, html, 前端]
category: '技术'
draft: false
---

## 前端查漏补缺

### 1.元素浮动：

对于块级元素，可以通过设置元素的float形式让其进行浮动，将其排放在一行，方便布局，但是同样的会造成父级元素的塌陷。采用下面的代码进行清除浮动。

```css
.clearFixed::after {
    content: "";
    display: block;
    clear: both;
}
```

通过一个伪类选择器来进行元素的添加，谁需要清除浮动就给它设置这个属性

解释：after表示放在元素的后面，并且必须要写内容，这个是通过伪类选择的，默认是行元素，只有block的元素进行clear才会有效，`clear:both`是将左右两边的浮动都清除掉

### 2. display

- `:none` ->隐藏。
- `:inline` ->设置为行级元素
- `:block`->设置为块级元素
- `:inline-block`设置行级块元素

1. 行级元素

- 多个元素占一行
- 不能设置宽高
- eg.`span``a`

2. 块级元素(`p`)

- 自己占一行
- 可以设置宽高
- eg.`div``p``h1-h6``ul li``table`

3. 行级块元素

- 多个元素占一行
- 可以设置宽高
- eg.`img``input``button`

`visibility:hidden`->元素不可见，但是占据宽高

### 3.选择器

1. 子代选择器

语法 ：`选择器 > 选择器` 表示第一个选择器的第一个子代，再往后面就选不了

2. 相邻兄弟选择器

语法 ：`选择器 + 选择器`表示只选择第一个选择器的下面一个紧邻的选择器

3. 伪类选择器

- `:hover` 当鼠标滑入的时候有效果(**最常用**)
- `:link` 当没有访问过的时候产生效果
- `:visited` 点击了后访问过产生效果
- `:active` 激活，当你鼠标点在这个标签上，没有离开时候的效果

4. 伪元素选择器

- `::after` 在选择的标签的最后插上新的内容(**行级元素**)
- `::before` 在选择的标签的最前面插上新的内容(**行级元素**)

**注**：但是after和before元素是必须要加上content属性，可以给空

5. 属性选择器

语法： 标签/属性 `[属性名]  \[属性名 == '某属性值']` 表示选择标签/属性下的属性为什么的

```html
<div class="a">
    <div id="id">
        你好
    </div>
</div>
```

```css
div[id] {
    background: pink;
}
div[id ='id'] {
    background: pink;
}
```

### 4.img三像素问题

导致原因：`img`的display默认值`inline-block`导致

解决：设置`display：block`;

### 5.盒子模型

`Css` 盒子模型： 内容+padding+border +margin

层级：内容->padding ->border -> margin

`width` 属性：就是内容的宽度

对于属性的设置：

- 可以单独对每个top left right bottom设置
- 给一个值：每个边的都是等距的
- 给两个值：垂直 水平分别设置
- 给四个值：上右下左，顺时针方向

### 6.定位

position字段

1. relative

- 相对于自己初始的位置
- 定位后空间不释放

2. absolute

- 位置相对于自己已经定位的祖先元素，一直找到最上层body
- 定位空间释放

3. fixed固定定位(一般的广告就是)

- 位置相对可视页面
- 定位后空间释放

### 7.实现文字的省略号效果

```css
.选择器 {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
```

### 8.nth-of-type

正常选用nth-of-type不用nth-of-child

并且可以通过公式来全选

```bash
#使用公式 (an + b)。描述：表示周期的长度，n 是计数器（从 0 开始），b 是偏移值。
```

### 9.首行缩进

text-indent:缩进段落的第一行