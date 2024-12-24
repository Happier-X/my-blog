---
cover: https://t.alcy.cc/fj?t=1734791400
order: 7
date: 2024-12-21 22:30
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 管道

## 什么是管道

管道 (Pipes) 是 Nest 提供的一种用于数据转换和验证的功能。通过使用管道，我们可以对控制器接收的数据进行转换和验证，如果验证失败，则抛出异常，如果验证成功，则将其传递给服务层。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E7%AE%A1%E9%81%9301.jpg)

Nest 内置了以下几种管道：
+ ValidationPipe
+ ParseIntPipe
+ ParseFloatPipe
+ ParseBoolPipe
+ ParseArrayPipe
+ ParseUUIDPipe
+ ParseEnumPipe
+ DefaultValuePipe
+ ParseFilePipe

## 使用管道

假设我们要解析并验证路由参数是否为整数，我们可以在 `@Param()` 装饰器中传入路由参数名称，并指定 `ParseIntPipe` 管道即可。这里以 `app.controller.ts` 为例，如果 `id` 解析为非整数，将会抛出异常。

```TypeScript
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.appService.getUser(id)
    }
}
```

修改 `app.service.ts`。

```TypeScript
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getUser(id: number) {
        const users = [
            {
                id: 1,
                name: 'Happier'
            }
        ]
        const user = users.find((user) => user.id === id)
        return user || {}
    }
}
```

此时我们访问 `http://localhost:3000/1` 将会返回 `{ id: 1, name: 'Happier' }`，访问 `http://localhost:3000/a` 将会抛出如下异常。

```Json
{
  "code": 400,
  "message": "Validation failed (numeric string is expected)",
  "timestamp": "2024-12-24T14:32:26.176Z"
}
```

## 内置管道自定义异常

### 自定义异常状态码

如果我们想修改内置管道抛出异常时的 HTTP 状态码，需要将内置管道实例化并携带相关参数后传入。这里以 `app.controller.ts` 为例，我们将状态码修改为 `406`。

```TypeScript
import {
    Controller,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe
} from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get(':id')
    getUser(
        @Param(
            'id',
            new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
        )
        id: number
    ) {
        return this.appService.getUser(id)
    }
}
```

此时，访问 `http://localhost:3000/a` 将会返回如下异常。

```Json
{
  "code": 406,
  "message": "Validation failed (numeric string is expected)",
  "timestamp": "2024-12-24T14:34:05.279Z"
}
```

### 自定义错误消息

如果我们想修改内置管道抛出异常时的错误消息，需要将内置管道实例化并携带相关参数后传入。这里以 `app.controller.ts` 为例，我们将错误消息修改为 `id 必须为整数`。

```TypeScript
import {
    Controller,
    Get,
    NotAcceptableException,
    Param,
    ParseIntPipe
} from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get(':id')
    getUser(
        @Param(
            'id',
            new ParseIntPipe({
                exceptionFactory: () =>
                    new NotAcceptableException('id 必须为整数')
            })
        )
        id: number
    ) {
        return this.appService.getUser(id)
    }
}
```

此时，访问 `http://localhost:3000/a` 将会返回如下异常。

```Json
{
  "code": 406,
  "message": "id 必须为整数",
  "timestamp": "2024-12-24T14:39:40.166Z"
}
```

## 自定义管道

