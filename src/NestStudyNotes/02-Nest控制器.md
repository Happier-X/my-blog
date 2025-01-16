---
cover: https://t.alcy.cc/fj?t=1733119200000
order: 2
date: 2024-12-02 14:00:00
category: 开发
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

此时会在 `src/todo` 下生成一个 `todo.controller.ts` 文件和一个 `todo.controller.spec.ts` 文件。

`todo.controller.ts` 文件的内容如下。

```TypeScript
import { Controller } from '@nestjs/common'

@Controller('todo')
export class TodoController {}
```

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
export class TodoController {}
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
export class TodoController {
    @Get()
    getAll() {
        return []
    }
}
```

这里我们定义了一个 `GET /todos` 的路由，并且返回一个空数组。通过 `http://localhost:3000/todos` 可以访问到这个路由。

Nest 为所有标准 HTTP 方法提供了装饰器：

- `@Get()`：GET 请求。
- `@Post()`：POST 请求。
- `@Put()`：PUT 请求。
- `@Delete()`：DELETE 请求。
- `@Patch()`：PATCH 请求。
- `@Options()`：OPTIONS 请求。
- `@Head()`：HEAD 请求。
- `@All()`：所有请求。

## 子路由

如果我们想定义一个 `GET /todos/examples` 的路由，我们不可能每次有新子路由时都新增一个控制器，这时我们可以在 `Http Method` 装饰器中添加路径参数。

```TypeScript
import { Controller, Get } from '@nestjs/common'

@Controller('todos')
export class TodoController {
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
export class TodoController {
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

## 获取请求参数

### 路由参数

要获得路由参数，我们先在 `Http Method` 装饰器上进行定义，字符串格式为 `:参数名`，然后在该方法中添加带有 `@Param()` 装饰器的参数。

```TypeScript
import { Controller, Get, Param } from '@nestjs/common'

@Controller('todos')
export class TodoController {
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
export class TodoController {
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

### 查询参数

要获得查询参数，我们只需要在方法中添加带有 `@Query()` 装饰器的参数即可。

```TypeScript
import { Controller, Get, Query } from '@nestjs/common'

@Controller('todos')
export class TodoController {
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
export class TodoController {
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

### 请求体

要获得请求体，我们只需要在方法中添加带有 `@Body()` 装饰器的参数即可。

```TypeScript
import { Body, Controller, Post } from '@nestjs/common'

@Controller('todos')
export class TodoController {
    @Post()
    create(@Body() data) {
        const id = 1
        return {
            id,
            ...data
        }
    }
}
```

通过发送 `POST` 请求到 `http://localhost:3000/todos`，发送请求体 `{ "title": "Title 1", "description": "Description 1" }`，可以访问到这个路由，将返回 `{"id":1,"title":"Title 1","description":"Description 1"}`。

也可以通过 `@Body('参数名')` 来获取指定参数。

```TypeScript
import { Body, Controller, Post } from '@nestjs/common'

@Controller('todos')
export class TodoController {
    @Post()
    create(@Body('title') title, @Body('description') description) {
        const id = 1
        return {
            id,
            title,
            description
        }
    }
}
```

通过发送 `POST` 请求到 `http://localhost:3000/todos`，发送请求体 `{ "title": "Title 1", "description": "Description 1" }`，可以访问到这个路由，将返回 `{"id":1,"title":"Title 1","description":"Description 1"}`。

#### 使用 DTO

DTO (数据传输对象) 通常用于过滤、格式化数据，它只负责传输数据，不包含业务逻辑。

我们可以使用 TypeScript 的接口来定义 DTO，也可以使用 JavaScript 的类来定义 DTO，由于 TypeScript 的接口在编译后会被删除，所以使用类定义 DTO 是更好的选择。

我们在控制器的目录下创建一个 `dto` 文件夹，并在其中创建一个 `create-<CONTROLLER_NAME>.dto.ts` 文件。这里我们创建一个 `create-todo.dto.ts` 文件。

```TypeScript
export class CreateTodoDto {
    title: string
    description?: string
}
```

创建完成后在控制器中使用，将带有 `@Body()` 装饰器的参数类型指定为 DTO 类型。

```TypeScript
import { Body, Controller, Post } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todos')
export class TodoController {
    @Post()
    create(@Body() dto: CreateTodoDto) {
        const id = 1
        return {
            id,
            ...dto
        }
    }
}
```

### 请求头

要获取请求头，我们只需要在方法中添加带有 `@Headers()` 装饰器的参数即可。

```TypeScript
import { Controller, Headers, Post } from '@nestjs/common'

@Controller('todos')
export class TodoController {
    @Post()
    head(@Headers() header) {
        return header.name
    }
}
```

通过发送 `POST` 请求到 `http://localhost:3000/todos`，并设置请求头 `name: 'John'`，可以访问到这个路由，将返回 `John`。

也可以通过 `@Headers('参数名')` 来获取指定参数。

```TypeScript
import { Controller, Headers, Post } from '@nestjs/common'

@Controller('todos')
export class TodoController {
    @Post()
    head(@Headers('name') name) {
        return name
    }
}
```

通过发送 `POST` 请求到 `http://localhost:3000/todos`，并设置请求头 `name: 'John'`，可以访问到这个路由，将返回 `John`。

## 参数装饰器

Nest 提供了多种参数装饰器，用于从参数中获取不同的信息。

- `@Request()`：获取请求对象，简写为 `@Req()`。
- `@Response()`：获取响应对象，简写为 `@Res()`。
- `@Next()`：获取下一个中间件的引用。
- `@Session()`：获取会话对象。
- `@Param()`：获取路由参数。
- `@Query()`：获取查询参数。
- `@Body()`：获取请求体。
- `@Headers()`：获取请求头。
- `@Ip()`：获取客户端 IP 地址。
- `@HostParam()`：获取主机参数。

## 响应头

使用 `@Header()` 装饰器可以设置响应头。

```TypeScript
import { Controller, Get, Header } from '@nestjs/common'

@Controller('todos')
export class TodoController {
    @Get()
    @Header('name', 'todo')
    getTodos() {
        return {
            message: 'This is the todo list'
        }
    }
}
```

通过发送 `GET` 请求到 `http://localhost:3000/todos`，可以访问到这个路由，将返回 `{"message":"This is the todo list"}`，并且响应头中会包含 `name: todo`。

## 状态码

默认情况下，响应的状态码始终为 `200`，除了 `POST` 请求的状态码为 `201`。Nest 提供了 `@HttpCode()` 装饰器来设置状态码，同时还提供了状态码的 `enum`。

```TypeScript
import { Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common'

@Controller('todos')
export class TodoController {
    @Patch()
    @HttpCode(HttpStatus.NO_CONTENT)
    get() {
        return []
    }
}
```

通过发送 `PATCH` 请求到 `http://localhost:3000/todos`，可以访问到这个路由，状态码将返回 `204 No Content`。

## 处理响应的方式

Nest 提供了两种方式来处理响应。

### 标准方式

通过 `return` 关键字返回。

标准方式支持异步。

```TypeScript
import { Controller, Get } from '@nestjs/common'

@Controller('todos')
export class TodoController {
    @Get()
    async getTodos() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    todos: 'this is the todos'
                })
            }, 10000)
        })
    }
}
```

标准方式也支持返回 RxJS `observable` 流。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { Observable } from 'rxjs'
import { of } from 'rxjs'

@Controller('todos')
export class TodoController {
    @Get()
    getTodos(): Observable<any> {
        return of({
            todos: 'this is the todos'
        })
    }
}
```

### 特定于库的方式

这个方式不通过 `return` 关键字返回，而是通过使用 `@Res()` 装饰器注入来获取响应对象，然后调用响应对象的方法来处理响应。

```TypeScript
import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('todos')
export class TodoController {
    @Get()
    getTodos(@Res() res: Response) {
        res.status(200).json({
            todos: 'this is the todos'
        })
    }
}
```

### 限制

Nest 会检测处理程序是否使用了 `@Res()`、`@Response()` 或 `@Next()` 装饰器，如果是，则会启用特定于库的处理方式，而标准方式则会被禁用。也就是说，`return` 的方式将不再起作用。

```TypeScript
import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('todos')
export class TodoController {
    @Get()
    getAll(@Res() res: Response) {
        return []
    }
}
```

可以通过在装饰器中添加 `{ passthrough: true }` 选项来突破此限制。

```TypeScript
import { Controller, Get, Res } from '@nestjs/common'
import { Response } from 'express'

@Controller('todos')
export class TodoController {
    @Get()
    getAll(@Res({ passthrough: true }) res: Response) {
        return []
    }
}
```
