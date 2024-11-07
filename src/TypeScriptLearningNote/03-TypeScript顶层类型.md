---
cover: https://t.alcy.cc/fj?t=1730941200000
order: 3
date: 2024-11-07 09:00
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 顶层类型

## any 类型

### 什么是 any 类型

`any` 类型表示没有任何限制，该类型的变量可以赋予任意类型的值。

使用 `any` 类型，相当于不进行类型检查。

```TypeScript
let x: any
x = 1 // 正确
x = "foo" // 正确
x = true // 正确
```

### 类型推断问题

对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是 `any`。

TypeScript 提供了一个编译选项 `noImplicitAny`，打开该选项，只要推断出 `any` 类型就会报错。

```sh
tsc --noImplicitAny xxx.ts
```

也可以在 `tsconfig.json` 中配置。

```json
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

注意：使用 `let` 和 `var` 命令声明变量，但不赋值也不指定类型，是不会报错的。

### 污染问题

TypeScript 的 `any` 类型会污染其他类型，因为 `any` 类型的变量可以赋值给其他类型的变量。

```TypeScript
let x: any = "hello"
let y: number

y = x // 不报错

y * 123 // 不报错
y.toFixed() // 不报错
```

## unknown 类型

### 什么是 unknown 类型

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

### 如何使用 unknown 类型

`unknown` 类型可以通过类型缩小来使用。

```TypeScript
let a: unknown = 1

if (typeof a === "number") {
  let r = a + 10 // 正确
}
```