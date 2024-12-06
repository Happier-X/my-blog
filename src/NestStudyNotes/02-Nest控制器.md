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

## Http Method 装饰器

通过在 `class` 方法上添加 `Http Method` 装饰器，可以定义路由的 HTTP 方法，Nest 会根据装饰器自动将请求映射到对应的方法上。

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

Nest 为所有标准 HTTP 方法提供了装饰器：
- `@Get()`：GET 请求
- `@Post()`：POST 请求
- `@Put()`：PUT 请求
- `@Delete()`：DELETE 请求
- `@Patch()`：PATCH 请求
- `@Options()`：OPTIONS 请求
- `@Head()`：HEAD 请求
- `@All()`：所有请求

## 子路由

如果我们想定义一个 `GET /todos/examples` 的路由，我们不可能每次有新子路由时都新增一个控制器，这时我们可以在 `Http Method` 装饰器中添加路径参数。

```TypeScript
import { Controller, Get } from '@nestjs/common'

@Controller('todos')
export class todoController {
    @Get('/examples')
    getExample() {
        return [
            {
                id: 1,
                title: 'Example 1',
                description: 'This is an example todo'
            }
        ]
    }
}
```

通过 `http://localhost:3000/todos/examples` 可以访问到这个路由。

## 路由通配符

在设计路由时，可能需要一些容错，比如我们的 `GET /todos/examples` 路由，如果用户不管是输入了 `GET /todos/exammmmmples` 还是 `GET /todos/exam_ples`，我们都可以返回 `GET /todos/examples` 的结果，这时我们就可以使用路由通配符 `*`。

```TypeScript
import { Controller, Get } from '@nestjs/common'

@Controller('todos')
export class todoController {
    @Get('/exam*ples')
    getExample() {
        return [
            {
                id: 1,
                title: 'Example 1',
                description: 'This is an example todo'
            }
        ]
    }
}
```

通过 `http://localhost:3000/todos/exammmmmples` 和 `http://localhost:3000/todos/exam_ples` 都可以访问到这个路由。

## 路由参数

要获得路由参数，我们先在 `Http Method` 装饰器上进行定义，字符串格式为 `:参数名`，然后在该方法中添加带有 `@Param()` 装饰器的参数。

```TypeScript
import { Controller, Get, Param } from '@nestjs/common'

@Controller('todos')
export class todoController {
    @Get(':id')
    getById(@Param() params) {
        const { id } = params
        return {
            id,
            title: `Title ${id}`,
            description: `Description ${id}`
        }
    }
}
```

通过 `http://localhost:3000/todos/1` 可以访问到这个路由，将返回 `{"id":1,"title":"Title 1","description":"Description 1"}`。

也可以通过 `@Param('参数名')` 来获取参数。

```TypeScript
import { Controller, Get, Param } from '@nestjs/common'

@Controller('todos')
export class todoController {
    @Get(':id')
    getById(@Param('id') id) {
        return {
            id,
            title: `Title ${id}`,
            description: `Description ${id}`
        }
    }
}
```

通过 `http://localhost:3000/todos/1` 可以访问到这个路由，将返回 `{"id":1,"title":"Title 1","description":"Description 1"}`。

## 查询参数

要获得查询参数，我们只需要在方法中添加带有 `@Query()` 装饰器的参数即可。

```TypeScript
import { Controller, Get, Query } from '@nestjs/common'

@Controller('todos')
export class todoController {
    @Get()
    getList(@Query() query) {
        return {
            query
        }
    }
}
```

通过 `http://localhost:3000/todos?id=1&name=2` 可以访问到这个路由，将返回 `{"query":{"id":"1","name":"2"}}`。

也可以通过 `@Query('参数名')` 来获取指定参数。

```TypeScript
import { Controller, Get, Query } from '@nestjs/common'

@Controller('todos')
export class todoController {
    @Get()
    getList(@Query('id') id, @Query('name') name) {
        return {
            id,
            name
        }
    }
}
```

通过 `http://localhost:3000/todos?id=1&name=2` 可以访问到这个路由，将返回 `{"id":"1","name":"2"}`。

## 状态码

默认情况下，响应的状态码始终为 `200`，除了 `POST` 请求的状态码为 `201`。Nest 提供了 `@HttpCode()` 装饰器来设置状态码，同时还提供了状态码的 `enum`。

```TypeScript
import { Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common'

@Controller('todos')
export class todoController {
    @Patch()
    @HttpCode(HttpStatus.NO_CONTENT)
    get() {
        return []
    }
}
```

通过发送 `PATCH` 请求到 `http://localhost:3000/todos`，可以访问到这个路由，状态码将返回 `204 No Content`。

