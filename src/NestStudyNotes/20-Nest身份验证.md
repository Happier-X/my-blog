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
  username  String   @unique
  email     String   @unique
  password  String
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

然后在 `auth.service.ts` 文件中实现注册方法。对密码进行哈希加密，可以防止数据库泄露后密码被破解。

这里使用 `Argon2` 库来实现。

```sh
npm i argon2
```

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerObj: RegisterDto) {
    const { username, email } = registerObj;
    const password = await argon2.hash(registerObj.password);
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

在 `auth.controller.ts` 文件中实现注册方法。

```typescript
import { Controller, Post, Body } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerObj: RegisterDto) {
    return this.authService.register(registerObj);
  }
}
```

## 实现本地验证

本地验证是使用用户名和密码进行验证，通常会使用 `passport-local` 这个策略与 `passport` 进行搭配。安装 `passport-local` 策略。

```sh
npm install passport-local
npm install @types/passport-local -D
```

### 实现策略

在 `AuthService` 中实现一个 `validate` 方法，来验证用户名和密码，如果验证成功，则返回用户信息，否则返回 `null`。

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async register(registerObj: RegisterDto) {
    const { username, email } = registerObj;
    const password = await argon2.hash(registerObj.password);
    return this.prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  }

  async validate(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }
}
```

完成了验证方法后，需要将它与 `passport` 搭配，我们需要建立一个提供者作为 `strategy`，通过该提供者与 `passport` 进行搭配。

在 `src/auth` 下面创建一个 `strategy` 文件夹并创建 `local.strategy.ts`，在这个文件中实现一个 `LocalStrategy` 的 `class`，需要特别注意的是这个 `class` 要继承 `passport-local` 的 `strategy`。但是需要通过 Nest 的函数连接，并实现 `validate(username: string, password: string)` 方法，这个方法就是 passport 流程的入口，在这里我们调用 `AuthService` 的 `validate` 方法进行验证。

```typescript
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { Strategy } from "passport-local";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { username: user.username, email: user.email };
  }
}
```

还需要在 `auth.module.ts` 文件中注册 `LocalStrategy`。

```typescript
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy],
})
export class AuthModule {}
```

### 实现守卫

实现完 `strategy` 以后，就要实现一个 API 来处理登录验证，我们在 `AuthController` 中添加一个 `login` 方法并套用 `AuthGuard`，因为我们是使用 `passport-local` 这个 `strategy`，所以要在 `AuthGuard` 带入 `local` 这个字符串，`passport` 会自动与本地策略进行搭配，然后 `passport` 会将 `LocalStrategy` 的 `validate` 方法进行调用，并传入 `username` 和 `password`。

```typescript
import { Controller, Post, Body, UseGuards, Req } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerObj: RegisterDto) {
    return this.authService.register(registerObj);
  }

  @UseGuards(AuthGuard("local"))
  @Post("login")
  login(@Req() req: Request) {
    return req.user;
  }
}
```

这样我们就实现了本地验证的登录功能。

## Token 验证

我们已经处理好注册与登录的部分，但一个完整的账户机制还需要包含登录后的身份识别，要实现这样的识别功能有很多种做法，`Token` 是其中一个被广泛运用的方案。

`Token` 就是一个用来表示身份的媒介，当使用者成功登录时，系统会产生出一个独一无二的 `Token`，并将该 `Token` 返回给使用者，只要在 `Token` 有效期间内，该使用者在请求中带上该 `Token`，系统便会识别出此操作的使用者是谁。

目前最常见的 `Token` 生成方式是使用 `JWT`。`JWT` 是一种较新的 `Token` 设计方法，它最大的特点是可以在 `Token` 中含有使用者信息，不过仅限于较不敏感的内容，比如：使用者名称、性别等，原因是 `JWT` 是用 `Base64` 进行编码，使用者信息可以透过 `Base64` 进行还原，使用上需要特别注意。

### 安装 JWT

安装依赖。

```sh
npm install @nestjs/jwt passport-jwt
npm install @types/passport-jwt -D
```

### 实现 JWT 验证

首先在`.env`文件中添加`JWT_SECRET`，用于存储 JWT 的密钥。

```
JWT_SECRET=your-secret-key
```

引入`@nestjs/config`，用于读取`.env`文件中的配置。

```sh
npm install @nestjs/config --save
```

然后修改`app.module.ts`文件，引入`ConfigModule`。

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```
