# 使用mihomo实现代理

type: Post
status: Published
date: 2025/04/18
tags: Docker, DockerCompose, NAS, fnOS, 代理
category: 玩转NAS

## 安装 mihomo

这里以 fnOS 为例，使用 Docker Compose 来安装 mihomo。

在`dockerComposeCong`文件夹下创建一个 `mihomo` 文件夹，然后在 `mihomo` 文件夹下创建一个 `docker-compose.yml` 文件，内容如下。

```yaml
services:
  zashboard:
    image: ghcr.io/zephyruso/zashboard:latest
    container_name: zashboard
    restart: always
    ports:
      - "9097:80"
    

  mihomo:
    container_name: mihomo
    image: metacubex/mihomo
    restart: always
    pid: host
    ipc: host
    network_mode: host
    cap_add:
      - ALL
    volumes:
      - ./config:/root/.config/mihomo
      - /dev/net/tun:/dev/net/tun
```

其中，`./config` 要替换成我们本地的路径，它代表 mihomo 的配置路径。

我的配置如下。

```yaml
services:
  zashboard:
    image: ghcr.io/zephyruso/zashboard:latest
    container_name: zashboard
    restart: always
    ports:
      - "9097:80"
    

  mihomo:
    container_name: mihomo
    image: metacubex/mihomo
    restart: always
    pid: host
    ipc: host
    network_mode: host
    cap_add:
      - ALL
    volumes:
      - ./config:/root/.config/mihomo
      - /dev/net/tun:/dev/net/tun
```

## 添加配置文件

在配置目录下添加 `config.yaml` 文件，配置格式参考 [官方文档](https://wiki.metacubex.one/example/conf/)。

## 访问 web 界面

在浏览器中访问 `9097` 端口，就可以看到 web 界面了，后端地址为 `http://127.0.0.1:9090`，密钥留空即可。

## 使用

在需要使用代理的设备上，设置代理地址为 `http://<fnOS_IP>:7890`。