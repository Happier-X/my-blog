---
cover: https://t.alcy.cc/fj?t=20250311170000
order: 20
date: 2025-03-11 17:00:00
category: 开发
tag: Nest
excerpt: false
---

# Nest 身份验证

身份验证是大多数应用程序中的重要部分。处理身份验证有许多不同的方法和策略。

一个应用程序可能会有非常多种的注册方式，比如本地账号注册方式、使用社交账号注册等，每一种账号注册方式都有一套自己的策略 (Strategy)，那要怎么管理各种账户验证 (Authentication) 的策略就非常重要，我们希望各种策略都能采用同一套标准来进行开发，这时候就可以通过一些工具来辅助我们处理，Nest 使用了 `passport` 这个库来处理身份验证。

## passport 介绍

`passport` 采用了策略模式来管理各种验证方式，它主要由两个部分构成整个账户验证程序，分别为是 `passport` 与 `passport strategy`。`passport` 本身是用来处理验证流程的，而 `passport strategy` 则是验证机制，两者缺一不可，整个 `passport` 生态系有上百种的验证机制让开发人员使用，如本地验证、社交账号验证等，完美解决了各种验证机制的处理。

在 Nest 中，`passport strategy` 会与守卫进行搭配，通过 `AuthGuard` 将 `strategy` 包装起来，就可以通过 Nest 的守卫机制来与 `passport` 进行搭配。

## 安装 passport

```sh
npm install @nestjs/passport passport
```

## 实现注册

在开始身份验证之前，需要先设计一个注册的 API。

