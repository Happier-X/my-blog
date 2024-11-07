---
cover: https://t.alcy.cc/fj?t=1730943000000
order: 4
date: 2024-11-07 09:30
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript unknown 类型

## 什么是 unknown 类型

所有类型都可以赋值给 `unknown` 类型。

```TypeScript
let x: unknown

x = true // 正确
x = 42 // 正确
x = "Hello World" // 正确
```

`unknown` 类型赋值给 `any` 和 `unknown` 以外类型的变量都会报错。

```TypeScript
let v: unknown = 123

let v1: boolean = v // 报错
let v2: number = v // 报错
```

不能直接调用 `unknown` 类型变量的方法和属性。

```TypeScript
let v1: unknown = { foo: 123 }
v1.foo // 报错

let v2: unknown = "hello"
v2.trim() // 报错

let v3: unknown = (n = 0) => n + 1
v3() // 报错
```

`unknown` 类型变量能够进行的运算是有限的，只能进行比较运算 (运算符 `==`、`===`、`!=`、`!==`、`||`、`&&`、`?`)、取反运算 (运算符 `!`)、`typeof` 运算符和 `instanceof` 运算符。

```TypeScript
let a: unknown = 1

a + 1 // 报错
a === 1 // 正确
```

## 如何使用 unknown 类型

`unknown` 类型可以通过类型缩小来使用。

```TypeScript
let a: unknown = 1

if (typeof a === "number") {
  let r = a + 10 // 正确
}
```