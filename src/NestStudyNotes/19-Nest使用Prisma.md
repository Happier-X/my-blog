---
cover: https://t.alcy.cc/fj?t=20250310110000
order: 19
date: 2025-03-10 11:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 使用 Prisma

## 安装依赖

首先需要安装 `Prisma Cli`。

```sh
npm install prisma --save-dev
```

## 初始化 Prisma

使用以下命令初始化 Prisma。

```bash
npx prisma init
```

这将创建一个新的 `prisma` 目录，其中包含一个 `schema.prisma` 文件，它指定了数据库连接信息和数据库架构，并且还会在根目录生成一个 `.env` 文件。

## 配置数据库连接

在 `.env` 文件中配置数据库连接 URL。

```env
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
```

在 `schema.prisma` 文件中配置数据库提供者。

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

## 使用 Prisma Migrate 创建数据库表

在 `schema.prisma` 文件中定义你的数据模型。

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

设置好 Prisma 模型后，可以生成 SQL 迁移文件并将其应用到数据库中。在终端中运行以下命令。

```sh
npx prisma migrate dev --name init
```

## 安装并生成 Prisma 客户端

Prisma Client 是一个从 Prisma 模型定义中生成的类型安全的数据库客户端。

要在项目中使用 Prisma Client，需要安装 Prisma 客户端。

```sh
npm install @prisma/client
```

> 注意，在安装过程中，Prisma 会自动调用 `npx prisma generate` 命令，将来每次对 Prisma 模型进行修改后，都需要运行 `npx prisma generate` 命令来重新生成 Prisma 客户端。

## 使用 Prisma Client

在 `src` 下创建一个名为 `prisma.service.ts` 的文件，并添加以下代码。

```typescript
import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

接下来就可以在其他服务中注入 `PrismaService` 并使用了。这里以 `app.service.ts` 为例。

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async findUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
}
```
