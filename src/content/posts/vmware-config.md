---
title: VMware虚拟机配置
published: 2023-02-18
description: 'VMware虚拟机配置教程，包括Ubuntu系统换源、静态IP配置、SSH连接设置等。'
tags: [配置, VMware, 虚拟机]
category: '技术'
draft: false
---

## vm

### ubuntu 18

#### 换源

##### 1.查看发行版本信息

**ubuntu 20.04**

```bash
$ lsb_release -a
Distributor ID: Ubuntu
Description: Ubuntu 20.04.1 LTS
Release: 20.04
Codename: focal
#可以看到发行版本代号为 focal
```

**ubuntu 18.04**

```bash
$ lsb_release -c
Codename: bionic
#可以看到发行版本代号为 bionic
```

**部分ubuntu系统LTS版本代号**

```
Ubuntu 16.04代号为：xenial
Ubuntu 17.04代号为：zesty
Ubuntu 18.04代号为：bionic
Ubuntu 19.04代号为：disco
Ubuntu 20.04代号为：focal
```

##### 2.修改sources.list文件

```bash
sudo vim /etc/apt/sources.list
```

**ubuntu 20.04**

```
#阿里源
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
```

**ubuntu 18.04**

```
#阿里源
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
```

##### 3.更新

```bash
sudo apt-get update
sudo apt-get upgrade
```

#### 静态ip

##### 1.首先查看虚拟机的各个网络字段

- 提取信息

    ```
    上图所示我的NAT网络配置：
    子网ip：192.168.230.0 #need 这里需要用子网ip这个同一个网段的不同地址，例如这里的就是192.168.230.*(1~255)
    子网掩码：255.255.255.0
    子网网关：182.168.230.2 #need
    ```

- 其次还需要从自己主机查看本地网络的dns
- 点击详细信息进行查看

##### 2.下面是对虚拟机的配置

```bash
sudo vim /etc/netplan/01-network-manager-all.yaml #只要配置netplan下面的这个文件就行，如果没有这个同名的，可以找一下自己的目录,只要是yaml这个后缀的就行
```

模板

```yaml
network:
  version: 2
  renderer: NetworkManager
  ethernets:
    ens32:  #配置的网卡名称
      dhcp4: no    #dhcp4关闭
      dhcp6: no    #dhcp6关闭
      addresses: [192.168.230.128/24]   #设置本机IP及掩码
      optional: true
      gateway4: 192.168.230.2   #设置网关
      nameservers:
          addresses: [192.168.0.1]   #设置DNS
```

#### ssh连接

##### 1.关闭防火墙

```bash
sudo ufw disable
```

##### 2.安装OpenSSH

```bash
sudo apt-get install openssh-server openssh-client
```

##### 3.验证

```bash
netstat -tnl
```