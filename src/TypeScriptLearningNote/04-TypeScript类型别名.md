---
cover: https://t.alcy.cc/fj?t=1731033000000
order: 4
date: 2024-11-08 10:30
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 类型别名

使用 `type` 关键字来定义类型别名。

```TypeScript
type Age = number

let age: Age = 55
```

别名不允许重名。

别名的作用域是块级作用域。

```TypeScript
type Color = "red"

if (Math.random() < 0.5) {
  type Color = "blue"
}
```

别名支持使用表达式，也可以在定义一个别名时，使用另一个别名，即别名允许嵌套。

```TypeScript
type World = "world"
type Greeting = `hello ${World}`
```