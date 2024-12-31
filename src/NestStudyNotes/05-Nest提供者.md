---
cover: https://t.alcy.cc/fj?t=1733724000000
order: 5
date: 2024-12-09 14:00
category: 开发
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

### 值提供者

值提供者主要用来注入一些常量、将外部库注入到 Nest 或使用模拟对象替换实际实现。

值提供者使用 `useValue` 属性进行定义。这里以 `app.module.ts` 为例。

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
            useValue: {
                name: 'Happier'
            }
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
    getHello() {
        return this.appService
    }
}
```

### 非类提供者

提供者的不一定是类。有时我们希望使用字符串作为提供者标记 (token)。

这里以 `app.module.ts` 为例。

```Typescript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        {
            provide: 'token_key',
            useValue: 'Happier'
        }
    ]
})
export class AppModule {}
```

使用时，在构造函数中用 `@Inject()` 装饰器注入即可。这里以 `app.controller.ts` 为例。

```Typescript
import { Controller, Get, Inject } from '@nestjs/common'

@Controller()
export class AppController {
    constructor(@Inject('token_key') private readonly token) {}

    @Get()
    getToken(): string {
        return this.token
    }
}
```

### 类提供者

在某些情况下，我们可能需要动态地决定使用哪个类来提供服务。我们可以使用 `useClass` 选项来指定一个类，该类将被实例化并用作提供者。

这里以 `app.module.ts` 为例。

```Typescript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

class development {
    name: string = 'Development'
}

class production {
    name: string = 'Production'
}

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        {
            provide: AppService,
            useClass:
                process.env.NODE_ENV === 'development'
                    ? development
                    : production
        }
    ]
})
export class AppModule {}
```

这里将 `AppService` 的提供者类设置为 `development` 或 `production`，具体取决于 `NODE_ENV` 环境变量的值。

在使用时，在构造函数中注入即可。这里以 `app.controller.ts` 为例。

```Typescript
import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello() {
        return this.appService
    }
}
```

### 工厂提供者

使用工厂函数可以更灵活地创建提供者。通过 `useFactory` 来指定一个工厂函数，通过 `inject` 来注入其他依赖，该函数将返回一个提供者实例。

这里以 `app.module.ts` 为例。

```Typescript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

class MessageBox {
    message: string
    constructor(message: string) {
        this.message = message
    }
}

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'MESSAGE_BOX',
            inject: [AppService],
            useFactory: (appService: AppService) => {
                const message = appService.getHello()
                return new MessageBox(message)
            }
        }
    ]
})
export class AppModule {}
```

在使用时，在构造函数中用 `@Inject()` 装饰器注入即可。这里以 `app.controller.ts` 为例。

```Typescript
import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('MESSAGE_BOX') private readonly messageBox
    ) {
        console.log(messageBox)
    }

    @Get()
    getHello() {
        return this.appService
    }
}
```

### 别名提供者

别名提供者允许我们为已存在的提供者创建一个别名。使用 `useExist` 来指定要使用哪个提供者。这里以 `app.module.ts` 为例。

```Typescript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'ALIAS_APP_SERVICE',
            useExisting: AppService
        }
    ]
})
export class AppModule {}
```

在使用时，在构造函数中用 `@Inject()` 装饰器注入即可。这里以 `app.controller.ts` 为例。

```Typescript
import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('ALIAS_APP_SERVICE') private readonly alias: AppService
    ) {
        console.log(this.alias === this.appService) // true
    }

    @Get()
    getHello() {
        return this.appService
    }
}
```

## 导出自定义提供者

我们先创建一个 `HandsomeModule`。

```sh
nest generate module handsome
```

然后我们将自定义提供者用变量保存起来，再将其放到 `providers` 和 `exports` 中。

```Typescript
import { Module } from '@nestjs/common'

const HANDSOME_HAPPIER = {
    provide: 'HANDSOME_MAN',
    useValue: {
        name: 'Happier'
    }
}

@Module({
    providers: [HANDSOME_HAPPIER],
    exports: [HANDSOME_HAPPIER]
})
export class HandsomeModule {}
```

在 `AppModule` 中导入，这里以 `app.module.ts` 为例。

```Typescript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HandsomeModule } from './handsome/handsome.module'

@Module({
    imports: [HandsomeModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
```

然后在 `app.controller.ts` 中注入即可。

```Typescript
import { Controller, Get, Inject } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('HANDSOME_MAN') private readonly name: string
    ) {
        console.log(this.name) // { name: 'Happier' }
    }

    @Get()
    getHello() {
        return this.appService
    }
}
```

## 异步提供者

异步提供者允许我们在提供者中执行异步操作。这里我们改造一下上面的 `handsome.module.ts`。

```Typescript
import { Module } from '@nestjs/common'

const HANDSOME_HAPPIER = {
    provide: 'HANDSOME_MAN',
    useFactory: async () => {
        const getHappier = new Promise((resolve) => {
            setTimeout(() => {
                resolve({ name: 'Happier' })
            }, 2000)
        })
        const result = await getHappier
        return result
    }
}

@Module({
    providers: [HANDSOME_HAPPIER],
    exports: [HANDSOME_HAPPIER]
})
export class HandsomeModule {}
```

此时，终端会在 2 秒后输出 `{ name: 'Happier' }`。

## 可选提供者

可选提供者允许我们在提供者不存在时，返回一个默认值。这里以 `app.module.ts` 为例。

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

然后在注入的地方，用 `@Optional()` 装饰器即可。这里以 `app.controller.ts` 为例，我们将 `HandsomeModule` 移除导入。

```Typescript
import { Controller, Get, Inject, Optional } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Optional()
        @Inject('HANDSOME_MAN')
        private readonly name = { name: 'Happier' }
    ) {
        console.log(this.name) // { name: 'Happier' }
    }

    @Get()
    getHello() {
        return this.appService
    }
}
```
