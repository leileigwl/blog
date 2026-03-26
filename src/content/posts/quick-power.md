---
title: 快速幂
published: 2022-11-08
description: '快速幂是一种高效计算幂运算的算法，通过二进制分解将时间复杂度从O(n)降低到O(logn)。'
tags: [算法, 快速幂]
category: '技术'
draft: false
---

## 快速幂核心思想

1. 把所有的次方用不同的底数相乘 的方式进行计算
2. 一直自乘，当出现幂次数的二进制位是1时，答案乘上当前的已经存在的数

```cpp
//非递归快速幂
int qpow(int a, int n){
    int ans = 1;
    while(n){
        if(n&1) //如果n的当前末位为1
            ans *= a; //ans乘上当前的a
        a *= a; //a自乘
        n >>= 1; //n往右移一位
    }
    return ans;
}
```

```cpp
//泛型的非递归快速幂
template <typename T>
T qpow(T a, ll n)
{
    T ans = 1; // 赋值为乘法单位元，可能要根据构造函数修改
    while (n)
    {
        if (n & 1)
            ans = ans * a; // 这里就最好别用自乘了，不然重载完*还要重载*=，有点麻烦。
        n >>= 1;
        a = a * a;
    }
    return ans;
}
```

```cpp
//求 m^k mod p，时间复杂度 O(logk)。
int qmi(int m, int k, int p)
{
    int res = 1 % p, t = m;
    while (k)
    {
        if (k&1) res = res * t % p;
        t = t * t % p;
        k >>= 1;
    }
    return res;
}
```