---
cover: https://t.alcy.cc/fj?t=1735293600000
order: 10
date: 2024-12-27 18:00
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 守卫

守卫 (Guards) 用于对 Nest 应用中的路由进行验证的。守卫根据运行时出现的某些条件 (例如权限，角色，访问控制列表等) 来确定给定的请求是否由路由处理程序处理。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E5%AE%88%E5%8D%AB01.jpg)

## 创建守卫

使用如下命令可以快速创建一个守卫。

```sh
nest generate guard <GUARD_NAME>
```

> <GUARD_NAME> 可以是文件路径，例如 `guards/auth`。

这里我们创建一个 `AuthGuard` 守卫。

```sh
nest generate guard guards/auth
```

此时会在 `src/guards/auth` 下创建了一个 `auth.guard.ts` 文件和一个 `auth.guard.spec.ts` 文件。

`auth.guard.ts` 文件内容如下。

```TypeScript
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        return true
    }
}
```

从上面的代码可以看出，`AuthGuard` 类使用了 `@Injectable()` 装饰器，该类实现了 `CanActivate` 接口，并实现了 `canActivate()` 方法，该方法接收一个 `context:ExecutionContext` 参数。

`canActivate()` 方法可以是同步的，也可以是异步的，返回值可以是布尔值，也可以是 `Promise<boolean>`，也可以是 `Observable<boolean>`，如果要验证通过，则必须返回 `true`。

## 使用守卫

