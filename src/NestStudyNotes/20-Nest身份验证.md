---
cover: https://t.alcy.cc/fj?t=20250311170000
order: 20
date: 2025-03-11 17:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 身份验证

身份验证是大多数应用程序中的重要部分。处理身份验证有许多不同的方法和策略。

一个应用程序可能会有非常多种的注册方式，比如本地账号注册方式、使用社交账号注册等，每一种账号注册方式都有一套自己的策略 (Strategy)，那要怎么管理各种账户验证 (Authentication) 的策略就非常重要，我们希望各种策略都能采用同一套标准来进行开发，这时候就可以通过一些工具来辅助我们处理，Nest 使用了 `passport` 这个库来处理身份验证。

## passport 介绍

`passport` 采用了策略模式来管理各种验证方式，它主要由两个部分构成整个账户验证程序，分别为是 `passport` 与 `passport strategy`。`passport` 本身是用来处理验证流程的，而 `passport strategy` 则是验证机制，两者缺一不可，整个 `passport` 生态系有上百种的验证机制让开发人员使用，如本地验证、社交账号验证等，完美解决了各种验证机制的处理。

在 Nest 中，`passport strategy` 会与守卫进行搭配，通过 `AuthGuard` 将 `strategy` 包装起来，就可以通过 Nest 的守卫机制来与 `passport` 进行搭配。

## 安装 passport

```sh
npm install @nestjs/passport passport
```

## 实现注册

在开始身份验证之前，需要先设计一个注册的 API。

### 连接数据库

使用 Prisma 连接 MySQL 数据库，用于将用户数据存储到数据库中。

其中 `user` 数据模型如下。

```schema
model User {
  id        Int      @id @default(autoincrement())
  username  String
  email     String   @unique
  password  String
}
```

### 封装密码哈希方法

对密码进行哈希加密，可以防止数据库泄露后密码被破解。

这里使用 `Argon2` 库来实现。

```sh
npm i argon2
```

在 `src/utils` 目录下创建 `crypto.util.ts` 文件，并实现哈希加密方法。

```typescript
import * as argon2 from "argon2";

/**
 * 加密工具类
 */
export class CryptoUtil {
  public static encrypt(input: string) {
    // 使用 Argon2 加密
    return argon2.hash(input);
  }
}
```

### 创建 Auth 模块

使用如下命令创建 `AuthModule`、`AuthService` 和 `AuthController`。

```sh
nest generate module auth
nest generate service auth
nest generate controller auth
```

修改 `auth.module.ts` 文件，引入 `PrismaService` 来操作数据库。

```typescript
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
```

安装 `class-validator` 和 `class-transformer` 来实现对用户注册信息进行验证。

```sh
npm install class-validator class-transformer
```

设计一个 `DTO` 来对用户注册信息进行验证。在 `src/auth/dto` 目录下创建 `register.dto.ts` 文件。

```typescript
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
  @MinLength(6)
  @MaxLength(16)
  public readonly username: string;

  @IsNotEmpty()
  public readonly email: string;

  @MinLength(8)
  @MaxLength(20)
  public readonly password: string;
}
```

然后在 `auth.service.ts` 文件中实现注册方法。

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./register.dto";
import { CryptoUtil } from "src/utils/crypto.util";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerObj: RegisterDto) {
    const { username, email } = registerObj;
    const password = await CryptoUtil.encrypt(registerObj.password);
    return this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }
}
```
