---
title: 常用代理配置
published: 2023-01-12
description: '各工具代理配置汇总'
tags: [代理, 配置]
category: '技术'
draft: false
---

## Windows CMD

```batch
set http_proxy=http://yourProxyServer:port
set https_proxy=http://yourProxyServer:port
```

## Linux / Mac

```bash
# 设置代理
export http_proxy=http://yourProxyServer:port
export https_proxy=http://yourProxyServer:port

# 取消代理
unset http_proxy
unset https_proxy
```

## Git

```bash
# 设置代理
git config --global http.proxy http://yourProxyServer:port

# 查看代理
git config --global --get http.proxy

# 删除代理
git config --global --unset http.proxy
```

## npm

```bash
# 设置镜像
npm config set registry https://registry.npm.taobao.org

# 设置代理
npm config set proxy http://yourProxyServer:port
npm config set https-proxy http://yourProxyServer:port

# 取消代理
npm config rm proxy
```

## yarn

```bash
yarn config set registry https://registry.npm.taobao.org
yarn config set proxy http://yourProxyServer:port
```

## nvm

```bash
nvm proxy "http://yourProxyServer:port"
```

## Bower (.bowerrc)

```json
{
  "directory": "bower_components",
  "proxy": "http://yourProxyServer:port/",
  "https-proxy": "http://yourProxyServer:port/"
}
```

## Gradle (gradle.properties)

```properties
systemProp.http.proxyHost=yourProxyServer
systemProp.http.proxyPort=yourPort
systemProp.https.proxyHost=yourProxyServer
systemProp.https.proxyPort=yourPort
```

## Python pip

```bash
# 方式一：命令参数
pip install yourPackage --proxy http://yourProxyServer:port

# 方式二：配置文件 pip.ini
[install]
proxy=http://yourProxyServer:port
```

## VSCode

```json
"http.proxy": "http://yourProxyServer:port"
```

## Sublime

```json
"http_proxy": "http://yourProxyServer:port",
"https_proxy": "http://yourProxyServer:port"
```

## wget

```bash
# 临时
wget url -e http-proxy=yourProxyServer:port

# 永久：.wgetrc
http-proxy = yourProxyServer:port
```

## curl

```bash
# 临时
curl url -x yourProxyServer:port

# 永久：_curlrc (Windows) 或 .curlrc (Linux)
proxy = yourProxyServer:port
```

## Golang go get

需设置系统变量 `http_proxy` 以及 Git 代理 `git config --global http.proxy ...`