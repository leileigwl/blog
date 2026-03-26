---
title: Node环境配置
published: 2023-05-08
description: 'Node.js环境配置和npm换源'
tags: [配置, node, npm]
category: '技术'
draft: false
---

```bash
#环境
D:\configuration\Node
D:\configuration\Node\node_global\node_modules
```

```bash
# 换源
npm config set registry https://registry.npm.taobao.org
# 还原默认源：npm config set registry https://registry.npmjs.org/
```

```bash
#目录
npm config set prefix "D:\configuration\Node\node_cache"
npm config set cache "D:\configuration\Node\node_cache"
```