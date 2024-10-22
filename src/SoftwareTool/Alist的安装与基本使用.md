---
title: Alist 的安装与基本使用
cover: https://t.alcy.cc/fj?t=1708394400000
date: 2024-02-20 10:00
category: 软件工具
tag: 
  - Alist
excerpt: false
---
## Windows 平台
### 下载安装包并安装
去 [Alist](https://github.com/alist-org/alist) 仓库 releases 里下载最新版 Windows 安装包，下载完成后解压到任意目录。

在文件资源管理器中找到 `alist.exe` 文件，在地址栏输入 `cmd` 后回车。

进入命令提示符后输入 `alist server` 运行。

在输出的 INFO 中可以看到密码。

```sh
INFO[2023-12-02 02:21:36] Successfully created the admin user and the initial password is: 此处为密码
```

从浏览器进入 `localhost:5244` 即可访问图形化配置页面。

### 添加存储
请查看 [AList 文档](https://alist.nn.ci/zh/)。
### 设置开机自启
在 `alist.exe` 文件的目录里新建一个 `alist.vbs` 文件，文件内容如下。

```vbscript
Set ws = CreateObject("Wscript.Shell")
ws.run "alist.exe server",vbhide
```

右键该文件创建快捷方式，将快捷方式剪切，在当前目录地址栏中输入 `shell:startup`，此时会跳转到开机自启目录，将快捷方式粘贴进来即可。
### 软件更新
去官网下载最新安装包，将 `alist.exe` 文件替换为最新的即可完成更新。
## Android 平台
### 安装 termux
从 [F-Droid](https://search.f-droid.org/?q=termux) 下载 termux 和 Termux:Widget 这两个软件。

将 termux 更换清华源，参考：[termux | 镜像站使用帮助 | 清华大学开源软件镜像站](https://mirrors.tuna.tsinghua.edu.cn/help/termux/)。

### 安装 Alist
在 termux 中输入如下命令。
```sh
apt update && apt install alist
```
启动 Alist。
```sh
alist server
```
在输出的 INFO 中可以看到密码。
```sh
INFO[2023-12-02 02:21:36] Successfully created the admin user and the initial password is: 此处为密码
```
从浏览器进入 `localhost:5244` 即可访问图形化配置页面。
### 添加存储
请查看 [AList 文档](https://alist.nn.ci/zh/)。
### 设置一键启动脚本
下载 vim。
```sh
pkg install vim
```
建立文件夹。
```sh
mkdir .shortcuts
```
进入文件夹。
```sh
cd .shortcuts
```
编辑脚本。
```sh
vim start_alist.sh
```
进入脚本编辑界面，按 `i` 进入编辑模式，输入以下内容。
```sh
alist server
```
输入完成后，按 `esc` 退出，输入 `:wq` 保存。
进入桌面，添加安卓小部件，将脚本添加到桌面即可。
### 更新 Alist
在 termux 中输入以下命令即可。
```sh
pkg upgrade alist
```