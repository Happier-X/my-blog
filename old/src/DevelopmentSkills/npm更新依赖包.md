---
cover: https://t.alcy.cc/fj?t=20250222163000
date: 2025-02-22 16:30:00
order: -20250222163000
category: 开发
tag: npm
excerpt: false
---

# npm 更新依赖包

使用 `Taze` 可以检查并更新所有依赖包。

## 基本使用

默认情况下，`taze` 会检查所有版本的更新。

```sh
npx taze
```

`-major` 会检查所有主版本更新。

```sh
npx taze -major
```

`-minor` 会检查所有次版本更新。

```sh
npx taze -minor
```

`-patch` 会检查所有补丁版本更新。

```sh
npx taze -patch
```

`-r` 可以扫描包含 `package.json` 的子目录并一起更新它们。

```sh
npx taze -r
```

`-w` 可以将更新后的依赖包写入 `package.json` 文件中。

```sh
npx taze -w
```
