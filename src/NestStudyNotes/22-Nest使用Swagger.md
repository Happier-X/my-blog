---
cover: https://t.alcy.cc/fj?t=20250318110000
order: 22
date: 2025-03-18 11:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 使用 Swagger

Swagger 是一个用于生成和展示 API 文档的工具。NestJS 提供了 `@nestjs/swagger` 包，可以帮助我们轻松地生成和展示 API 文档。

## 安装依赖

```sh
npm install --save @nestjs/swagger
```

## 引导

在 `main.ts` 文件中使用 `SwaggerModule` 类初始化 Swagger。

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("标题")
    .setDescription("描述")
    .setVersion("1.0")
    .addTag("tag")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```

此时访问 `http://localhost:3000/api` 即可看到 Swagger 的 UI 界面。
