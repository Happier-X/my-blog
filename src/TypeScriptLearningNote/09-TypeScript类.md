---
cover: https://t.alcy.cc/fj?t=1731547800000
order: 9
date: 2024-11-14 09:30
category: 软件开发
tag: TypeScript
excerpt: false
---

# TypeScript 类

## 基本使用

### 属性的类型

```TypeScript
class Point {
  x: number
  y: number
}
```

TypeScript 可以通过配置项 `strictPropertyInitialization` 来开启属性初始化检查，开启后，如果属性没有初始化，就会报错。

### readonly 修饰符

属性名前面加上 `readonly` 修饰符，就表示该属性是只读的。

```TypeScript
class A {
  readonly id = "foo"
}

const a = new A()
a.id = "bar" // 报错
```

构造方法内部设置只读属性的初值，这是可以的。

```TypeScript
class A {
  readonly id: string = "foo"

  constructor() {
    this.id = "bar" // 正确
  }
}
```

### 方法的类型

类的方法就是普通函数，类型声明方式与函数一致。

```TypeScript
class Point {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  add(point: Point) {
    return new Point(this.x + point.x, this.y + point.y)
  }
}
```

### 存取器方法

存取器是特殊的类方法，包括取值器 (getter) 和存值器 (setter) 两种方法。

它们用于读写某个属性，取值器用来读取属性，存值器用来写入属性。

```TypeScript
// get name() 是取值器，其中 get 是关键词，name 是属性名。外部读取 name 属性时，实例对象会自动调用这个方法，该方法的返回值就是 name 属性的值。
// set name() 是存值器，其中 set 是关键词，name 是属性名。外部写入 name 属性时，实例对象会自动调用这个方法，并将所赋的值作为函数参数传入。
class C {
  _name = ""
  get name() {
    return this._name
  }
  set name(value) {
    this._name = value
  }
}
```

如果某个属性只有 `get` 方法，没有 `set` 方法，那么该属性自动成为只读属性。

```TypeScript
class C {
  _name = "foo"

  get name() {
    return this._name
  }
}

const c = new C()
c.name = "bar" // 报错
```

`set` 方法的参数类型，必须兼容 `get` 方法的返回值类型，否则报错。

```TypeScript
class C {
  _name = ""
  get name(): string {
    return this._name
  }
  set name(value: number) {
    this._name = value // 报错
  }
}
```

`get` 方法与 `set` 方法的可访问性必须一致，要么都为公开方法，要么都为私有方法。

## implements 关键字

接口或类型别名，可以用对象的形式，为 `class` 指定一组检查条件。然后，类使用 `implements` 关键字，表示当前类满足这些外部类型条件的限制。

```TypeScript
interface Country {
  name: string,
  capital: string
}
// 或者
type Country = {
  name: string,
  capital: string
}

class MyCountry implements Country {
  name = ""
  capital = ""
}
```

类也可以实现多个接口或类型别名。

```TypeScript
interface Country {
  name: string,
  capital: string
}

interface Language {
  language: string
}

class MyCountry implements Country, Language {
  name = ""
  capital = ""
  language = ""
}
```

## 类与接口合并

如果一个类和一个接口同名，那么接口会被合并进类。

```TypeScript
class A {
  x: number = 1
}
interface A {
  y: number
}
let a = new A()
a.y = 10

a.x // 1
a.y // 10
```

## Class 类型

### 实例类型

TypeScript 的类本身就是一种类型，它代表该类的实例类型。

```TypeScript
class Color {
  name: string
  constructor(name: string) {
    this.name = name
  }
}
const green: Color = new Color("green")
```

这里定义了一个类 `Color`。它的类名就代表一种类型，实例对象 `green` 就属于该类型。

### 类的自身类型

要获得一个类的自身类型，一个简便的方法就是使用 `typeof` 运算符。

```TypeScript
function createPoint(PointClass: typeof Point, x: number, y: number): Point {
  return new PointClass(x, y)
}
```

JavaScript 语言中，类只是构造函数的一种语法糖，本质上是构造函数的另一种写法。所以，类的自身类型可以写成构造函数的形式。

```TypeScript
function createPoint(
  PointClass: new (x: number, y: number) => Point,
  x: number,
  y: number
): Point {
  return new PointClass(x, y)
}
```

### 结构类型原则

`Class` 也遵循 “结构类型原则”。一个对象只要满足 `Class` 的实例结构，就跟该 `Class` 属于同一个类型。

## 类的继承

类 (这里又称 “子类”) 可以使用 `extends` 关键字继承另一个类 (这里又称 “基类”) 的所有属性和方法。

```TypeScript
class A {
  greet() {
    console.log("Hello, world!")
  }
}

class B extends A {}
const b = new B()
b.greet() // "Hello, world!"
```

子类可以覆盖基类的同名方法。但是，子类的同名方法不能与基类的类型定义相冲突。

如果基类包括保护成员 (`protected` 修饰符)，子类可以将该成员的可访问性设置为公开 (`public` 修饰符)，也可以保持保护成员不变，但是不能改用私有成员 (`private` 修饰符)。

## 可访问性修饰符

类的内部成员的外部可访问性，由三个可访问性修饰符控制：`public`、`private` 和 `protected`。这三个修饰符的位置，都写在属性或方法的最前面。

`public` 修饰符表示这是公开成员，外部可以自由访问。正常情况下，除非为了醒目和代码可读性，`public` 都是省略不写的。

`private` 修饰符表示私有成员，只能用在当前类的内部，类的实例和子类都不能使用该成员。

`protected` 修饰符表示该成员是保护成员，只能在类的内部使用该成员，实例无法使用该成员，但是子类内部可以使用。

## 静态成员

类的内部可以使用 `static` 关键字，定义静态成员。

静态成员是只能通过类本身使用的成员，不能通过实例对象使用。

```TypeScript
class MyClass {
  static x = 0
  static printX() {
    console.log(MyClass.x)
  }
}

MyClass.x // 0
MyClass.printX() // 0
```

`static` 关键字前面可以使用 `public`、`private`、`protected` 修饰符。

## 抽象类

TypeScript 允许在类的定义前面，加上关键字 `abstract`，表示该类不能被实例化，只能当作其他类的模板。这种类就叫做 “抽象类”。

```TypeScript
abstract class A {
  id = 1
}

const a = new A() // 报错
```

抽象类只能当作基类使用，用来在它的基础上定义子类。

抽象类的子类也可以是抽象类，也就是说，抽象类可以继承其他抽象类。

抽象类的内部可以有已经实现好的属性和方法，也可以有还未实现的属性和方法。后者就叫做 “抽象成员”，即属性名和方法名有 `abstract` 关键字，表示该方法需要子类实现。如果子类没有实现抽象成员，就会报错。

```TypeScript
abstract class A {
  abstract foo: string
  bar: string = ""
}

class B extends A {
  foo = "b"
}
```

抽象类 A 定义了抽象属性 foo，子类 B 必须实现这个属性，否则会报错。

抽象类的作用是，确保各种相关的子类都拥有跟基类相同的接口，可以看作是模板。其中的抽象成员都是必须由子类实现的成员，非抽象成员则表示基类已经实现的、由所有子类共享的成员。

## this 问题

有些场合需要给出 `this` 类型，但是 JavaScript 函数通常不带有 `this` 参数，这时 TypeScript 允许函数增加一个名为 `this` 的参数，放在参数列表的第一位，用来描述函数内部的 `this` 关键字的类型。

```TypeScript
function fn(this: SomeType, x: number) {
  /* ... */
}
```

TypeScript 提供了一个 `noImplicitThis` 编译选项。如果打开了这个设置项，如果 `this` 的值推断为 `any` 类型，就会报错。