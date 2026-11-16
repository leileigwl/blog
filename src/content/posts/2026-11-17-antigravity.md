---
title: 解锁 Antigravity + 体验最新 4 Hydrogen，附过手机扫码验证
published: 2026-11-17
description: '用 3 月订阅的谷歌学生 Pro 会员解锁 Antigravity 的完整流程：老号与学生认证、改账号关联地区、手机扫码验证技巧，以及实际使用体验。'
image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixid=M3wxMTM1NjA4fDB8MXxhbGx8fHx8fHx8fHwxNzk0ODY3NjY3fA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&fm=webp&q=80'
tags: [AI, Antigravity, Google, 开发工具]
category: '技术'
draft: false
---

最近谷歌的 AI 开发工具 Antigravity（简称 AGY）非常火，用它配合最近新出的 4 Hydrogen 真的超好用，额度也不错，一点也不比 GPT 差，并且它自身优化的 Agent 框架也还比较人性化，暂时脱离了“美版大豆包”的身份。虽然可以直接调用 Claude 模型，不过 Pro 额度非常非常低，两句话就耗了一大半。

由于现在地区和风控限制，很多朋友虽然眼馋但一直用不上。今天就把我用 3 月份订阅的谷歌学生 Pro 会员成功解锁 Antigravity 的完整流程整理出来，供大家参考。

## 一、老账号与会员准备（学生资格 + 美区支付）

1. **准备老号与学生认证**：准备一个正常使用的 Google 账号（尽量用注册时间较长的老号，我最新注册的一个新 Gmail 账号目前依然没申请下来，新号风控会严很多）。接着通过 SheerID 完成学生身份验证。

   ![SheerID 学生认证](https://img.leileigwl.cn/file/1794865869036_image-20261117052756710.png)

2. **绑定外币卡开通 Pro**：验证通过后，绑定一张海外银行卡（当时我是请朋友帮忙解决的海外卡），成功订阅了 Google 的学生版 Pro 会员，有幸一直没有被封。

## 二、核心关键：更改账号关联国家/地区

有了 Pro 会员，就可以正常使用网页版本进行提问和交互了，但是如果账号归属地不在支持范围内，打开 Antigravity 依然会被拒之门外。

1. **提交改区申请**：首先打开美国代理，然后前往 Google 的“国家/地区关联更改”页面，将账号的默认地区申请更改为美国，并随机选择具体地区。印象里基本都能过，第三个选项只要不选 VPN 应该都还好。

   ![改区申请入口](https://img.leileigwl.cn/file/1794865870720_image-20261117053505725.png)

   ![选择国家/地区](https://img.leileigwl.cn/file/1794865863869_image-20261117053600570.png)

   ![填写更改原因](https://img.leileigwl.cn/file/1794865871156_image-20261117053725071.png)

2. **耐心等待审核**：提交后一般需要 2 到 3 天左右的审核周期（部分账号可能会更快），收到确认邮件后，账号的底层地区才算真正切换成功。

   ![改区成功邮件](https://img.leileigwl.cn/file/1794865867625_image-20261117054125613.png)

## 三、手机端验证技巧（解决短信/扫码卡死问题）

在登录授权 Antigravity 时，经常会触发手机端的验证拦截（要求发送短信或扫码确认）。这里有一个非常实用的过验证技巧：

1. **提前装好几个 App**：需要海外的 Apple ID（这个不懂的下期再出一篇教程），然后在手机上务必提前下载并登录 Chrome 和 YouTube 客户端；最好再备上 Gmail 和 Google Authenticator，绑定好防止以后登录受阻，确保各个 App 都正常登录了你的 Gmail 账号。

2. **巧用扫码跳转触发**：当页面弹出发送消息或扫码验证提示时，直接用手机上的 Google 扫码功能去扫。**只要在扫码跳转的过程中成功弹出了 YouTube 客户端，就说明验证通路已经激活了。** 如果一次没弹出，可以多扫几次。

   ![扫码验证](https://img.leileigwl.cn/file/1794865872583_image-20261117054339942.png)

3. **完成解锁**：只要成功跳转到 YouTube 页面，验证基本就算跑通了，此时再回到电脑端刷新，就能正常打开并使用 Google Antigravity。

   ![Antigravity 解锁成功](https://img.leileigwl.cn/file/1794865872155_image-20261117054348770.png)

## 四、实际使用体验总结

跑通之后，整体的开发体验非常丝滑：

- **主力模型够耐用**：在 Pro 会员的额度加持下，日常主力模型（如最新的 4 Hydrogen 等）的用量非常抗造，写日常脚本、做小型开源项目完全够用，性价比很高。

  ![模型额度](https://img.leileigwl.cn/file/1794866005388_af828f835c9a878b2b01a269925ded3e.png)
