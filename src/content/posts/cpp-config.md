---
title: Cpp配置
published: 2022-11-11
description: 'VSCode C++开发环境配置'
image: 'https://images.unsplash.com/photo-1640552435845-d65c23b75934?ixid=M3wxMTM1NjA4fDB8MXxzZWFyY2h8M3x8dGVybWluYWwlMjBjb21tYW5kJTIwbGluZXxlbnwxfDB8fHwxNzk0ODIyMDE5fDA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&fm=webp&q=80'
tags: [配置, cpp]
category: '技术'
draft: false
---

## cpp配置项

### vsc

#### 缩进

1. 依次点击：文件->首选项->设置，然后输入 `C_Cpp: Clang_format_style`
2. 将默认的 file 改为 `{BasedOnStyle: Chromium, IndentWidth: 4}`

#### 配置c++11，

- 打开code runner 的配置文件，在语言配置项中配置cpp的选项为如下即可

```json
"cpp": "cd $dir && g++ $fileName -std=c++11 -o $fileNameWithoutExt && $dir$fileNameWithoutExt",
```