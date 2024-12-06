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

## 参数介绍

创建完的模块文件中，默认会生成一个空的 `@Module()` 装饰器，它接受一个对象作为参数，该对象包含以下属性。

- `imports`：导入列表，导入该模块需要依赖的其他模块的提供者 (Providers)。
- `controllers`：控制器列表，即该模块包含的控制器 (Controllers)。
- `providers`：提供者列表，注册模块中使用到的提供者 (Providers)。
- `exports`：导出列表，即该模块需要共享给其他模块的提供者 (Providers)。

## 功能模块

功能模块是包含一组相关功能的模块，大多数模块都是功能模块。

我们将控制器添加到 `TodoModule` 中。

```sh
nest generate controller features/todo
```

此时会在 `src/features/todo` 下生成一个 `todo.controller.ts` 文件和 `todo.controller.spec.ts` 文件。

并且，在 `todo.module.ts` 文件中自动引入了 `TodoController`。

```TypeScript
import { Module } from '@nestjs/common'
import { TodoController } from './todo.controller'

@Module({
    controllers: [TodoController]
})
export class TodoModule {}
```

这里我们把服务（Services）也添加到 `TodoModule` 中。

```sh
nest generate service features/todo
```

此时会在 `src/features/todo` 下生成一个 `todo.service.ts` 文件和 `todo.service.spec.ts` 文件。

并且，在 `todo.module.ts` 文件中自动引入了 `TodoService`。

```TypeScript
import { Module } from '@nestjs/common'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'

@Module({
    controllers: [TodoController],
    providers: [TodoService]
})
export class TodoModule {}
```

此时我们修改 `todo.service.ts`中的内容。

```TypeScript
import { Injectable } from '@nestjs/common'

@Injectable()
export class TodoService {
    private todos = [
        {
            id: 1,
            title: 'First Todo',
            description: 'This is the first todo'
        }
    ]

    getTodos() {
        return this.todos
    }
}
```

再修改 `todo.controller.ts`中的内容，将 `TodoService` 注入到 `TodoController` 中。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { TodoService } from './todo.service'

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}
    @Get()
    getAll() {
        return this.todoService.getTodos()
    }
}
```

此时我们就创建了一个功能模块，它包含一个控制器和一个服务。访问 `http://localhost:3000/todos` 可以看到返回的数据。