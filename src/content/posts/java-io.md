---
title: java IO流
published: 2022-09-05
description: 'IO是指Input/Output，即输入和输出。本文详细介绍Java中的字节流、字符流、功能流、转换流、基本数据类型流和对象流的使用方法。'
tags: [Java, IO]
category: '技术'
draft: false
---

IO是指Input/Output，即输入和输出。

## 字节输入流（常用）

`Inputstream`是输入流的抽象父类，类里面主要就是`read`方法与`close`方法，需要去找子类的实例，实现其方法；

```java
public static void main(String[] args) throws IOException {
  File file = new File("D:\\project\\java\\execrise\\project 01\\project0.1\\receive.jpg");//传一个路径
  InputStream is = new FileInputStream(file);//构建流
  int read = is.read();//按字节来读入流
  System.out.println(read);//结果：255(ascil码)
  is.close();//关闭流
}
//read方法如果没有读到就返回-1
```

```java
//通过while循环来改善每个字节的读入
public static void main(String[] args) throws IOException {
    File file = new File("D:\\project\\java\\execrise\\project 01\\project0.1\\receive.jpg");
    InputStream is = new FileInputStream(file);
    int len ;
    while((len =is.read())!=-1){//当到达-1时候就会停止
        System.out.println((char)len);
    }
    is.close();
}
```

字节读入优化（每次读入一个字节效率太低，通过字符数组缓冲）：

```java
public static void main(String[] args) throws IOException {
    FileInputStream fis = new FileInputStream("D:\\project\\java\\execrise\\project 01\\project0.1\\src\\test.txt");//直接构建文件
    byte[] bytes = new byte[1024];//新建一个存储数组
    int len = fis.read(bytes);//记录长度
    System.out.println(new String(bytes,0,len));
}
```

```java
//可以通过while循环来构建，循环去读入
while ((len = fis.read(bytes)) != -1) {
    System.out.println(new String(bytes, 0, len));
}
```

## 字节输出流（常用）

`Ouputstream`是输入流的抽象父类，类里面主要就是`write`方法与`close`方法，需要去找子类的实例，实现其方法；

```java
public static void main(String[] args) throws IOException {
    FileOutputStream fos = new FileOutputStream("D:\\project\\java\\execrise\\project 01\\project0.1\\src\\text02.txt");//输出路径
    fos.write(97);//写入字符
    fos.close();//关闭流
}
```

```java
public static void main(String[] args) throws IOException {
    FileOutputStream fos = new FileOutputStream("D:\\project\\java\\execrise\\project 01\\project0.1\\src\\text02.txt");
    byte[] bytes = "你好".getBytes();//通过getBytes()方法获取字符串数组
    fos.write(bytes);//按数组的形式写入
    fos.close();
}
//会默认覆盖原来内容，如果想要是追加在字节输出流的参数中传入true，声明追加
//new FileOutputStream("",true);
```

## 文件拷贝（常用）

```java
public static void main(String[] args) throws IOException {
    FileInputStream fis = new FileInputStream("receive.jpg");
    FileOutputStream fos = new FileOutputStream("D:\\project\\java\\execrise\\project 01\\project0.1\\receive2.jpg");
    int len;
    byte[] bytes = new byte[1024];
    while((len =fis.read(bytes))!=-1){
        fos.write(bytes,0,len);
    }

    fos.close();
    fis.close();
}
```

## 字符流

- `Reader`和`Writer`是字符输入输出的抽象父类，还是两个主要方法`read`,`write`,`close`;
- `FileReader`,`FileWriter`
- 注：字符流一般就是对纯文本的处理拷贝

```java
public static void main(String[] args) throws IOException {
    FileReader fr = new FileReader("D:\\project\\java\\execrise\\project 01\\project0.1\\src\\test.txt");
    FileWriter wr = new FileWriter("src\\IO_Demo\\text01.txt");
    char[] chars= new char[1024];//这里变成了char数组
    int len ;
    while ((len = fr.read(chars))!=-1){
        wr.write(chars,0,len);
    }
    wr.close();
    fr.close();
}
```

## 功能流

- 缓冲流是功能流中的一种，包裹节点流使用
- 增强节点流的读写效率，提高性能

> `InputStream`--->`BufferedInputstream`字节输入流缓冲流
> `OutputStream` --->`BufferedOutputstream`字节输出流缓冲流
> `Reader`--->`BufferedReader`字符输入缓冲流
> `Writer`--->`BufferedWriter`字符输出流的缓冲流

- 只有字符缓冲流有新增功能，`readline`()->一行一行的读；`newline`()->换行
- 因为`readline`返回值是`String`类型，所以改成用不等于`null`判断

```java
public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new FileReader("src\\test.txt"));//包裹节点流
    BufferedWriter bw = new BufferedWriter(new FileWriter("src\\test02.txt"));//包裹节点流
    String msg =null;
    while((msg=br.readLine())!=null){
        bw.write(msg);
        bw.newLine();//换行
    }
    bw.close();
    br.close();
}
```

## 转换流

- 转换流–>功能流

`InputStreamReader`:是从字节流到字符流的桥接器：只能从字节到字符，不能从字符到字节

作用：
1. 乱码问题。设置编码格式
2. 流的转换

构造器：
- `InputStreamReader`(`Inputstream` in)创建一个使用默认字符集的`InputStreamReader`,
- `InputStreamReader`(`InputStream` in,String `charsetName`)创建一个使用指定`charset`,解决乱码

```java
public static void main(String[] args) throws IOException {
    BufferedReader br = new BufferedReader(new InputStreamReader(new BufferedInputStream(new FileInputStream("src\\test.txt")), "gbk"));
    //先读入文件，buffer流优化，通过转换流将字节流转换成字符流，然后再buffer流优化
    //同时设置了读入的字符编码gbk
    BufferedWriter wr = new BufferedWriter(new OutputStreamWriter(new BufferedOutputStream(new FileOutputStream("src\\test02.txt")), "gbk"));
    String msg =null;
    while((msg=br.readLine())!=null){
        wr.write(msg);
    }
    wr.flush();
    wr.close();
    br.close();
}
```

## 基本数据类型流

基本数据类型流|`Data`流（节点流）：基本数据类型+String

- 是字节流功能流的一种
- 功能：能够是节点流具有传输基本数据类型+数据的能力
- `DataInputstream` 基本数据类型输入流
- `DataOputputstream` 基本数据类型输出流

```java
//输出
public static void WriteDate(String desc) throws IOException {
    DataOutputStream dos = new DataOutputStream(new FileOutputStream("src\\text02.txt"));
    int a =1;
    boolean flag =false;
    char ch ='a';
    String str ="你好";
    dos.writeInt(a);//写入int类型
    dos.writeBoolean(flag);//写入bool类型
    dos.writeChar(ch);//写入字符类型
    dos.writeUTF(str);//写入字符串类型
    dos.close();
}
```

```java
//输出
public static void ReadDate(String src) throws IOException {
    DataInputStream dis = new DataInputStream(new FileInputStream("src\\text.txt"));
    //要与上面的写入对应，先写入先读，否则会识别不出
    int a = dis.readInt();
    boolean flag = dis.readBoolean();
    char ch  = dis.readChar();
    String str = dis.readUTF();

    dis.close();
}
```

## 对象流

- 对象流|Object流：所有类型+对象类型
  > `ObjectInputstream`对象字节输入流|反序列化输入流
  > `OjbectOutputstream`对象字节输出流|序列化输出流

- 序列化：`java`对象类型的信息状态转换成为一个可存储，可传输的信息状态的过程
  反序列化：将已经储存的那个信息状态还原

```java
//序列化一个int数组
public static void Obj_Output(String desc) throws IOException {
    ObjectOutputStream oos = new ObjectOutputStream(new BufferedOutputStream(new FileOutputStream(desc)));
    int []arr = {1,2,3,4};
    oos.writeObject(arr);
    oos.flush();
    oos.close();
}
//反序列化这个int数组
public static void  Obj_Input(String src) throws IOException, ClassNotFoundException {
    ObjectInputStream ois = new ObjectInputStream(new BufferedInputStream(new FileInputStream(src)));
    int []a = (int[]) ois.readObject();
    System.out.println(Arrays.toString(a));
    ois.close();
}
```

如果想要序列化自己定义的类，需要`implement` `Serializable`接口，没有什么实质性的用处，就是标志可序列化

```java
{
    private String name;
    private int id;
}
public static void Obj_Output(String desc) throws IOException {
    ObjectOutputStream oos = new ObjectOutputStream(new BufferedOutputStream(new FileOutputStream(desc)));
    Stu xixi = new Stu("xixi", 10);
    oos.writeObject(xixi);
    oos.flush();
    oos.close();
}
public static void Obj_Output(String desc) throws IOException {
        ObjectOutputStream oos = new ObjectOutputStream(new BufferedOutputStream(new FileOutputStream(desc)));
        Stu xixi = new Stu("xixi", 10);
        oos.writeObject(xixi);
        oos.flush();
        oos.close();
}
```

注：
- 如果想要一个属性不需要被序列化，那么要在这个属性前面添加`transient`关键字
- static修饰的成员不会被序列化
- 父类实现了序列化接口，子类所有的内容都能序列化
- 子类实现了序列化接口，子类只能序列化自己的内容，不能序列化父类中继承的内容