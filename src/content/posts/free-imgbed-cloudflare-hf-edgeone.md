---
title: 零成本自建图床：CloudFlare-ImgBed + Hugging Face + EdgeOne
published: 2026-11-16
description: '不绑卡、不花一分钱，用 Cloudflare Pages、Hugging Face 存储和腾讯云 EdgeOne 免费版，搭一个自己的图床，并让国内也能正常访问。'
image: 'https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?ixid=M3wxMTM1NjA4fDB8MXxzZWFyY2h8MXx8c2VydmVyJTIwY2xvdWR8ZW58MHwwfHx8MTc5NDgyNzEzN3ww&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&fm=webp&q=80'
tags: [图床, Cloudflare, HuggingFace, EdgeOne]
category: '技术'
draft: false
---

之前博客的图片都放在一个 GitHub 私有仓库里，用了几年，仓库涨到 1.6 GB，国内访问也时快时慢。这次干脆重做：**全程零成本、不绑银行卡**，同时让国内访问保持正常速度。

最终架构：

```
写文章 / 截图
   │  上传（网页后台或脚本）
   ▼
CloudFlare-ImgBed（Cloudflare Pages）  ── 存储 ──▶  Hugging Face Dataset
   │
   ▼ 回源
腾讯云 EdgeOne 免费版（CDN） ──▶ img.leileigwl.cn
```

## 为什么这么选

| 方案 | 问题 |
| --- | --- |
| GitHub 仓库 + jsDelivr | 仓库越来越大，jsDelivr 国内经常抽风 |
| Cloudflare R2 | 有免费额度，但开通要绑卡 |
| 各家对象存储 | 基本都要实名 + 充值，流量另算 |
| **ImgBed + HF + EdgeOne** | 全免费、不绑卡，有后台、能鉴权、可换存储 |

[CloudFlare-ImgBed](https://github.com/MarSeventh/CloudFlare-ImgBed) 是一个跑在 Cloudflare Pages 上的开源图床，自带上传页、管理后台，支持 Telegram、R2、S3、Hugging Face 等多种存储渠道。Hugging Face 的公开 Dataset 不限容量、无需付费，正好拿来当仓库。

## 第一步：部署 ImgBed 到 Cloudflare Pages

1. 在 GitHub Fork `MarSeventh/CloudFlare-ImgBed`。
2. Cloudflare 控制台 → Workers & Pages → 创建 Pages 项目，连接刚 Fork 的仓库。
3. 构建设置：框架选 None，**输出目录 `./frontend-dist`**，构建命令留空。
4. 在 Workers KV 新建一个命名空间，回到 Pages 项目 → 设置 → 绑定，添加 KV 绑定，**变量名必须是 `img_url`**。
5. 环境变量里加 `disable_telemetry = true`（可选，关掉遥测）。
6. 重新部署一次，打开 `https://<项目名>.pages.dev` 就能看到上传页。

> 小坑：用 Wrangler 直传也能部署，但没有 git 联动，后续升级麻烦，推荐直接连 GitHub 仓库。

## 第二步：给后台上锁

刚部署完的图床谁都能传，第一件事是进 `/dashboard` → 系统设置 → 安全设置：

- **管理员账号 / 密码**：保护后台。
- **上传认证码（authCode）**：上传接口必须带上它，防止被白嫖。

## 第三步：接 Hugging Face 存储

1. 注册 Hugging Face，新建一个 **Dataset**（例如 `用户名/imgbed`），设为公开。
2. Settings → Access Tokens，创建一个 **Write** 权限的 token。
3. 图床后台 → 上传设置 → 新增 Hugging Face 渠道，填用户名、仓库名、token，设为默认渠道。
4. 随便传一张图测试，返回 `/file/xxxx_文件名` 形式的链接就成功了。

## 第四步：国内加速（EdgeOne 免费版）

`pages.dev` 在国内能打开，但速度不稳定。腾讯云 EdgeOne 有免费版套餐（0 元，不计量流量），可以给自己的域名套一层 CDN：

1. 腾讯云实名后，在 EdgeOne 活动页领取**免费版**套餐。
2. 添加站点（主域名），接入方式选 **CNAME 接入**，这样 DNS 不用迁走，原来在哪就还在哪。
3. 按提示在 DNS 加一条 TXT 记录，验证域名归属。
4. 添加加速域名 `img`：
   - 源站：`<项目名>.pages.dev`
   - 回源协议 HTTPS，端口 443
   - **回源 HOST 头填源站域名**（`<项目名>.pages.dev`），否则 Cloudflare 认不出来
5. 在 DNS 把 `img` CNAME 到 EdgeOne 给出的地址。
6. HTTPS 配置里申请免费证书，等几分钟到状态变成「已部署」。

> 关于加速区域：选「全球可用区（含中国大陆）」需要域名完成**工信部备案**，并且腾讯云要能查到这个备案。如果暂时没有，可以先选「全球可用区（不含中国大陆）」，走香港等节点，备案好之后再切回来。

## 日常怎么用

- **网页上传**：打开图床首页，输入认证码，拖图进去，复制 Markdown 链接。
- **脚本上传**：博客仓库里有个 `scripts/upload-img.js`，一条命令把本地图片传上去并直接输出 Markdown：

```bash
IMGBED_AUTH_CODE=你的认证码 pnpm upload-img ./截图.png
# ![截图](https://img.leileigwl.cn/file/1794xxxx_截图.png)
```

- 也可以在 PicGo / PicList 里配一个「自定义 Web 图床」指向同一个上传接口，写文章时截图直接粘贴。

## 成本

| 项目 | 费用 |
| --- | --- |
| Cloudflare Pages + KV | 0 |
| Hugging Face Dataset | 0 |
| EdgeOne 免费版 | 0 |
| 域名 | 已有 |

一分钱没花，也没绑卡。旧的 GitHub 图床仓库我保留着，老文章里的图不受影响。
