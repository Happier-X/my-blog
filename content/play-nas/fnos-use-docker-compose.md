---
title: fnOS 使用 DockerCompose
---

Docker Compose 是 Docker 官方提供的工具，用于定义和运行多容器 Docker 应用程序。它允许你通过一个 YAML 文件来配置和管理多个容器，包括它们的依赖关系、网络和卷。使用 Docker Compose 可以方便容器化应用程序的部署和管理。

## 配置存储目录

在 fnOS 中，我们需要有一块 SSD 来存储 Docker 镜像和配置。当我们第一次打开 Docker 应用时，fnOS 会提示我们选择一个存储位置，我们选择一块 SSD 来存储 Docker。此时我们切换到管理员视角下，可以看到根目录下多了一个 `docker` 文件夹。

在 SSD 中，我们创建一个文件夹，命名为 `dockerComposeConfig`，用于存储 Docker 配置。我们在这里面放我们的 Docker Compose 配置文件。

## 使用 Docker Compose

打开 Docker 应用，选择左侧的 Compose 菜单，然后点击右上角的 `新增项目`，此时会弹出一个对话框，输入项目名称，路径选择我们之前创建的 `dockerComposeConfig` 文件夹，完善 YAML 文件后，勾选 `创建项目后立即启动`，点击 `确定` 即可自动拉取相关镜像并启动。
