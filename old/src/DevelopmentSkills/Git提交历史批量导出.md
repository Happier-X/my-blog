---
cover: https://t.alcy.cc/fj?t=1729231200000
date: 2024-10-18 14:00:00
order: -20241018140000
category: 开发
tag: Git
excerpt: false
---

# Git 提交历史批量导出

## 批量导出

在使用 Git 进行版本控制时，有时需要将提交历史导出然后进行其它处理，可以使用 `git log` 命令来获取提交历史。

格式化处理并输出为文本文件：

```sh
git log --pretty=format:"%ad,%s" --encoding=GBK > history.txt
```

也可以输出为表格：

```sh
git log --pretty=format:"%ad,%s" --encoding=GBK > history.xls
```

可以得到如下格式的提交历史：

```txt
Thu Oct 17 18:04:38 2024 +0800,docs: 修改文章内容
```

## 更多格式化选项

查看[官网文档](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2)，可以找到更多格式化选项。