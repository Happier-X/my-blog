---
cover: https://t.alcy.cc/fj?t=1731051000000
order: 6
date: 2024-11-08 15:30
category: 开发
tag: TypeScript
excerpt: false
---

# TypeScript 函数

## 函数类型声明

第一种方式。

```TypeScript
function add(x: number, y: number): number {
  return x + y
}
```

第二种方式。

```TypeScript
const add: (x: number, y: number) => number = function (x, y) {
    return x + y
}
```

第三种方式。

```TypeScript
let add: {
    (x: number, y: number): number
}

add = function (x, y) {
    return x + y
}
```

## Function 类型

`Function` 类型表示函数，任何函数都属于 `Function` 类型。

```TypeScript
function a(f: Function) {
    return f()
}
```

## 箭头函数

```TypeScript
const add = (x: number, y: number): number => {
    return x + y
}
```

## 可选参数

如果函数的某个参数可以省略，则在参数名后面加问号表示。

```TypeScript
function f(x?: number) {

}

f()
f(10)
```

函数的可选参数只能在参数列表的尾部。

## 默认参数

```TypeScript
function f(x: number = 10) {

}
```

## 参数解构

```TypeScript
function f([x, y]: [number, number]) {

}

function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c)
}
```

```TypeScript
type ABC = { a: number; b: number; c: number }

function sum({ a, b, c }: ABC) {
  console.log(a + b + c)
}
```

## 剩余参数

剩余参数可以为数组，也可以是元组。

```TypeScript
// 剩余参数为数组
function joinNumbers(...nums: number[]) {

}

// 剩余参数为元组
function f(...args: [boolean, number]) {

}
```

剩余参数可以嵌套。

```TypeScript
function f(...args: [boolean, ...number[]]) {

}
```

剩余参数可以与变量解构结合使用。

```TypeScript
function repeat(...[str, times]: [string, number]): string {
  return str.repeat(times)
}

// 等同于
function repeat(str: string, times: number): string {
  return str.repeat(times)
}
```

## 只读参数

参数前面加 `readonly` 关键字，表示该参数是只读的，不能修改。

```TypeScript
function arraySum(arr: readonly number[]) {
  arr[0] = 0 // 报错
}
```

## void 类型

`void` 类型表示函数没有返回值。

`void` 类型允许返回 `undefined` 或 `null`。

```TypeScript
function f(): void {
  console.log("hello")
}
```

如果打开了 `strictNullChecks` 编译选项，那么 `void` 类型只允许返回 `undefined`。

## never 类型

`never` 类型表示肯定不会出现的值。它用在函数的返回值，就表示某个函数肯定不会返回值，即函数不会正常执行结束。

主要有两种情况：抛出异常和无限循环。

## 函数重载

有些函数可以接受不同类型或不同个数的参数，并且根据参数的不同，会有不同的函数行为。这种根据参数类型不同，执行不同逻辑的行为，称为函数重载。

TypeScript 对于 “函数重载” 的类型声明方法是，逐一定义每一种情况的类型。

```TypeScript
function reverse(str: string): string
function reverse(arr: any[]): any[]
function reverse(stringOrArray: string | any[]): string | any[] {
  if (typeof stringOrArray === "string")
    return stringOrArray.split("").reverse().join("")
  else return stringOrArray.slice().reverse()
}
```

由于重载是一种比较复杂的类型声明方法，为了降低复杂性，一般来说，如果可以的话，应该优先使用联合类型替代函数重载。

```TypeScript
// 写法一
function len(s: string): number
function len(arr: any[]): number
function len(x: any): number {
  return x.length
}

// 写法二
function len(x: any[] | string): number {
  return x.length
}
```

## 构造函数

构造函数的类型写法，就是在参数列表前面加上 `new`。

```TypeScript
class Animal {
  numLegs: number = 4
}

type AnimalConstructor = new () => Animal

function create(c: AnimalConstructor): Animal {
  return new c()
}

const a = create(Animal)
```

类型 `AnimalConstructor` 就是一个构造函数，而函数 `create()` 需要传入一个构造函数。在 JavaScript 中，类 (`class`) 本质上是构造函数，所以 `Animal` 这个类可以传入 `create()`。

构造函数还有另一种类型写法，就是采用对象形式。

```TypeScript
type F = {
  new (s: string): object
}
```
