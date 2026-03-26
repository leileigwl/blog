---
title: 常用代理配置
published: 2023-01-12
description: '各工具代理配置汇总'
tags: [代理, 配置]
category: '技术'
draft: false
---

设置代理通常用于翻墙、内网访问外网或内网镜像库。

假设代理地址为 `http://yourProxyServer:port`

## Windows CMD

```bash
# 设置代理
set http_proxy=http://yourProxyServer:port
# 取消代理
set http_proxy=
```

## Linux / Mac

```bash
# 临时设置
export http_proxy=http://yourProxyServer:port
# 取消代理
unset http_proxy
```

在 `~/.bash_profile` 或 `~/.zshrc` 中设置 alias 快捷方式。

## Git

```bash
# 全局设置
git config --global http.proxy http://yourProxyServer:port
# 删除代理
git config --global --unset http.proxy
```

## npm

```bash
# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com
# 设置代理
npm config set proxy http://yourProxyServer:port
# 取消代理
npm config rm proxy
```

## yarn

```bash
yarn config set registry https://registry.npmmirror.com
yarn config set proxy http://yourProxyServer:port
```

## Python pip

方式一：设置系统环境变量
方式二：命令参数 `--proxy`
方式三：配置文件 `pip.ini`

## VSCode

```json
"http.proxy": "http://yourProxyServer:port"
```

## curl

```bash
# 临时
curl -x yourProxyServer:port url
# 永久：配置文件 .curlrc
```

## wget

```bash
# 临时
wget -e https_proxy=http://yourProxyServer:port url
# 永久：配置文件 .wgetrc
```

## Golang

需同时设置系统环境变量和 Git 代理。