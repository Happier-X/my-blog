---
cover: https://t.alcy.cc/fj?t=20250429190000
order: 5
date: 2025-04-29 19:00:00
category: 开发
tag:
  - Rust
excerpt: false
---

# Rust 函数和控制流

## 函数

使用 `fn` 来定义函数。

```rust
fn main(){
    println!("Hello, world!");
    another_function();
}

fn another_function(){
    println!("Another function.");
}
```

### 函数名称

函数和变量的命名规范是相同的，使用蛇形命名法 (snake_case)，即小写字母和下划线组合。

### 函数参数

```rust
fn main(){
    another_function(5,6);
}

fn another_function(x: i32, y: i32){
    println!("The value of x is: {}", x);
    println!("The value of y is: {}", y);
}
```

- 必须声明每个参数的类型，参数名称和类型之间用冒号分隔。
- 参数之间用逗号分隔。

### 语句和表达式

- 语句：执行某些操作的指令，不会返回值。
- 表达式：计算并返回一个结果值。

函数体由一系列语句组成，可由表达式结尾。

```rust
fn main(){
    let x = 5; // 语句
    let y = {
        let x = 3; // 语句
        x + 1 // 因为没有分号，它是一个表达式，所以它的值是 4
    };
    println!("The value of y is: {}", y);
}
```

### 返回值

使用 `->` 来声明函数返回值的类型。

```rust
fn five() -> i32 {
    5 // 返回值
}
fn main(){
    let x = five(); 
    println!("The value of x is: {}", x);
    // 这里其实返回的是()，只是没有显示出来而已
}
```

- 可以使用 `return` 关键字来返回值。
- 函数体中最后一个表达式的值就是函数的返回值。

## 控制流

### if 表达式

```rust
fn main(){
    let number = 3;
    if number < 5 {
        println!("smaller than 5");
    } else if number == 5 {
        println!("equal to 5");
    } else {
        println!("greater than 5");
    }
}
```

```rust
fn main() {
    let condition = true;
    let number = if condition { 5 } else { 6};
    println!("The value of number is: {}", number); // 5
}
```

### loop 循环

```rust
fn main() {
    loop {
        println!("again!");
    }
}
```

- break：停止循环。
- continue：跳过当前循环，继续下一次循环。

可以通过 `break` 语句返回值。

```rust
fn main() {
    let mut count = 0;
    let result = loop {
        count += 1;
        if count == 10 {
            break count * 2; // 返回值
        }
    };
    println!("The result is: {result}"); // 20
}
```

使用 loop 标签可以来标识循环。

```rust
fn main() {
    let mut count = 0;
    'counting_up: loop {
        println!("count = {count}");
        let mut remaining = 10;
        loop {
            println!("remaining = {remaining}");
            if remaining == 9 {
                break; // 退出内层循环
            }
            if count == 2 {
                break 'counting_up; // 退出外层循环
            }
            remaining -= 1;
        }
        count += 1;
    }
    println!("End count = {count}");
}
```

### while 循环

```rust
fn main() {
    let mut number = 3;
    while number != 0 {
        println!("{}!", number);
        number -= 1;
    }
    println!("Liftoff!");
}
```

### for 循环

使用 `for` 循环来遍历集合。

```rust
fn main() {
    let a = [10, 20, 30, 40, 50];
    for element in a {
        println!("The value is: {}", element);
    }
}
```

使用 Range 可用于让 for 循环执行指定次数。

```rust
fn main() {
    for number in (1..4).rev(){
        println!("{}", number); // 依次打印 3, 2, 1
    }
    println!("Liftoff!");
}
```