import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,d as r,o as i}from"./app-BGqtq-im.js";const n={};function p(o,e){return i(),t("div",null,e[0]||(e[0]=[r('<h1 id="前端-ai-辅助编程" tabindex="-1"><a class="header-anchor" href="#前端-ai-辅助编程"><span>前端 AI 辅助编程</span></a></h1><h2 id="ai-辅助编程工具" tabindex="-1"><a class="header-anchor" href="#ai-辅助编程工具"><span>AI 辅助编程工具</span></a></h2><p>AI 辅助编程目前主要是两种方式：</p><ol><li>代码补全：通过 AI 模型分析上下文，自动补全代码片段。</li><li>代码生成：根据自然语言描述生成完整的代码。</li></ol><p>目前有许多工具和插件可以实现这些功能。</p><h3 id="编辑器" tabindex="-1"><a class="header-anchor" href="#编辑器"><span>编辑器</span></a></h3><h4 id="cursor" tabindex="-1"><a class="header-anchor" href="#cursor"><span>Cursor</span></a></h4><p><img src="https://happier-blog.oss-cn-qingdao.aliyuncs.com/前端AI辅助编程01.png" alt=""></p><p>是目前最好用的 AI 编辑器。</p><ul><li>官网：<a href="https://www.cursor.com/cn" target="_blank" rel="noopener noreferrer">Cursor</a></li><li>优点：是目前使用下来体验最好的 AI 编辑器，代码补全能力是最强的，可以跨行补全 (这是我体验下来觉得最能提高工作效率的)，支持 Claude 模型。</li><li>缺点：目前想要免费试用越来越困难，需要付费，价格 20 刀一个月。</li></ul><h4 id="trae" tabindex="-1"><a class="header-anchor" href="#trae"><span>Trae</span></a></h4><p><img src="https://happier-blog.oss-cn-qingdao.aliyuncs.com/前端AI辅助编程02.png" alt=""></p><p>是字节跳动推出的 AI 编辑器。</p><ul><li>官网：<a href="https://www.trae.com.cn/" target="_blank" rel="noopener noreferrer">Trae</a></li><li>优点：免费，界面友好，在 VSCode 的基础上进行了一些页面的美化，支持免费使用 Claude 模型。</li><li>缺点：代码补全能力不如 Cursor，不能跨行补全。</li></ul><h3 id="vscode-插件" tabindex="-1"><a class="header-anchor" href="#vscode-插件"><span>VSCode 插件</span></a></h3><h4 id="github-copilot" tabindex="-1"><a class="header-anchor" href="#github-copilot"><span>GitHub Copilot</span></a></h4><p>是 GitHub 推出的 AI 代码、代码生成补全插件。</p><ul><li>优点：微软推出的，在 VSCode 上使用非常方便，最近更新了 NES 功能，也支持跨行补全了，但是体验没有 Cursor 好。可以免费使用。可以使用 Claude 模型。</li><li>缺点：代码补全能力不如 Cursor；免费试用有门槛 (需使用外币卡预付 10 刀)。</li></ul><h4 id="augment" tabindex="-1"><a class="header-anchor" href="#augment"><span>Augment</span></a></h4><p>最近很火的 AI 代码补全和代码生成插件。</p><ul><li>优点：可以扫描整个仓库来建立索引，支持跨行补全，支持 Claude 模型。</li><li>缺点：价格较高，30 刀一个月，而且使用下来跨行补全不太好用。</li></ul><h4 id="cline" tabindex="-1"><a class="header-anchor" href="#cline"><span>Cline</span></a></h4><p>开源的 AI 代码生成插件。</p><ul><li>优点：开源，免费，支持多种模型。</li><li>缺点：不能代码补全，只能生成代码；调用模型需要付费。</li></ul><h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3><p>如果侧重代码补全，推荐使用免费试用 Cursor，如果有渠道使用 Copilot，使用 Copilot 也不错。</p><p>如果侧重代码生成，推荐使用 Cline、Trae。</p><h2 id="ai-辅助编程模型" tabindex="-1"><a class="header-anchor" href="#ai-辅助编程模型"><span>AI 辅助编程模型</span></a></h2><p>目前在代码能力上，推荐使用 Claude3.7、Claude3.5、DeepSeekV3(0324)。这几个模型在代码能力上可以说是最强的。</p><p>Claude 另一个优势是支持图片输入。</p><p>推荐使用 CherryStudio 统一管理和调用模型。</p><p>OpenRouter 可以免费使用 DeepSeekV3(0324) 模型。</p><h2 id="对前端开发的帮助" tabindex="-1"><a class="header-anchor" href="#对前端开发的帮助"><span>对前端开发的帮助</span></a></h2><h3 id="代码补全" tabindex="-1"><a class="header-anchor" href="#代码补全"><span>代码补全</span></a></h3><p>目前开发中我使用最多的功能是代码补全，它可以减少我重复的输入，跨行补全还可以猜测我下一步想要修改的内容。比如我要修改一个变量，它可以自动补全其他我要修改变量的地方。</p><h3 id="代码生成" tabindex="-1"><a class="header-anchor" href="#代码生成"><span>代码生成</span></a></h3><p>目前代码生成在项目中使用较少，使用较多且不容易出错的地方如下。</p><ul><li>生成一些常用的函数，如数组处理和字符串操作。</li><li>生成表单验证函数 (编写正则表达式)。</li><li>通过输入图片生成 Echarts 图表配置。</li><li>仿写页面，比如有两个页面，A 页面已经修改完成，B 页面与 A 页面相似，我可以让 AI 帮我把 B 页面仿照 A 页面来修改。</li><li>生成请求函数，把后端给我们的 Swagger 文档转换成请求函数。</li></ul><h3 id="快速查阅文档和个人笔记" tabindex="-1"><a class="header-anchor" href="#快速查阅文档和个人笔记"><span>快速查阅文档和个人笔记</span></a></h3><p>在开发中，我们常常需要查阅文档，我们可以通过 CherryStudio 搭建个人的本地知识库，将文档和个人笔记搭建成知识库，然后通过 AI 快速查阅。</p><h3 id="代码重构" tabindex="-1"><a class="header-anchor" href="#代码重构"><span>代码重构</span></a></h3><p>在开发中，可能需要重构代码，我使用较多的地方是让它帮我把 Vue 选项式风格的代码重构成 Vue 组合式风格的代码。</p><h3 id="ui-设计" tabindex="-1"><a class="header-anchor" href="#ui-设计"><span>UI 设计</span></a></h3><p>在开发中，可能需要设计一些 UI 界面，我们可以通过 AI 生成一些 UI 界面。它可以根据原型来快速生成漂亮的 UI 设计稿 (以 HTML 的形式)，这可以方便我们快速搭建页面。</p><h3 id="组件生成" tabindex="-1"><a class="header-anchor" href="#组件生成"><span>组件生成</span></a></h3><p>在开发中，一些设计业务较少且重复的组件，我们可以让 AI 帮我们生成。比如我们需要一个表格组件，我们可以给它一些提示词 (比如，帮我生成一个表格组件，使用 ElementPlus 组件库，使用 Vue3 的组合式 API，符合 ElementPlus 整体设计风格，支持分页和排序功能)，然后我们把这段话丢给提示词优化工具，用优化好的提示词给 AI，它就可以帮我们生成一个表格组件。</p><h2 id="如何让-ai-更好地理解我们" tabindex="-1"><a class="header-anchor" href="#如何让-ai-更好地理解我们"><span>如何让 AI 更好地理解我们</span></a></h2><ul><li>可以使用提示词优化来让 AI 更好地理解我们。推荐工具：<a href="https://github.com/linshenkx/prompt-optimizer" target="_blank" rel="noopener noreferrer">prompt-optimizer</a>。</li><li>尽可能分模块的描述需求，让 AI 一部分一部分的生成代码。(比如我要生成一个页面的增删改查，如果我们一开始就给 AI 说要生成一个增删改查的页面，AI 可能会生成一个很大的代码块，我们可以把它拆分成几个小的模块来描述。我们可以先让 AI 生成一个新增的模块，告诉它需要的字段、数据类型、表单形式 (下拉框、输入框之类的)，然后再根据生成的代码进行微调，调整好以后就可以让它在这个基础上继续生成，这个过程可以提高生成代码的准确性。)</li><li>可以使用图片来描述需求，AI 可以通过图片来理解我们想要的效果。(比如我们想要修改页面某个区域的样式，我们可以先截图，然后用红色框框选这部分区域，然后给可以视觉识别的 AI 模型，AI 就可以理解我们想要修改的区域。)</li><li>限制 AI 的行为，不能光给 AI 说让它干什么，还需要给它说不要它干什么。(比如我在重构代码的时候，我会告诉 AI 我需要重构的代码是 Vue 选项式风格的代码，然后告诉它我需要重构成 Vue 组合式风格的代码，告诉它不要修改代码逻辑、不要使用 reactive。)</li></ul>',48)]))}const h=a(n,[["render",p]]),c=JSON.parse(`{"path":"/DevelopmentSkills/%E5%89%8D%E7%AB%AFAI%E8%BE%85%E5%8A%A9%E7%BC%96%E7%A8%8B.html","title":"前端 AI 辅助编程","lang":"zh-CN","frontmatter":{"cover":"https://t.alcy.cc/fj?t=20250411160000","date":"2025-04-11T16:00:00.000Z","order":-20250411160000,"category":"开发","tag":["AI"],"excerpt":false,"description":"前端 AI 辅助编程 AI 辅助编程工具 AI 辅助编程目前主要是两种方式： 代码补全：通过 AI 模型分析上下文，自动补全代码片段。 代码生成：根据自然语言描述生成完整的代码。 目前有许多工具和插件可以实现这些功能。 编辑器 Cursor 是目前最好用的 AI 编辑器。 官网：Cursor 优点：是目前使用下来体验最好的 AI 编辑器，代码补全能力是...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"前端 AI 辅助编程\\",\\"image\\":[\\"https://happier-blog.oss-cn-qingdao.aliyuncs.com/前端AI辅助编程01.png\\",\\"https://happier-blog.oss-cn-qingdao.aliyuncs.com/前端AI辅助编程02.png\\"],\\"datePublished\\":\\"2025-04-11T16:00:00.000Z\\",\\"dateModified\\":\\"2025-04-11T08:38:33.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Happier\\",\\"url\\":\\"/AboutMe/\\"}]}"],["meta",{"property":"og:url","content":"https://blog.happierx.top/DevelopmentSkills/%E5%89%8D%E7%AB%AFAI%E8%BE%85%E5%8A%A9%E7%BC%96%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"Happier's Blog"}],["meta",{"property":"og:title","content":"前端 AI 辅助编程"}],["meta",{"property":"og:description","content":"前端 AI 辅助编程 AI 辅助编程工具 AI 辅助编程目前主要是两种方式： 代码补全：通过 AI 模型分析上下文，自动补全代码片段。 代码生成：根据自然语言描述生成完整的代码。 目前有许多工具和插件可以实现这些功能。 编辑器 Cursor 是目前最好用的 AI 编辑器。 官网：Cursor 优点：是目前使用下来体验最好的 AI 编辑器，代码补全能力是..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://t.alcy.cc/fj?t=20250411160000"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-11T08:38:33.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://t.alcy.cc/fj?t=20250411160000"}],["meta",{"name":"twitter:image:alt","content":"前端 AI 辅助编程"}],["meta",{"property":"article:tag","content":"AI"}],["meta",{"property":"article:published_time","content":"2025-04-11T16:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-11T08:38:33.000Z"}]]},"git":{"createdTime":1744358614000,"updatedTime":1744360713000,"contributors":[{"name":"赵鸿飞","username":"","email":"zhaohongfei@vasoyn.com","commits":3}]},"readingTime":{"minutes":5.44,"words":1633},"filePathRelative":"DevelopmentSkills/前端AI辅助编程.md","excerpt":"","autoDesc":true}`);export{h as comp,c as data};
