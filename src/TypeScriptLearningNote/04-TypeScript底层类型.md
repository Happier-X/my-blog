---
cover: https://t.alcy.cc/fj?t=1730943000000
order: 4
date: 2024-11-07 09:30
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 底层类型

## never 类型

### 什么是 never 类型

`never` 类型表示的是那些永不存在的值的类型。

不能给 `never` 赋值，因为 `never` 表示的是那些永不存在的值的类型。

```TypeScript
let x: never
x = 123 // 报错
```

`never` 类型可以赋值给任意其他类型。

```TypeScript
function f(): never {
  throw new Error("Error")
}

let v1: number = f() // 不报错
let v2: string = f() // 不报错
let v3: boolean = f() // 不报错
```

### never 类型的作用

`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

```TypeScript
function error(message: string): never {
  throw new Error(message)
}
```

`never` 类型还用在一些类型运算之中，保证类型运算的完整性。

```TypeScript
function fn(x: string | number) {
  if (typeof x === "string") {
    // ...
  } else if (typeof x === "number") {
    // ...
  } else {
    x // x 在这里是 never 类型
  }
}
```