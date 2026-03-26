---
title: js环境
published: 2023-05-14
description: 'Node.js环境补环境配置'
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