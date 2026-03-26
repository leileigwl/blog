---
title: JavaScript加密解密模块
published: 2023-05-14
description: '常见加密算法及JavaScript/Python实现'
tags: [加密, JavaScript, Python, 逆向]
category: '技术'
draft: false
---

常见加密算法：

1. 对称加密（加密解密密钥相同）：DES、3DES、AES、RC4、Rabbit
2. 非对称加密（区分公钥和私钥）：RSA、DSA、ECC
3. 消息摘要算法/签名算法：MD5、SHA、HMAC、PBKDF2

常见编码算法：Base64

### JavaScript 加密解密模块

#### Crypto-JS

Crypto-JS 支持 MD5、SHA、RIPEMD-160、HMAC、PBKDF2、AES、DES、3DES（Triple DES）、Rabbit、RC4 等，**不支持 RSA、ECC**，是应用比较广的加密模块，使用命令 `npm install crypto-js` 安装。

参考资料：

- Crypto-JS 文档：[https://cryptojs.gitbook.io/docs/](https://cryptojs.gitbook.io/docs/)
- Crypto-JS Github：[https://github.com/brix/crypto-js](https://github.com/brix/crypto-js)

#### Node-RSA

Node-RSA 对 RSA 算法提供了支持，使用命令 `npm install node-rsa` 安装。

参考资料：Node-RSA Github：[https://github.com/rzcoder/node-rsa](https://github.com/rzcoder/node-rsa)

#### JSEncrypt

参考资料：JSEncrypt 对 RSA 算法提供了更加全面的支持，使用命令 `npm install jsencrypt` 安装。

- JSEncrypt 文档：[http://travistidwell.com/jsencrypt/](http://travistidwell.com/jsencrypt/)
- JSEncrypt Github：[https://github.com/travist/jsencrypt](https://github.com/travist/jsencrypt)

### Python 加密解密库

#### Cryptodome & Crypto

在 Python 中有很多算法是通过第三方库 Cryptodome 或者 Crypto 来实现的，Cryptodome 几乎是 Crypto 的替代品，Crypto 已经停止更新好多年了，有很多未知错误，所以**不建议安装 Crypto ！**

Cryptodome 支持几乎所有主流加密算法，包括 MD5、SHA、BLAKE2b、BLAKE2s、HMAC、PBKDF2、AES、DES、3DES（Triple DES）、ECC、RSA、RC4 等。

Cryptodome 使用命令 `pip install pycryptodome` 进行安装，Crypto 使用命令 `pip install pycrypto` 进行安装。

参考资料：

- Crypto 库：[https://www.dlitz.net/software/pycrypto/](https://www.dlitz.net/software/pycrypto/)
- Cryptodome 库：[https://www.pycryptodome.org/en/latest/](https://www.pycryptodome.org/en/latest/)

#### Hashlib

Python 的标准库 hashlib 提供了常见的摘要算法，如 MD5，SHA、BLAKE2b、BLAKE2s 等。

参考资料：

- hashlib 库：[https://docs.python.org/3/library/hashlib.html](https://docs.python.org/3/library/hashlib.html)
- 廖雪峰 hashlib：[https://www.liaoxuefeng.com/wiki/1016959663602400/1017686752491744](https://www.liaoxuefeng.com/wiki/1016959663602400/1017686752491744)

#### HMAC

Python 的标准库 hmac 对 HMAC 算法提供了支持。

参考资料：

- hmac 库：[https://docs.python.org/3/library/hmac.html](https://docs.python.org/3/library/hmac.html)
- 廖雪峰 hmac：[https://www.liaoxuefeng.com/wiki/1016959663602400/1183198304823296](https://www.liaoxuefeng.com/wiki/1016959663602400/1183198304823296)

#### pyDes

Python 的第三方库 pyDes 对 DES 算法提供了支持。使用命令 `pip install pydes` 进行安装。

参考资料：pyDes 库：[https://github.com/twhiteman/pyDes](https://github.com/twhiteman/pyDes)

#### ESA

Python 的第三方库 rsa 对 RSA 算法提供了支持。使用命令 `pip install rsa` 进行安装。

参考资料：rsa 库：[https://stuvel.eu/python-rsa-doc/](https://stuvel.eu/python-rsa-doc/)

## 加密解密基本参数

在一些对称和非对称加密算法中，经常会用到以下三个参数：初始向量 iv、加密模式 mode、填充方式 padding，先介绍一下这三个参数的含义和作用：

### 初始向量 iv

在密码学中，初始向量（initialization vector，缩写为 iv），又称初始变数（starting variable，缩写为 sv），与密钥结合使用，作为加密数据的手段，它是一个固定长度的值，iv 的长度取决于加密方法，通常与使用的加密密钥或密码块的长度相当，一般在使用过程中会要求它是随机数或拟随机数，使用随机数产生的初始向量才能达到语义安全，让攻击者难以对原文一致且使用同一把密钥生成的密文进行破解。

参考资料：维基百科：[https://en.wikipedia.org/wiki/Initialization_vector](https://en.wikipedia.org/wiki/Initialization_vector)

### 加密模式 mode

目前流行的加密和数字认证算法，都是采用块加密方式，就是将需要加密的明文分成固定大小的数据块，然后对其执行密码算法，得到密文。数据块的大小通常采用跟密钥一样的长度。加密模式在加密算法的基础上发展出来，同时也可以独立于加密算法而存在，加密模式定义了怎样通过重复利用加密算法将大于一个数据块大小的明文转化为密文，描述了加密每一数据块的过程。目前利用较多的加密模式有以下几种：

- **ECB：Electronic Code Book（电子码本模式）**，是一种基础的加密方式，密文被分割成分组长度相等的块（不足补齐），然后单独一个个加密，一个个输出组成密文。
- **CBC：Cipher Block Chaining（密码块链接模式）**，是一种循环模式，前一个分组的密文和当前分组的明文异或操作后再加密，这样做的目的是增强破解难度。
- **PCBC：Propagating Cipher Block Chaining（填充密码块链接模式）**，也称为明文密码块链接模式（Plaintext Cipher Block Chaining），是一种可以使密文中的微小更改在解密时导致明文大部分错误的模式，并在加密的时候也具有同样的特性。
- **CFB：Cipher Feedback（密码反馈模式）**，可以将块密码变为自同步的流密码，类似于 CBC，CFB 的解密过程几乎就是颠倒的 CBC 的加密过程。
- **OFB：Output Feedback（输出反馈模式）**，可以将块密码变成同步的流密码，它产生密钥流的块，然后将其与明文块进行异或，得到密文。与其它流密码一样，密文中一个位的翻转会使明文中同样位置的位也产生翻转。
- **CTR：Counter mode（计数器模式）**，也被称为 ICM 模式（Integer Counter Mode，整数计数模式）和 SIC 模式（Segmented Integer Counter），在 CTR 模式中，有一个自增的算子，这个算子用密钥加密之后的输出和明文异或的结果得到密文，相当于一次一密。这种加密方式简单快速，安全可靠，而且可以并行加密，但是在计算器不能维持很长的情况下，密钥只能使用一次。

参考资料：维基百科：[https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation)

### 填充方式 padding

块密码只能对确定长度的数据块进行处理，而消息的长度通常是可变的。因此部分模式最后一块数据在加密前需要进行填充。有数种填充方法，其中最简单的一种是在明文的最后填充空字符以使其长度为块长度的整数倍。常见填充方式有以下几种：

- **PKCS7**：在填充时首先获取需要填充的字节长度 = 块长度 - （数据长度 % 块长度）, 在填充字节序列中所有字节填充为需要填充的字节长度值。
- **PKCS5**：PKCS5 作为 PKCS7 的子集算法，概念上没有什么区别，只是在 blockSize 上固定为 8 bytes，即块大小固定为 8 字节。
- **ZeroPadding**：在填充时首先获取需要填充的字节长度 = 块长度 - （数据长度 % 块长度）, 在填充字节序列中所有字节填充为 0 。
- **ISO10126**：在填充时首先获取需要填充的字节长度 = 块长度 - （数据长度 % 块长度），在填充字节序列中最后一个字节填充为需要填充的字节长度值，填充字节中其余字节均填充随机数值。
- **ANSIX923**：在填充时首先获取需要填充的字节长度 = 块长度 - （数据长度 % 块长度），在填充字节序列中最后一个字节填充为需要填充的字节长度值，填充字节中其余字节均填充数字零。

参考资料：

- 维基百科：[https://en.wikipedia.org/wiki/Padding_(cryptography)](https://en.wikipedia.org/wiki/Padding_(cryptography))
- PKCS7/PKCS5 填充算法：[https://segmentfault.com/a/1190000019793040](https://segmentfault.com/a/1190000019793040)

## Base64

简介：Base64 是一种用 64 个字符来表示任意二进制数据的方法。

参考资料：

- Base64 百度百科：[https://baike.baidu.com/item/base64/8545775](https://baike.baidu.com/item/base64/8545775)
- Base64 维基百科：[https://en.wikipedia.org/wiki/Base64](https://en.wikipedia.org/wiki/Base64)

## MD5

简介：全称 MD5 消息摘要算法（英文名称：MD5 Message-Digest Algorithm），又称哈希算法、散列算法，由美国密码学家罗纳德·李维斯特（Ronald Linn Rivest）设计，于 1992 年作为 RFC 1321 被公布，用以取代 MD4 算法。摘要算法是单向加密的，也就是说明文通过摘要算法加密之后，是不能解密的。摘要算法的第二个特点密文是固定长度的，它通过一个函数，把任意长度的数据转换为一个长度固定的数据串（通常用16进制的字符串表示）。之所以叫摘要算法，它的算法就是提取明文重要的特征。所以，两个不同的明文，使用了摘要算法之后，有可能他们的密文是一样的，不过这个概率非常的低。

## RSA

简介：英文名称：Rivest-Shamir-Adleman，是 1977 年由罗纳德·李维斯特（Ron Rivest）、阿迪·萨莫尔（Adi Shamir）和伦纳德·阿德曼（Leonard Adleman）一起提出的，RSA 就是他们三人姓氏开头字母拼在一起组成的，RSA 加密算法是一种非对称加密算法。在公开密钥加密和电子商业中RSA被广泛使用。它被普遍认为是目前比较优秀的公钥方案之一。RSA是第一个能同时用于加密和数字签名的算法，它能够抵抗到目前为止已知的所有密码攻击。

参照 k哥爬虫 ：[https://mp.weixin.qq.com/s/4QTee0M9ukN6olgoR_LMug](https://mp.weixin.qq.com/s/4QTee0M9ukN6olgoR_LMug)