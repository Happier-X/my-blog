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

### 生成 JWT

首先在 `.env` 文件中添加 `JWT_SECRET`，用于存储 JWT 的密钥。

```
JWT_SECRET=your-secret-key
```

引入 `@nestjs/config`，用于读取 `.env` 文件中的配置。

```sh
npm install @nestjs/config --save
```

然后修改 `app.module.ts` 文件，引入 `ConfigModule`，并使其全局可用。

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

完成密钥配置后，在处理验证的 `AuthModule` 中导入 `JwtModule`，并使用 `registerAsync` 方法来配置 JWT。

```typescript
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get("JWT_SECRET");
        return {
          secret,
          signOptions: {
            expiresIn: "1d",
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy],
})
export class AuthModule {}
```

上面我们是让用户登录后获得用户的信息，这里我们将会把这个机制换成回传 JWT，让用户可以顺利拿到它来使用授权的功能，所以我们要在 `AuthService` 中设计一个 `generateJwt` 方法来调用 `JwtService` 的 `sign` 方法产生 JWT，该方法需要传入要放在 “内容” 部分的数据，这里我们就放入用户的 `id` 和 `username`。

```typescript
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

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

  generateJwt(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

上面我们在 `LocalStrategy` 中只返回了 `username` 和 `email`，现在我们要修改一下，返回整个用户的信息。

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
    return user;
  }
}
```

最后在 `AuthController` 中，我们需要修改一下 `login` 方法，返回 `token`。

```typescript
import { Controller, Post, Body, UseGuards, Req } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { User } from "@prisma/client";

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
    return this.authService.generateJwt(req.user as User);
  }
}
```

此时，我们登录后，会返回一个 `token`。

### 验证 JWT

接下来我们需要实现 `JwtStrategy` 与 `passport` 进行配合，跟 `LocalStrategy` 的实现方式差不多，必须继承 `passport-jwt` 的 `strategy`，不同的地方在于 `super` 传入的参数。在 `src/auth/strategy` 下创建一个 `jwt.strategy.ts` 文件。

```typescript
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get("JWT_SECRET")!,
    });
  }
  validate(payload: any) {
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
```

然后在 `AuthModule` 中引入 `JwtStrategy`。

```typescript
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get("JWT_SECRET");
        return {
          secret,
          signOptions: {
            expiresIn: "1d",
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
```

### 保护路由

使用 `@UseGuards(AuthGuard('jwt'))` 装饰器来保护需要验证的路由。

### 全局启用守卫

在任何模块中使用如下结构可以将 `JwtAuthGuard` 注册为全局守卫。

```typescript
providers: [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
];
```

但是我们必须提供一种机制来声明某些路由是公开的。我们可以通过创建一个自定义装饰器来实现这一点。

在 `src/auth/decorator` 下创建一个 `auth.decorator.ts` 文件。

```typescript
import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

在 `src/auth/guard ` 下创建一个 ` jwt-auth.guard.ts ` 文件，来扩展 ` AuthGuard`。

```typescript
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "./decorator/auth.decorator";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
```

此时我们可以在任何路由上使用 `@Public()` 装饰器来声明该路由是公开的。
