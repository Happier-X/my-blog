---
cover: https://t.alcy.cc/fj?t=1731483000000
order: 8
date: 2024-11-13 15:30
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 接口

## 接口声明

接口是对象的模板，可以看作是一种类型约定。使用了某个模板的对象，就拥有了指定的类型结构。

```TypeScript
interface Person {
  firstName: string,
  lastName: string,
  age: number
}
```

任何实现这个接口的对象，都必须部署这三个属性，并且必须符合规定的类型。

```TypeScript
const p: Person = {
  firstName: "John",
  lastName: "Smith",
  age: 25,
}
```

