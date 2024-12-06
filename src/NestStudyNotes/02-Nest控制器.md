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
nest generate controller <CONTROLLERS_NAME>
```

> `<CONTROLLERS_NAME>` 可以是文件路径，例如 `user/auth`。

这里我们创建一个 `todo` 控制器。

```sh
nest generate controller todo
```

此时会在 `src` 下生成一个 `todo` 文件夹，里面包含一个 `todo.controller.ts` 文件和一个 `todo.controller.spec.ts`。

同时，在 `app.module.ts` 文件中自动引入了 `TodoController`。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoController } from './todo/todo.controller'

@Module({
    imports: [],
    controllers: [AppController, TodoController],
    providers: [AppService]
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

这里 `@Controller()` 里面的参数 `todo` 就是路由前缀，所有该控制器下的路由都会加上这个前缀。

> 注意：通过 Nest CLI 建立的控制器路由前缀默认使用该控制器的名称，而我们通常会习惯把名称取单数，而前缀改为复数。

所以，我们修改一下路由前缀。

```TypeScript
import { Controller } from '@nestjs/common'

@Controller('todos')
export class TodoController {}
```

## Http 方法

通过在`class`方法上添加装饰器，可以定义路由的 HTTP 方法，Nest 会根据装饰器自动将请求映射到对应的方法上。

```TypeScript
import { Controller, Get } from '@nestjs/common'

@Controller('todos')
export class todoController {
    @Get()
    getAll() {
        return []
    }
}
```

这里我们定义了一个 `GET /todos` 的路由，并且返回一个空数组。通过 `http://localhost:3000/todos` 可以访问到这个路由。

