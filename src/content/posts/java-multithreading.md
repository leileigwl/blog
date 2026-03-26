---
title: java 多线程
published: 2022-06-23
description: 'Java多线程编程学习笔记'
tags: [java, 多线程]
category: '技术'
draft: false
---

## 多线程

### 进程

- 在计算机中，我们把一个任务称为一个进程，浏览器就是一个进程，视频播放器是另一个进程，类似的，音乐播放器和Word都是进程。

- 进程和线程的关系：一个进程可以包含一个或多个线程，但至少会有一个线程。

### 创建一个线程

**方法一：** 继承Thread类，重写run()方法，调用start开启线程

```java
public class Demo04 extends Thread { // 继承Thread类
    @Override
    public void run() { // 重写run方法
        for (int i = 0; i < 5; i++) {
            System.out.println("线程里的方法：" + i);
        }
    }

    public static void main(String[] args) {
        Demo04 demo04 = new Demo04();
        demo04.start(); // 用start方法开启线程
        // demo04.run(); // 这个就不会另外起一个线程
        System.out.println("主线程中的方法");
    }
    // start方法会产生主方法和另一个线程的方法同时执行，而直接调用run方法就会按原来顺序从上往下执行
}
```

**方法二(推荐)：** 实现Runnable接口，创建线程对象，通过线程对象来开启我们的线程，代理

```java
public class Demo05 implements Runnable { // 实现Runnable接口
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("线程里的方法" + i);
        }
    }

    public static void main(String[] args) {
        Demo05 demo05 = new Demo05(); // 创建线程对象
        new Thread(demo05).start(); // 通过线程对象来开启我们的线程
        // 重载方法：new Thread(实现Runnable接口的对象，线程的命名);
        System.out.println("主线程中的方法");
    }
}
```

### 线程并发

- **并发**：是指同一个时间段内多个任务同时都在执行，并且都没有执行结束。强调通过很小的时间片的切换对将程序交替执行，假象的并行效果。

- **并行**：两个以上事件（或线程）在同一时刻发生，没有时间片的交换，跑在不同的CPU资源上，一般是多核

抢票实例：

```java
public class Demo06 implements Runnable {
    private int TicketNum = 10; // 共同的抢票
    @Override
    public void run() {
        while (TicketNum > 0) {
            System.out.println(Thread.currentThread().getName() + "抢到了第" + (TicketNum--) + "张票");
            // Thread.currentThread().getName()可以获取线程的名称;
        }
    }

    public static void main(String[] args) {
        Demo06 Ticket = new Demo06();
        new Thread(Ticket, "1号线程").start();
        new Thread(Ticket, "2号线程").start();
        new Thread(Ticket, "3号线程").start();
    }
}
// 有可能会出现抢同一张票的情况
// 发现问题：多个线程操作同一个资源的情况下，线程不安全，数据紊乱
```

### 静态代理

- 优点：可以在不修改目标对象的前提下**扩展**目标对象的**功能**。

- 操作步骤：
    1. 先定义一个接口(有相应的方法)
    2. 定义真实类和代理类，都要实现这个接口
    3. 代理类中创建一个接口的属性，创建这个属性的构造函数
    4. 主函数中代理类的构造函数传入一个实现接口的类/实例就可以实现代理的拓展功能

```java
public interface Marry { // 定义接口
    void HappyMarry(); // 接口中的方法
}

class You implements Marry { // 真实的类实现接口
    @Override
    public void HappyMarry() {
        System.out.println("终于结婚了");
    }
}

class WeddingHouse implements Marry { // 代理类，实现接口
    private Marry target; // 定义一个接口的属性
    public WeddingHouse(Marry target) {
        this.target = target;
    }
    @Override
    public void HappyMarry() {
        before(); // 对原来接口的扩充
        target.HappyMarry(); // 原来接口的方法
        after(); // 对原来接口的扩充
    }
    private void after() {
        System.out.println("处理后事");
    }
    private void before() {
        System.out.println("邀请嘉宾");
    }
}

// 主函数中实现
public static void main(String[] args) {
    // 第一种，直接创建一个代理类的对象，并且在构造函数中传入实现接口的真实对象
    WeddingHouse weddingHouse = new WeddingHouse(new You());
    weddingHouse.HappyMarry();

    // 第二种，直接调用隐士对象，就相当是new Thread(实现Runnable接口的对象).start();
    new WeddingHouse(new You()).HappyMarry();

    // 第三种，直接采用匿名内部类，直接进行输出代理拓展的内容
    new WeddingHouse(new Marry() {
        @Override
        public void HappyMarry() {
            System.out.println("我也要结婚啦"); // 这里没有用真实的类，根据自己需求实现想要的功能
        }
    }).HappyMarry();
}
```

### lambda表达式

函数式接口的定义：

任何接口，如果只包含唯一一个抽象方法，那么它就是一个函数式接口。

```java
public interface Runnable {
    public abstract void run();
}
```

对于函数式接口，我们可以通过lambda表达式来创建该接口的对象。

实现：创建一个类，实现接口，通过接口创建属性就可以新建一个实现接口类的对象，调用实现的方法，或者式lambda表达式

```java
interface Love {
    void iLove();
}

class You implements Love { // 实现了接口
    @Override
    public void iLove() {
        System.out.println("i love you "); // 重写方法
    }
}

public static void main(String[] args) {
    Love love = new You(); // 新建一个接口的属性，创建一个实现类的对象
    love.iLove(); // 通过实例来调用方法

    Love love1 = new Love() {
        @Override
        public void iLove() {
            System.out.println("i love you 1");
        }
    }; // 匿名内部类，不用实现类就可以直接通过接口进行方法的内部实现
    love1.iLove();

    Love love2 = () -> System.out.println("i love you 2");
    // lambda表达式对上面的简化，实质是一样的。不需要写new，也不需要写方法名（因为只有一个）;只有实现方法体
    love2.iLove();
}
// 如果有参数：Love love2 = (参数) -> System.out.println("i love you 2");
```

### 线程的五大状态

含义：在Java程序中，一个线程对象只能调用一次`start()`方法启动新线程，并在新线程中执行`run()`方法。一旦`run()`方法执行完毕，线程就结束了（死亡的线程无法再次`start`）。因此，Java线程的状态有以下几种：

- New：新创建的线程，尚未执行；
- Runnable：运行中的线程，正在执行`run()`方法的Java代码；
- Blocked：运行中的线程，因为某些操作被阻塞而挂起；
- Waiting：运行中的线程，因为某些操作在等待中；
- Timed Waiting：运行中的线程，因为执行`sleep()`方法正在计时等待；
- Terminated：线程已终止，因为`run()`方法执行完毕。

线程终止的原因有：
- 线程正常终止：`run()`方法执行到`return`语句返回；
- 线程意外终止：`run()`方法因为未捕获的异常导致线程终止；
- 对某个线程的`Thread`实例调用`stop()`方法强制终止（强烈不推荐使用）。

一个线程还可以等待另一个线程直到其运行结束。例如，`main`线程在启动`t`线程后，可以通过`t.join()`等待`t`线程结束后再继续运行。

### 线程方法

| 方法 | 说明 |
| --- | --- |
| `setPriority(int newPriority)` | 更改线程的优先级 |
| `static void sleep(long millis)` | 在指定的毫秒数内让当前正在执行的线程休眠 |
| `void join()` | 等待该线程终止 |
| `static void yield()` | 暂停当前正在执行的线程对象，并执行其他线程 |
| `void interrupt()` | 中断线程，**别用这个方式** |
| `boolean isAlive` | 测试线程是否处于活动状态 |

### 线程停止的方法

- 建议线程正常停止—>利用次数，不建议死循环。
- 建议使用标志位—>设置一个标志位
- 不要使用stop或者destroy等过时的方法

```java
class ThreadStop implements Runnable { // 线程类
    private boolean flag = true; // 提供线程体中的标识
    public void run() {
        while (flag) { // 线程使用标识
            System.out.println("Thread is running");
        }
    }
    public void stop() { // 提供外部方法停止
        flag = false;
    }
    public static void main(String[] args) {
        ThreadStop threadStop = new ThreadStop();
        new Thread(threadStop).start();
        for (int i = 0; i < 999; i++) {
            if (i == 900)
                threadStop.stop(); // 调用线程类提供的公有方法
            System.out.println("main is running");
        }
    }
}
```

### 线程休眠

- 作用：
    - 模拟网络延时，放大问题的发生性->（排查线程不安全）
- 每个对象都有一个锁，`sleep`不会释放锁

### 线程礼让

- 作用：
    - 礼让线程，让当前正在执行的线程暂停，但不阻塞->(礼让一下，再竞争一次)
    - 将线程从运行状态转为就绪状态
    - 让CPU重新调度，**礼让不一定成功**！看CPU心情
- `yield`也不会释放锁

### 线程强制执行 join

- 可以将`join`想象成插队，插主线程，很霸道，但是对于两个并行的线程无法直接插队

### 线程的优先级

- 如果有些比较重要的代码，需要先跑，可以设置优先级，虽然设置优先级并不一定会一定在前面先执行，但是至少他所占有的机会会变大一点
- 默认为5,最高的优先级为10，最低为1，超范围报错
- 线程优先级的两个方法

```java
setPriority(级别); // 设置线程优先级
getPriority();     // 获取线程的优先级
```

### 守护线程

- 守护线程就像餐厅的服务员，而普通的用户线程就像是顾客，如果顾客都走光了，那么守护线程存在的意义也没有了，自然也会结束

- 作用：
    - 常见的做法，就是将守护线程用于后台支持任务，比如垃圾回收、释放未使用对象的内存、从缓存中删除不需要的条目。
    - 咦，按照这个解释，那么大多数 `JVM` 线程都是守护线程。

- 守护线程的方法：

```java
setDaemon(true)  // 设置守护线程，注意，一定要在start方法之前设置守护线程；
isDaemon()       // 判断是否是守护线程
```

### 线程同步

形成条件：队列+锁

#### 重点：synchronized到底锁的是谁

下面用一个实例来证明：

```java
class Date {
    public void func1() { // 普通方法
        try {
            Thread.sleep(3000); // 休眠3秒
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("1...");
    }

    public void func2() { // 普通方法
        System.out.println("2...");
    }
}

public static void main(String[] args) {
    Date date = new Date();
    new Thread(date::func1, "A").start(); // lambda表达式启动线程
    try {
        Thread.sleep(1000); // 休眠1秒
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    }
    new Thread(date::func2, "B").start(); // lambda表达式启动线程
}
// 结果：1s后输出2...再过2秒后输出1...
// 原因：两个都是新起的线程，没有相关的同步性，按程序顺序执行
// 2...
// 1...
```

##### 锁方法

**普通方法：谁调用就锁谁**

```java
public synchronized void func1() { // 把上面的修改为同步方法
public synchronized void func2() { // 把上面的修改为同步方法
// 结果：过了三秒同时输出,结果是先1...后2...
// 原因，锁了这个方法，谁来调用就锁哪个对象，这里只有一个对象date,所以先启动A线程，然后过了sleep3秒(不放锁)，主程序的sleep1秒对这里没有影响，直接就已经包含在sleep的3秒内了，因线程同步，三秒钟后，等A的锁释放，B立刻拿锁，输出
// 1...
// 2...
```

```java
public synchronized void func1() { // 把上面的修改为同步方法
public void func2() { // 普通方法
// 结果：1秒后输出2...再过2秒输出1...
// 原因：B线程不是同步的方法，直接就是两个线程在跑
```

```java
public static void main(String[] args) { // 新建两个Date()对象
    Date date1 = new Date();
    Date date2 = new Date();
    new Thread(date1::func1, "A").start();
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    }
    new Thread(date2::func2, "B").start();
}

public synchronized void func1() { // 把上面的修改为同步方法
public synchronized void func2() { // 把上面的修改为同步方法
// 结果：1秒后输出2...再过2秒输出1...
// 原因：直接就是两个线程在跑，没有同步争夺资源
```

**静态方法：锁定的是类**

```java
public static void main(String[] args) {
    Date date1 = new Date();
    Date date2 = new Date();
    new Thread(() -> {
        date1.func1();
    }, "A").start();
    try {
        Thread.sleep(1000);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    }
    new Thread(() -> {
        date2.func2();
    }, "B").start();
}

public static synchronized void func1() { // 变成了静态方法
public static synchronized void func2() { // 变成了静态方法
// 结果：过了三秒同时输出,结果是先1...后2...
// 原因：虽然date1与date2是两个不同的对象，但是因为静态同步方法锁的是这个类，两个对象都是来自同一个类，所以存在线程同步的关系。
```

##### 修饰代码块

可以锁各种东西，放什么锁什么

```java
class Date2 {
    public void func() {
        System.out.println("start...");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("end...");
    }
}

public static void main(String[] args) {
    Date2 date2 = new Date2();
    for (int i = 0; i < 5; i++) {
        new Thread(() -> {
            date2.func();
        }).start(); // 创建5个线程
    }
}
// 结果：直接是5个start，1秒后输出5end
// 原因：没有任何锁，直接是5个线程
```

```java
// 只改变成同步代码块
public void func() {
    synchronized (this) { // 改成代码同步
        System.out.println("start...");
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        System.out.println("end...");
    }
}
// 结果：在排队，交替输出start和end
// 原因：这里this是这个Date2的对象，只有一个date2对象，变成了线程同步
```

```java
public static void main(String[] args) {
    for (int i = 0; i < 5; i++) {
        new Thread(() -> {
            Date2 date2 = new Date2(); // 只改变每次创建的对象
            date2.func();
        }).start();
    }
}
// 结果：在排队，交替输出start和end
// 原因：虽然同步代码块修饰了这个类创建的对象，但这时候对象创建放在了循环里，相当每次创建不同的对象，那么每次调用func方法就是直接开启新线程，没有线程同步
```

```java
synchronized (Date2.class) { // 改成代码同步锁这个类
// 结果：在排队，交替输出start和end
// 原因：锁的是这个类，虽然创建的是5个不同的对象，但是都是同一个类，产生了线程同步
```

#### 死锁

多个线程互相抱着对方需要的资源，然后形成僵持即一个线程可以获取一个锁后，再继续获取另一个锁。

```java
public void add(int m) {
    synchronized(lockA) { // 获得lockA的锁
        this.value += m;
        synchronized(lockB) { // 获得lockB的锁
            this.another += m;
        } // 释放lockB的锁
    } // 释放lockA的锁
}

public void dec(int m) {
    synchronized(lockB) { // 获得lockB的锁
        this.another -= m;
        synchronized(lockA) { // 获得lockA的锁
            this.value -= m;
        } // 释放lockA的锁
    } // 释放lockB的锁
}
```

解决方案：一个线程可以获取一个锁后，再继续获取另一个锁。

那么我们应该如何避免死锁呢？答案是：线程获取锁的顺序要一致，一次只获得一把锁，避免一个线程同时获得两把锁

#### lock锁

`lock`是显示锁，只能锁代码块

好处：用`lock`，`jvm`将花费较少的时间调度线程，性能更好，可拓展性高

```java
class TestLock implements Runnable {
    private int ticket = 100;
    private final ReentrantLock lock = new ReentrantLock(); // 可重入的锁，一定要记住这个方法，通过他的lock和unlock方法实现同步
    @Override
    public void run() {
        while (true) {
            try {
                lock.lock(); // 在需要变化的地方设置锁
                if (ticket <= 0) {
                    return;
                } else {
                    System.out.println(ticket--);
                }
            } catch (RuntimeException e) {
                throw new RuntimeException(e);
            } finally {
                lock.unlock(); // 一般放在finally块里释放锁
            }
        }
    }
}
```

### 线程协作

生产者消费者模型具体来讲，就是在一个系统中，存在生产者和消费者两种角色，他们通过内存缓冲区进行通信，生产者生产消费者需要的资料，消费者把资料做成产品。（是一种问题，不是设计模式）

再具体一点：
- 生产者生产数据到缓冲区中，消费者从缓冲区中取数据。
- 如果缓冲区已经满了，则生产者线程阻塞。
- 如果缓冲区为空，那么消费者线程阻塞。

通过wait()和notify()方法，采用 **阻塞队列** 方式实现生产者消费者模式

#### 管程法

```java
class Producer extends Thread {
    // 生产者
    SynContainer Container;
    public Producer(SynContainer Container) {
        // 通过与消费者相同构造函数实现同一个线程
        this.Container = Container;
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            Container.push(new Chicken(i));
            System.out.println("生产力" + i + "鸡");
        }
    }
}

class Consumer extends Thread {
    // 消费者
    SynContainer Container;
    public Consumer(SynContainer Container) {
        // 通过与生产者相同构造函数实现同一个线程
        this.Container = Container;
    }

    @Override
    public void run() {
        for (int i = 0; i < 100; i++) {
            Chicken pop = Container.pop();
            System.out.println("消费类" + pop.id + "只鸡");
        }
    }
}

class Chicken { // 生产的对象
    int id; // 对象id
    public Chicken(int id) {
        this.id = id;
    }
}

class SynContainer {
    // 同步容器，锁就是锁他，通过他来实现中间的桥梁，使两个线程跑在这个上，变成并发
    Chicken[] chickens = new Chicken[10]; // 定义容器大小
    int count = 0; // 记录生成的数

    public synchronized void push(Chicken chicken) {
        if (count == chickens.length) {
            try {
                wait(); // 容器满了就会调用wait方法释放锁，让消费者先行
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        chickens[count++] = chicken;
        this.notifyAll(); // 释放锁
    }

    public synchronized Chicken pop() {
        if (count == 0) {
            try {
                wait(); // 没有消费对象的时候，就会wait释放锁，让生产者先行
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        count--;
        Chicken chicken = chickens[count];
        this.notifyAll(); // 释放锁
        return chicken;
    }
}

public static void main(String[] args) {
    SynContainer synContainer = new SynContainer();
    Producer producer = new Producer(synContainer);
    Consumer consumer = new Consumer(synContainer);
    producer.start();
    consumer.start();
}
// 结果：一个线程里，生产者与消费者正常是交错执行，如果满足了wait的条件，就释放了锁，给另外一方执行
```

### 线程池

思路：提前创建好多个线程，放入线程池中，使用时直接获取，使用完放回池中。可以避免频繁创建销毁、实现重复利用。类似生活中的公共交通工具。

好处：
- 提高响应速度（减少了创建新线程的时间）
- 降低资源消耗（重复利用线程池中线程，不需要每次都创建）
- 便于线程管理

用法：

```java
public static void main(String[] args) {
    // 1.创建服务，创建线程池
    // newFixedThreadPool参数为：线程池大小
    ExecutorService service = Executors.newFixedThreadPool(10);
    // 执行
    service.execute(new 实现了Runnable接口的类);
    service.shutdown();
}
```