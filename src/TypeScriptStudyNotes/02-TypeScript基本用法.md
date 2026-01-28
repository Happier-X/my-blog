---
cover: https://t.alcy.cc/fj?t=1730862000000
order: 2
date: 2024-11-06 11:00:00
category: 开发
tag: TypeScript
excerpt: false
---

# TypeScript 基本用法

## 类型注解

TypeScript 是 JavaScript 的超集，它为 JavaScript 添加了类型注解的功能。

语法：`: 类型`。

```TypeScript
let num: number = 123
let str: string = 'hello'
```

## 类型推断

TypeScript 会根据变量的值自动推断出它的类型。

```TypeScript
let num = 123
let str = 'hello'
```

## 值与类型

值是运行时的具体数据，类型是值的集合。

TypeScript 代码只涉及类型，不涉及值。所有跟 “值” 相关的处理，都由 JavaScript 完成。
