---
cover: https://t.alcy.cc/fj?t=20250427210000
order: 3
date: 2025-04-27 21:00:00
category: 开发
tag:
  - Rust
excerpt: false
---

# Rust 实现猜数字游戏

## 创建项目

```sh
cargo new guessing_game
```

我们可以看到 `Cargo.toml` 文件内容。

```toml title="Cargo.toml"
[package]
name = "guessing-game" # 项目名
version = "0.1.0" # 版本号
edition = "2024" # 使用的Rust版本

[dependencies]
```

## 安装依赖

使用 crate 可以增加更多的功能，Rust 的包管理工具是 cargo，使用 cargo 可以很方便的安装和管理 crate。

crate 是一组 Rust 源代码文件。我们正在构建的项目是一个二进制 crate，它生成一个可执行文件。

我们要安装的 `rand`，它是一个随机数生成器，它是一个库 crate，库 crate 可以包含任意能被其它程序使用的代码，但是无法独立执行。

需要安装库，有两种方式。

第一种是在 `Cargo.toml` 文件中添加依赖。

```toml {7} title="Cargo.toml"
[package]
name = "guessing-game" # 项目名
version = "0.1.0" # 版本号
edition = "2024" # 使用的Rust版本

[dependencies]
rand = "0.8.5"
```

第二种方式是使用 `cargo add` 命令。

```sh
cargo add rand@0.8.5
```

使用 `cargo update` 命令可以更新所有依赖的版本。

## 代码分析

```rust title="main.rs"
use rand::Rng; // 引入随机数生成器
use std::cmp::Ordering; // 引入比较器
use std::io; // 引入标准库 

fn main() {
    println!("Guess the number!");
    let secret_number = rand::thread_rng().gen_range(1..101); // 生成一个 1 到 100 的随机数
    // 使用 loop 实现一个无限循环
    loop {
        println!("Please enter your guess.");
        let mut guess = String::new(); // 使用 let 关键字声明变量，mut 表示可变变量，::new() 的 :: 表明 new 是 String 类型的关联函数
        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");
        // read_line 返回的是一个 Result 类型，它接收一个引用（&表示），使用 expect 方法处理错误，如果 Result 实例的值是 Err，expect 会导致程序崩溃，并输出错误信息，如果 Result 实例的值是 Ok 则会获取 Ok 中的值并原样返回
        let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => continue, // 如果解析失败，继续循环
        }; // trim() 去掉字符串两端的空格，parse() 将字符串转换为数字，这里的 guess 是遮蔽了之前的 guess 变量，使用 let 关键字重新声明了一个新的 guess 变量，类型为 u32
        println!("You guessed: {}", guess); // 使用 {} 占位符输出变量的值
        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small!"),
            Ordering::Greater => println!("Too big!"),
            Ordering::Equal => {
                println!("You win!");
                break; // break 语句用于跳出循环
            }
        } // cmp() 方法比较两个值的大小，返回一个 Ordering 枚举值，match 是一个控制流分支结构，用于匹配模式并执行相应的代码块
    }
}
```