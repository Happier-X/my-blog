---
title: Nest学习记录-异常过滤器
order: 7
date: 2024-03-05
category: 软件开发
tag:
    - Nest
---

## 什么是异常过滤器

异常过滤器（Exception Filters）在 Nest 中用于捕获和处理应用程序中的异常情况。当异常发生时，过滤器会捕获并处理该异常，以提供更好的用户体验或记录错误日志。

## 创建异常过滤器

我们使用命令来创建一个异常过滤器：

```bash
nest g filter http-exception
```

过滤器内容如下：

```typescript
// src/http-exception.filter.ts

import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp(); // 获取请求上下文
        const response = ctx.getResponse(); // 获取响应对象
        const request = ctx.getRequest(); // 获取请求对象
        const status = exception.getStatus(); // 获取异常状态码
        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: '我是自定义的异常',
        });
    }
}
```

## 使用异常过滤器

我们可以使用多种方式在 Nest 中使用异常过滤器。

### 局部使用

使用 `@UseFilters` 装饰器将异常过滤器应用于路由或控制器：

```typescript
// src/test/test.controller.ts

import {
    Controller,
    Get,
    Param,
    UseFilters,
    ForbiddenException,
} from '@nestjs/common';
import { TestService } from './test.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService) {}

    @Get(':id')
    @UseFilters(HttpExceptionFilter)
    findOne(@Param('id') id: string) {
        throw new ForbiddenException();
        return this.testService.findOne(+id);
    }
}
```

或：

```typescript
// src/test/test.controller.ts

import {
    Controller,
    Get,
    Param,
    UseFilters,
    ForbiddenException,
} from '@nestjs/common';
import { TestService } from './test.service';
import { HttpExceptionFilter } from 'src/http-exception.filter';

@Controller('test')
@UseFilters(HttpExceptionFilter)
export class TestController {
    constructor(private readonly testService: TestService) {}

    @Get(':id')
    findOne(@Param('id') id: string) {
        throw new ForbiddenException();
        return this.testService.findOne(+id);
    }
}
```

### 全局使用

使用 `ExceptionFilter` 装饰器将异常过滤器应用于整个应用程序：

```typescript
// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
}
bootstrap();
```
