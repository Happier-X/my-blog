---
cover: https://t.alcy.cc/fj?t=1734791400
order: 7
date: 2024-12-21 22:30:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 管道

## 什么是管道

管道 (Pipes) 是 Nest 提供的一种用于数据转换和验证的功能。通过使用管道，我们可以对控制器接收的数据进行转换和验证，如果验证失败，则抛出异常，如果验证成功，则将其传递给服务层。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E7%AE%A1%E9%81%9301.jpg)

Nest 内置了以下几种管道：

- ValidationPipe
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- DefaultValuePipe
- ParseFilePipe

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

当我们访问 `http://localhost:3000/1` 时，将会返回 `{ id: 1, name: 'Happier' }`，访问 `http://localhost:3000/a` 将会抛出如下异常。

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

当我们访问 `http://localhost:3000/a` 时，将会返回如下异常。

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

当我们访问 `http://localhost:3000/a` 时，将会返回如下异常。

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

此时会在 `src/pipes/parse-int` 下创建一个 `parse-int.pipe.ts` 文件和一个 `parse-int.pipe.spec.ts` 文件。

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

当我们访问 `http://localhost:3000/a` 时，将会返回如下异常。

```Json
{
    "message": "不是一个数字",
    "error": "Not Acceptable",
    "statusCode": 406
}
```

## 类验证器

### 基本使用

在 Nest 中，类验证器 (Class Validator) 是一种基于装饰器的验证机制，它允许你在类属性上使用装饰器来指定验证规则。这些装饰器来自 `class-validator` 库，这是一个流行的 `Node.js` 库，用于对象和值的验证。类验证器与 Nest 的管道 (Pipes) 功能结合使用时，可以提供强大的数据验证能力。

首先我们需要安装 `class-validator` 和 `class-transformer` 库。

```sh
npm install class-validator class-transformer
```

我们可以用它们来验证 DTO。

这里先创建一个 `TodoModule` 和 `TodoController`。

```sh
nest generate module features/todo
nest generate controller features/todo
```

然后在 `features/todo/dto` 文件夹下创建一个 `create-todo.dto.ts` 文件，并添加如下内容。

```TypeScript
export class CreateTodoDto {
    public readonly title: string
    public readonly description?: string
}
```

我们定义如下规则，`title` 不能为空，类型必须是字符串，最大长度为 20，`description` 可以为空，类型必须是字符串。

这里为属性添加装饰器即可添加验证规则。

```TypeScript
import { MaxLength, IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateTodoDto {
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    // @IsNotEmpty({ message: '标题不能为空' }) 可以自定义错误消息
    public readonly title: string

    @IsString()
    @IsOptional()
    public readonly description?: string
}
```

接下来只需要使用 `@UsePipes()` 装饰器即可在控制器中使用。这里以 `todo.controller.ts` 为例。

```TypeScript
import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todos')
export class TodoController {
    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() dto: CreateTodoDto) {
        return {
            id: 1,
            ...dto
        }
    }
}
```

也可以在控制器上使用 `@UsePipes()` 装饰器，这样所有方法都会使用这个管道。

```TypeScript
import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todos')
@UsePipes(ValidationPipe)
export class TodoController {
    @Post()
    create(@Body() dto: CreateTodoDto) {
        return {
            id: 1,
            ...dto
        }
    }
}
```

当我们向 `http://localhost:3000/todos` 发送 `POST` 请求时，如果传入的 `title` 长度大于 20，将会返回如下异常。

```Json
{
    "message": "title must be shorter than or equal to 20 characters",
    "error": "Bad Request",
    "statusCode": 400
}
```

### 关闭错误消息

如果不想返回错误消息，可以在 `ValidationPipe` 中添加 `disableErrorMessages: true` 选项。

```TypeScript
import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todos')
export class TodoController {
    @Post()
    @UsePipes(new ValidationPipe({ disableErrorMessages: true }))
    create(@Body() dto: CreateTodoDto) {
        return {
            id: 1,
            ...dto
        }
    }
}
```

当我们向 `http://localhost:3000/todos` 发送 `POST` 请求时，如果传入的 `title` 长度大于 20，将会返回如下异常。

```Json
{
    "message": "Bad Request",
    "statusCode": 400
}
```

### 自定义异常

使用 `exceptionFactory` 选项可以自定义异常。

```TypeScript
import {
    Body,
    Controller,
    HttpStatus,
    NotAcceptableException,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { ValidationError } from 'class-validator'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todos')
export class TodoController {
    @Post()
    @UsePipes(
        new ValidationPipe({
            exceptionFactory: (errors: ValidationError[]) => {
                return new NotAcceptableException({
                    code: HttpStatus.NOT_ACCEPTABLE,
                    message: '格式错误',
                    errors
                })
            }
        })
    )
    create(@Body() dto: CreateTodoDto) {
        return {
            id: 1,
            ...dto
        }
    }
}
```

当我们向 `http://localhost:3000/todos` 发送 `POST` 请求时，如果传入的 `title` 长度大于 20，将会返回如下异常。

```Json
{
    "code": 406,
    "message": "格式错误",
    "errors": [
        {
            "target": {
                "title": "12345678901234567890123"
            },
            "value": "12345678901234567890123",
            "property": "title",
            "children": [],
            "constraints": {
                "maxLength": "title must be shorter than or equal to 20 characters"
            }
        }
    ]
}
```

### 自定义过滤属性

通过给 `ValidationPipe` 设置 `whitelist: true` 选项，可以过滤掉 DTO 中没有任何装饰器的属性。这里以 `todo.controller.ts` 为例。

```TypeScript
import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todos')
export class TodoController {
    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() dto: CreateTodoDto) {
        return {
            id: 1,
            ...dto
        }
    }
}
```

当我们向 `http://localhost:3000/todos` 发送 `POST` 请求时，如果传入的 `title` 和 `text`，将会返回如下内容。

```Json
{
    "id": 1,
    "title": "1234567890123456789"
}
```

如果我们想传入无效参数时抛出异常，可以设置同时设置 `whitelist: true` 和 `forbidNonWhitelisted: true` 选项。这里以 `todo.controller.ts` 为例。

```TypeScript
import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todos')
export class TodoController {
    @Post()
    @UsePipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
    )
    create(@Body() dto: CreateTodoDto) {
        return {
            id: 1,
            ...dto
        }
    }
}
```

当我们向 `http://localhost:3000/todos` 发送 `POST` 请求时，如果传入的 `title` 和 `text` 属性，将会返回如下异常。

```Json
{
    "message": [
        "property text should not exist"
    ],
    "error": "Bad Request",
    "statusCode": 400
}
```

### 自动转换

通过给 `ValidationPipe` 设置 `transform: true` 选项，可以自动将传入的参数转换为 DTO 中定义的类型。这里以 `todo.controller.ts` 为例。

```TypeScript
import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todos')
export class TodoController {
    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    create(@Body() dto: CreateTodoDto) {
        console.log(dto)
        return {
            id: 1,
            ...dto
        }
    }
}
```

当我们向 `http://localhost:3000/todos` 发送 `POST` 请求时，传入 `title` 为 `1234567890123456789`，控制台会打印如下内容。

```sh
CreateTodoDto { title: '1234567890123456789' }
```

`transform` 可以将路由参数自动装换。这里以 `todo.controller.ts` 为例。

```TypeScript
import {
    Controller,
    Get,
    Param,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'

@Controller('todos')
export class TodoController {
    @Get(':id')
    @UsePipes(new ValidationPipe({ transform: true }))
    get(@Param('id') id: number) {
        console.log(typeof id)
        return ''
    }
}
```

当我们访问 `http://localhost:3000/todos/1` 时，控制台会打印如下内容。这里将路由参数 `id` 转换为 `number` 类型，它原来是一个字符串。

```sh
number
```

### 检测数组格式的 DTO

如果传入的参数是数组格式，则需要使用 `ParseArrayPipe` 管道。这里以 `todo.controller.ts` 为例。

```TypeScript
import { Body, Controller, ParseArrayPipe, Post } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'

@Controller('todos')
export class TodoController {
    @Post()
    create(
        @Body(new ParseArrayPipe({ items: CreateTodoDto }))
        dtos: CreateTodoDto[]
    ) {
        return dtos
    }
}
```

当我们向 `http://localhost:3000/todos` 发送 `POST` 请求时，传入一下内容。

```Json
[
    {
        "title": "1234567890123456789"
    }
]
```

会返回如下内容。

```Json
[
    {
        "title": "1234567890123456789"
    }
]
```

### 解析查询参数

`ParseArrayPipe` 可以解析查询参数，假设我们想解析查询参数为 `ids=1,2,3`，这里以 `todo.controller.ts` 为例。

```TypeScript
import { Controller, Get, ParseArrayPipe, Query } from '@nestjs/common'

@Controller('todos')
export class AppController {
    @Get()
    get(
        @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
        ids: number[]
    ) {
        return ids
    }
}
```

当我们访问 `http://localhost:3000/todos?ids=1,2,3` 时，会返回如下内容。

```Json
[
    1,
    2,
    3
]
```

## DTO 使用技巧

### 局部复用

局部复用的意思是将既有的 DTO 的所有字段都继承过来，但是将它们全部转换为非必须的。需要使用 `PartialType` 来实现。这里我们创建一个 `update-todo.dto.ts`。

```TypeScript
import { PartialType } from '@nestjs/mapped-types'
import { CreateTodoDto } from './create-todo.dto'

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
```

它将 `CreateTodoDto` 的所有字段都继承过来，但是将它们全部转换为非必须的，等同于如下内容。

```TypeScript
import { MaxLength, IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class UpdateTodoDto {
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly title?: string

    @IsString()
    @IsOptional()
    public readonly description?: string
}
```

### 选择性复用

选择性复用的意思是用既有的 DTO 去选择哪些是需要的。需要使用 `PickType` 来实现。这里我们修改一下 `update-todo.dto.ts`。

```TypeScript
import { PickType } from '@nestjs/mapped-types'
import { CreateTodoDto } from './create-todo.dto'

export class UpdateTodoDto extends PickType(CreateTodoDto, ['title']) {}
```

它将 `CreateTodoDto` 的 `title` 字段继承过来，等同于如下内容。

```TypeScript
import { MaxLength, IsString, IsNotEmpty } from 'class-validator'

export class UpdateTodoDto {
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    public readonly title: string
}
```

### 排除复用

排除复用的意思是用既有的 DTO 去排除哪些是不需要的。需要使用 `OmitType` 来实现。这里我们修改一下 `update-todo.dto.ts`。

```TypeScript
import { OmitType } from '@nestjs/mapped-types'
import { CreateTodoDto } from './create-todo.dto'

export class UpdateTodoDto extends OmitType(CreateTodoDto, ['title']) {}
```

它将 `CreateTodoDto` 的 `title` 字段排除，等同于如下内容。

```TypeScript
import { IsString, IsOptional } from 'class-validator'

export class UpdateTodoDto {
    @IsString()
    @IsOptional()
    public readonly description?: string
}
```

### 合并复用

合并复用的意思是用既有的 DTO 去合并成新的 DTO。需要使用 `IntersectionType` 来实现。这里我们修改一下 `update-todo.dto.ts`。

```TypeScript
import { IntersectionType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { CreateTodoDto } from './create-todo.dto'

export class MockDto {
    @IsString()
    @IsNotEmpty()
    public readonly information: string
}

export class UpdateTodoDto extends IntersectionType(CreateTodoDto, MockDto) {}
```

它将 `CreateTodoDto` 和 `MockDto` 组合成新的 DTO，等同于如下内容。

```TypeScript
import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class UpdateTodoDto {
    @MaxLength(20)
    @IsString()
    @IsNotEmpty()
    public readonly title: string

    @IsString()
    @IsOptional()
    public readonly description?: string

    @IsString()
    @IsNotEmpty()
    public readonly information: string
}
```

### 组合使用

上面的四种复用方式可以组合使用。这里我们修改一下 `update-todo.dto.ts`。

```TypeScript
import { IntersectionType, OmitType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { CreateTodoDto } from './create-todo.dto'

export class MockDto {
    @IsString()
    @IsNotEmpty()
    public readonly information: string
}

export class UpdateTodoDto extends IntersectionType(
    OmitType(CreateTodoDto, ['title']),
    MockDto
) {}
```

它将 `CreateTodoDto` 的 `title` 字段排除，然后与 `MockDto` 合并成新的 DTO，等同于如下内容。

```TypeScript
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateTodoDto {
    @IsString()
    @IsOptional()
    public readonly description?: string

    @IsString()
    @IsNotEmpty()
    public readonly information: string
}
```

## 全局作用域管道

我们可以将管道应用到全局作用域，这样所有的控制器都会使用这个管道。

可以在 `main.ts` 中使用 `useGlobalPipes` 方法来应用全局管道。

```TypeScript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(new ValidationPipe())
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
```

也可以通过依赖注入的方式在 `AppModule` 中进行配置。

```TypeScript
import { Module, ValidationPipe } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TodoModule } from './features/todo/todo.module'
import { APP_PIPE } from '@nestjs/core'

@Module({
    imports: [TodoModule],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useClass: ValidationPipe
        }
    ]
})
export class AppModule {}
```
