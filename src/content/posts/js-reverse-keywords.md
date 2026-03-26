---
title: js逆向关键词
published: 2022-10-15
description: 'JavaScript逆向工程常用关键词检索技巧'
tags: [javascript, 逆向]
category: '技术'
draft: false
---

## 特殊的关键词检索

### webpack打包

- `interceptors.request.use`
- `apply/call` 用来找导出函数，找到加密函数后，自执行，用来

示例地址 `https://developer.aliyun.com/article/1103664`

主要结构：

```javascript
var _e;
!(function(t) {
    var i = {};
    function e(s) {
        return t[s].call(n.exports, n, n.exports, e), n.loaded = !0, n.exports
    }
    _e = e;
})({
    encrypt: function(t, e, i) {},
    diaoyong: function(t, e, i) {}
});

function getkey(pass, time) {
    var diaoyong= _e("diaoyong");
    var new_diaoyong = new diaoyong();
    return new_diaoyong.encode(pass, time)
}
```

### 非对称加密 RSA

- `JSEncrypt`

new JSEncrypt(),JSEncrypt等，一般会便用JSEncrypt库，会有new一个实例对象的操作；

- 搜索关键词setPublicKey、setKey、setPrivateKey、getPublicKey等，一般实现的代码里都含有设置密钥的过程。

### normal

- 返回结果无法看懂，但页面显示正常
- `JSON.parse/JSON.stringify`
- `btoa``base64`加密， `atob`解密
- `new Date().getTime()` 获取13位时间戳
- `jsencrypt`
- **indexof** 通过window的可以查找