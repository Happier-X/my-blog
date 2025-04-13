---
cover: https://t.alcy.cc/fj?t=20250413163000
date: 2025-04-13 16:30:00
order: -20250413163000
category: 工具使用
tag:
  - NAS
  - fnOS
  - Docker
  - FRP
excerpt: false
---

# 使用 PassNAT 实现内网穿透

从 PassNAT 的[官网](https://www.passnat.com)可以获取配置文件。

## 安装 FRPC

这里以 fnOS 为例，使用 Docker Compose 来安装 FRPC

在 `dockerComposeConfig` 文件夹下创建一个 `frpc` 文件夹，然后在 `frpc` 文件夹下创建一个 `docker-compose.yml` 文件，内容如下。

```yaml
services:
  frpc:
    image: snowdreamtech/frpc
    container_name: frpc
    restart: always
    network_mode: host
    volumes:
      - /root/frpc/config.toml:/etc/frp/frpc.toml
```

其中，`/root/frpc/config.toml` 要替换成我们本地的路径，它代表配置文件的路径，这里就是我们在 PassNAT 上生成的配置文件。

我的配置如下。

```yaml
services:
  frpc:
    image: snowdreamtech/frpc
    container_name: frpc
    restart: always
    network_mode: host
    volumes:
      - /vol2/1000/dockerComposeConfig/frpc/frpc.toml:/etc/frp/frpc.toml
```