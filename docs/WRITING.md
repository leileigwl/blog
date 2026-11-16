# 写作与发布流程

## 1. 写
```bash
pnpm new-post 文章英文名      # 生成 src/content/posts/文章英文名.md
```
补全 front-matter：title、description、tags、category；封面 image 用 Unsplash 链接。
草稿期间设 `draft: true`，不会上线。

## 2. 配图
```bash
IMGBED_AUTH_CODE=认证码 pnpm upload-img ./图1.png ./图2.jpg
```
把输出的 Markdown 粘进文章。也可以用网页上传或 PicGo/PicList 自定义图床。
图片统一走 https://img.leileigwl.cn，别再放进仓库。

## 3. 发布博客
`draft: false` → 提交并推送到 main（或开 PR 合并）→ Vercel 自动部署到 210214.xyz。

## 4. 同步到国内平台（本机 Chrome）
1. 安装 Wechatsync 扩展，在 Chrome 里登录要发的平台（掘金、CSDN、知乎、博客园、微信公众号等）。
2. 打开刚上线的文章页，点扩展「提取文章」→ 勾选平台 → 同步。默认存成各平台草稿。
3. 去各平台草稿箱检查排版后手动发布。
国内平台没有开放 API，同步依赖本机浏览器登录态，所以不放在 GitHub CI 里。
