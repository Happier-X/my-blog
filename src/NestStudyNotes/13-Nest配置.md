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

### 使用自定义环境变量文件

默认情况下，`ConfigModule` 会读取项目根目录下的 `.env` 文件。如果需要使用自定义的环境变量文件，可以在 `forRoot()` 方法中传入 `envFilePath` 参数。修改 `app.module.ts`。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'development.env'
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
```

在项目根目录下创建 `development.env` 文件，并添加环境变量。

```
USERNAME=Happier
```

当我们访问 `http://localhost:3000` 时，会返回 `{ username: 'Happier' }`。

我们还可以传入一个数组，来指定多个环境变量文件。比如我们有多个环境，分别是 `development.env`、`development.local.env`，我们可以这样配置。数组中的文件会按顺序依次读取，前面的文件优先级更高。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['development.local.env', 'development.env']
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
```

此时我们创建一个 `development.local.env` 文件，并添加环境变量。

```
USERNAME=Local-Happier
```

当我们访问 `http://localhost:3000` 时，会返回 `{ username: 'Local-Happier' }`。

### 使用工厂函数

有些情况下，我们可以使用工厂函数来动态创建配置。比如，我们设置了 `development.env` 文件，但是有一些不太敏感的配置可以直接使用默认值，比如 `PORT`，我们可以在工厂函数中进行配置。

在 `src` 下创建一个 `config` 文件夹，并创建一个 `configuration.factory.ts` 文件。其内容如下。

```TypeScript
export default () => ({
    PORT: process.env.PORT || 3000
})
```

修改 `app.module.ts`，在 `forRoot()` 方法中传入 `load` 参数，并传入工厂函数。

```TypeScript
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import configurationFactory from './config/configuration.factory'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: 'development.env',
            load: [configurationFactory]
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
```

修改 `app.controller.ts`，获取环境变量。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
    constructor(private readonly configService: ConfigService) {}

    @Get()
    getPort() {
        const port = this.configService.get('PORT')
        return { port }
    }
}
```

当我们访问 `http://localhost:3000` 时，会返回 `{ port: 3000 }`。

### 使用工厂函数配置命名空间

由于环境变量是使用 `key`-`value` 的形式存储的，它是扁平的，无法对环境变量进行分组。比如我们有如下环境变量。

```
DB_HOST=example.com
DB_PASSWORD=123456
PORT=3000
```

我们可以看出，`DB_HOST`、`DB_PORT`、`DB_PASSWORD` 是数据库的配置，`PORT` 是服务器的配置。如果分组的话，应该是这样的。

```json
{
  "database": {
    "host": "example.com",
    "password": "123456"
  },
  "port": "3000"
}
```

如果需要对环境变量进行分组，可以使用工厂函数配置命名空间。

修改 `configuration.factory.ts`，使用 `registerAs` 方法配置命名空间，第一个参数是命名空间，第二个参数是回调函数，返回整理好的对象。

```TypeScript
import { registerAs } from '@nestjs/config'

export default registerAs('database', () => ({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD
}))
```

修改 `app.controller.ts`，可以像操作对象一样获取环境变量。

```TypeScript
import { Controller, Get } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Controller()
export class AppController {
    constructor(private readonly configService: ConfigService) {}

    @Get()
    get() {
        const database = this.configService.get('database')
        const host = this.configService.get('database.host')
        return { database, host }
    }
}
```

当我们访问 `http://localhost:3000` 时，会返回如下内容。

```json
{
  "database": {
    "host": "example.com",
    "password": "123456"
  },
  "host": "example.com"
}
```

### 在 `main.ts` 中使用

