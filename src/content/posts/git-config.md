---
title: git 配置
published: 2022-06-20
description: 'Git常用配置和操作命令整理'
tags: [git, 版本控制]
category: '技术'
draft: false
---

## 1.初始化配置

```bash
git config --global user.name "***"
git config --global user.email "***"
git config --global http.sslVerift false
git config --list
git config --global core.autocrlf true
git config --global core.autocrlf input
git remote add origin
```

## 2.拉取代码

```bash
git clone --recursive 'url'
git pull
```

## 3.分支操作

```bash
# 也就是说当前的你的分支如果有代码的话你创建的新分支是不干净的
git checkout -b '目录'/'分支名'
git branch -a
git checkout '需要切换的分支名称'
git branch -d '删除分支名称'
```

## 4.代码提交

```bash
git add .
git commit -m '分支名称'
git diff
git push
git push -f
```

## 5.配置代理

```ini
[user]
    name = xxxx
    email = xxxxx@xxxx
[http "https://github.com"]
    proxy = http://127.0.0.1:7890
[http "http://github.com"]
    proxy = http://127.0.0.1:7890
[credential "https://gitee.com"]
    provider = generic
[http]
    sslverify = false
```

## 6. gitignore规则

### 语法

- `#`作为注释
- `/`开头表示目录
- `*`通配符
- `?`匹配单个字符
- `[]`包含单个字符的匹配规则
- `!`忽略目录

### 用法

```
*.txt ，*.xls 表示过滤某种类型的文件
target/ ：表示过滤这个文件夹下的所有文件
/test/a.txt ，/test/b.xls 表示指定过滤某个文件下具体文件
!*.java , !/dir/test/ !开头表示不过滤
*.[ab] 支持通配符：过滤所有以.a或者.b为扩展名的文件
/test 仅仅忽略项目根目录下的 test 文件，不包括 child/test等非根目录的 test 目录
```

### .gitignore

有些时候我们不想把某些文件纳入版本控制中，比如数据库文件，临时文件等

在主目录下建立".gitignore"文件，此文件有如下规则：

1. 忽略文件中的空行或以井号（#）开始的行将会被忽略。
2. 可以使用Linux通配符。例如：星号（*）代表任意多个字符，问号（？）代表一个字符，方括号 （[abc]）代表可选字符范围，大括号（{string1,string2,…}）代表可选的字符串等。
3. 如果名称的最前面有一个感叹号（!），表示例外规则，将不被忽略。
4. 如果名称的最前面是一个路径分隔符（/），表示要忽略的文件在此目录下，而子目录中的文件不 忽略。
5. 如果名称的最后面是一个路径分隔符（/），表示要忽略的是此目录下该名称的子目录，而非文件 （默认文件或目录都忽略）。

```
*.txt
!lib.txt
/temp
build/
doc/*.txt
```