---
cover: https://t.alcy.cc/fj?t=20250116180000
order: 14
date: 2025-01-16 18:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 注入作用域

Nest 在大多数情况下是采用 `单例模式` 来维护各个实例，也就是说，各个进来的请求都共享相同的实例，这些实例会维持到 `Nest App` 结束为止。但有些情况可能就需要针对各个请求做处理，这时候可以通过调整注入作用域来决定实例的创建时机。

## 作用域

Nest 共有三种作用域。

1. 默认作用域：单例模式的作用域。
2. 请求作用域：为每个请求建立全新的实例，在该请求中的提供者是共享实例的，请求结束后将进行垃圾回收。
3. 独立作用域：每个提供者都是独立的实例，在各提供者之间不共享。

### 提供者设置作用域

提供者设置作用域只需要在 `@Injectable` 装饰器中设置 `scope` 属性即可。以 `app.service.ts` 为例。

```typescript
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.REQUEST })
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
```

如果是自定义提供者，就需要多一个 `scope` 属性。以 `app.module.ts` 为例。

```typescript
import { Module, Scope } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: "USERNAME",
      useValue: "Happier",
      scope: Scope.REQUEST, // 添加 scope 属性
    },
  ],
})
export class AppModule {}
```

### 控制器设置作用域

控制器设置作用域只需要在 `@Controller` 装饰器中设置 `scope` 属性即可。以 `app.controller.ts` 为例。

```typescript
import { Controller, Get, Scope } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller({ scope: Scope.REQUEST })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
```

### 作用域冒泡

作用域的配置会影响整个注入链作用域。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E6%B3%A8%E5%85%A5%E4%BD%9C%E7%94%A8%E5%9F%9F01.jpg)

从上图中可以看到 `StorageService` 分别在 `AppModule` 与 `BookModule` 被使用，而 `BookService` 又在 `AppModule` 被使用，此时，如果我们把 `StorageService` 的作用域设置为 `请求作用域`，那么依赖于 `StorageService` 的 `BookService` 与 `AppService` 都会变成 `请求作用域`。如图。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E6%B3%A8%E5%85%A5%E4%BD%9C%E7%94%A8%E5%9F%9F02.jpg)

但如果是把 `BookService` 设为 `请求作用域`，那就仅有 `AppService` 与 `AppController` 会是 `请求作用域`，因为 `StorageService` 不依赖于 `BookService`。如图。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E6%B3%A8%E5%85%A5%E4%BD%9C%E7%94%A8%E5%9F%9F03.jpg)

### 请求作用域与请求对象

由于请求作用域是针对每一个请求来建立实例，所以可以通过注入 `REQUEST` 对象来获取当前请求对象。以 `app.service.ts` 为例。

```typescript
import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";

@Injectable({ scope: Scope.REQUEST })
export class AppService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  getHello(): string {
    return "Hello World!";
  }
}
```

## 代码演示

首先建立 `StorageModule` 和 `BookModule` 两个模块。

```sh
nest generate module common/storage
nest generate service common/storage
nest generate module common/book
nest generate service common/book
```

在 `storage.service.ts` 的 `constructor` 中打印含有随机数的字符串，通过随机数可以让我们知道该实例是否为同一实例。

```typescript
import { Injectable } from "@nestjs/common";

@Injectable()
export class StorageService {
  constructor() {
    console.log(`Storage:${Math.random()}`);
  }
  private list: any[] = [];
  public getItems(): any[] {
    return this.list;
  }
  public addItem(item: any): void {
    this.list.push(item);
  }
}
```

调整 `storage.module.ts`，将 `StorageService` 导出。

```typescript
import { Module } from "@nestjs/common";
import { StorageService } from "./storage.service";

@Module({
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
```

在 `book.service.ts` 中注入 `StorageService`，同样打印含有随机数的字符串。

```typescript
import { Injectable } from "@nestjs/common";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class BookService {
  constructor(private readonly storage: StorageService) {
    console.log(`Book:${Math.random()}`);
  }
  public getBooks(): any[] {
    return this.storage.getItems();
  }
  public addBook(book: any): void {
    this.storage.addItem(book);
  }
}
```

因为使用了 `StorageService`，所以需要调整 `book.module.ts`，将 `StorageModule` 导入。

```typescript
import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { StorageModule } from "../storage/storage.module";

@Module({
  imports: [StorageModule],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
```

调整 `app.service.ts`，将 `BookService` 和 `StorageService` 注入，同样打印含有随机数的字符串。

```typescript
import { Injectable } from "@nestjs/common";
import { BookService } from "./common/book/book.service";
import { StorageService } from "./common/storage/storage.service";

@Injectable()
export class AppService {
  constructor(
    private readonly bookService: BookService,
    private readonly storage: StorageService
  ) {
    console.log(`AppService:${Math.random()}`);
  }
  public addBookToStorage(book: any): void {
    this.storage.addItem(book);
  }
  public addBookToBookStorage(book: any): void {
    this.bookService.addBook(book);
  }
  public getStorageList(): any[] {
    return this.storage.getItems();
  }
  public getBookList(): any[] {
    return this.bookService.getBooks();
  }
}
```

修改 `app.controller.ts`，在 `constructor` 通过 `AppService` 去调用 `addBookToStorage` 和 `addBookToBookStorage` 方法。同时设计一个 `/compare` 路由来查看是否存取相同的 `StorageService` 实例。

```typescript
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    this.appService.addBookToStorage({ name: "Book 1" });
    this.appService.addBookToBookStorage({ name: "Book 2" });
    console.log(`AppController:${Math.random()}`);
  }

  @Get("/compare")
  getCompare() {
    return {
      storage: this.appService.getStorageList(),
      books: this.appService.getBookList(),
    };
  }
}
```

### 默认作用域

直接启动项目，可以在终端中看到以下信息。

```sh
Storage:0.30562040480709274
Book:0.3482662544870303
AppService:0.4339464269829618
AppController:0.7409949952291639
```

因为是单例模式，在 Nest 建立的时候，所有的依赖都会被创建，并持续到 Nest 关闭，所以我们会在启动时就看见这些字符串，并且不会再看到它们，直到下次重新启动。

此时访问 `http://localhost:3000/compare`，可以看到以下信息，会发现 `BookModule` 与 `AppModule` 会共享 `StorageService` 实例。

```json
{
  "storage": [
    {
      "name": "Book 1"
    },
    {
      "name": "Book 2"
    }
  ],
  "books": [
    {
      "name": "Book 1"
    },
    {
      "name": "Book 2"
    }
  ]
}
```

### 请求作用域

将请求作用域配置在 `BookService` 上，此时 `StorageService` 是单例的，而 `BookService`、`AppService`、`AppController` 会为每个请求创建新的实例。这里修改一下 `book.service.ts`。

```typescript
import { Injectable, Scope } from "@nestjs/common";
import { StorageService } from "../storage/storage.service";

@Injectable({ scope: Scope.REQUEST })
export class BookService {
  constructor(private readonly storage: StorageService) {
    console.log(`Book:${Math.random()}`);
  }
  public getBooks(): any[] {
    return this.storage.getItems();
  }
  public addBook(book: any): void {
    this.storage.addItem(book);
  }
}
```

此时启动项目，可以看到以下信息。

```sh
Storage:0.8921433620433323
```

只看到 `Storage` 的实例是因为 `StorageService` 保持单例模式，所以在启动时就会被创建，但 `BookService` 是请求作用域，只有当请求时才会创建，所以不会在启动时创建。

此时访问 `http://localhost:3000/compare`，可以在终端中看到以下信息。

```sh
Book:0.8971852027632254
AppService:0.7298861325599422
AppController:0.7539436362974361
```

在浏览器中会看到以下信息，跟默认作用域一样。

```json
{
  "storage": [
    {
      "name": "Book 1"
    },
    {
      "name": "Book 2"
    }
  ],
  "books": [
    {
      "name": "Book 1"
    },
    {
      "name": "Book 2"
    }
  ]
}
```

但是当重新刷新页面时，可以看到以下信息。原因是只要 `AppController` 实例化的时候就会重新添加 `Book`，所以会增加 `Book` 到 `StorageService` 中。

```json
{
  "storage": [
    {
      "name": "Book 1"
    },
    {
      "name": "Book 2"
    },
    {
      "name": "Book 1"
    },
    {
      "name": "Book 2"
    }
  ],
  "books": [
    {
      "name": "Book 1"
    },
    {
      "name": "Book 2"
    },
    {
      "name": "Book 1"
    },
    {
      "name": "Book 2"
    }
  ]
}
```

### 独立作用域

修改 `StorageService`，将作用域设置为 `独立作用域`，将 `BookService` 的 `scope` 移除。修改 `storage.service.ts`。

```typescript
import { Injectable, Scope } from "@nestjs/common";

@Injectable({ scope: Scope.TRANSIENT })
export class StorageService {
  constructor() {
    console.log(`Storage:${Math.random()}`);
  }
  private list: any[] = [];
  public getItems(): any[] {
    return this.list;
  }
  public addItem(item: any): void {
    this.list.push(item);
  }
}
```

此时启动项目，可以看到以下信息。

```sh
Storage:0.27259960782090276
Storage:0.6628122650655031
Book:0.17987248414180756
AppService:0.25920662562033203
AppController:0.2952754682634724
```

会发现 `StorageService` 会创建两个实例，原因是独立作用域在各个提供者之间是不共享实例的，而 `StorageService` 在 `BookService` 与 `AppService` 各建立了一次，所以会创建两个实例。

此时访问 `http://localhost:3000/compare`，可以看到以下信息。发现两个 `Book` 不一样，是因为两个是不同的实例。

```json
{
  "storage": [
    {
      "name": "Book 1"
    }
  ],
  "books": [
    {
      "name": "Book 2"
    }
  ]
}
```
