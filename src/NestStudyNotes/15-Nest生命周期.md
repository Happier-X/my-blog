---
cover: https://t.alcy.cc/fj?t=20250305110000
order: 15
date: 2025-03-05 11:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 生命周期

## onModuleInit

`onModuleInit` 会在该模块的依赖项目处理完毕时调用。

要使用 `onModuleInit`，需要实现 `OnModuleInit` 接口。

支持异步。

```typescript
import { Module, OnModuleInit } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit(): void {
    console.log("The module has been initialized.");
  }
}
```

## onApplicationBootstrap

`onApplicationBootstrap` 会在所有模块初始化后调用，但在监听连接之前调用。

要使用 `onApplicationBootstrap`，需要实现 `OnApplicationBootstrap` 接口。

支持异步。

```typescript
import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    console.log("bootstrap");
  }
}
```

## onModuleDestroy

`onModuleDestroy` 会在收到关闭信号时调用。

要使用 `onModuleDestroy`，需要实现 `OnModuleDestroy` 接口。

```typescript
import { Module, OnModuleDestroy } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleDestroy {
  onModuleDestroy(): void {
    console.log("destroy");
  }
}
```

## beforeApplicationShutdown

`beforeApplicationShutdown` 会在所有 `onModuleDestroy` 钩子执行完毕后调用 (`Promise` 解决或拒绝)，一旦完成 (`Promise` 解决或拒绝)，所有的连接将被关闭 (调用 `app.close()`)。

要使用 `beforeApplicationShutdown`，需要实现 `BeforeApplicationShutdown` 接口。

```typescript
import { BeforeApplicationShutdown, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements BeforeApplicationShutdown {
  beforeApplicationShutdown(): void {
    console.log("beforeApplicationShutdown");
  }
}
```

## onApplicationShutdown

`onApplicationShutdown` 会在连接关闭后调用。

要使用 `onApplicationShutdown`，需要实现 `OnApplicationShutdown` 接口。

```typescript
import { Module, OnApplicationShutdown } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationShutdown {
  onApplicationShutdown(): void {
    console.log("onApplicationShutdown");
  }
}
```

## 关于应用关闭

`onModuleDestroy`、`beforeApplicationShutdown`、`onApplicationShutdown` 钩子在应用关闭时都会被调用。这些钩子监听器会消耗系统资源，因此默认情况下它们是禁用的。要使用关闭钩子，必须启动监听器。

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
```
