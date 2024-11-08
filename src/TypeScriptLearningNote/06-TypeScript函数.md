---
cover: https://t.alcy.cc/fj?t=1731051000000
order: 6
date: 2024-11-08 15:30
category: 软件开发
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

