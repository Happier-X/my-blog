---
cover: https://t.alcy.cc/fj?t=20250307100000
order: 19
date: 2025-03-07 10:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 使用 MongoDB

## 安装依赖

```sh
npm install @nestjs/mongoose mongoose
```

## 连接 MongoDB

在 `AppModule` 中导入 `MongooseModule` 并使用 `forRoot` 方法连接 MongoDB，它等同于 `mongoose.connect` 方法 (详情见 [Mongoose 文档](https://mongoosejs.com/docs/connections.html))。

这里以 `app.module.ts` 为例。

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost:27017/nest")],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

### 使用环境变量

`MongooseModule` 提供了 `forRootAsync` 方法，通过这个方法可以把依赖注入进来，使 `MongooseModule` 在建立时可以使用依赖来赋值。这里可以把 `ConfigModule` 引入，并注入 `ConfigService` 来获取环境变量。

首先在 `.env` 文件下添加 MongoDB 的配置。

```
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=nest
MONGODB_USER=root
MONGODB_PASSWORD=123456
```

可以使用命名空间，将 MongoDB 的配置归类在 `mongo` 下。

在 `src/config` 文件夹下新增 `mongo.config.ts` 来实现工厂函数。

```typescript
import { registerAs } from "@nestjs/config";

export default registerAs("mongo", () => {
  const url = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`;
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  return {
    url,
    user,
    password,
  };
});
```

然后修改 `app.module.ts`，配置 `ConfigModule` 和 `MongooseModule`，在 `forRoot` 方法中注入 `ConfigService` 来获取配置。

```typescript
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import mongoConfigFactory from "./config/mongo.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoConfigFactory],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get("mongo.url"),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

## mongoose 概念

mongoose 主要包含 `Schema`、`Model`。

### Schema

MongoDB 最基本的元素为 `document`，多个 `document` 形成的集合为 `collection`。

![](https://happier-blog.oss-cn-qingdao.aliyuncs.com/NestStudyNotes/Nest%E4%BD%BF%E7%94%A8MongoDB01.jpg)

每一个 `schema` 都对应一个 `collection`，它制定该 `collection` 下所有 `document` 的字段与字段规则，是最基础的元素。

### Model

通过 `schema` 制定结构后，无法直接通过它存取数据库，真正执行存取元素的是 `model`，所有的 `model` 都是基于 `schema` 产生的，通过 `model` 便可以操作该 `schema` 所对应的 `collection`，并且所有的增、删、改、查都会根据 `schema` 的定义来执行。

## Schema 设计


