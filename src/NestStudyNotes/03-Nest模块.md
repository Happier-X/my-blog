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

这里我们把服务 (Services) 也添加到 `TodoModule` 中。

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

此时我们修改 `todo.service.ts` 中的内容。

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

再修改 `todo.controller.ts` 中的内容，将 `TodoService` 注入到 `TodoController` 中。

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

## 共享模块

在 Nest 中，默认情况下，模块是单例的，也就是说可以在多个模块间共享同一个实例。

这里我们把 `TodoService` 从 `TodoModule` 中导出。

```TypeScript
import { Module } from '@nestjs/common'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'

@Module({
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService]
})
export class TodoModule {}
```

然后我们建立一个新的模块和控制器。

```sh
nest generate module features/copy-todo
```

```sh
nest generate controller features/copy-todo
```

然后我们调整一下 `todo.service.ts` 文件中的内容，增加了一个 `createTodo` 方法。

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

    createTodo(item) {
        this.todos.push(item)
    }
}
```

然后在 `CopyTodoModule` 中导入 `TodoModule`。

```TypeScript
import { Module } from '@nestjs/common'
import { CopyTodoController } from './copy-todo.controller'
import { TodoModule } from '../todo/todo.module'

@Module({
    controllers: [CopyTodoController],
    imports: [TodoModule]
})
export class CopyTodoModule {}
```

然后在 `CopyTodoController` 中注入 `TodoService`，并调用 `createTodo` 方法。

```TypeScript
import { Body, Controller, Post } from '@nestjs/common'
import { TodoService } from '../todo/todo.service'

@Controller('copy-todos')
export class CopyTodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create(@Body() body) {
        this.todoService.createTodo(body)
        return body
    }
}
```

当我们向 `http://localhost:3000/copy-todos` 发送一个 POST 请求时，可以看到返回的数据，并且我们再访问 `http://localhost:3000/todos`，可以看到 `todos` 数组中多了一个元素。

这里我们可以得出一个结论，像服务 (Services) 这样的提供者 (Providers) 会在模块 (Modules) 中建立一个实例，当其他模块 (Modules) 需要使用这个实例时，就可以通过导出的方式与其他模块 (Modules) 共享。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E6%A8%A1%E5%9D%9701.jpg)

## 全局模块

当有模块需要与多数模块共享时，需要在各模块中导入它，这样会显得很麻烦。此时我们可以将模块标记为全局模块，这样其他模块不需要导入它就可以使用了。

要将模块标记为全局模块，只需给模块添加 `@Global()` 装饰器即可。

```TypeScript
import { Global, Module } from '@nestjs/common'
import { TodoController } from './todo.controller'
import { TodoService } from './todo.service'

@Global()
@Module({
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService]
})
export class TodoModule {}
```

这里我们给 `TodoModule` 添加了 `@Global()` 装饰器，这样我们就可以在 `CopyTodoModule` 中使用 `TodoService` 了，而不需要导入 `TodoModule`。

> 注意：非必要情况下，不建议使用全局模块。

## 常用模块

模块可以不包含任何控制器 (Controllers) 与提供者 (Providers)，只把导入的模块再导出，这样的好处是可以把多个常用的模块集中在一起，方便在其他模块中使用。

```TypeScript
import { Module } from '@nestjs/common'

@Module({
    imports: [AModule, BModule],
    exports: [AModule, BModule]
})
export class CommonModule {}
```