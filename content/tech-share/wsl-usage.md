---
title: WSL 使用
createAt: 2025-07-12
description: 本文介绍了WSL（Windows子系统Linux）的安装、版本设置、可用发行版查看及关闭命令，并说明如何通过设置网络模式使用系统代理。
readingTime: 1
seo:
  description: 本文介绍了WSL（Windows子系统Linux）的安装、版本设置、可用发行版查看及关闭命令，并说明如何通过设置网络模式使用系统代理。
  title: Wsl Usag
updateAt: 2025-07-12
wordCount: 91
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

## 使用系统代理

在 wsl 设置中将网络模式设置为镜像（Mirrored）即可使用宿主机的网络。

更改网络设置后需要重启 wsl。
