---
cover: https://t.alcy.cc/fj?t=20250126200000
date: 2025-01-26 20:00:00
order: -20250126200000
category: 工具使用
tag:
  - NAS
  - fnOS
  - Docker
  - Navidrome
excerpt: false
---

# 个人流媒体服务 Navidrome 搭建

Navidrome 是一个开源的流媒体服务器，支持多种音频格式，包括 MP3、FLAC、AAC 等。它允许你上传和管理你的音乐库，并通过 Web 界面或 API 访问你的音乐。Navidrome 还支持播放列表、音乐推荐、音乐分类等功能。

## 安装 Navidrome

这里以 fnOS 为例，使用 Docker Compose 来安装 Navidrome。

在 `dockerComposeConfig` 文件夹下创建一个 `navidrome` 文件夹，然后在 `navidrome` 文件夹下创建一个 `docker-compose.yml` 文件，内容如下。

```yaml
services:
  navidrome:
    image: deluan/navidrome:latest
    user: 1000:1000 
    ports:
      - "4533:4533"
    restart: unless-stopped
    environment:
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info  
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ""
    volumes:
      - "/path/to/data:/data"
      - "/path/to/your/music/folder:/music:ro"
```

其中，`/path/to/data` 要替换成我们本地的路径，它代表 Navidrome 的数据存储目录，`/path/to/your/music/folder` 也要替换成我们本地的路径，它代表我们存储音乐的目录。

我的配置如下。

```yaml
services:
  navidrome:
    image: deluan/navidrome:latest
    user: 1000:1000 
    ports:
      - "4533:4533"
    restart: unless-stopped
    environment:
      ND_SCANSCHEDULE: 1h
      ND_LOGLEVEL: info  
      ND_SESSIONTIMEOUT: 24h
      ND_BASEURL: ""
    volumes:
      - "./data:/data"
      - "/vol1/1000/music:/music:ro"
```

这里要注意的是，`./data` 是我在 fnOS 中挂载的目录，代表 Navidrome 的数据存储目录，`/vol1/1000/music` 是我在 fnOS 中创建的目录，它代表我存储音乐的目录。

## 访问 Navidrome

在浏览器中访问 `4533` 端口，就可以看到 Navidrome 的界面了。