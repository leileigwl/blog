---
title: Charles配置
published: 2023-04-12
description: 'Charles抓包工具HTTPS配置教程'
tags: [配置, 爬虫]
category: '技术'
draft: false
---

## charles 配置

之前文章讲的数据包主要是http协议，大家可以看到数据包并直接显示具体详细的内容：

但是如果抓到的是https的报文，是没有办法直接显示的，你将看到的是乱码：

那怎么抓取https的数据报文并正常显示报文内容信息呢？

**第一步：安装证书**

如果需要抓取并分析 Https 协议的数据报文，需要先安装 Charles 的 CA 证书。具体步骤如下：

1、点击 Charles 的顶部菜单，选择 "Help" --> "SSL Proxying" --> "Install Charles Root Certificate"

然后输入系统的帐号密码，即可在 KeyChain 看到添加好的证书。

**第二步：安装浏览器证书**

根据提示信息，需要先下载证书，再安装到浏览器中。

所以，在浏览器地址栏输入"chls.pro/ssl"地址去下载证书

然后在浏览器中安装这个下载好的证书，此处以chrome为例

### 第三步：开启SSL 代理

点击【Proxy】—> 【SSL proxying Settings】可以打开如下对话框：

勾选"Enable SSL Proxying"，并在Include区域点击"Add"新建地址，在Host和Port区域填上"*"，表示匹配所有，那么就可以抓取所有的https数据报文。