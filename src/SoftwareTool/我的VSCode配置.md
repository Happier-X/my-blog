---
title: 我的 VSCode 配置
cover: https://t.alcy.cc/fj?t=1709949600
date: 2024-03-09 10:00
category: 软件工具
tag: VSCode
excerpt: false 
---

> 分享一下我的 VSCode 配置和推荐的插件。

## 设置相关

### 自动保存

在设置中找到 `Files: Auto Save` 并设置为 `afterDelay`。这样，编辑器会自动在配置的延迟 (默认为 1000 毫秒) 后保存文件，这个延迟可以在 `Files: Auto Save Delay` 中修改。

### 调整字体大小

在设置中找到 `Editor: Font Size` 并设置为 `20`。这样，编辑器的字体大小会调整为 20 像素。

### 控制每个方括号类型是否具有自己的独立颜色池

在设置中找到 `Editor › Bracket Pair Colorization: Independent Color Pool Per Bracket Type` 并将它勾选。这样，每个方括号类型都会有自己的独立颜色池。

### 控制在编辑器中是否允许通过拖放来移动选中内容

在设置中找到 `Editor: Drag And Drop` 并将它取消勾选。因为我经常会不小心拖动选中内容，导致代码混乱。

### 控制是否启用括号对指南

在设置中找到 `Editor › Guides: Bracket Pairs` 并设置为 `true`。这样，编辑器会在括号对之间显示一条指南。

### 控制是否突出显示编辑器中活动的缩进参考线

在设置中找到 `Editor › Guides: Highlight Active Indentation` 并设置为 `always`。这样，编辑器会在活动的缩进参考线周围显示一条高亮线。

### 控制编辑器是否使用动画滚动

在设置中找到 `Editor: Smooth Scrolling` 并将它勾选上。这样，编辑器在滚动时会使用平滑滚动效果。

在设置中找到 `Editor: Cursor Smooth Caret Animation` 并设置为 `on`。这样，编辑器会有平滑插入动画。

### 设置自动格式化

在设置中找到 `Editor: Format On Save` 并设置为 `true`。这样，编辑器会在保存文件时自动格式化文件。

### 控制在建议列表中如何预先选择建议

在设置中找到 `Editor: Suggest Selection` 并设置为 `recentlyUsed`。这样，编辑器会在建议列表中预先选择最近使用过的建议。

### 给未保存更改的选项卡上绘制顶部边框

在设置中找到 `Workbench › Editor: Highlight Modified Tabs` 并把它勾选上。这样，编辑器会在未保存更改的选项卡上绘制顶部边框。

### 设置对话框样式

在设置中找到 `Window: Dialog Style` 并设置为 `custom`。这样，编辑器会使用自定义对话框样式。

### 控制编辑器是否允许通过拖放来移动文件和文件夹

在设置中找到 `Explorer: Enable Drag And Drop` 并取消勾选。这样，编辑器在文件资源管理器中禁用了拖放功能。

### 设置光标闪烁动画

在设置中找到 `Cursor BlinkingEditor: Cursor Blinking` 并设置为 `smooth`。这样，编辑器的光标会使用平滑闪烁效果。

### 设置 HTML 标签关联编辑

在设置中找到 `Editor: Linked Editing` 并设置为 `true`。这样，当你在 HTML 文件中编辑一个标签时，与之关联的标签也会自动被编辑。

### 使用重复的样式定义时报警告

在设置中找到 `CSS › Lint: Duplicate Properties` 并设置为 `warning`。这样，编辑器会在发现重复的样式定义后报警告。

### 设置 JavaScript 语义检查

在设置中找到 `JS/TS › Implicit Project Config: Check JS` 并将它勾选。这样，编辑器会在 JavaScript 和 TypeScript 文件中启用语义检查。

### 设置 Git Auto Stash

在设置中找到 `Git: Auto Stash` 并将它勾选。这样，编辑器会在拉取前暂存所有更改，在成功拉取后还原这些更改。