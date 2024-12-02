---
cover: https://t.alcy.cc/fj?t=1731034800000
order: 5
date: 2024-11-08 11:00
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 类型兼容

TypeScript 的类型存在兼容关系，某些类型可以兼容其他类型。

```TypeScript
type T = number | string

let a: number = 1
let b: T = a // b 的类型兼容 a 的类型
```

如果类型 `A` 的值可以赋值给类型 `B`，那么类型 `A` 就称为类型 `B` 的子类型。在上例中，类型 `number` 就是类型 `number|string` 的子类型。

凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。

```TypeScript
let a: "hi" = "hi"
let b: string = "hello"

b = a // 正确
a = b // 报错
```