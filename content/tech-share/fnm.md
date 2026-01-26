---
title: FNM
readingTime: 1
---

## 简介

FNM 是一个用于 Node 版本管理和切换的工具,它使用 Rust 编写,速度非常快,并且支持 Windows、macOS 和 Linux 系统。

## 下载安装

这里以 Windows 系统为例,其它系统请参考[官方文档](https://github.com/Schniz/fnm)。

打开命令行工具,输入以下命令。

```bash
winget install Schniz.fnm --location D:\Software\FNM
```

> 这里的 `D:\Software\FNM` 是你希望安装的路径,可以根据自己的需求进行修改,也可以不添加 `--location 路径` 来使用默认路径。

## Shell 配置

这里以 Windows PowerShell 为例,其它 Shell 参考[官方文档](https://github.com/Schniz/fnm)。

配置文件位置在 `%userprofile%\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` 或 `%userprofile%\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`,如果没有则使用如下命令创建一个。

```bash
if (-not (Test-Path $profile)) { New-Item $profile -Force }
```

然后运行以下命令来编辑文件。

```bash
Invoke-Item $profile
```

在打开的文件中添加以下内容。

```bash
fnm env --use-on-cd --shell powershell | Out-String | Invoke-Expression
```

## 使用

切换 Node 版本。

```bash
fnm use <version>
```

查看已安装的 Node 版本。

```bash
fnm list
```

安装 Node 版本。

```bash
fnm install <version>
```

卸载 Node 版本。

```bash
fnm uninstall <version>
```

设置默认 Node 版本。

```bash
fnm default <version>
```

打印当前 Node 版本。

```bash
fnm current
```

## 与 Husky 配合使用时的注意事项

因为我们使用了 `fnm` 来管理 Node 版本,所以由于 PATH 环境变量问题,你可能会遇到 `command not found` 报错。

我们可以在系统 `C:/Users/用户名/.config/husky/init.sh` 文件中添加以下内容:

```bash
eval "$(fnm env --use-on-cd)"
```
