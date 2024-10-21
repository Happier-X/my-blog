---
title: Node 版本管理工具 FNM
cover: https://t.alcy.cc/fj?t=1728871200000
date: 2024-10-14 10:00
category: 软件工具
tag: 
    - Node
    - FNM
    - Husky
excerpt: false
---

## 简介

FNM 是一个用于 Node 版本管理和切换的工具，它使用 Rust 编写，速度非常快，并且支持 Windows、macOS 和 Linux 系统。

## 下载安装

这里以 Windows 系统为例，其它系统请参考[官方文档](https://github.com/Schniz/fnm)。

打开命令行工具，输入以下命令：

```sh
winget install Schniz.fnm --location D:\Software\FNM
```

> 这里的 `D:\Software\FNM` 是你希望安装的路径，可以根据自己的需求进行修改，也可以不添加 `--location 路径` 来使用默认路径。

## Shell 配置

打开 PowerShell (其它 Shell 参考[官方文档](https://github.com/Schniz/fnm)) 输入以下命令：

```sh
notepad $PROFILE
```

在打开的文件中添加以下内容：

```sh
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

## 使用

切换 Node 版本

```sh
fnm use <version>
```

查看已安装的 Node 版本

```sh
fnm list
```

安装 Node 版本

```sh
fnm install <version>
```

卸载 Node 版本

```sh
fnm uninstall <version>
```

设置默认 Node 版本

```sh
fnm default <version>
```

打印当前 Node 版本

```sh
fnm current
```

## 与 Husky 配合使用时的注意事项

因为我们使用了 `fnm` 来管理 Node 版本，所以由于 PATH 环境变量问题，你可能会遇到 `command not found` 报错。

我们可以在系统 `C:/Users/用户名/.config/husky/init.sh` 文件中添加以下内容：

```sh
eval "$(fnm env --use-on-cd)"
```