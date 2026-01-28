---
cover: https://t.alcy.cc/fj?t=20250318143000
order: 23
date: 2025-03-18 14:30:00
category: 开发
tag: Nest
excerpt: false
---

# Nest CORS

CORS (Cross-Origin Resource Sharing，跨域资源共享) 是一种安全策略，用于控制浏览器是否允许某个资源从另一个源 (域) 请求资源。

## 配置 CORS

要启用 CORS，在 `main.ts` 文件中进行配置，为应用程序添加 `enableCors()` 方法。

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

`enableCors()` 方法接受一个可选的配置对象参数。这个对象的可用属性在官方的 [CORS 文档](https://github.com/expressjs/cors#configuration-options)中有描述。另一种方法是传递一个[回调函数](https://github.com/expressjs/cors#configuring-cors-asynchronously)，让您可以根据请求 (即时) 异步地定义配置对象。

另外，您还可以通过 `create()` 方法的选项对象来启用 CORS。将 `cors` 属性设置为 `true`，以使用默认设置启用 CORS。或者，将 CORS 配置对象或回调函数作为 `cors` 属性的值，以定制其行为。

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```
