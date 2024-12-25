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

我们可以通过继承 `PipeTransform` 接口来创建自定义管道，并实现 `transform` 方法。

使用如下命令可以快速创建一个管道。

```sh
nest generate pipe <PIPES_NAME>
```

> <PIPES_NAME> 可以是文件路径，例如 pipes/parse-int。

这里我们创建一个 `ParseIntPipe` 在 `pipes` 文件夹下。

```sh
nest generate pipe pipes/parse-int
```

此时会在 `src` 目录下生成一个 `pipes` 文件夹，并在其中生成一个 `parse-int` 文件夹，文件夹中有一个 `parse-int.pipe.ts` 文件和一个 `parse-int.pipe.spec.ts` 文件。

`parse-int.pipe.ts` 的内容如下。

```TypeScript
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return value
    }
}
```

这里的 `transform(value:any,metadata:ArgumentMetadata)` 方法就是用来处理传入参数的，我们可以在其中对参数进行校验、转换等操作，`value` 为传入的参数，`metadata` 为参数的元数据。

> `PipeTransform` 后面可以跟泛型，例如 `PipeTransform<T,R>`，表示传入的参数类型为 `T`，返回的参数类型为 `R`。

这里我们调整一下 `parse-int.pipe.ts` 的内容，判断传入的参数是否为整数，如果不是则抛出异常。

```TypeScript
import {
    ArgumentMetadata,
    Injectable,
    NotAcceptableException,
    PipeTransform
} from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
    transform(value: any, metadata: ArgumentMetadata) {
        const integer = parseInt(value)
        if (isNaN(integer)) {
            throw new NotAcceptableException('不是一个整数')
        }
        return integer
    }
}
```

然后我们在 `app.controller.ts` 中使用自定义管道。

```TypeScript
import { Controller, Get, Param } from '@nestjs/common'
import { AppService } from './app.service'
import { ParseIntPipe } from './pipes/parse-int/parse-int.pipe'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
        return this.appService.getUser(id)
    }
}
```

此时，访问 `http://localhost:3000/a` 将会返回如下异常。

```Json
{
    "message": "不是一个数字",
    "error": "Not Acceptable",
    "statusCode": 406
}
```

