---
cover: https://t.alcy.cc/fj?t=1735549200000
order: 12
date: 2024-12-30 17:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 动态模块

动态模块是指在运行时动态创建的模块。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E5%8A%A8%E6%80%81%E6%A8%A1%E5%9D%9701.jpg)

## 创建动态模块

使用如下命令创建一个 `ConfigurationModule` 和 `ConfigurationService`。

```sh
nest generate module common/configuration
nest generate service common/configuration
```

修改 `configuration.module.ts` 文件，添加 `register` 方法，返回一个 `DynamicModule` 对象。

```TypeScript
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigurationService } from './configuration.service'

@Module({})
export class ConfigurationModule {
    static register(): DynamicModule {
        return {
            providers: [ConfigurationService],
            module: ConfigurationModule,
            global: true // 设置为全局模块
        }
    }
}
```

调整 `configuration.module.ts` 文件。

```TypeScript
import { DynamicModule, Module } from '@nestjs/common'
import { ConfigurationService } from './configuration.service'

@Module({})
export class ConfigurationModule {
    static register(options: { name: string }): DynamicModule {
        return {
            providers: [
                ConfigurationService,
                {
                    provide: 'Name',
                    useValue: options.name
                }
            ],
            exports: [ConfigurationService],
            module: ConfigurationModule,
            global: true
        }
    }
}
```

可以通过依赖注入的方式传递参数。

调整 `configuration.service.ts` 文件，注入的 `Name` 值。

```TypeScript
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ConfigurationService {
    constructor(@Inject('Name') private readonly name: string) {}

    getName(): string {
        return this.name
    }
}
```

## 使用动态模块

在 `app.module.ts` 文件中，使用 `ConfigurationModule.register` 方法，传入参数。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigurationModule } from './common/configuration/configuration.module'

@Module({
    imports: [ConfigurationModule.register({ name: 'Happier' })],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
```

在 `app.controller.ts` 文件中，注入 `ConfigurationService` 并调用 `getName` 方法。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { ConfigurationService } from './common/configuration/configuration.service'

@Controller()
export class AppController {
    constructor(private readonly configurationService: ConfigurationService) {}

    @Get()
    getName(): string {
        return this.configurationService.getName()
    }
}
```

当我们访问 `http://localhost:3000/` 时，会返回 `Happier`。
