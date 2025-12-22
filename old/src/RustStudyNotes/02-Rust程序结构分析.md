---
cover: https://t.alcy.cc/fj?t=20250427203000
order: 2
date: 2025-04-27 20:30:00
category: 开发
tag:
  - Rust
excerpt: false
---

# Rust 程序结构分析

## 创建项目

```sh
cargo new hello-world
```

## 代码分析

```rust title="main.rs"
use std::io::stdin; //引入标准库io模块的stdin函数
// prelude 是std模块下自动导入到每个Rust程序中的一些内容，不需要显示的引入

// 项目入口，它总是先执行的函数，它可以在括号中传入参数
fn main() {
    let mut msg = String::new();
    println!("Please enter message:"); // 打印提示信息,调用了println!宏，!代表这不是一个普通的函数，而是一个宏
    stdin().read_line(&mut msg).unwrap();
    println!("Message is {}", msg);
}
```

在 Rust 中，代码包被称为 crates。一个 Rust 项目 (package) 可以包含最多一个 library crate (库 crate) 和任意数量的 binary crate (可执行 crate)。

## 编译

使用 `rustc` 命令可以编译 Rust 源代码文件，会生成一个可执行文件。

```sh
rustc src\main.rs
```

然后执行一下可执行文件。

```sh
.\main.exe
```

还可以使用 `cargo` 命令编译和运行 Rust 项目。

```sh
cargo run
```