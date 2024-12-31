---
title: 我的 VSCode 配置
cover: https://t.alcy.cc/fj?t=1709949600
date: 2024-03-09 10:00
category: 软件工具
tag: VSCode
excerpt: false 
---

> 分享一下我的 VSCode 配置和推荐的扩展。

## 设置相关

### 开启自动保存

在设置中找到 `Files: Auto Save` 并设置为 `afterDelay`。这样，编辑器会自动在配置的延迟 (默认为 1000 毫秒) 后保存文件，这个延迟可以在 `Files: Auto Save Delay` 中修改。

### 调整字体大小

在设置中找到 `Editor: Font Size` 并设置为 `20`。这样，编辑器的字体大小会调整为 20 像素。

### 禁用通过拖放来移动选中内容

在设置中找到 `Editor: Drag And Drop` 并将它取消勾选。因为我经常会不小心拖动选中内容，导致代码混乱。

### 启用括号对指南

在设置中找到 `Editor › Guides: Bracket Pairs` 并设置为 `true`。这样，编辑器会在括号对之间显示一条指南。

### 突出显示活动的缩进参考线

在设置中找到 `Editor › Guides: Highlight Active Indentation` 并设置为 `always`。这样，编辑器会在活动的缩进参考线周围显示一条高亮线。

### 启用 HTML 标签关联编辑

在设置中找到 `Editor: Linked Editing` 并设置为 `true`。这样，当你在 HTML 文件中编辑一个标签时，与之关联的标签也会自动被编辑。

### 平滑动画相关

在设置中找到 `Editor: Smooth Scrolling` 并将它勾选上。这样，编辑器在滚动时会使用平滑滚动效果。

在设置中找到 `Editor: Cursor Blinking` 并设置为 `smooth`。这样，编辑器的光标会使用平滑闪烁效果。

在设置中找到 `Editor: Cursor Smooth Caret Animation` 并设置为 `on`。这样，编辑器会有平滑插入动画。

### 开启自动格式化

在设置中找到 `Editor: Format On Save` 并设置为 `true`。这样，编辑器会在保存文件时自动格式化文件。

### 调整建议列表中预先选择最近使用过的建议

在设置中找到 `Editor: Suggest Selection` 并设置为 `recentlyUsed`。这样，编辑器会在建议列表中预先选择最近使用过的建议。

### 给未保存更改的选项卡上绘制顶部边框

在设置中找到 `Workbench › Editor: Highlight Modified Tabs` 并把它勾选上。这样，编辑器会在未保存更改的选项卡上绘制顶部边框。

### 设置对话框样式

在设置中找到 `Window: Dialog Style` 并设置为 `custom`。这样，编辑器会使用自定义对话框样式。

### 禁用通过拖放来移动文件和文件夹

在设置中找到 `Explorer: Enable Drag And Drop` 并取消勾选。因为我经常会不小心拖动文件和文件夹，导致文件混乱。

### 使用重复的样式定义时报警告

在设置中找到 `CSS › Lint: Duplicate Properties` 并设置为 `warning`。这样，编辑器会在发现重复的样式定义后报警告。

### 设置 Git Auto Stash

在设置中找到 `Git: Auto Stash` 并将它勾选。这样，编辑器会在拉取前暂存所有更改，在成功拉取后还原这些更改。

### 设置 JavaScript 语义检查

在设置中找到 `JS/TS › Implicit Project Config: Check JS` 并将它勾选。这样，编辑器会在 JavaScript 和 TypeScript 文件中启用语义检查。

## 扩展推荐

### 翻译 (英汉词典)

下载地址：[翻译 (英汉词典)](https://marketplace.visualstudio.com/items?itemName=CodeInChinese.EnglishChineseDictionary)。

功能：翻译英文单词，支持开启鼠标悬停翻译功能。

### Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code

下载地址：[Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)。

功能：VSCode 简体中文语言包。

### Code Spell Checker

下载地址：[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)。

功能：检查代码中的单词拼写错误。

### CodeGeeX: AI Code AutoComplete, Chat, Auto Comment

下载地址：[CodeGeeX：AI Code AutoComplete，Chat，Auto Comment](https://marketplace.visualstudio.com/items?itemName=aminer.codegeex)。

功能：AI 代码自动补全、聊天、自动注释。

### Error Lens

下载地址：[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)。

功能：在编辑器中高亮显示错误和警告。

### One Dark Pro

下载地址：[One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)。

功能：One Dark Pro 主题，我最喜欢的 VSCode 主题。

### Todo Tree

下载地址：[Todo Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)。

功能：在编辑器中显示所有 TODO、FIXME 和其他标记。

### Vim

下载地址：[Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)。

功能：支持 Vim 模式。

相关文章：[Vim](./Vim.md)。

### vscode-icons

下载地址：[vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)。

功能：在编辑器中显示图标，使文件和文件夹更易于识别。

### Office Viewer(Markdown Editor)

下载地址：[Office Viewer(Markdown Editor)](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-office)。

功能：在编辑器中所见即所得的书写 Markdown 文件，同时支持导出为 PDF、HTML 等格式。

### CodeSnap

下载地址：[CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap)。

功能：代码截图工具，可以快速截图并保存到剪贴板或本地文件。

### ESLint

下载地址：[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。

功能：JavaScript 和 TypeScript 代码检查工具。

相关文章：[前端代码规范](../DevelopmentSkills/前端代码规范.md)。

### Prettier - Code formatter

下载地址：[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)。

功能：代码格式化工具，支持多种编程语言。

相关文章：[前端代码规范](../DevelopmentSkills/前端代码规范.md)。

### Image preview

下载地址：[Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)。

功能：在编辑器中预览代码中引入的图片。

### Live Server

下载地址：[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)。

功能：在本地启动一个服务器，实时预览 HTML 文件。

### Stylelint

下载地址：[Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)。

功能：CSS 代码检查工具。

相关文章：[前端代码规范](../DevelopmentSkills/前端代码规范.md)。

### Vue - Official

下载地址：[Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。

功能：Vue.js 开发工具，支持语法高亮、代码补全、错误检查等功能。