---
cover: https://t.alcy.cc/fj?t=1730946600000
order: 6
date: 2024-11-07 10:30
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 包装对象类型

在 JavaScript 中，基本类型是没有属性和方法的，但是当我们对一个基本类型使用属性和方法时，JavaScript 会自动将这个基本类型包装成一个对象，然后调用对象的属性和方法。

例如，我们可以对字符串使用 `length` 属性来获取字符串的长度。

```JavaScript
const str = "hello"
console.log(str.length) // 5
```

在 JavaScript 中包装对象有 `String`、`Number`、`Boolean`。

`String()`、`Number()`、`Boolean()` 这三个构造函数执行后可以直接获取某个原始类型值的包装对象。

在 TypeScript 中，我们可以使用 `String`、`Number`、`Boolean` 来表示这些包装对象类型。

```TypeScript
const s1: String = "hello" // 正确
const s2: String = new String("hello") // 正确

const s3: string = "hello" // 正确
const s4: string = new String("hello") // 报错
```

建议只使用小写类型，不使用大写类型。因为绝大部分使用原始类型的场合，都是使用字面量，不使用包装对象。而且，TypeScript 把很多内置方法的参数，定义成小写类型，使用大写类型会报错。

```TypeScript
const n1: number = 1
const n2: Number = 1

Math.abs(n1) // 1
Math.abs(n2) // 报错
```