---
cover: https://t.alcy.cc/fj?t=1731483000000
order: 8
date: 2024-11-13 15:30
category: 开发
tag: TypeScript
excerpt: false
---

# TypeScript 接口

## 接口声明

接口 (interface) 是对象的模板，可以看作是一种类型约定。使用了某个模板的对象，就拥有了指定的类型结构。

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

## 接口的继承

接口可以继承其他类型。

### 继承接口

接口可以使用 `extends` 关键字，继承其他接口。

```TypeScript
interface Shape {
  name: string
}

interface Circle extends Shape {
  radius: number
}
```

接口允许多重继承。

```TypeScript
interface Style {
  color: string
}

interface Shape {
  name: string
}

interface Circle extends Style, Shape {
  radius: number
}
```

多重继承时，如果多个父接口存在同名属性，那么这些同名属性不能有类型冲突，否则会报错。

```TypeScript
interface Foo {
  id: string
}

interface Bar {
  id: number
}

// 报错
interface Baz extends Foo, Bar {
  type: string
}
```

### 继承 type

接口也可以继承 `type` 定义的对象类型。

```TypeScript
type Country = {
  name: string,
  capital: string
}

interface CountryWithPop extends Country {
  population: number
}
```

### 继承 class

接口也可以继承 `class` 定义的类。

```TypeScript
class A {
  x: string = ""
  y(): boolean {
    return true
  }
}

interface B extends A {
  z: number
}
```

## 接口合并

多个同名接口会合并成一个接口。

```TypeScript
interface Box {
  height: number,
  width: number
}

interface Box {
  length: number
}
```

两个 `Box` 接口会合并成一个接口，拥有 `height`、`width` 和 `length` 三个属性。

## 接口与 type 的异同

相同点：

1. 都可以定义对象类型。

不同点：

1. `type` 能够表示非对象类型，而接口只能表示对象类型。
2. 接口可以继承其他类型，`type` 不支持继承。
3. 同名接口会自动合并，同名 `type` 则会报错。
4. 接口不能包含属性映射，`type` 可以。
5. `this` 关键字只能用于接口。
6. `type` 可以扩展原始数据类型，接口不行。
7. 接口无法表达某些复杂类型 (比如交叉类型和联合类型)，但是 `type` 可以。
