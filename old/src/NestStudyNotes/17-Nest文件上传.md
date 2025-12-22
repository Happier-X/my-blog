---
cover: https://t.alcy.cc/fj?t=20250306140000
order: 17
date: 2025-03-06 14:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 文件上传

要处理文件上传，Nest 提供了一个基于 `express-multer` 中间件包的内置模块。`Multer` 处理以 `multipart/form-data` 格式发布的数据。

## 使用 Multer

为了更好的类型安全性，需安装 `Multer` 的类型定义包。

```sh
npm install @types/multer -D
```

### 单文件上传

接收单文件的方式很简单，只需要在特定路由下使用 `FileInterceptor` 并通过参数装饰器 `@UploadedFile` 来获取文件。其中 `FileInterceptor` 接收两个参数，第一个是文件在表单上对应的名称，第二个是可选的配置对象 (参考 `multer` 的[官方文档](https://github.com/expressjs/multer))。

这里以 `app.controller.ts` 为例。

```typescript
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller()
export class AppController {
  @Post("/single")
  @UseInterceptors(FileInterceptor("file"))
  uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
```

### 单一字段的多文件上传

如果同一个字段名称有一个以上的文件，则需要使用 `FilesInterceptor`，并通过参数装饰器 `@UploadedFiles` 来获取一个包含多个 `Express.Multer.File` 类型的数组。其中 `FilesInterceptor` 接收三个参数，第一个是文件在表单上对应的名称，第二个是可选的文件数量上限，第三个是可选的配置对象 (参考 `multer` 的[官方文档](https://github.com/expressjs/multer))。

这里以 `app.controller.ts` 为例。

```typescript
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller()
export class AppController {
  @Post("/multiple")
  @UseInterceptors(FilesInterceptor("files"))
  uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return files.map(({ fieldname, originalname }) => ({
      fieldname,
      originalname,
    }));
  }
}
```

### 多字段的多文件上传

如果表单有多个字段并且有一个以上的字段包含文件，则需要使用 `FileFieldsInterceptor` 并通过 `@UploadedFiles` 装饰器来获取一个以字段名称作为 `key` 的对象，其值为 `Express.Multer.File` 类型的数组。其中 `FileFieldsInterceptor` 接收两个参数，第一个是一个包含多个对象的数组，对象需要包含 `name` 属性和 `maxCount` 属性 (可选的) 来指定文件在表单上的名称和数量上限，第二个是可选的配置对象 (参考 `multer` 的[官方文档](https://github.com/expressjs/multer))。

这里以 `app.controller.ts` 为例。

```typescript
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@Controller()
export class AppController {
  @Post("/multiple")
  @UseInterceptors(
    FileFieldsInterceptor([{ name: "first", maxCount: 2 }, { name: "second" }])
  )
  uploadMultipleFiles(
    @UploadedFiles()
    files: {
      first?: Express.Multer.File[];
      second?: Express.Multer.File[];
    }
  ) {
    const { first, second } = files;
    const list = [...first, ...second];
    return list.map(({ fieldname, originalname }) => ({
      fieldname,
      originalname,
    }));
  }
}
```

### 不分字段的多文件上传

如果表单有多个字段并且有一个以上的字段包含文件，但不需要按照字段名称来进行分类的话，可以直接使用 `AnyFilesInterceptor` 并通过 `@UploadedFiles` 装饰器来获取一个包含多个 `Express.Multer.File` 类型的数组。其中 `AnyFilesInterceptor` 接收一个参数，即可选的配置对象 (参考 `multer` 的[官方文档](https://github.com/expressjs/multer))。

这里以 `app.controller.ts` 为例。

```typescript
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor } from "@nestjs/platform-express";

@Controller()
export class AppController {
  @Post("/multiple")
  @UseInterceptors(AnyFilesInterceptor())
  uploadMultipleFiles(
    @UploadedFiles()
    files: Express.Multer.File[]
  ) {
    return files.map(({ fieldname, originalname }) => ({
      fieldname,
      originalname,
    }));
  }
}
```

## 默认的 Multer 配置

上面的所有方法都使用了 `Multer` 配置，如果有一个配置是所有方法都需要的，则可以创建一个默认的配置。只需要导入 `MulterModule`，并使用 `register` 方法注册一个默认的配置即可。

这里以 `app.module.ts` 为例，我们希望把上传的文件存储到 `uploads` 目录下，那么可以在 `register` 里面给定 `dest` 属性，并指定其值为 `./uploads`。

```typescript
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```

## 实现文件存储

可以使用 `Multer` 提供的 `diskStorage` 来帮助我们实现文件存储。

`diskStorage` 是一个函数，我们可以通过指定 `destination` 来配置文件的存储位置、指定 `filename` 去处理文件名称，这两个属性的值均为函数。

修改 `app.module.ts` 文件，将 `register` 对象中的 `dest` 改为 `storage`，并配置 `destination` 和 `filename`。

```typescript
import { Module } from "@nestjs/common";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { join } from "path";
import { AppController } from "./app.controller";
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        // 指定存放路径
        destination: join(__dirname, "../uploads"),
        // 指定文件名
        filename: (req, file, callback) => {
          const fileName = `${new Date().getTime()}-${file.originalname}`;
          return callback(null, fileName);
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
```
