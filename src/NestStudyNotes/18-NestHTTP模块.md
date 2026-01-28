---
cover: https://t.alcy.cc/fj?t=20250307083000
order: 18
date: 2025-03-07 08:30:00
category: 开发
tag: Nest
excerpt: false
---

# Nest HTTP 模块

很多时候我们会需要调用第三方的 API，我们可能需要使用 HTTP 请求去调用，Nest 封装了 Axios 并通过内置的 `HttpModule` 提供访问 HTTP 模块。

## 使用 HTTP 模块

首先需要安装 `axios` 和 `@nestjs/axios` 模块。

```sh
npm install axios @nestjs/axios
```

HTTP 模块的类名为 `HttpModule`，它提供了一个 `HttpService` 的服务，该服务提供了 `axios` 的方法来处理 HTTP 请求，并且使用 `Observable` 的形式返回请求结果。

以 `app.module.ts` 为例，将 `HttpModule` 导入。

```typescript
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

调整 `app.service.ts`，使用 `HttpService` 来发送 HTTP 请求。

```typescript
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { AxiosResponse } from "axios";

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  findAll(): Observable<AxiosResponse<any>> {
    return this.httpService.get("https://api.github.com/users/octocat");
  }
}
```

## 默认 axios 配置

使用 `HttpModule.register()` 方法来配置 axios 的默认配置。

这里以 `app.module.ts` 为例，配置 axios 的默认配置。

```typescript
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

### 使用环境变量

`HttpModule` 提供了 `registerAsync` 方法，通过这个方法可以添加依赖的提供者，并使用工厂函数将其值注入到 `HttpModule` 中，使用这种方式可以将配置的默认值带入。

这里我们在 `.env` 中添加环境变量。

```
HTTP_TIMEOUT=5000
```

修改 `app.module.ts`，在 `registerAsync` 方法中导入 `ConfigModule` 并在 `inject` 中添加 `ConfigService`，然后在 `useFactory` 中使用 `ConfigService` 的 `get` 方法获取环境变量。

```typescript
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        timeout: config.get("HTTP_TIMEOUT"),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```
