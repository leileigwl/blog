---
title: Linux 基本命令
published: 2022-09-05
description: 'Linux入门基础命令大全，包括文件操作、用户管理、进程管理、JDK配置、防火墙配置、MySQL安装等。'
tags: [Linux, 脚本]
category: '技术'
draft: false
---

## Linux入门

### 命令

#### 1.基本命令

```bash
# :代表系统管理员
$ :代表普通的用户
```

```bash
ifconfig
clear #清屏
cd / #进入根
ll #显示所有目录信息
su #可以先进home查看所有用户信息，如果有可以用su加上普通用户的名称进入用户
 #普通用户进入root用户需要密码，而且还看不到输入的密码
pwd #打印目录
cd .. #返回上一层
poweroff #关机
reboot #重启
```

#### 2.文件和文件

```bash
mkdir #创建文件夹
touch (文件名.后缀)#创建文件
mv 被移动的文件 路径 #mv ./文件名.后缀 目录 移动文件
 #mv ./文件名.后缀 目录 文件名.后缀 移动文件并修改文件名
 #mv ./文件名.后缀 ./新的文件名.后缀 重命名
rm #rm 文件.后缀 一处文件
#rm -r 移除文件夹，并删除文件夹下面的所有文件和文件夹
#rm -rf 强制删除，不需要询问，一般真的删都是这个递归删除
#项目变更记得先打个包备份，因为Linux下面rm之后真的就很难很难恢复了
cp 被复制的文件 路径 #cp ./文件名.后缀 目录 移动文件 (这个没办法边移动边改名称)
find 路径 -type f| grep profile
```

#### 3.文件内容的操作

> vim三种模式
>
> 一般模式，编辑模式，底行模式

```bash
一般模式： #复制：yy 粘贴：p 删除：dd 撤销：u 反撤销：ctrl+r
 #跳转文件第一行：gg 跳转文件最后一行：G
 #搜索关键字： /关键字 (对于存在多个关键字用n进行跳转)
 编辑模式： #输入i/a/o进入编辑模式，esc退出编辑模式，变成一般模式
 底行模式： #输入：进入底行模式，wq指令保存并退出 ，set number/nonumber显/不显示行号，
 #输入数字直接就可以进入第几行 关闭高亮：noh
 #替换 开始行数/$s(结束行数，$s是最后一行) /原来的关键字/新的关键字/g(全局替换，g不加就不是全局)
```

```bash
cat 文件名.后缀 #查看文件 cat -n 文件名.后缀 显示行号查看
 #cat -n 文件名.后缀 显示行号查看
tail 文件名.后缀 #tail一般是打印日志，看tomcat的日志一般就用tail命令
 #正常是需要用tail -f 文件名.后缀
 #就是只要有新日志就会立刻打印，动态打印，Ctrl+z退出
more 文件名.后缀 #阅读模式，space可以跳到下一页，按q退出
nl 文件名.后缀 #从最后一行开始展示文件 基本用cat就可以了
```

#### 4.文件的压缩解压缩

```bash
tar 命令：打包文件或文件夹
选项：
# -c 创建一个打包文件
# -X 解开一个打包文件
# -Z 使用gzip压缩文件
# -j 使用bzip2压缩文件
# -V 压缩过程显示文件
# -f 使用文档名
# 常用命令 ：创建 tar -zcf 打包名.tar.gz (后缀尽量别写错，后面不然很难解压) 打包的文件
# ：解压 tar -zxf 包名.后缀
```

```bash
zip #压缩 zip 打包名.zip 打包的文件
unzip #解压 unzip 包名.zip
```

#### 5. 用户组

```bash
#Linux用户组的操作
groupadd #添加 groupadd 组名
grouppmod #修改 groupmod -n 新组名 旧组名
groupdel #删除 groupdel 组名
groups # 显示所在组名
```

```bash
#Linux 用户的操作
useradd #添加 useradd [选项] 用户名 创建的用户都放在/home下
#选项： -g 设置用户组 -G 设置用户组列表，多个用户组用，隔开
# -u 手动指定用户1d,必须唯一且大于499 -p 为新用户指定密码，但是该密码需要设置为MD5加密后的
usermod #修改 usermod [选项] 用户名
userdel #删除 userdel [选项] 用户名
passwd #设置用户的密码： passwd 用户名
```

> 关于用户权限展示：drwxrwxrwx ：
>
> 每个都由三个部分组成:当前用户的权限:**u**，与自己同组用户的权限:**g**，非同组用户的权限:**o**
>
> d是指现在是表示目录还是文件如果是文件的话就是-
>
> r是具有读的权限
>
> w是具有写的权限
>
> x是具有执行的权限(execute)

```bash
#字符授权模式
chmod #chmod (组名)u/g/o (添加/移除/覆盖) +/-/= (权限名) w/r/x 文件.后缀
#数字授权模式
r - 4 w - 2 x - 1
chmod #7以内的加减法 eg. chmod 700 文件名.后缀 即u组有wrx权限，其他什么权限都没有
 # -R 可以递归的加文件夹里面子文件权限
```

#### 6.进程管理

```bash
ps -ef # 显示所有进程信息，连同命令行
ps -ef | grep ssh # ps 与grep 常用组合用法，查找特定进程
kill #kill pid(进程编号) 终止进程
 #kill -9 pid 强制终止
```

```bash
#服务的操作
systemctl start|stop|restart|enable|disable|status 服务名 #查看服务命令
 #如查看firewalld
#端口号查看
yum -y insatll net-tools #下载netstat
netstat -ntlp #查看当前所有tcp端口
netstat -ntlp|grep 端口号 #查看当前对应tcp端口
#访问地址
curl 地址
```

#### 7.配置jdk

> 如果想删除原来的jdk
>
> rpm -qa | grep -i java | xargs -n1 rpm -e –nodeps
>
> *   rpm -qa：查询所安装的所有rpm软件包
> *   grep -i：忽略大小写
> *   xargs -n1：表示每次只传递一个参数
> *   rpm -e –nodeps：强制卸载软件

*   将jdk解压到记住的路径 我选择的是`/usr/local/soft/java`
*   去`/etc` 用vim打开 `profile`

```
#定义JAVA_HOME
export JAVA_HOME=/usr/local/soft/java/jdk1.8.0_202
#把JAVA_HOME添加到PATH
export PATH=$JAVA_HOME/bin:$PATH
#$表示使用环境变量.   :相当于是分隔符   因为前面是定义所以还需要将他添加上去
```

- 重新加载profile文件 ` source /etc/profile`
- 验证是否成功`Java -version`

#### 8.配置防火墙

- 防火墙配置
  > 配置文件 ： `/usr/lib/firewalld/services/ssh.xml`
  >
  > 添加开放端口：`<port protocol="tcp" port="8080"/>`
  >
  > 重启防火墙`systemctl restart firewalld`

#### 9.mysql创建

- `rpm -qa|grep mariadb`查看本地有没有这个文件 ，如果有需要删除`rpm -e mariadb-libs-5.5.68-1.el7.x86_64 --nodeps`
- 安装MySQL

```bash
rpm -ivh mysql-community-common-8.0.20-1.el7.x86_64.rpm  --nodeps --force
rpm -ivh mysql-community-libs-8.0.20-1.el7.x86_64.rpm  --nodeps --force
rpm -ivh mysql-community-client-8.0.20-1.el7.x86_64.rpm --nodeps --force
rpm -ih mysql-community-server-8.0.20-1.el7.x86_64.rpm  --nodeps --force
```

- 新装的MySQL密码是随机的

```bash
chown mysql:mysql /var/lib/mysql -R
systemctl start mysqld.service
systemctl enable mysqld
# 首先启动mysql，查看最开始的密码
cat /var/log/mysqld.log |grep password#查看密码，通过这个密码登录MySQL
```

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'; # 重新设置密码为root
```

- 开放远程连接

```sql
use mysql;
update user set host='%' where user ='root'; #开放远程
FLUSH PRIVILEGES;#刷新
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%'WITH GRANT OPTION;#授权语句
```

- 防火墙的设置

```bash
vim /usr/lib/firewalld/services/ssh.xml #添加3306的端口
```

- navicat通过ip连接虚拟机，创建数据库，导入用的表