---
cover: https://t.alcy.cc/fj?t=1733119200000
order: 2
date: 2024-12-02 14:00
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 控制器

控制器 (Controllers) 负责处理传入的请求和向客户端返回响应。

## 创建控制器

使用如下命令可以快速创建一个控制器。

```sh
nest g controller <CONTROLLER_NAME>
```

> `<CONTROLLER_NAME>` 可以是文件路径，例如 `user/auth`。

这里我们创建一个 `todo` 控制器。

```sh
nest g controller todo
```

此时会在`src`下生成一个 `todo` 文件夹，里面包含一个 `todo.controller.ts` 文件和一个`todo.controller.spec.ts`。

同时，在 `app.module.ts` 文件中自动引入了 `TodoController`。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoController } from './todo/todo.controller'

@Module({
  imports: [],
  controllers: [AppController, TodoController],
  providers: [AppService],
})
export class AppModule {}
```

## 路由

在 `todo.controller.ts` 文件中，可以看到如下代码。

```TypeScript
import { Controller } from '@nestjs/common'

@Controller('todo')
export class todoController {}
```