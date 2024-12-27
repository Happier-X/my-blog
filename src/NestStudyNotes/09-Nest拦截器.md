---
cover: https://t.alcy.cc/fj?t=1735288200000
order: 9
date: 2024-12-27 16:30
category: 软件开发
tag: Nest
excerpt: false
---

# Nest 拦截器

拦截器 (Interceptors) 可以具有一系列功能，它可以：

- 在函数执行之前/之后添加额外的逻辑。
- 转换从函数返回的结果。
- 转换从函数抛出的异常。
- 扩展基本函数行为。
- 根据所选条件完全重写函数。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E6%8B%A6%E6%88%AA%E5%99%A801.jpg)

## 创建拦截器

使用如下命令可以快速创建一个拦截器。

```sh
nest generate interceptor <INTERCEPTOR_NAME>
```

> <INTERCEPTOR_NAME> 可以是文件路径，例如 `interceptors/hello-world`。

这里我们创建一个 `HelloWorldInterceptor` 拦截器。

```sh
nest generate interceptor interceptors/hello-world
```

此时会在 `src/interceptors/hello-world` 下创建了一个 `hello-world.interceptor.ts` 文件和一个 `hello-world.interceptor.spec.ts` 文件。

`hello-world.interceptor.ts` 文件内容如下。

```TypeScript
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class HelloWorldInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle()
    }
}
```
