---
cover: https://t.alcy.cc/fj?t=20250306100000
order: 16
date: 2025-03-06 10:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 模块引用

注入提供者的方式只需要在 `constructor` 的参数中附上对应的类型或使用 `@Inject` 装饰器来获取对应的实例。以 `app.controller.ts` 为例，在 `constructor` 的参数中附上 `AppService` 类型就可以获取 `AppService` 的实例。

```typescript
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

Nest 还有另一种获取提供者实例的方式，那就是模块引用。

## 什么是模块引用

模块引用是一个名为 `ModuleRef` 的类，它可以对提供者进行管理。

## 使用模块引用

使用模块引用与提供者注入的方式相同。只需要在 `constructor` 中注入即可。以 `app.controller.ts` 为例。

```typescript
import { Controller } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";

@Controller()
export class AppController {
  constructor(private readonly moduleRef: ModuleRef) {}
}
```

### 获取实例

注入 `ModuleRef` 后，就可以使用 `moduleRef.get` 方法来获取当前模块中的提供者、控制器或可注入项 (守卫、拦截器等)。

> 注意：此方法无法在非默认作用域中使用。

这里以 `app.controller.ts` 为例，获取 `AppService` 的实例。

```typescript
import { Controller, Get } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  private readonly appService: AppService;
  constructor(private readonly moduleRef: ModuleRef) {
    this.appService = this.moduleRef.get(AppService);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

要从全局中获取，可以将 `{ strict: false }` 作为第二个参数传递给 `moduleRef.get` 方法。

### 在非默认作用域中使用

在非默认作用域中使用模块引用时，需要使用 `moduleRef.resolve` 方法。

`resolve` 方法返回提供者的唯一实例，来自它自己的 `DI` 容器子树。每个子树都有一个独特的上下文标识符。因此，如果多次调用 `resolve` 方法，它将返回不同的实例。

```typescript
import { Controller, OnModuleInit } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { AppService } from "./app.service";
@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}
  async onModuleInit() {
    const [instance1, instance2] = await Promise.all([
      this.moduleRef.resolve(AppService),
      this.moduleRef.resolve(AppService),
    ]);
    console.log(instance1 === instance2); // false
  }
}
```

为了在多个 `resolve` 调用之间生成单个实例，并确保它们共享相同的生成的 `DI` 容器子树，您可以向 `resolve` 方法传递一个上下文标识符。使用 `ContextIdFactory` 类来生成上下文标识符。该类提供一个 `create` 方法，返回一个适当的唯一标识符。

```typescript
import { Controller, OnModuleInit } from "@nestjs/common";
import { ContextIdFactory, ModuleRef } from "@nestjs/core";
import { AppService } from "./app.service";

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly moduleRef: ModuleRef) {}
  async onModuleInit() {
    const identifier = ContextIdFactory.create();
    const [instance1, instance2] = await Promise.all([
      this.moduleRef.resolve(AppService, identifier),
      this.moduleRef.resolve(AppService, identifier),
    ]);
    console.log(instance1 === instance2); // true
  }
}
```

#### 共享子树

在请求作用域下，可以通过 `ContextIdFactory` 的 `getByRequest` 方法来基于请求对象建立上下文标识符，进而达到共享子树的效果。

这里我们在 `AppController` 中注入 `REQUEST` 并通过 `ContextIdFactory` 的 `getByRequest` 方法来获取上下文标识符，根据该标识符来执行两次 `resolve` 方法，如果两次获取的实例是同一个，则说明共享子树。

```typescript
import { Controller, Get, Inject } from "@nestjs/common";
import { ContextIdFactory, ModuleRef, REQUEST } from "@nestjs/core";
import { AppService } from "./app.service";
import { Request } from "express";

@Controller()
export class AppController {
  constructor(
    private readonly moduleRef: ModuleRef,
    @Inject(REQUEST) private readonly request: Request
  ) {}
  @Get()
  async getTruth() {
    const identifier = ContextIdFactory.getByRequest(this.request);
    const [instance1, instance2] = await Promise.all([
      this.moduleRef.resolve(AppService, identifier),
      this.moduleRef.resolve(AppService, identifier),
    ]);
    console.log(instance1 === instance2); // true
  }
}
```
