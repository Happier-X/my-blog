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

如果属性值是一个对象，`readonly` 修饰符并不禁止修改该对象的属性，只是禁止完全替换掉该对象。

## 解构赋值

TypeScript 支持解构赋值，并且可以指定解构出来的变量的类型。

```TypeScript
const {
  id,
  name,
  price,
}: {
  id: string,
  name: string,
  price: number
} = product
```

## 结构类型原则

只要对象 B 满足对象 A 的结构特征，TypeScript 就认为对象 B 兼容对象 A 的类型，这称为 “结构类型” 原则。

```TypeScript
const A = {
  x: number
}

const B = {
  x: number,
  y: number
}

const B = {
  x: 1,
  y: 1,
}
```

对象 B 兼容对象 A，因为对象 B 满足对象 A 的结构特征。

因此，对象 B 可以赋值给对象 A。

```TypeScript
const A: { x: number } = B // 正确
```

## 严格字面量检查

如果对象使用字面量表示，会触发 TypeScript 的严格字面量检查。

```TypeScript
const point: {
  x: number,
  y: number
} = {
  x: 1,
  y: 1,
  z: 1, // 报错
}
```

等号右边是一个对象的字面量，这时会触发严格字面量检查。只要有类型声明中不存在的属性，就会导致报错。

如果等号右边不是字面量，而是一个变量，根据结构类型原则，是不会报错的。

```TypeScript
const myPoint = {
  x: 1,
  y: 1,
  z: 1,
}

const point: {
  x: number,
  y: number
} = myPoint // 正确
```

TypeScript 提供了一个编译选项 `suppressExcessPropertyErrors`，打开该选项，可以关闭严格字面量检查。

```sh
tsc --suppressExcessPropertyErrors xxx.ts
```

也可以在 `tsconfig.json` 中配置。

```json
// tsconfig.json
{
  "compilerOptions": {
    "suppressExcessPropertyErrors": true
  }
}
```

## 最小可选属性规则

如果一个对象的所有属性都是可选的，会触发最小可选属性规则。

```TypeScript
type Options = {
  a?: number,
  b?: number,
  c?: number
}

const obj: Options = {
  d: 123, // 报错
}
```

TypeScript 添加了最小可选属性规则，规定这时属于 `Options` 类型的对象，必须至少存在一个可选属性，不能所有可选属性都不存在。

## 空对象

空对象是 TypeScript 的一种特殊值，也是一种特殊类型。

```TypeScript
const obj: {} = {}
obj.prop = 123 // 报错
```