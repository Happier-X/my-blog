import{_ as s,e,h as a,o as t}from"./app-kRFd5XhJ.js";const n={};function h(l,i){return t(),e("div",null,i[0]||(i[0]=[a('<h1 id="node-版本管理工具-fnm" tabindex="-1"><a class="header-anchor" href="#node-版本管理工具-fnm"><span>Node 版本管理工具 FNM</span></a></h1><h2 id="简介" tabindex="-1"><a class="header-anchor" href="#简介"><span>简介</span></a></h2><p>FNM 是一个用于 Node 版本管理和切换的工具，它使用 Rust 编写，速度非常快，并且支持 Windows、macOS 和 Linux 系统。</p><h2 id="下载安装" tabindex="-1"><a class="header-anchor" href="#下载安装"><span>下载安装</span></a></h2><p>这里以 Windows 系统为例，其它系统请参考<a href="https://github.com/Schniz/fnm" target="_blank" rel="noopener noreferrer">官方文档</a>。</p><p>打开命令行工具，输入以下命令：</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">winget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> Schniz.fnm</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --location</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> D:</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\S</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">oftware</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">\\F</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">NM</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><blockquote><p>这里的 <code>D:\\Software\\FNM</code> 是你希望安装的路径，可以根据自己的需求进行修改，也可以不添加 <code>--location 路径</code> 来使用默认路径。</p></blockquote><h2 id="shell-配置" tabindex="-1"><a class="header-anchor" href="#shell-配置"><span>Shell 配置</span></a></h2><p>打开 PowerShell (其它 Shell 参考<a href="https://github.com/Schniz/fnm" target="_blank" rel="noopener noreferrer">官方文档</a>) 输入以下命令：</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">notepad</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> $PROFILE</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>在打开的文件中添加以下内容：</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fnm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> env</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --use-on-cd</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> --shell</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> powershell</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Out-String</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> | </span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Invoke-Expression</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><p>切换 Node 版本</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fnm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> use</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">n&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>查看已安装的 Node 版本</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fnm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> list</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>安装 Node 版本</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fnm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> install</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">n&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>卸载 Node 版本</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fnm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> uninstall</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">n&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>设置默认 Node 版本</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fnm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> default</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> &lt;</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">versio</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">n&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>打印当前 Node 版本</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fnm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> current</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="与-husky-配合使用时的注意事项" tabindex="-1"><a class="header-anchor" href="#与-husky-配合使用时的注意事项"><span>与 Husky 配合使用时的注意事项</span></a></h2><p>因为我们使用了 <code>fnm</code> 来管理 Node 版本，所以由于 PATH 环境变量问题，你可能会遇到 <code>command not found</code> 报错。</p><p>我们可以在系统 <code>C:/Users/用户名/.config/husky/init.sh</code> 文件中添加以下内容：</p><div class="language-sh line-numbers-mode" data-highlighter="shiki" data-ext="sh" data-title="sh" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">eval</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;$(</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">fnm</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> env </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">--use-on-cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">)&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>',30)]))}const d=s(n,[["render",h],["__file","Node版本管理工具FNM.html.vue"]]),p=JSON.parse(`{"path":"/DevelopmentSkills/Node%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7FNM.html","title":"Node 版本管理工具 FNM","lang":"zh-CN","frontmatter":{"cover":"https://t.alcy.cc/fj?t=1728871200000","date":"2024-10-14T10:00:00.000Z","order":-20241014100000,"category":"开发","tag":["Node","FNM","Husky"],"excerpt":false,"description":"Node 版本管理工具 FNM 简介 FNM 是一个用于 Node 版本管理和切换的工具，它使用 Rust 编写，速度非常快，并且支持 Windows、macOS 和 Linux 系统。 下载安装 这里以 Windows 系统为例，其它系统请参考官方文档。 打开命令行工具，输入以下命令： 这里的 D:\\\\Software\\\\FNM 是你希望安装的路径，可以...","head":[["meta",{"property":"og:url","content":"https://blog.happierx.top/DevelopmentSkills/Node%E7%89%88%E6%9C%AC%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7FNM.html"}],["meta",{"property":"og:site_name","content":"Happier's Blog"}],["meta",{"property":"og:title","content":"Node 版本管理工具 FNM"}],["meta",{"property":"og:description","content":"Node 版本管理工具 FNM 简介 FNM 是一个用于 Node 版本管理和切换的工具，它使用 Rust 编写，速度非常快，并且支持 Windows、macOS 和 Linux 系统。 下载安装 这里以 Windows 系统为例，其它系统请参考官方文档。 打开命令行工具，输入以下命令： 这里的 D:\\\\Software\\\\FNM 是你希望安装的路径，可以..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://t.alcy.cc/fj?t=1728871200000"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-16T08:47:54.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://t.alcy.cc/fj?t=1728871200000"}],["meta",{"name":"twitter:image:alt","content":"Node 版本管理工具 FNM"}],["meta",{"property":"article:tag","content":"Node"}],["meta",{"property":"article:tag","content":"FNM"}],["meta",{"property":"article:tag","content":"Husky"}],["meta",{"property":"article:published_time","content":"2024-10-14T10:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-16T08:47:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Node 版本管理工具 FNM\\",\\"image\\":[\\"https://t.alcy.cc/fj?t=1728871200000\\"],\\"datePublished\\":\\"2024-10-14T10:00:00.000Z\\",\\"dateModified\\":\\"2025-01-16T08:47:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Happier\\",\\"url\\":\\"/AboutMe/\\"}]}"]]},"git":{"createdTime":1728896146000,"updatedTime":1737017274000,"contributors":[{"name":"赵鸿飞","username":"赵鸿飞","email":"zhaohongfei@vasoyn.com","commits":9,"url":"https://github.com/赵鸿飞"}]},"readingTime":{"minutes":1.17,"words":351},"filePathRelative":"DevelopmentSkills/Node版本管理工具FNM.md","localizedDate":"2024年10月14日","excerpt":"","autoDesc":true}`);export{d as comp,p as data};
