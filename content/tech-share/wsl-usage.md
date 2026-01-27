---
title: WSL 使用
createdAt: 2026-01-25T03:35:38.000Z
readingTime: 1
updatedAt: 2026-01-25T04:40:20.000Z
---

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

卸载 wsl

```bash
wsl --unregister Debian
```

## 使用系统代理

在 wsl 设置中将网络模式设置为镜像（Mirrored）即可使用宿主机的网络。

更改网络设置后需要重启 wsl。
