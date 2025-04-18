import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as t,d as e,o as a}from"./app-BGqtq-im.js";const n={};function p(l,i){return a(),t("div",null,i[0]||(i[0]=[e(`<h1 id="typescript-类型兼容" tabindex="-1"><a class="header-anchor" href="#typescript-类型兼容"><span>TypeScript 类型兼容</span></a></h1><p>TypeScript 的类型存在兼容关系，某些类型可以兼容其他类型。</p><div class="language-typescript line-numbers-mode" data-highlighter="shiki" data-ext="typescript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">type</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> T</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> number</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;"> |</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> a</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> number</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> 1</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> b</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> T</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> a</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // b 的类型兼容 a 的类型</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果类型 <code>A</code> 的值可以赋值给类型 <code>B</code>，那么类型 <code>A</code> 就称为类型 <code>B</code> 的子类型。在上例中，类型 <code>number</code> 就是类型 <code>number|string</code> 的子类型。</p><p>凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。</p><div class="language-typescript line-numbers-mode" data-highlighter="shiki" data-ext="typescript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> a</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;hi&quot;</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;hi&quot;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">let</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> b</span><span style="--shiki-light:#0184BC;--shiki-dark:#ABB2BF;">:</span><span style="--shiki-light:#0184BC;--shiki-dark:#E5C07B;"> string</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;hello&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">b</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> a</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 正确</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">a</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> b</span><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"> // 报错</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)]))}const k=s(n,[["render",p]]),c=JSON.parse(`{"path":"/TypeScriptStudyNotes/05-TypeScript%E7%B1%BB%E5%9E%8B%E5%85%BC%E5%AE%B9.html","title":"TypeScript 类型兼容","lang":"zh-CN","frontmatter":{"cover":"https://t.alcy.cc/fj?t=1731034800000","order":5,"date":"2024-11-08T11:00:00.000Z","category":"开发","tag":"TypeScript","excerpt":false,"description":"TypeScript 类型兼容 TypeScript 的类型存在兼容关系，某些类型可以兼容其他类型。 如果类型 A 的值可以赋值给类型 B，那么类型 A 就称为类型 B 的子类型。在上例中，类型 number 就是类型 number|string 的子类型。 凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TypeScript 类型兼容\\",\\"image\\":[\\"https://t.alcy.cc/fj?t=1731034800000\\"],\\"datePublished\\":\\"2024-11-08T11:00:00.000Z\\",\\"dateModified\\":\\"2025-01-16T07:41:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Happier\\",\\"url\\":\\"/AboutMe/\\"}]}"],["meta",{"property":"og:url","content":"https://blog.happierx.top/TypeScriptStudyNotes/05-TypeScript%E7%B1%BB%E5%9E%8B%E5%85%BC%E5%AE%B9.html"}],["meta",{"property":"og:site_name","content":"Happier's Blog"}],["meta",{"property":"og:title","content":"TypeScript 类型兼容"}],["meta",{"property":"og:description","content":"TypeScript 类型兼容 TypeScript 的类型存在兼容关系，某些类型可以兼容其他类型。 如果类型 A 的值可以赋值给类型 B，那么类型 A 就称为类型 B 的子类型。在上例中，类型 number 就是类型 number|string 的子类型。 凡是可以使用父类型的地方，都可以使用子类型，但是反过来不行。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://t.alcy.cc/fj?t=1731034800000"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-16T07:41:07.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://t.alcy.cc/fj?t=1731034800000"}],["meta",{"name":"twitter:image:alt","content":"TypeScript 类型兼容"}],["meta",{"property":"article:tag","content":"TypeScript"}],["meta",{"property":"article:published_time","content":"2024-11-08T11:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-16T07:41:07.000Z"}]]},"git":{"createdTime":1731037379000,"updatedTime":1737013267000,"contributors":[{"name":"赵鸿飞","username":"","email":"zhaohongfei@vasoyn.com","commits":4}]},"readingTime":{"minutes":0.55,"words":165},"filePathRelative":"TypeScriptStudyNotes/05-TypeScript类型兼容.md","excerpt":"","autoDesc":true}`);export{k as comp,c as data};
