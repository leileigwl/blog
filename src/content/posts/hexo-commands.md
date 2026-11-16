---
title: Hexo常用快捷键
published: 2023-04-11
description: 'Hexo命令行快捷键汇总'
image: 'https://images.unsplash.com/photo-1610986603166-f78428624e76?ixid=M3wxMTM1NjA4fDB8MXxzZWFyY2h8Mnx8dGVybWluYWwlMjBjb21tYW5kJTIwbGluZXxlbnwxfDB8fHwxNzk0ODIyMDE5fDA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&fm=webp&q=80'
tags: [Hexo, 博客]
category: '技术'
draft: false
---

| 命令 | 说明 |
|------|------|
| `hexo g` | 生成 |
| `hexo s` / `hexo server` | 开始本地预览服务 |
| `hexo d` / `hexo deploy` | 发布上传 |
| `hexo clean && hexo g && hexo d` | 组合生成发布命令 |
| `hexo clean && hexo g && gulp && hexo deploy` | **最常用的组合命令，生成，压缩并发布** |
| `hexo n` / `hexo new "postName"` | 新建文章 |
| `hexo new page "pageName"` | 新建页面 |
| `hexo g` / `hexo generate` | 生成静态页面至public目录 |
| `hexo help` | 查看帮助 |
| `hexo version` | 查看Hexo版本 |