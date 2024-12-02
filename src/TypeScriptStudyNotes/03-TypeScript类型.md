---
cover: https://t.alcy.cc/fj?t=1730941200000
order: 3
date: 2024-11-07 09:00
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 类型

## any 类型

### 什么是 any 类型

`any` 类型表示没有任何限制，该类型的变量可以赋予任意类型的值。

使用 `any` 类型，相当于不进行类型检查。

```TypeScript
let x: any
x = 1 // 正确
x = "foo" // 正确
x = true // 正确
```

### 类型推断问题

对于开发者没有指定类型、TypeScript 必须自己推断类型的那些变量，如果无法推断出类型，TypeScript 就会认为该变量的类型是 `any`。

TypeScript 提供了一个编译选项 `noImplicitAny`，打开该选项，只要推断出 `any` 类型就会报错。

```sh
tsc --noImplicitAny xxx.ts
```

也可以在 `tsconfig.json` 中配置。

```json
// tsconfig.json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

注意：使用 `let` 和 `var` 命令声明变量，但不赋值也不指定类型，是不会报错的。

### 污染问题

TypeScript 的 `any` 类型会污染其他类型，因为 `any` 类型的变量可以赋值给其他类型的变量。

```TypeScript
let x: any = "hello"
let y: number

y = x // 不报错

y * 123 // 不报错
y.toFixed() // 不报错
```

## unknown 类型

### 什么是 unknown 类型

所有类型都可以赋值给 `unknown` 类型。

```TypeScript
let x: unknown

x = true // 正确
x = 42 // 正确
x = "Hello World" // 正确
```

`unknown` 类型赋值给 `any` 和 `unknown` 以外类型的变量都会报错。

```TypeScript
let v: unknown = 123

let v1: boolean = v // 报错
let v2: number = v // 报错
```

不能直接调用 `unknown` 类型变量的方法和属性。

```TypeScript
let v1: unknown = { foo: 123 }
v1.foo // 报错

let v2: unknown = "hello"
v2.trim() // 报错

let v3: unknown = (n = 0) => n + 1
v3() // 报错
```

`unknown` 类型变量能够进行的运算是有限的，只能进行比较运算 (运算符 `==`、`===`、`!=`、`!==`、`||`、`&&`、`?`)、取反运算 (运算符 `!`)、`typeof` 运算符和 `instanceof` 运算符。

```TypeScript
let a: unknown = 1

a + 1 // 报错
a === 1 // 正确
```

### 如何使用 unknown 类型

`unknown` 类型可以通过类型缩小来使用。

```TypeScript
let a: unknown = 1

if (typeof a === "number") {
  let r = a + 10 // 正确
}
```

## never 类型

### 什么是 never 类型

`never` 类型表示的是那些永不存在的值的类型。

不能给 `never` 赋值，因为 `never` 表示的是那些永不存在的值的类型。

```TypeScript
let x: never
x = 123 // 报错
```

`never` 类型可以赋值给任意其他类型。

```TypeScript
function f(): never {
  throw new Error("Error")
}

let v1: number = f() // 不报错
let v2: string = f() // 不报错
let v3: boolean = f() // 不报错
```

### never 类型的作用

`never` 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。

```TypeScript
function error(message: string): never {
  throw new Error(message)
}
```

`never` 类型还用在一些类型运算之中，保证类型运算的完整性。

```TypeScript
function fn(x: string | number) {
  if (typeof x === "string") {
    // ...
  } else if (typeof x === "number") {
    // ...
  } else {
    x // x 在这里是 never 类型
  }
}
```

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

`unique symbol` 类型是 `symbol` 类型的子类型，它表示单个的、某个具体的 `Symbol` 值。

```TypeScript
const x: unique symbol = Symbol() // 只能用 const 声明
```

## undefined 类型

`undefined` 类型只包含一个值 `undefined`，表示未定义 (即还未给出定义，以后可能会有定义)。

```TypeScript
let x: undefined = undefined
```

`undefined` 作为值时，它有一个特殊的地方，任何其他类型的变量都可以赋值为 `undefined`。

但是这样会有如下问题。

```TypeScript
const obj: object = undefined
obj.toString() // 编译不报错，运行就报错
```

为此，TypeScript 提供了一个编译选项 `strictNullChecks`，打开该选项，`undefined` 就不能赋值给其他类型的变量 (除了 `any` 类型和 `unknown` 类型)。

```sh
tsc --strictNullChecks xxx.ts
```

也可以在 `tsconfig.json` 中配置。

```json
// tsconfig.json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

## null 类型

`null` 类型只包含一个值 `null`，表示为空 (即此处没有值)。

```TypeScript
const x: null = null
```

`null` 作为值时，它有一个特殊的地方，任何其他类型的变量都可以赋值为 `null`。

但是这样会有如下问题。

```TypeScript
const obj: object = null
obj.toString() // 编译不报错，运行就报错
```

为此，TypeScript 提供了一个编译选项 `strictNullChecks`，打开该选项，`null` 就不能赋值给其他类型的变量 (除了 `any` 类型和 `unknown` 类型)。

```sh
tsc --strictNullChecks xxx.ts
```

也可以在 `tsconfig.json` 中配置。

```json
// tsconfig.json
{
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

## 包装对象类型

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

## Object 类型

`Object` 类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是 `Object` 类型，这囊括了几乎所有的值。

```TypeScript
let obj: Object

obj = true
obj = "hi"
obj = 1
obj = { foo: 123 }
obj = [1, 2]
obj = (a: number) => a + 1
```

空对象 `{}` 是 `Object` 类型的简写形式，所以使用 `Object` 时常常用空对象代替。

```TypeScript
let obj: {}

obj = true
obj = "hi"
obj = 1
obj = { foo: 123 }
obj = [1, 2]
obj = (a: number) => a + 1
```

## object 类型

`object` 类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。

```TypeScript
let obj: object

obj = { foo: 123 }
obj = [1, 2]
obj = (a: number) => a + 1
obj = true // 报错
obj = "hi" // 报错
obj = 1 // 报错
```

注意，无论是 `Object` 类型，还是 `object` 类型，都只包含 JavaScript 内置对象原生的属性和方法，用户自定义的属性和方法都不存在于这两个类型之中。

```TypeScript
const o1: Object = { foo: 0 }
const o2: object = { foo: 0 }

o1.toString() // 正确
o1.foo // 报错

o2.toString() // 正确
o2.foo // 报错
```

## 值类型

单个值也是一种类型，称为 “值类型”。

```TypeScript
let x: "hello"

x = "hello" // 正确
x = "world" // 报错
```

## 联合类型

联合类型指的是多个类型组成的一个新类型，使用符号 `|` 表示。

联合类型 `A|B` 表示，任何一个类型只要属于 `A` 或 `B`，就属于联合类型 `A|B`。

```TypeScript
let x: string | number

x = 123 // 正确
x = "abc" // 正确
```

## 交叉类型

交叉类型指的多个类型组成的一个新类型，使用符号 `&` 表示。

交叉类型 `A&B` 表示，任何一个类型必须同时属于 `A` 和 `B`，才属于交叉类型 `A&B`，即交叉类型同时满足 `A` 和 `B` 的特征。

```TypeScript
let obj: { foo: string } & { bar: string }

obj = {
  foo: "hello",
  bar: "world",
}
```

## 数组类型

### 数组类型的定义

数组类型有两种定义方式。

第一种是使用 `[]` 表示数组，数组中的每个元素都必须是相同的类型。

```TypeScript
let arr: number[] = [1, 2, 3]
let arr1: (number | string)[] = [1, "2", 3]
```

第二种是使用 `Array` 表示数组，数组中的每个元素都必须是相同的类型。

```TypeScript
let arr: Array<number> = [1, 2, 3]
let arr1: Array<number | string> = [1, "2", 3]
```

数组类型声明了以后，成员数量是不限制的，任意数量的成员都可以，也可以是空数组。

### 数组的类型推断

如果声明数组时没有指定类型，TypeScript 会自动进行类型推断。

如果变量的初始值是空数组，那么 TypeScript 会推断数组类型是 `any[]`。

```TypeScript
// 推断为 any[]
const arr = []
```

后面，为这个数组赋值时，TypeScript 会自动更新类型推断。

```TypeScript
const arr = []
arr // 推断为 any[]

arr.push(123)
arr // 推断类型为 number[]

arr.push("abc")
arr // 推断类型为 (string|number)[]
```

如果变量的初始值不是空数组，那么 TypeScript 会根据初始值推断数组类型，类型推断也不会自动更新。

```TypeScript
// 推断类型为 number[]
const arr = [123]

arr.push("abc") // 报错
```

### 只读数组

第一种是使用 `readonly` 关键字，表示数组是只读的，不能修改。

```TypeScript
const arr: readonly number[] = [0, 1]

arr[1] = 2 // 报错
arr.push(3) // 报错
```

第二种是使用 `ReadonlyArray` 类型，表示数组是只读的，不能修改。

```TypeScript
const arr: ReadonlyArray<number> = [0, 1]
```

第三种是使用 `const` 断言。

```TypeScript
const arr = [0, 1] as const
```

由于只读数组是数组的父类型，所以它不能代替数组。

```TypeScript
function getSum(s: number[]) {

}

const arr: readonly number[] = [1, 2, 3]
getSum(arr) // 报错
// 可以使用类型断言，将只读数组转换为普通数组
getSum(arr as number[])
```

### 多维数组

使用 `T[][]` 的形式，表示二维数组，`T` 是最底层数组成员的类型。

```TypeScript
const arr: number[][] = [[1, 2], [3, 4]]
```

## 元组类型

### 元组类型的定义

元组表示成员类型可以自由设置的数组，即数组的各个成员的类型可以不同。

元组必须明确声明每个成员的类型。

```TypeScript
const s: [string, string, boolean] = ["a", "b", true]
```

使用元组时，必须明确给出类型声明，否则 TypeScript 会把一个值自动推断为数组。

```TypeScript
let a = [1, true] // 会推断为 (number | boolean)[]
```

元组成员的类型可以添加问号后缀 (`?`)，表示该成员是可选的，问号只能用于元组的尾部成员。

```TypeScript
let a: [number, number?] = [1]
```

使用扩展运算符 (`...`)，可以表示不限成员数量的元组，扩展运算符用在元组的任意位置都可以，但是它后面只能是数组或元组。

```TypeScript
let a: [number, ...number[]] = [1, 2, 3]
let b: [...number[], number] = [1, 2, 3]
```

### 只读元组

第一种是使用 `readonly` 关键字，表示元组是只读的，不能修改。

```TypeScript
const arr: readonly [number, string] = [0, "1"]
```

第二种是使用 `Readonly`，表示元组是只读的，不能修改。

```TypeScript
const arr: Readonly<[number, string]> = [0, "1"]
```

第三种是使用 `const` 断言。

```TypeScript
const arr = [0, "1"] as const
```

由于只读元组是元组的父类型，所以它不能代替元组。

```TypeScript
function distanceFromOrigin([x, y]: [number, number]) {
    return Math.sqrt(x ** 2 + y ** 2)
}

let point = [3, 4] as const

distanceFromOrigin(point) // 报错
// 可以使用类型断言，将只读元组转换为普通元组
distanceFromOrigin(point as [number, number])
```

### 成员数量的推断

如果没有可选成员和扩展运算符，TypeScript 会推断出元组的成员数量 (即元组长度)。

如果包含了可选成员，TypeScript 会推断出可能的成员数量。

如果使用了扩展运算符，TypeScript 就无法推断出成员数量。

