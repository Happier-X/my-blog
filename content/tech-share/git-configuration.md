# Git配置

type: Post
status: Published
date: 2023/06/15
tags: Git
category: 技术分享

<aside>
😆 记录一下Git初始化配置

</aside>

# 绑定用户名和邮箱

```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

## 设置大小写敏感

默认情况下是对大小写不敏感的，通过以下命令可以设置大小写敏感。

- 获取大小写忽略状态
    
    ```bash
    git config core.ignorecase
    ```
    
- 设置大小写敏感为false
    
    ```bash
    git config core.ignorecase false
    ```