# WSL使用

type: Post
status: Published
date: 2025/08/05
tags: WSL
category: 技术分享

## 安装部署常用命令

安装 wsl，但不指定 Linux 发行版

```bash
wsl --install --no-distribution
```

查看 wsl 的版本信息

```bash
wsl -v
```

设置 wsl 版本

```bash
wsl --set-version 2
```

查看所有可安装的 Linux 发行版

```bash
wsl --list --online
```

关闭 wsl

```bash
wsl --shutdown
```

## 使用系统代理

在 wsl 设置中将网络模式设置为镜像（Mirrored）即可使用宿主机的网络。

更改网络设置后需要重启 wsl。