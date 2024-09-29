---
title: uni-app 安卓真机无线调试
cover: https://t.alcy.cc/fj?t=1727602200000
date: 2024-09-29 17:30
category: 软件开发
tag: uni-app
excerpt: false
---

## 下载安卓 SDK

[安卓 SDK 下载地址](https://developer.android.com/tools/releases/platform-tools?hl=zh-cn)

## 开启无线调试

1. 手机打开开发者选项，开启无线调试，这里最好关闭 USB 调试，避免冲突
2. 选择配对码配对设备，此时会有一个 IP 地址和端口号以及配对码，记录下来

## 配对

将下载好的安卓 SDK 解压，打开 `platform-tools` 目录，在该目录下以管理员身份运行命令行窗口，输入以下命令：

```bash
adb pair 手机IP地址:端口号
```

执行命令后会提示输入配对码，输入配对码即可连接成功
