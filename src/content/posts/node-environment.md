---
title: Node环境配置
published: 2023-05-08
description: 'Node.js环境配置和npm换源'
image: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixid=M3wxMTM1NjA4fDB8MXxzZWFyY2h8MTJ8fGphdmFzY3JpcHQlMjBjb2RlfGVufDF8MHx8fDE3OTQ4MjIwMTd8MA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&fm=webp&q=80'
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