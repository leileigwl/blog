---
title: JS补充
published: 2022-11-07
description: 'JavaScript基础知识补充，包括数组方法、ES6语法、函数、面向对象、DOM操作、事件处理等。'
tags: [JavaScript, ES6]
category: '技术'
draft: false
---

## 1.数组

### 数组的常用方法

#### 1. map

遍历数组。

```js
var list = ["a", "b", "c", "d", "e"];
list.map(function (value, index) {
    console.log("第" + (index + 1) + "个元素是" + value);
});
```

#### 2. push

在结尾追加元素。

```js
var list = ["a", "b", "c", "d", "e"];
list.push("f");
console.log(list);
```

#### 3. sort

排序。

数值：从小到大排序。
字符串：按首字母从 a~z 来排序。

```js
var list = [1, 3, 6, 5, 2];
list.sort();
console.log(list);
```

#### 4. filter

过滤器。`newList = list.filter(function (item) {}`的`item`是数组的每个元素

> 例子 - 将数组中大于等于 3 的元素放到新的数组

```js
var list = [1, 3, 6, 5, 2];
var newList = list.filter(function (item) {
    if (item >= 3) {
        return item;
    }
});
console.log(newList);
```

#### 5. join

连接数组。

不加参数时，默认加逗号。

```js
var list = ["a", "b", "c"];
var str = list.join();
console.log(str);
```

实现 abc，在 join 里面加参数，空字符串可以设成空的连接符

```js
var str = list.join("");
console.log(str);
```

实现 a+b+c

```js
var str = list.join("+");
console.log(str);
```

#### 6.字符串split 方法

split 是字符串的拆分方法。

split 不设参数时，默认生成一个数组。

```js
var str = "banana";
var list = str.split();
console.log(list);
```

空字符串会拆分字符串

```js
var list = str.split("");
console.log(list);
```

按字符来拆分

```js
var list = str.split("n");
console.log(list);
```

> 例子 - 把日期 "2021-8-15" 按 "-" 来拆分

```js
var str = "2021-8-15";
var list = str.split("-");
console.log(list);
```

#### 7.结合数组与对象

```js
var list = [
    { name: "小明", age: 2, sex: "男" },
    { name: "小红", age: 2, sex: "女" },
    { name: "小亮", age: 2, sex: "男" },
];
```

获取数据：`list[0].name`

```js
console.log(list[0].age);
console.log(list[0].name);
```

> 例子 - 找出所有男同学，放入一个新的数组。

方法 1 - 数组 filter 过滤器

```js
var list = [
    { name: "小明", age: 2, sex: "男" },
    { name: "小红", age: 2, sex: "女" },
    { name: "小亮", age: 2, sex: "男" },
];
var newList = list.filter(function (item) {
    if (item.sex === "男") {
        return item;
    }
});
console.log(newList);
```

方法 2 - 数组 push 添加

```js
var list = [
    { name: "小明", age: 2, sex: "男" },
    { name: "小红", age: 2, sex: "女" },
    { name: "小亮", age: 2, sex: "男" },
];
var newList = [];
for (var i = 0; i < list.length; i++) {
    if (list[i].sex === "男") {
        newList.push(list[i]);
    }
}
console.log(newList);
```

## 2.ES6

### 模板字符串

反引号 `` ` ``

1. 支持换行。

```js
let str = `hello
world`;
console.log(str);
```

2. 支持嵌入变量。

`${}`

连接字符串

```js
let year = "2020";
let month = "10";
let date = "10";
let result = `${year}年${month}月${date}日`;
console.log(result);
```

### 解构赋值

1. 数组的解构赋值。

`[n,m]`

```js
let [n, m] = [10, 20];
console.log(n);
console.log(m);
```

**例子 - 交换。让 n=20,m=10。**

定义一个临时变量，先把 n 放到 temp 里，再把 m 赋值给 n,最后再把 temp 赋值给 n。

方法一

```js
let n = 10;
let m = 20;
let temp;
temp = n;
n = m;
m = temp;
console.log(n);
console.log(m);
```

方法二（解构赋值）

```js
let n = 10;
let m = 20;
[n, m] = [m, n];
console.log(n);
console.log(m);
```

2. 对象的结构赋值（常用）。

```js
let { name, age } = { name: "xiaoming", age: 10 };
console.log(name);
console.log(age);
```

```js
let xm = { name: "xiaoming", age: 10 };
function getName({ name }) {
    return name;
}
let result = getName(xm);
console.log(result);
```

3. 通过解构赋值传递参数。

## 3.函数

### 1.闭包

闭包函数：声明在一个函数中的函数，叫做闭包函数。

闭包：内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回之后。

闭包的特性： 内部函数未执行完，外部函数即使执行完成，外部函数中的变量也不会被销毁。

**自己总结**:在不需要展示内部变量的情况下，调用到内部函数

```js
function fun1() {
    function fun2() {
        console.log("I'm fun2");
    }
    return fun2;
}
const f = fun1();
```

利用闭包实现了代码的封装。

```js
function fun1() {
    let n = 10;
    let m = 20;
    function fun2() {
        return n + m;
    }
    return fun2;
}
const f = fun1();
const result = f();
console.log(result);
```

#### 代码封装

ES5 的一个模块化的语法。

```js
const module = (function () {
    let a = 10;
    let b = 20;
    function add() {
        return a + b;
    }
    return add;
})();
```

### 2.箭头函数

作用： 简化写法。

```js
const add = (x) => {
    return x * x;
};
const add = (x) => x * x;
```

```js
const fun = function (x) {
    return x * x;
};

const fun = (x) => {
    return x * x;
};

const fun = (x) => x * x;
```

#### 例子 - 每秒输出一次名字

```js
const cat = {
    name: "miaomiao",
    sayName() {
        setInterval(() => {
            console.log(this.name);
        }, 1000);
    },
};
cat.sayName();
```

使用 `function` 定义的函数， `this` 取决于调用的函数。

使用箭头函数， `this` 取决于函数定义的位置。

箭头函数和普通函数的`this` 指向不同。

普通函数指向的是调用该函数的对象。

箭头函数：在哪里定义，`this` 就指向谁。

## 4.面向对象

### ES5 构造函数

构造函数的函数名，首字母大写

构造函数是用来创建对象用的。

`function Dog(){}`

```js
function Dog(name, age) {
    this.name = name;
    this.age = age;
}
var dog = new Dog("旺柴", 2);
console.log(dog.name);
```

### 原型对象

通过设置构造函数的`prototype`属性，可以扩展构造函数生成的对象。

通过原型对象，为构造函数生成的对象赋予新的方法。

`Dog.prototype.sayName = function () {};`

```js
function Dog(name, age) {
    this.name = name;
    this.age = age;
}
Dog.prototype.sayName = function () {
    console.log(`我的名字是${this.name}`);
};
var dog = new Dog("旺柴", 2);
var bigDog = new Dog("二哈", 3);
dog.sayName();
bigDog.sayName();
```

### 原型链（继承）

`Dog.prototype = new Animal()`

```js
function Animal(name) {
    this.name = name;
}
Animal.prototype.sayName = function () {
    console.log(`你好，我是${this.name}`);
};
Animal.prototype.sayHello = function () {
    console.log("hello");
};

function Dog(name) {
    this.name = name;
}
Dog.prototype = new Animal();

var dog = new Dog("旺柴");
dog.sayName();
dog.sayHello();
```

### ES6 面向对象语法

#### Class 关键字

`constructor`(ES6 的构造函数)

```js
class Dog {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    sayName() {
        console.log(`我是${this.name}`);
    }
}
let dog = new Dog("旺柴", 2);
dog.sayName();
```

#### 继承

`extends`关键字

`super`

```js
class Animal {
    constructor(name) {
        this.name = name;
    }
    sayName() {
        console.log(`我是${this.name}`);
    }
}
class Dog extends Animal {
    constructor(name, age) {
        super(name);
        this.age = age;
    }
}
let dog = new Dog("旺柴", 2);
dog.sayName();
console.log(dog.age);
```