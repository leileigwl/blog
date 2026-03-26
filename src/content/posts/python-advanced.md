---
title: Python高级语法
published: 2023-02-08
description: 'Python高级语法知识点总结'
tags: [Python]
category: '技术'
draft: false
---

## lambda

匿名函数的语法，冒号前为参数，冒号后为返回值。

```python
lambda x: x * x
```

## 列表生成式

```python
[x * x for x in range(1, 11)]
[x for x in range(1, 11) if x % 2 == 0]
```

## 内置函数

### 数学运算
- abs
- round
- pow
- divmod

### 序列操作
- all
- any
- sorted
- reversed

### 对象操作
- hasattr
- getattr
- setattr
- isinstance

## 导入库

### json

```python
import json
json.dumps(data, ensure_ascii=False)  # 编码，支持中文
json.loads()  # 解码
```

### datetime

```python
from datetime import datetime
```

### os

```python
import os
```

## 线程池使用

```python
from concurrent.futures import ThreadPoolExecutor

with ThreadPoolExecutor(max_workers=5) as executor:
    executor.map(func, iterable)
```

## 逆向常用

JavaScript Hook 调试：

```javascript
Object.defineProperty(document, 'cookie', {
  set: function(a) {
    debugger
  }
})
```