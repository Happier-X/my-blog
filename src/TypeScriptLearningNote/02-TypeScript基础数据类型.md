---
cover: https://t.alcy.cc/fj?t=1730862000000
order: 2
date: 2024-11-06 11:00
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 基础数据类型

## boolean 类型

`boolean` 类型只包含 `true` 和 `false` 两个布尔值。

```TypeScript
let isDone: boolean = false
```

## number 类型

`number` 类型包含所有整数和浮点数。

```TypeScript
const x: number = 123
const y: number = 3.14
const z: number = 0xffff
```

## string 类型

`string` 类型包含所有字符串。

```TypeScript
const x: string = "hello"
const y: string = `${x} world`
```

## bigint 类型

`bigint` 类型包含所有的大整数。

```TypeScript
const x: bigint = 123n
const y: bigint = 0xffffn
```

## symbol 类型

`symbol` 类型包含所有的 `Symbol` 值。

```TypeScript
const x: symbol = Symbol()
```

## object 类型

`object` 类型包含了所有对象、数组和函数。

```TypeScript
const x: object = { foo: 123 }
const y: object = [1, 2, 3]
const z: object = (n: number) => n + 1
```

## undefined 类型

`undefined` 类型只包含一个值`undefined`，表示未定义（即还未给出定义，以后可能会有定义）。

```TypeScript
let x: undefined = undefined
```

## null 类型

`null` 类型只包含一个值`null`，表示为空（即此处没有值）。

```TypeScript
const x: null = null
```

