---
cover: https://t.alcy.cc/fj?t=1733475600000
order: 3
date: 2024-12-06 17:00
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 模块

模块 (Modules) 是应用程序的基本构建块，它将一组相关的功能组织在一起。

## 创建模块

使用如下命令可以快速创建一个模块。

```sh
nest generate module <MODULE_NAME>
```

> <MODULE_NAME> 可以是文件路径，例如 user/auth。

这里我们创建一个 todo 模块。

```sh
nest generate module features/todo
```

此时会在 `src/features` 下生成一个 `todo` 文件夹，里面包含一个 `todo.module.ts` 文件。

其内容如下。

```TypeScript
import { Module } from '@nestjs/common'

@Module({})
export class TodoModule {}
```

同时，在 `app.module.ts` 文件中自动引入了 `TodoModule`。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './features/todo/todo.module'

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
```
