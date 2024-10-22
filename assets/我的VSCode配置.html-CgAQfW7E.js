import{_ as a,c as t,d as r,o}from"./app-DkC8IMV2.js";const i={};function l(n,e){return o(),t("div",null,e[0]||(e[0]=[r('<blockquote><p>分享一下我的 VSCode 配置和推荐的插件。</p></blockquote><h2 id="设置相关" tabindex="-1"><a class="header-anchor" href="#设置相关"><span>设置相关</span></a></h2><h3 id="开启自动保存" tabindex="-1"><a class="header-anchor" href="#开启自动保存"><span>开启自动保存</span></a></h3><p>在设置中找到 <code>Files: Auto Save</code> 并设置为 <code>afterDelay</code>。这样，编辑器会自动在配置的延迟 (默认为 1000 毫秒) 后保存文件，这个延迟可以在 <code>Files: Auto Save Delay</code> 中修改。</p><h3 id="调整字体大小" tabindex="-1"><a class="header-anchor" href="#调整字体大小"><span>调整字体大小</span></a></h3><p>在设置中找到 <code>Editor: Font Size</code> 并设置为 <code>20</code>。这样，编辑器的字体大小会调整为 20 像素。</p><h3 id="禁用通过拖放来移动选中内容" tabindex="-1"><a class="header-anchor" href="#禁用通过拖放来移动选中内容"><span>禁用通过拖放来移动选中内容</span></a></h3><p>在设置中找到 <code>Editor: Drag And Drop</code> 并将它取消勾选。因为我经常会不小心拖动选中内容，导致代码混乱。</p><h3 id="启用括号对指南" tabindex="-1"><a class="header-anchor" href="#启用括号对指南"><span>启用括号对指南</span></a></h3><p>在设置中找到 <code>Editor › Guides: Bracket Pairs</code> 并设置为 <code>true</code>。这样，编辑器会在括号对之间显示一条指南。</p><h3 id="突出显示活动的缩进参考线" tabindex="-1"><a class="header-anchor" href="#突出显示活动的缩进参考线"><span>突出显示活动的缩进参考线</span></a></h3><p>在设置中找到 <code>Editor › Guides: Highlight Active Indentation</code> 并设置为 <code>always</code>。这样，编辑器会在活动的缩进参考线周围显示一条高亮线。</p><h3 id="启用-html-标签关联编辑" tabindex="-1"><a class="header-anchor" href="#启用-html-标签关联编辑"><span>启用 HTML 标签关联编辑</span></a></h3><p>在设置中找到 <code>Editor: Linked Editing</code> 并设置为 <code>true</code>。这样，当你在 HTML 文件中编辑一个标签时，与之关联的标签也会自动被编辑。</p><h3 id="平滑动画相关" tabindex="-1"><a class="header-anchor" href="#平滑动画相关"><span>平滑动画相关</span></a></h3><p>在设置中找到 <code>Editor: Smooth Scrolling</code> 并将它勾选上。这样，编辑器在滚动时会使用平滑滚动效果。</p><p>在设置中找到 <code>Editor: Cursor Blinking</code> 并设置为 <code>smooth</code>。这样，编辑器的光标会使用平滑闪烁效果。</p><p>在设置中找到 <code>Editor: Cursor Smooth Caret Animation</code> 并设置为 <code>on</code>。这样，编辑器会有平滑插入动画。</p><h3 id="开启自动格式化" tabindex="-1"><a class="header-anchor" href="#开启自动格式化"><span>开启自动格式化</span></a></h3><p>在设置中找到 <code>Editor: Format On Save</code> 并设置为 <code>true</code>。这样，编辑器会在保存文件时自动格式化文件。</p><h3 id="调整建议列表中预先选择最近使用过的建议" tabindex="-1"><a class="header-anchor" href="#调整建议列表中预先选择最近使用过的建议"><span>调整建议列表中预先选择最近使用过的建议</span></a></h3><p>在设置中找到 <code>Editor: Suggest Selection</code> 并设置为 <code>recentlyUsed</code>。这样，编辑器会在建议列表中预先选择最近使用过的建议。</p><h3 id="给未保存更改的选项卡上绘制顶部边框" tabindex="-1"><a class="header-anchor" href="#给未保存更改的选项卡上绘制顶部边框"><span>给未保存更改的选项卡上绘制顶部边框</span></a></h3><p>在设置中找到 <code>Workbench › Editor: Highlight Modified Tabs</code> 并把它勾选上。这样，编辑器会在未保存更改的选项卡上绘制顶部边框。</p><h3 id="设置对话框样式" tabindex="-1"><a class="header-anchor" href="#设置对话框样式"><span>设置对话框样式</span></a></h3><p>在设置中找到 <code>Window: Dialog Style</code> 并设置为 <code>custom</code>。这样，编辑器会使用自定义对话框样式。</p><h3 id="禁用通过拖放来移动文件和文件夹" tabindex="-1"><a class="header-anchor" href="#禁用通过拖放来移动文件和文件夹"><span>禁用通过拖放来移动文件和文件夹</span></a></h3><p>在设置中找到 <code>Explorer: Enable Drag And Drop</code> 并取消勾选。因为我经常会不小心拖动文件和文件夹，导致文件混乱。</p><h3 id="使用重复的样式定义时报警告" tabindex="-1"><a class="header-anchor" href="#使用重复的样式定义时报警告"><span>使用重复的样式定义时报警告</span></a></h3><p>在设置中找到 <code>CSS › Lint: Duplicate Properties</code> 并设置为 <code>warning</code>。这样，编辑器会在发现重复的样式定义后报警告。</p><h3 id="设置-git-auto-stash" tabindex="-1"><a class="header-anchor" href="#设置-git-auto-stash"><span>设置 Git Auto Stash</span></a></h3><p>在设置中找到 <code>Git: Auto Stash</code> 并将它勾选。这样，编辑器会在拉取前暂存所有更改，在成功拉取后还原这些更改。</p><h3 id="设置-javascript-语义检查" tabindex="-1"><a class="header-anchor" href="#设置-javascript-语义检查"><span>设置 JavaScript 语义检查</span></a></h3><p>在设置中找到 <code>JS/TS › Implicit Project Config: Check JS</code> 并将它勾选。这样，编辑器会在 JavaScript 和 TypeScript 文件中启用语义检查。</p><h2 id="插件推荐" tabindex="-1"><a class="header-anchor" href="#插件推荐"><span>插件推荐</span></a></h2><h3 id="翻译-英汉词典" tabindex="-1"><a class="header-anchor" href="#翻译-英汉词典"><span>翻译 (英汉词典)</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=CodeInChinese.EnglishChineseDictionary" target="_blank" rel="noopener noreferrer">翻译 (英汉词典)</a>。</p><p>功能：翻译英文单词，支持开启鼠标悬停翻译功能。</p><h3 id="chinese-simplified-简体中文-language-pack-for-visual-studio-code" tabindex="-1"><a class="header-anchor" href="#chinese-simplified-简体中文-language-pack-for-visual-studio-code"><span>Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans" target="_blank" rel="noopener noreferrer">Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code</a>。</p><p>功能：VSCode 简体中文语言包。</p><h3 id="code-spell-checker" tabindex="-1"><a class="header-anchor" href="#code-spell-checker"><span>Code Spell Checker</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker" target="_blank" rel="noopener noreferrer">Code Spell Checker</a>。</p><p>功能：检查代码中的单词拼写错误。</p><h3 id="codegeex-ai-code-autocomplete-chat-auto-comment" tabindex="-1"><a class="header-anchor" href="#codegeex-ai-code-autocomplete-chat-auto-comment"><span>CodeGeeX: AI Code AutoComplete, Chat, Auto Comment</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=aminer.codegeex" target="_blank" rel="noopener noreferrer">CodeGeeX：AI Code AutoComplete，Chat，Auto Comment</a>。</p><p>功能：AI 代码自动补全、聊天、自动注释。</p><h3 id="error-lens" tabindex="-1"><a class="header-anchor" href="#error-lens"><span>Error Lens</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens" target="_blank" rel="noopener noreferrer">Error Lens</a>。</p><p>功能：在编辑器中高亮显示错误和警告。</p><h3 id="one-dark-pro" tabindex="-1"><a class="header-anchor" href="#one-dark-pro"><span>One Dark Pro</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme" target="_blank" rel="noopener noreferrer">One Dark Pro</a>。</p><p>功能：One Dark Pro 主题，我最喜欢的 VSCode 主题。</p><h3 id="todo-tree" tabindex="-1"><a class="header-anchor" href="#todo-tree"><span>Todo Tree</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree" target="_blank" rel="noopener noreferrer">Todo Tree</a>。</p><p>功能：在编辑器中显示所有 TODO、FIXME 和其他标记。</p><h3 id="vim" tabindex="-1"><a class="header-anchor" href="#vim"><span>Vim</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim" target="_blank" rel="noopener noreferrer">Vim</a>。</p><p>功能：支持 Vim 模式。</p><h3 id="vscode-icons" tabindex="-1"><a class="header-anchor" href="#vscode-icons"><span>vscode-icons</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons" target="_blank" rel="noopener noreferrer">vscode-icons</a>。</p><p>功能：在编辑器中显示图标，使文件和文件夹更易于识别。</p><h3 id="office-viewer-markdown-editor" tabindex="-1"><a class="header-anchor" href="#office-viewer-markdown-editor"><span>Office Viewer(Markdown Editor)</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-office" target="_blank" rel="noopener noreferrer">Office Viewer(Markdown Editor)</a>。</p><p>功能：在编辑器中所见即所得的书写 Markdown 文件，同时支持导出为 PDF、HTML 等格式。</p><h3 id="codesnap" tabindex="-1"><a class="header-anchor" href="#codesnap"><span>CodeSnap</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap" target="_blank" rel="noopener noreferrer">CodeSnap</a>。</p><p>功能：代码截图工具，可以快速截图并保存到剪贴板或本地文件。</p><h3 id="eslint" tabindex="-1"><a class="header-anchor" href="#eslint"><span>ESLint</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank" rel="noopener noreferrer">ESLint</a>。</p><p>功能：JavaScript 和 TypeScript 代码检查工具。</p><h3 id="prettier-code-formatter" tabindex="-1"><a class="header-anchor" href="#prettier-code-formatter"><span>Prettier - Code formatter</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank" rel="noopener noreferrer">Prettier - Code formatter</a>。</p><p>功能：代码格式化工具，支持多种编程语言。</p><h3 id="image-preview" tabindex="-1"><a class="header-anchor" href="#image-preview"><span>Image preview</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-gutter-preview" target="_blank" rel="noopener noreferrer">Image preview</a>。</p><p>功能：在编辑器中预览代码中引入的图片。</p><h3 id="live-server" tabindex="-1"><a class="header-anchor" href="#live-server"><span>Live Server</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer" target="_blank" rel="noopener noreferrer">Live Server</a>。</p><p>功能：在本地启动一个服务器，实时预览 HTML 文件。</p><h3 id="stylelint" tabindex="-1"><a class="header-anchor" href="#stylelint"><span>Stylelint</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint" target="_blank" rel="noopener noreferrer">Stylelint</a>。</p><p>功能：CSS 代码检查工具。</p><h3 id="vue-official" tabindex="-1"><a class="header-anchor" href="#vue-official"><span>Vue - Official</span></a></h3><p>下载地址：<a href="https://marketplace.visualstudio.com/items?itemName=Vue.volar" target="_blank" rel="noopener noreferrer">Vue - Official</a>。</p><p>功能：Vue.js 开发工具，支持语法高亮、代码补全、错误检查等功能。</p>',86)]))}const d=a(i,[["render",l],["__file","我的VSCode配置.html.vue"]]),c=JSON.parse(`{"path":"/SoftwareTool/%E6%88%91%E7%9A%84VSCode%E9%85%8D%E7%BD%AE.html","title":"我的 VSCode 配置","lang":"zh-CN","frontmatter":{"title":"我的 VSCode 配置","cover":"https://t.alcy.cc/fj?t=1709949600","date":"2024-03-09 10:00","category":"软件工具","tag":"VSCode","excerpt":false,"description":"分享一下我的 VSCode 配置和推荐的插件。 设置相关 开启自动保存 在设置中找到 Files: Auto Save 并设置为 afterDelay。这样，编辑器会自动在配置的延迟 (默认为 1000 毫秒) 后保存文件，这个延迟可以在 Files: Auto Save Delay 中修改。 调整字体大小 在设置中找到 Editor: Font Si...","head":[["meta",{"property":"og:url","content":"https://blog.azhf8.top/SoftwareTool/%E6%88%91%E7%9A%84VSCode%E9%85%8D%E7%BD%AE.html"}],["meta",{"property":"og:site_name","content":"Happier's Blog"}],["meta",{"property":"og:title","content":"我的 VSCode 配置"}],["meta",{"property":"og:description","content":"分享一下我的 VSCode 配置和推荐的插件。 设置相关 开启自动保存 在设置中找到 Files: Auto Save 并设置为 afterDelay。这样，编辑器会自动在配置的延迟 (默认为 1000 毫秒) 后保存文件，这个延迟可以在 Files: Auto Save Delay 中修改。 调整字体大小 在设置中找到 Editor: Font Si..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://t.alcy.cc/fj?t=1709949600"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-10-22T06:12:23.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://t.alcy.cc/fj?t=1709949600"}],["meta",{"name":"twitter:image:alt","content":"我的 VSCode 配置"}],["meta",{"property":"article:tag","content":"VSCode"}],["meta",{"property":"article:published_time","content":"2024-03-09T10:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-22T06:12:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"我的 VSCode 配置\\",\\"image\\":[\\"https://t.alcy.cc/fj?t=1709949600\\"],\\"datePublished\\":\\"2024-03-09T10:00:00.000Z\\",\\"dateModified\\":\\"2024-10-22T06:12:23.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Happier\\",\\"url\\":\\"/AboutMe/\\"}]}"]]},"headers":[{"level":2,"title":"设置相关","slug":"设置相关","link":"#设置相关","children":[{"level":3,"title":"开启自动保存","slug":"开启自动保存","link":"#开启自动保存","children":[]},{"level":3,"title":"调整字体大小","slug":"调整字体大小","link":"#调整字体大小","children":[]},{"level":3,"title":"禁用通过拖放来移动选中内容","slug":"禁用通过拖放来移动选中内容","link":"#禁用通过拖放来移动选中内容","children":[]},{"level":3,"title":"启用括号对指南","slug":"启用括号对指南","link":"#启用括号对指南","children":[]},{"level":3,"title":"突出显示活动的缩进参考线","slug":"突出显示活动的缩进参考线","link":"#突出显示活动的缩进参考线","children":[]},{"level":3,"title":"启用 HTML 标签关联编辑","slug":"启用-html-标签关联编辑","link":"#启用-html-标签关联编辑","children":[]},{"level":3,"title":"平滑动画相关","slug":"平滑动画相关","link":"#平滑动画相关","children":[]},{"level":3,"title":"开启自动格式化","slug":"开启自动格式化","link":"#开启自动格式化","children":[]},{"level":3,"title":"调整建议列表中预先选择最近使用过的建议","slug":"调整建议列表中预先选择最近使用过的建议","link":"#调整建议列表中预先选择最近使用过的建议","children":[]},{"level":3,"title":"给未保存更改的选项卡上绘制顶部边框","slug":"给未保存更改的选项卡上绘制顶部边框","link":"#给未保存更改的选项卡上绘制顶部边框","children":[]},{"level":3,"title":"设置对话框样式","slug":"设置对话框样式","link":"#设置对话框样式","children":[]},{"level":3,"title":"禁用通过拖放来移动文件和文件夹","slug":"禁用通过拖放来移动文件和文件夹","link":"#禁用通过拖放来移动文件和文件夹","children":[]},{"level":3,"title":"使用重复的样式定义时报警告","slug":"使用重复的样式定义时报警告","link":"#使用重复的样式定义时报警告","children":[]},{"level":3,"title":"设置 Git Auto Stash","slug":"设置-git-auto-stash","link":"#设置-git-auto-stash","children":[]},{"level":3,"title":"设置 JavaScript 语义检查","slug":"设置-javascript-语义检查","link":"#设置-javascript-语义检查","children":[]}]},{"level":2,"title":"插件推荐","slug":"插件推荐","link":"#插件推荐","children":[{"level":3,"title":"翻译 (英汉词典)","slug":"翻译-英汉词典","link":"#翻译-英汉词典","children":[]},{"level":3,"title":"Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code","slug":"chinese-simplified-简体中文-language-pack-for-visual-studio-code","link":"#chinese-simplified-简体中文-language-pack-for-visual-studio-code","children":[]},{"level":3,"title":"Code Spell Checker","slug":"code-spell-checker","link":"#code-spell-checker","children":[]},{"level":3,"title":"CodeGeeX: AI Code AutoComplete, Chat, Auto Comment","slug":"codegeex-ai-code-autocomplete-chat-auto-comment","link":"#codegeex-ai-code-autocomplete-chat-auto-comment","children":[]},{"level":3,"title":"Error Lens","slug":"error-lens","link":"#error-lens","children":[]},{"level":3,"title":"One Dark Pro","slug":"one-dark-pro","link":"#one-dark-pro","children":[]},{"level":3,"title":"Todo Tree","slug":"todo-tree","link":"#todo-tree","children":[]},{"level":3,"title":"Vim","slug":"vim","link":"#vim","children":[]},{"level":3,"title":"vscode-icons","slug":"vscode-icons","link":"#vscode-icons","children":[]},{"level":3,"title":"Office Viewer(Markdown Editor)","slug":"office-viewer-markdown-editor","link":"#office-viewer-markdown-editor","children":[]},{"level":3,"title":"CodeSnap","slug":"codesnap","link":"#codesnap","children":[]},{"level":3,"title":"ESLint","slug":"eslint","link":"#eslint","children":[]},{"level":3,"title":"Prettier - Code formatter","slug":"prettier-code-formatter","link":"#prettier-code-formatter","children":[]},{"level":3,"title":"Image preview","slug":"image-preview","link":"#image-preview","children":[]},{"level":3,"title":"Live Server","slug":"live-server","link":"#live-server","children":[]},{"level":3,"title":"Stylelint","slug":"stylelint","link":"#stylelint","children":[]},{"level":3,"title":"Vue - Official","slug":"vue-official","link":"#vue-official","children":[]}]}],"git":{"createdTime":1729567720000,"updatedTime":1729577543000,"contributors":[{"name":"赵鸿飞","email":"zhaohongfei@vasoyn.com","commits":4}]},"readingTime":{"minutes":4.59,"words":1377},"filePathRelative":"SoftwareTool/我的VSCode配置.md","localizedDate":"2024年3月9日","excerpt":"","autoDesc":true}`);export{d as comp,c as data};
