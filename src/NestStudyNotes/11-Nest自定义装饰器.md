---
cover: https://t.alcy.cc/fj?t=1735542000000
order: 11
date: 2024-12-30 15:00
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 自定义装饰器

Nest 允许我们创建自定义装饰器。

## 参数装饰器

使用如下命令可以快速创建一个装饰器。

```sh
nest generate decorator <DECORATOR_NAME>
```

> <DECORATOR_NAME> 可以是文件路径，例如 `decorators/user`。

这里我们创建一个 `User` 装饰器。

```sh
nest generate decorator decorators/user
```

此时会在 `src/decorators/user` 下创建一个 `user.decorator.ts` 文件。

```TypeScript

```
