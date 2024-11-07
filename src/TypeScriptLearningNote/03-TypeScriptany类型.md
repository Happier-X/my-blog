---
cover: https://t.alcy.cc/fj?t=1730941200000
order: 3
date: 2024-11-07 09:00
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript any 类型

## 什么是 any 类型

any 类型表示没有任何限制，该类型的变量可以赋予任意类型的值。

```TypeScript
let x: any
x = 1 // 正确
x = "foo" // 正确
x = true // 正确
```

## 类型推断问题

对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是 any。

TypeScript 提供了一个编译选项 `noImplicitAny`，打开该选项，只要推断出 any 类型就会报错。

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

注意：使用 let 和 var 命令声明变量，但不赋值也不指定类型，是不会报错的。

## 污染问题

TypeScript 的 any 类型会污染其他类型，因为 any 类型的变量可以赋值给其他类型的变量。

```TypeScript
let x: any = "hello"
let y: number

y = x // 不报错

y * 123 // 不报错
y.toFixed() // 不报错
```