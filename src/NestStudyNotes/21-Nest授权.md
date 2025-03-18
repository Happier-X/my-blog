---
cover: https://t.alcy.cc/fj?t=20250318103000
order: 21
date: 2025-03-18 10:30:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 授权

授权指的是确定用户能够执行什么操作的过程。

## 基本的 RBAC 实现

RBAC (Role-Based Access Control，基于角色的访问控制) 是一种常见的授权机制，它将用户分配到不同的角色，然后为每个角色定义一组权限。

首先更新数据库中的数据模型，添加角色字段。

```schema
model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  role      String?
}
```

运行命令生成迁移文件。

```sh
npx prisma migrate dev --name add-role-column
```

运行命令生成 Prisma 客户端。

```sh
npx prisma generate
```

然后在 `src/auth/enum` 目录下创建一个 `role.enum.ts` 文件，定义角色枚举。

```typescript
export enum Role {
  Admin = "admin",
  User = "user",
}
```

可以创建一个 `@Roles()` 装饰器，用于允许指定访问特定资源所需的角色。在 `src/auth/decorator` 目录下创建一个 `roles.decorator.ts` 文件。

```typescript
import { SetMetadata } from "@nestjs/common";
import { Role } from "../enum/role.enum";

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
```

现在我们可以将 `@Roles()` 装饰器添加到控制器或路由处理程序上，以限制对特定资源的访问。

```typescript
@Post()
@Roles(Role.Admin)
async create(@Body() createUserDto: CreateUserDto) {
  return this.usersService.create(createUserDto);
}
```

最后，我们创建一个 `RolesGuard` 类，该类将比较当前用户被分配的角色与当前正在处理的路由所需的实际角色。为了访问路由的角色 (自定义元数据)，我们将使用 `Reflector` 辅助类，这个辅助类由框架提供，并从 `@nestjs/core` 包中公开出来。

在 `src/auth/guard` 目录下创建一个 `roles.guard.ts` 文件。

```typescript
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../enum/role.enum";
import { ROLES_KEY } from "../decorator/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
```

请确保注册 `RolesGuard`，例如在控制器级别或全局级别。

```typescript
providers: [
  {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },
];
```
