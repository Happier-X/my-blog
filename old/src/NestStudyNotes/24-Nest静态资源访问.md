---
cover: https://t.alcy.cc/fj?t=20250318150000
order: 24
date: 2025-03-18 15:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 静态资源访问

## 配置

创建一个 `public` 文件夹用来存放静态资源。

在 `main.ts` 文件中调用 useStaticAssets 来实现静态资源访问。

```typescript
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets("public", { prefix: "/static" });
  await app.listen(3000);
}
bootstrap();
```

## 访问

在浏览器中访问 `localhost:3000/static/文件` 即可。
