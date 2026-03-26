---
title: vue.js 拓展无法使用
published: 2022-11-14
description: '解决Vue Devtools无法启用的问题'
tags: [vue, 拓展]
category: '技术'
draft: false
---

## vue.js 拓展无法启用

### 这里我以自己的谷歌浏览器演示

```
C:\Users\维磊\AppData\Local\Google\Chrome\User Data\Default\Extensions\nhdogjmejiglipccpnnnanhbledajbpd\6.4.5_0
```

#### 在路径中点开文件夹找到 manifest.json 文件

#### 更改配置

更改文件中的字段：

```json
"persistent": true
```

#### 我的 manifest.json 文件完整展示

```json
{
    "background": {
        "persistent": true,
        "scripts": ["build/background.js"]
    },
    "browser_action": {
        "default_icon": {
            "128": "icons/128-gray.png",
            "16": "icons/16-gray.png",
            "48": "icons/48-gray.png"
        },
        "default_popup": "popups/not-found.html",
        "default_title": "Vue Devtools"
    },
    "content_scripts": [
        {
            "js": ["build/hook.js"],
            "matches": ["\u003Call_urls>"],
            "run_at": "document_start"
        },
        {
            "js": ["build/detector.js"],
            "matches": ["\u003Call_urls>"],
            "run_at": "document_idle"
        }
    ],
    "content_security_policy": "script-src 'self'; object-src 'self'",
    "description": "Browser DevTools extension for debugging Vue.js applications.",
    "devtools_page": "devtools-background.html",
    "icons": {
        "128": "icons/128.png",
        "16": "icons/16.png",
        "48": "icons/48.png"
    },
    "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgJeMqfZu44CZ6O6SbpANnImOjQWgDPTyRXnvtYmAmZsC4o+mGZLWSdJph50Rdcipn+P66YvwrzN5ZSU8fz51d+C7OfCQiW3KnvBKYuSzF7AWciOx0crrVkCKZVgWh1GyEQS5Cpeifz/UZaXLoTqSqqFut/DeSCpMTFVIAvPksG3MGZI6jGIQd3CemEKUOXLUveNVbv8dEpxy/5NeUea4/wO6Kpa0zbEz1zQXrF0jOqsLC2d2hUOHPaAEc7h9uDal1cFsxG3e7ZQeGUPie3ho8bZfLPXYLj5dpDrRxVrxA92airJWOAQf8fqpKNm6SMw87NheU3xwmfV3EMpAWVen6wIDAQAB",
    "manifest_version": 2,
    "name": "Vue.js devtools",
    "permissions": ["\u003Call_urls>", "storage"],
    "update_url": "https://clients2.google.com/service/update2/crx",
    "version": "6.4.5",
    "version_name": "6.4.5",
    "web_accessible_resources": ["devtools.html", "devtools-background.html", "build/backend.js"]
}
```

#### 重启浏览器

后面重启就可以了