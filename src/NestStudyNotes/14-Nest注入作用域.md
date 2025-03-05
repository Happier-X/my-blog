---
cover: https://t.alcy.cc/fj?t=20250116180000
order: 14
date: 2025-01-16 18:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 注入作用域

Nest 在大多数情况下是采用 `单例模式` 来维护各个实例，也就是说，各个进来的请求都共享相同的实例，这些实例会维持到 `Nest App` 结束为止。但有些情况可能就需要针对各个请求做处理，这时候可以通过调整注入作用域来决定实例的创建时机。

## 作用域

Nest 共有三种作用域。

1. 默认作用域：单例模式的作用域。
2. 请求作用域：为每个请求建立全新的实例，在该请求中的提供者是共享实例的，请求结束后将进行垃圾回收。
3. 独立作用域：每个提供者都是独立的实例，在各提供者之间不共享。

### 提供者设置作用域

提供者设置作用域只需要在 `@Injectable` 装饰器中设置 `scope` 属性即可。以 `app.service.ts` 为例。

```typescript
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
```

如果是自定义提供者，就需要多一个 `scope` 属性。以 `app.module.ts` 为例。

```typescript
import { Module, Scope } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "USERNAME",
      useValue: "Happier",
      scope: Scope.REQUEST, // 添加 scope 属性
    },
  ],
})
export class AppModule {}
```

### 控制器设置作用域

控制器设置作用域只需要在 `@Controller` 装饰器中设置 `scope` 属性即可。以 `app.controller.ts` 为例。

```typescript
import { Controller, Get, Scope } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller({ scope: Scope.REQUEST })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
```

### 作用域冒泡

作用域的配置会影响整个注入链作用域。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E6%B3%A8%E5%85%A5%E4%BD%9C%E7%94%A8%E5%9F%9F01.png)

从上图中可以看到 `StorageService` 分别在 `AppModule` 与 `BookModule` 被使用，而 `BookService` 又在 `AppModule` 被使用，此时，如果我们把 `StorageService` 的作用域设置为 `请求作用域`，那么依赖于 `StorageService` 的 `BookService` 与 `AppService` 都会变成 `请求作用域`。如图。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E6%B3%A8%E5%85%A5%E4%BD%9C%E7%94%A8%E5%9F%9F02.png)

但如果是把 `BookService` 设为 `请求作用域`，那就仅有 `AppService` 与 `AppController` 会是 `请求作用域`，因为 `StorageService` 不依赖于 `BookService`。如图。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E6%B3%A8%E5%85%A5%E4%BD%9C%E7%94%A8%E5%9F%9F03.png)

### 请求作用域与请求对象

由于请求作用域是针对每一个请求来建立实例，所以可以通过注入 `REQUEST` 对象来获取当前请求对象。以 `app.service.ts` 为例。

```typescript
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class AppService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  getHello(): string {
    return "Hello World!";
  }
}
```
