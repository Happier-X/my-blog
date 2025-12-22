# 下载工具qBittorrent搭建

type: Post
status: Published
date: 2025/01/27
tags: Docker, DockerCompose, NAS, fnOS
category: 玩转NAS

qBittorrent 是一个开源的下载工具，支持多种下载协议，包括 HTTP、FTP、SFTP 等。它允许你下载文件，并支持多线程下载、断点续传、下载队列等功能。qBittorrent 还支持 RSS 订阅、种子文件下载、磁力链接下载等功能。

## 安装 qBittorrent

这里以 fnOS 为例，使用 Docker Compose 来安装 qBittorrent。

在 `dockerComposeConfig` 文件夹下创建一个 `qBittorrent` 文件夹，然后在 `qBittorrent` 文件夹下创建一个 `docker-compose.yml` 文件，内容如下。

```yaml
services:
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - WEBUI_PORT=8080
      - TORRENTING_PORT=6881
    volumes:
      - /path/to/qbittorrent/appdata:/config
      - /path/to/downloads:/downloads #optional
    ports:
      - 8080:8080
      - 6881:6881
      - 6881:6881/udp
    restart: unless-stopped
```

其中，`/path/to/qbittorrent/appdata` 要替换成我们本地的路径，它代表 qBittorrent 的数据存储目录，`/path/to/downloads` 也要替换成我们本地的路径，它代表我们存储下载文件的目录。

我的配置如下。

```yaml
services:
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Asia/shanghai
      - WEBUI_PORT=8080
      - TORRENTING_PORT=50000
    volumes:
      - ./config:/config
      - /vol3/1000/media:/media
    ports:
      - 8080:8080
      - 50000:50000
      - 50000:50000/udp
    restart: always
```

## 访问 qBittorrent

在浏览器中访问 `8080` 端口，就可以看到 qBittorrent 的界面了，用户名为 `admin`，密码需要在日志文件中查看。