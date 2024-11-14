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

