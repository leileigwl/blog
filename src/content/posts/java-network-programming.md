---
title: 网络编程
published: 2022-06-24
description: 'Java网络编程学习笔记'
tags: [java, 网络编程]
category: '技术'
draft: false
---

网路编程

`javaweb`: 网页编程 B/S

网络编程：`TCP/IP` C/S

### 1. 如何实现网络通信

- 通信双方的地址
    - `ip`
    - 端口号
    - 规则：网络通信协议
        - `TCP/IP`参考模型

### 2. IP

- 唯一定位一台网络上计算机
- 127.0.0.1: 本机`localhost`
- `ip`地址：`InetAddress`类

```java
InetAddress inetAddress = InetAddress.getByName("www.baidu.com"); // 因为没有构造方法，只能通过调用他的静态方法直接获取一个他的属性
inetAddress.getHostAddress(); // ip
inetAddress.getHostName(); // 域名
```

### 3. 端口

端口表示计算机上的一个程序的进程；
- 不同的进程有不同的端口号！用来区分软件！
- 端口分类：
    - 公有端口 0~1023
    - `HTTP`: 80
    - `HTTPS`: 443
    - `FTP`: 21
    - `Telent`: 23
- 程序注册端口：1024~49151，分配用户或者程序
    - `Tomcat`: 8080
    - `MySQL`: 3306
    - `Oracle`: 1521

常用dos端口命令：
```bash
netstat -ano      # 查看所有的端口
netstat -ano|findstr "5900"  # 查看指定的端口号
tasklist|findstr "8696"      # 查看指定端口的进程
```

`InetSocketAddress`类：

```java
InetSocketAddress inetSocketAddress = new InetSocketAddress("hostname", port);
getHostName()  // 获取地址(如果有映射会变成地址的名称)
getAddress()   // 获取地址
getPort()      // 获取端口
```

### 4. 通信协议

- **协议**：就是约定；**网络通信协议**：速率，传输码率，代码结构，传输控制...
- `TCP/UDP`:
    - `TCP`: 用户传输协议
    - `UDP`: 用户数据报协议

- 出名的协议：
    - `IP`: 网络互连协议

- `TCP`: 打电话(必须是双方都有回应)
    - 连接，稳定
    - `三次握手` `四次挥手`
    ```bash
    # 最少需要三次，保证稳定连接！
    # 握手
    A: 你瞅啥？
    B: 瞅你咋地？
    A: 干一场！

    # 挥手
    # 场景：面试官与你
    A: 我要走了！
    B: 你快走吧！
    B: 赶紧滚hh
    A: 我的真的要走了！
    ```
    - 传输完成，释放连接，效率低

- `UDP`: 发短信(只需要发了就行，管他收到收不到)
    - 不连接，不稳定
    - 效率极高

### 5. TCP

- 客户端
    1. 连接服务器Socket发送消息

- 服务器
    1. 建立服务的端口`ServerSocket`
    2. 等待用户的链接 accept
    3. 接收用的消息

- 模拟
    - 重点：
        - `ServerSocket` 创建服务器类
        - `Socket` 套接字连接类
        - io流输入和关闭

```java
public class TestClient { // 客户端
    public static void main(String[] args) throws IOException {
        InetAddress severIp = InetAddress.getByName("127.0.0.1");
        // 本客户端的ip地址
        int port = 9999;
        // 套接字连接的端口号
        Socket socket = new Socket(severIp, port);
        OutputStream os = socket.getOutputStream();
        // 通过io流向服务端传递信息
        os.write("你好".getBytes()); // IO流getBytes的使用
        socket.close(); // 关闭流
        os.close();
    }
}

public class TestServer { // 服务端
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(9999);
        // 这里是服务器的端口等待客户端的消息
        Socket socket = serverSocket.accept();
        // 获取接收的消息
        InputStream is = socket.getInputStream();
        // 通过io流读取接收的消息
        ByteArrayOutputStream baos = new ByteArrayOutputStream(); // 管道流
        byte[] buffer = new byte[1024];
        int len;
        while ((len = is.read(buffer)) != -1) {
            baos.write(buffer, 0, len);
        }
        System.out.println(baos.toString());
        baos.close(); // 关闭流
        is.close();
        socket.close();
    }
}
```

思路:
- 客户端需要一个ip地址和能接收的端口号，而服务端就需要创建这个端口号
- 将客户端和服务端都用socket进行封装，如果服务端要接受东西

```java
ServerSocket serverSocket = new ServerSocket(9999); // 创建9999的端口
Socket socket = serverSocket.accept(); // 接收东西通过套接字进行封装
```

剩下的都给`IO`流：

套路的`io`：

```java
// 如果读入的是单纯的文字，就用字符流
// 如果读入的是图片，音频，等，就用字节流
// 管道流的化，如果对方传进来是什么类型，字符，字节，二进制，就用对应的管道流去接收
// 关于写入字符流套路
byte[] buffer = new byte[1024];
int len;
while ((len = 已经获取的字符流.read(buffer)) != -1) {
    新创建一个存储的地点.write(buffer, 0, len);
}
// 最后倒叙关闭流文件就行
```

### 6. UDP

实现`Udp`连接：
- 调用DatagramSocket包，还是通过套接字进行传输，常用的两个方法, send和receive

```java
// 发送端
public static void main(String[] args) throws IOException {
    DatagramSocket socket = new DatagramSocket(); // 通过DatagramSocket类库创建socket对象
    String name = "你好，udp服务器";
    InetAddress localhost = InetAddress.getByName("localhost"); // 获取域名地址
    DatagramPacket packet = new DatagramPacket(name.getBytes(), 0, name.getBytes().length, localhost, 9090);
    // 生成一个包裹需要几个参数，最后两个是域名地址和端口号，前面的是内容可以给根据需求改变
    socket.send(packet); // 调用send发送包
    socket.close(); // 关闭流
}

// 接收端，如果没有接受端，那么发送的包裹就会丢失
public static void main(String[] args) throws IOException {
    DatagramSocket socket = new DatagramSocket(9090); // 创建一个9090端口用于udp接收
    byte[] buffer = new byte[1024]; // 字节的读入
    DatagramPacket packet = new DatagramPacket(buffer, 0, buffer.length); // 这里不需要写端口号和域名，就像你收信息，只要收到就行；
    socket.receive(packet);
    System.out.println(new String(packet.getData())); // 输出包内的内容，由于是getData以字节返回所以通过新建String来输出
    socket.close(); // 关闭流
}
```

实现两人聊天：

```java
public class ChatSender { // 发送者
    public static void main(String[] args) throws IOException {
        DatagramSocket socket = new DatagramSocket(8888); // 配置用户端口和套接字
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in)); // 监听键盘输入
        String s = reader.readLine(); // 将读入的变成字符串
        byte[] bytes = s.getBytes(); // 因为下面创建发送包需要的是字节数组，所以获取字节
        DatagramPacket packet = new DatagramPacket(bytes, 0, bytes.length, new InetSocketAddress("localhost", 6666)); // 获取发送包包
        socket.send(packet);
        socket.close();
    }
}

public class ChatReceiver { // 接收者
    public static void main(String[] args) throws IOException {
        DatagramSocket socket = new DatagramSocket(6666); // 配置另一位用户的端口和套接字
        while (true) { // 循环监听收包包
            byte[] bytes = new byte[1024];
            DatagramPacket packet = new DatagramPacket(bytes, 0, bytes.length); // 获取数据包包
            socket.receive(packet);
            byte[] data = packet.getData();
            String s = new String(data, 0, data.length);
            System.out.println(s);
            if (s.equals("bye")) break;
        }
        socket.close();
    }
}
```

### 7. URL

https://www.baidu.com/ 就是地址url

统一资源定位符：定位资源的，定位互联网上的某一个资源 DNS域名解析 www.baidu.com xxx.xxx...

```bash
# 协议：//ip地址：端口/项目名/资源
```

```java
URL url = new URL("http://www.baidu.com"); // 新一个URL类
HttpURLConnection httpURLConnection = (HttpURLConnection) url.openConnection(); // openConnection建立连接
```