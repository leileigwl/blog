---
title: Docker配置
published: 2023-05-08
description: 'Docker开机自启动和镜像源配置'
tags: [配置, docker]
category: '技术'
draft: false
---

## docker

### docker设置开机自动重启并重新运行容器

- 设置docker服务自动重启：

    ```shell
    systemctl enable docker.service
    ```

- docker容器时可以加如下参数来保证每次docker服务重启后容器也自动重启

    ```shell
    docker run --restart=always
    ```

- 如果已经启动了

    ```shell
    docker update --restart=always
    ```

- 重要的restart参数
    - no - 容器退出时，不重启容器；
    - on-failure - 只有在非0状态退出时才从新启动容器；如果容器由于错误而退出，则将其重新启动，非零退出代码表示错误
    - unless-stopped - 重新启动容器，除非明确停止容器或者 Docker 被停止或重新启动
    - always -只要容器停止了，就重新启动

### docker-compose 启动

#### 启动命令

```shell
sudo docker-compose up -d #前提需要有docker-compose.yml 文件
```

### docker镜像源设置

#### 1.修改配置文件

- 创建或修改 /etc/docker/daemon.json 文件，修改为如下形式

```bash
{
    "registry-mirrors": [
        "https://docker.mirrors.ustc.edu.cn",
        "http://hub-mirror.c.163.com",
        "https://registry.docker-cn.com"
    ]
}
```

#### 2.加载重启docker

```bash
service docker restart
```