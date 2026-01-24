---
title: VsCode 配置
createAt: 2024-03-09
updateAt: 2024-03-09
---

分享一下我的 VSCode 配置和推荐的扩展。

## 设置

### 自动保存

`Files: Auto Save` 选择 `afterDelay`。编辑器会自动在配置的延迟 (默认为 1000 毫秒) 后保存文件，这个延迟可以在 `Files: Auto Save Delay` 中修改。

### 调整字体大小

`Editor: Font Size` 设置为 `20`。编辑器的字体大小会调整为 20 像素。

### 禁用通过拖放来移动选中内容

`Editor: Drag And Drop` 取消勾选。因为我经常会不小心拖动选中内容，导致代码混乱。

### 启用括号对指南

`Editor › Guides: Bracket Pairs` 选择 `true`。编辑器会在括号对之间显示一条指南。

### 启用 HTML 标签关联编辑

`Editor: Linked Editing` 勾选。当你在 HTML 文件中编辑一个标签时，与之关联的标签也会自动被编辑。

### 平滑动画相关

`Editor: Smooth Scrolling` 勾选。编辑器在滚动时会使用平滑滚动效果。

`Editor: Cursor Blinking` 选择 `smooth`。编辑器的光标会使用平滑闪烁效果。

`Editor: Cursor Smooth Caret Animation` 选择 `on`。编辑器会有平滑插入动画。

`Workbench>List: Smooth Scrolling` 勾选。编辑器在滚动列表时会使用平滑滚动效果。

`Terminal › Integrated: Smooth Scrolling` 勾选。终端在滚动时会使用平滑滚动效果。

### 调整建议列表中预先选择最近使用过的建议

`Editor: Suggest Selection` 选择 `recentlyUsedByPrefix`。编辑器会根据最近使用过的建议的前缀在建议列表中预先展示。

### 设置对话框样式

`Window: Dialog Style` 选择 `custom`。编辑器会使用自定义对话框样式。

### 禁用通过拖放来移动文件和文件夹

`Explorer: Enable Drag And Drop` 取消勾选。因为我经常会不小心拖动文件和文件夹，导致文件混乱。

### 设置 Git Auto Stash

`Git: Auto Stash` 勾选。编辑器会在拉取前暂存所有更改，在成功拉取后还原这些更改。

### 设置 Git Auto Fetch

`Git: Auto Fetch` 选择 `true`。编辑器会自动从远程仓库获取更新。

### 设置终端光标样式

`Terminal › Integrated: Cursor Blinking` 勾选。终端中的光标会闪烁。

`Terminal › Integrated: Cursor Style` 选择 `line`。终端的光标在聚焦时会显示为一条线。

`Terminal › Integrated: Cursor Style Inactive` 选择 `none`。终端的光标在失去焦点时会消失。

## 扩展推荐

### 通用

### 翻译 (英汉词典)

下载地址：[翻译 (英汉词典)](https://marketplace.visualstudio.com/items?itemName=CodeInChinese.EnglishChineseDictionary)。

功能：翻译英文单词，支持开启鼠标悬停翻译功能。

### Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code

下载地址：[Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)。

功能：VSCode 简体中文语言包。

### Code Spell Checker

下载地址：[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)。
功能：检查代码中的单词拼写错误。

### Error Lens

下载地址：[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)。
功能：在编辑器中高亮显示错误和警告。

### One Dark Pro

下载地址：[One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)。
功能：One Dark Pro 主题，我最喜欢的 VSCode 主题。

### vscode-icons

下载地址：[vscode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)。
功能：在编辑器中显示图标，使文件和文件夹更易于识别。

### CodeSnap

下载地址：[CodeSnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap)。
功能：代码截图工具，可以快速截图并保存到剪贴板或本地文件。

### Prettier - Code formatter

下载地址：[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)。
功能：代码格式化工具，支持多种编程语言。

### Image preview

下载地址：[Image preview](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview)。
功能：在编辑器中预览代码中引入的图片。

### Color Highlight

下载地址：[Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)。
功能：在编辑器中高亮显示颜色代码。

### Path Intellisense

下载地址：[Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)。
功能：在编辑器中自动补全文件路径。

### 前端

### ESLint

下载地址：[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)。
功能：JavaScript 和 TypeScript 代码检查工具。

### Live Server

下载地址：[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)。
功能：在本地启动一个服务器，实时预览 HTML 文件。

### Vue - Official

下载地址：[Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)。
功能：Vue.js 开发工具，支持语法高亮、代码补全、错误检查等功能。

### 后端

### Database Client

下载地址：[Database Client](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-database-client2)。
功能：数据库管理工具。
