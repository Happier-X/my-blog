---
title: 软件工具-网盘管理神器 Alist 的安装
cover: https://t.alcy.cc/fj?t=1684807200
order: 1
date: 2023-05-23 10:00
category: 软件工具
tag: 
  - Alist
  - 网盘
  - termux
excerpt: false
---

## Windows 平台

### 下载安装包并安装

Github 地址：[Alist](https://github.com/alist-org/alist)

去 releases 里下载最新版 Windows 安装包

下载完成后解压即可

然后在文件资源管理器中找到 `alist.exe` 文件，在地址栏输入 `cmd` 后回车

进入命令提示符后输入 `alist server` 运行

在输出的 INFO 中可以看到密码：

```bash
INFO[2023-12-02 02:21:36] Successfully created the admin user and the initial password is: 此处为密码
```

从浏览器进入 `localhost:5244` 访问即可配置

### 添加存储

查看官方文档即可：[AList 文档](https://alist.nn.ci/zh/)

### 设置开机自启

在 `alist.exe` 文件的目录里新建一个文件名为 `alist.vbs`

文件内容为：

```vbscript
Set ws = CreateObject("Wscript.Shell")
ws.run "alist.exe server",vbhide
```

然后右键该文件创建快捷方式，将快捷方式剪切，在地址栏输入
`shell:startup`

将快捷方式粘贴进来即可

### 软件更新

去官网下载最新安装包，将 `alist.exe` 文件替换为最新的即可

## Android 平台

### 安装 termux

从 [F-Droid](https://search.f-droid.org/?q=termux) 下载 termux 和 Termux:Widget

更换清华源：[termux | 镜像站使用帮助 | 清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/termux/)

### 安装 Alist

在 termux 中输入如下命令：

```bash
apt update && apt install alist
```

启动 Alist：

```bash
alist server
```

在输出的 INFO 中可以看到密码：

```bash
INFO[2023-12-02 02:21:36] Successfully created the admin user and the initial password is: 此处为密码
```

进入 `localhost:5244` 访问即可

### 添加存储

查看官方文档即可：[AList 文档](https://alist.nn.ci/zh/)

### 设置一键启动脚本

下载 vim：

```bash
pkg install vim
```

建立文件夹：

```bash
mkdir .shortcuts
```

进入文件夹：

```bash
cd .shortcuts
```

编辑脚本：

```bash
vim start_alist.sh
```

进入脚本编辑界面，按 `i` 进入编辑模式，输入以下内容：

```bash
alist server
```

输入完成后，按 `esc` 退出，输入 `:wq` 保存

进入桌面，添加安卓小部件，将脚本添加到桌面即可

### 更新 Alist

在 termux 中输入以下命令即可：

```bash
pkg upgrade alist
```
