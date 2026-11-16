---
title: js环境
published: 2023-05-14
description: 'Node.js环境补环境配置'
image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixid=M3wxMTM1NjA4fDB8MXxzZWFyY2h8NXx8amF2YXNjcmlwdCUyMGNvZGV8ZW58MXwwfHx8MTc5NDgyMjAxN3ww&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&fm=webp&q=80'
tags: [逆向, js, v8]
category: '技术'
draft: false
---

### 补环境

```js
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
window = dom.window;
var document = dom.window.document;
window.document = document;
```

### 安装jsdom和canvas

#### jsdom

```shell
npm install -g jsdom
```

#### canvas

```shell
npm install -g canvas
```