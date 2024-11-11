---
cover: https://t.alcy.cc/fj?t=1731286800000
order: 7
date: 2024-11-11 09:00
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 对象

## 对象类型声明

对象类型的最简单声明方法，就是使用大括号表示对象，在大括号内部声明每个属性和方法的类型。

```TypeScript
const obj: {
    x: number,
    y: number,
    add(x: number, y: number): number
} = {
    x: 1,
    y: 1,
    add(x, y) {
        return x + y
    }
}
```

也可以使用 `interface` 关键字来声明对象类型。详见 [TypeScript 接口](./08-TypeScript接口.md)。

## 可选属性

如果某个属性是可选的 (即可以忽略)，需要在属性名后面加一个问号。

```TypeScript
const obj: {
  x: number
  y?: number
} = { x: 1 }
```

可选属性等同于允许赋值为 `undefined`。

## 只读属性

属性名前面加上 `readonly` 关键字，表示这个属性是只读属性，不能修改。

```TypeScript
const person: {
  readonly age: number
} = { age: 20 }

person.age = 21 // 报错
```

