---
cover: https://t.alcy.cc/fj?t=1733724000000
order: 5
date: 2024-12-09 14:00
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 提供者

提供者 (Providers) 是 Nest 的一个核心概念，它是一个类，可以作为依赖项注入到其他类中。

## 标准提供者

标准提供者使用 `@Injectable()` 装饰器进行标记。

大多数的服务 (Services) 都会使用 `@Injectable()` 装饰器进行标记，以使其成为提供者。

使用如下命令可以创建一个服务。

```sh
nest generate service <SERVICE_NAME>
```

> `<SERVICE_NAME>` 可以是文件路径，例如 `features/todo`。

这里以 `app.service.ts` 为例：

```Typescript
import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!'
    }
}
```

在模块中，使用 `providers` 属性将服务注册到模块中。这里以 `app.module.ts` 为例。

```Typescript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
```

也可以使用完整写法。

```Typescript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        {
            provide: AppService,
            useClass: AppService
        }
    ]
})
export class AppModule {}
```

使用时，在构造函数中注入即可。这里以 `app.controller.ts` 为例。

```Typescript
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello()
    }
}
```

## 自定义提供者

