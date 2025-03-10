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

这将创建一个新的 `prisma` 目录，其中包含一个 `schema.prisma` 文件，它指定了数据库连接信息和数据库架构。

## 配置数据库连接

在 `.env` 文件中配置数据库连接 URL：

```env
DATABASE_URL="mysql://用户名:密码@localhost:3306/数据库名"
```

在 `schema.prisma` 文件中配置数据库提供者：

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

### 4。定义数据模型

在 `schema.prisma` 文件中定义你的数据模型：

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

### 5。创建 Prisma 服务

创建一个 Prisma 模块和服务：

```bash
nest g module prisma
nest g service prisma
```

实现 PrismaService：

```typescript
// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

配置 PrismaModule：

```typescript
// src/prisma/prisma.module.ts
import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

### 6。数据库迁移

生成并应用迁移：

```bash
npx prisma migrate dev --name init
```

这个命令会：

1. 保存迁移记录到 `prisma/migrations` 目录
2. 应用迁移到数据库
3. 生成 Prisma Client
4. 触发 `prisma generate` 命令

### 7。在服务中使用

示例：创建用户服务

```typescript
// src/users/users.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User, Prisma } from "@prisma/client";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
```

## 最佳实践

1. **错误处理**：使用 try-catch 处理数据库操作可能出现的错误

```typescript
try {
  await this.prisma.user.create({
    data: userData,
  });
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // 处理已知错误
  }
  throw error;
}
```

2. **事务处理**：使用事务确保数据一致性

```typescript
await this.prisma.$transaction(async (tx) => {
  // 在事务中执行多个操作
  const user = await tx.user.create({
    data: userData,
  });
  await tx.profile.create({
    data: {
      userId: user.id,
      ...profileData,
    },
  });
});
```

3. **中间件使用**：可以使用 Prisma 中间件记录查询或修改数据

```typescript
this.prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(
    `查询 ${params.model}.${params.action} 耗时: ${after - before}ms`
  );
  return result;
});
```

## 常见问题

1. **连接问题**：确保数据库连接字符串正确，并且数据库服务器正在运行

2. **模型定义**：注意模型关系的定义，确保外键约束正确

3. **性能优化**：

   - 使用适当的索引
   - 避免 N+1 查询问题
   - 合理使用 include 和 select

4. **类型安全**：充分利用 Prisma 的类型系统，配合 TypeScript 使用

## 总结

Prisma 是一个强大的 ORM 工具，它与 NestJS 完美集成，提供了：

- 类型安全的数据库操作
- 直观的数据模型定义
- 简单的迁移管理
- 优秀的开发体验

通过合理使用 Prisma，可以大大提高开发效率和代码质量。
