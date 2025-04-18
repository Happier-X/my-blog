import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as t}from"./app-BGqtq-im.js";const n={};function h(l,i){return t(),a("div",null,i[0]||(i[0]=[e(`<h2 id="重定向" tabindex="-1"><a class="header-anchor" href="#重定向"><span>重定向</span></a></h2><p>重定向是指当用户访问一个路由时，自动跳转到另一个路由。在 Vue Router 中，可以使用 <code>redirect</code> 属性来实现重定向。</p><p>它可以是一个字符串，表示要跳转到的路由的路径；也可以是一个命名路由，表示要跳转到的路由的名称；还可以是一个方法。</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> routes</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [{ </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">path</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">redirect</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/home&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> }]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> routes</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [{ </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">path</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">redirect</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;homepage&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> } }]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> routes</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  {</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    path</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/search&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">    redirect</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">to</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">) </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">=&gt;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // return 重定向的字符串路径/路径对象</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">      return</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> { </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">path</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/search&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> }</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // 也可以重定向到相对路径，相对位置不以/开头</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      // return &#39;search&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    },</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="别名" tabindex="-1"><a class="header-anchor" href="#别名"><span>别名</span></a></h2><p>将 <code>/</code> 别名为 <code>/home</code>，意味着当用户访问 <code>/home</code> 时，URL 仍然是 <code>/home</code>，但会被匹配为用户正在访问 <code>/</code>。</p><p>在 Vue Router 中，可以使用 <code>alias</code> 属性来实现别名。</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">const</span><span style="--shiki-light:#986801;--shiki-dark:#E5C07B;"> routes</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> [{ </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">path</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">component</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> Homepage</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">alias</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &#39;/home&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> }]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,10)]))}const k=s(n,[["render",h]]),d=JSON.parse(`{"path":"/VueRouterStudyNotes/06-VueRouter%E9%87%8D%E5%AE%9A%E5%90%91%E5%92%8C%E5%88%AB%E5%90%8D.html","title":"Vue Router 重定向和别名","lang":"zh-CN","frontmatter":{"title":"Vue Router 重定向和别名","cover":"https://t.alcy.cc/fj?t=1729938600","order":6,"date":"2024-10-26T18:30:00.000Z","category":"开发","tag":["Vue","Vue Router"],"excerpt":false,"description":"重定向 重定向是指当用户访问一个路由时，自动跳转到另一个路由。在 Vue Router 中，可以使用 redirect 属性来实现重定向。 它可以是一个字符串，表示要跳转到的路由的路径；也可以是一个命名路由，表示要跳转到的路由的名称；还可以是一个方法。 别名 将 / 别名为 /home，意味着当用户访问 /home 时，URL 仍然是 /home，但会...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vue Router 重定向和别名\\",\\"image\\":[\\"https://t.alcy.cc/fj?t=1729938600\\"],\\"datePublished\\":\\"2024-10-26T18:30:00.000Z\\",\\"dateModified\\":\\"2025-01-16T07:41:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Happier\\",\\"url\\":\\"/AboutMe/\\"}]}"],["meta",{"property":"og:url","content":"https://blog.happierx.top/VueRouterStudyNotes/06-VueRouter%E9%87%8D%E5%AE%9A%E5%90%91%E5%92%8C%E5%88%AB%E5%90%8D.html"}],["meta",{"property":"og:site_name","content":"Happier's Blog"}],["meta",{"property":"og:title","content":"Vue Router 重定向和别名"}],["meta",{"property":"og:description","content":"重定向 重定向是指当用户访问一个路由时，自动跳转到另一个路由。在 Vue Router 中，可以使用 redirect 属性来实现重定向。 它可以是一个字符串，表示要跳转到的路由的路径；也可以是一个命名路由，表示要跳转到的路由的名称；还可以是一个方法。 别名 将 / 别名为 /home，意味着当用户访问 /home 时，URL 仍然是 /home，但会..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://t.alcy.cc/fj?t=1729938600"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-16T07:41:07.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://t.alcy.cc/fj?t=1729938600"}],["meta",{"name":"twitter:image:alt","content":"Vue Router 重定向和别名"}],["meta",{"property":"article:tag","content":"Vue Router"}],["meta",{"property":"article:tag","content":"Vue"}],["meta",{"property":"article:published_time","content":"2024-10-26T18:30:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-16T07:41:07.000Z"}]]},"git":{"createdTime":1729941397000,"updatedTime":1737013267000,"contributors":[{"name":"zhf521","username":"zhf521","email":"3407085928@qq.com","commits":1,"url":"https://github.com/zhf521"},{"name":"赵鸿飞","username":"","email":"zhaohongfei@vasoyn.com","commits":3}]},"readingTime":{"minutes":0.85,"words":254},"filePathRelative":"VueRouterStudyNotes/06-VueRouter重定向和别名.md","excerpt":"","autoDesc":true}`);export{k as comp,d as data};
