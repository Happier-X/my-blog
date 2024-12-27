---
cover: https://t.alcy.cc/fj?t=1727602200000
date: 2024-09-29 17:30
category: 软件开发
tag: uni-app
excerpt: false
---

# uni-app 安卓真机无线调试

## 下载安卓 SDK

[安卓 SDK 下载地址。](https://developer.android.com/tools/releases/platform-tools?hl=zh-cn)

## 开启无线调试

1. 手机打开开发者选项，开启无线调试。
2. 此时手机会显示一个 IP 地址和端口号，记录下来，我们将这个端口号称为 `端口 1`。
3. 选择配对码配对设备，此时会显示一个 IP 地址和一个新的端口号以及配对码，记录下来，我们将这个新的端口号称为 `端口 2`。

## 配对

将下载好的安卓 SDK 解压，打开 `platform-tools` 目录，在该目录下以管理员身份运行命令行窗口，输入以下命令。

```sh
adb pair IP:端口 2
```

执行命令后会提示输入配对码，输入配对码完成配对。

## 连接

在命令行窗口中输入以下命令。

```sh
adb connect IP:端口 1
```

执行命令后会提示连接成功。

## 调试

在 HBuilderX 中选择真机运行，选择连接的设备即可开始调试。
