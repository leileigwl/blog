---
title: python解码
published: 2023-05-14
description: 'Python编码解码相关知识点'
tags: [python, 编码]
category: '技术'
draft: false
---

## python 解码

### request 请求

原理：

- 字符串在Python内部的表示是**unicode**编码，需要unicode编码作为中间件
    - eg、response 请求后得到的结果的编码，运行到python程序中首先是`unicode`编码，先用response.text.encode去加载原本再网页中的编码，然后再将这个网页里使用的编码进行decode('utf8')就可以正常的显示了

- encode 用于在python程序中，unicode 对其他编码的处理，将python程序中的unicode编码encode得到常见的编码，想要输出的话还是要转成utf8，这就要用到decode函数了

- decode函数是用于 常见编码转换成unicode编码的一种方式

通用解码：

```python
response.text.encode(response.encoding).decode('utf-8')
# response.encoding为原来的编码格式，encode后编码为原来的格式，decode后解码为'utf-8'

response.encoding = 'utf8' # 将encoding直接转换成utf8
response.content.decode('utf8') # 二进制内容转换成utf8
```

![python编码](https://pic.210214.xyz//random/image-20230514160231034.png)

### 文件读写操作 codecs.open

```python
import codecs
with codecs.open('....txt', 'w', 'utf-8') as f:
    f.write(...)
```