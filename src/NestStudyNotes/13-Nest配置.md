---
cover: https://t.alcy.cc/fj?t=1736128800000
order: 13
date: 2025-01-06 10:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 配置

## 环境变量

一套系统中，可能会有多个环境，比如开发环境、测试环境、生产环境等。这些环境通常会有不同的配置，因此需要使用环境变量来区分。

在 Node.js 中，通常使用 `.env` 文件来存储环境变量。

为了方便起见，Nest 提供了 `@nestjs/config` 包来处理环境变量。

## 安装

```sh
npm install @nestjs/config --save
```

## 使用

安装完成后我们可以导入 `ConfigModule`。通常在 `app.module.ts` 中导入。调用 `forRoot()` 方法即可使用。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
```

在项目根目录下创建 `.env` 文件，并添加环境变量。

```
USERNAME=Happier
```

修改 `app.controller.ts`，在 `AppController` 中注入 `ConfigService`，并使用 `get()` 方法获取环境变量。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
    constructor(private readonly configService: ConfigService) {}

    @Get()
    getUsername() {
        const username = this.configService.get('USERNAME')
        return { username }
    }
}
```

当我们访问 `http://localhost:3000` 时，会返回 `{ username: 'Happier' }`。
