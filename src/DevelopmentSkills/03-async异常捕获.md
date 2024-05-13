---
title: async 异常捕获
order: 3
date: 2024-03-07
category: 软件开发
tag:
  - JavaScript
---

## 使用 try-catch 捕获异常

```javascript
async function async1() {
  try {
    await async2();
  } catch (error) {
    console.log(error);
}
```
## 使用 Promise.catch 捕获异常

```javascript
async function async1() {
  await async2().catch(error => {
    console.log(error);
  });
}
```

## 优化异常捕获

当有多个异步操作时，要为每个异步操作后面都加上 try-catch 代码块，这显然是不合理的，如果只写一次 try-catch 代码块，就会导致不知道哪一个异步操作出现了问题，所以我们可以自己写一个工具函数来优化异常捕获。

原来的代码：

```javascript
async function async1() {
    try {
        await asyncFn1();
        await asyncFn2();
    } catch (error) {
        console.log(error);
    }
}
```

我们封装一个工具函数：

```javascript
async tryCatch(asyncFn) {
    try {
        let res = await asyncFn;
        return [null,res];
    } catch (error) {
        return [error,null];
    }
}
```

现在我们使用封装好的工具函数：

```javascript
async function async1() {
    let [error1,res1] = await tryCatch(asyncFn1);
    let [error2,res2] = await tryCatch(asyncFn2);
}
```
