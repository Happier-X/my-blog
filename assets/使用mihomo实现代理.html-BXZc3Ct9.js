import{_ as i,e as a,h as n,o as e}from"./app-pAq5fHgn.js";const l={};function t(h,s){return e(),a("div",null,s[0]||(s[0]=[n(`<h1 id="使用-mihomo-实现代理" tabindex="-1"><a class="header-anchor" href="#使用-mihomo-实现代理"><span>使用 mihomo 实现代理</span></a></h1><h2 id="安装-mihomo" tabindex="-1"><a class="header-anchor" href="#安装-mihomo"><span>安装 mihomo</span></a></h2><p>这里以 fnOS 为例，使用 Docker Compose 来安装 mihomo。</p><p>在 <code>dockerComposeConfig</code> 文件夹下创建一个 <code>mihomo</code> 文件夹，然后在 <code>mihomo</code> 文件夹下创建一个 <code>docker-compose.yml</code> 文件，内容如下。</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="docker-compose.yml">docker-compose.yml</span></div><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  metacubexd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    container_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">metacubexd</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ghcr.io/metacubex/metacubexd</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    restart</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">always</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;9097:80&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  mihomo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    container_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">mihomo</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">metacubex/mihomo</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    restart</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">always</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    pid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">host</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ipc</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">host</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    network_mode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">host</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    cap_add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ALL</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./config:/root/.config/mihomo</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/dev/net/tun:/dev/net/tun</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>其中，<code>./config</code> 要替换成我们本地的路径，它代表 mihomo 的配置路径。</p><p>我的配置如下。</p><div class="code-block-title"><div class="code-block-title-bar"><span class="title" data-title="docker-compose.yml">docker-compose.yml</span></div><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">services</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  metacubexd</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    container_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">metacubexd</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ghcr.io/metacubex/metacubexd</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    restart</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">always</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ports</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;9097:80&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  mihomo</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    container_name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">mihomo</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">metacubex/mihomo</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    restart</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">always</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    pid</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">host</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    ipc</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">host</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    network_mode</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">host</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    cap_add</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ALL</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    volumes</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">./config:/root/.config/mihomo</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">/dev/net/tun:/dev/net/tun</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="添加配置文件" tabindex="-1"><a class="header-anchor" href="#添加配置文件"><span>添加配置文件</span></a></h2><p>在配置目录下添加 <code>config.yaml</code> 文件，配置格式参考<a href="https://wiki.metacubex.one/example/conf/" target="_blank" rel="noopener noreferrer">官方文档</a>。</p><h2 id="访问-web-界面" tabindex="-1"><a class="header-anchor" href="#访问-web-界面"><span>访问 web 界面</span></a></h2><p>在浏览器中访问 <code>9097</code> 端口，就可以看到 web 界面了，后端地址填写 <code>http://127.0.0.1:9090</code>，密钥留空即可。</p><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用"><span>使用</span></a></h2><p>在需要使用代理的设备上，设置代理地址为 <code>http://&lt;fnOS_IP&gt;:7890</code>。</p>`,14)]))}const k=i(l,[["render",t],["__file","使用mihomo实现代理.html.vue"]]),d=JSON.parse(`{"path":"/PlayNAS/%E4%BD%BF%E7%94%A8mihomo%E5%AE%9E%E7%8E%B0%E4%BB%A3%E7%90%86.html","title":"使用 mihomo 实现代理","lang":"zh-CN","frontmatter":{"cover":"https://t.alcy.cc/fj?t=20250418133000","date":"2025-04-18T13:30:00.000Z","order":-20250418133000,"category":"工具使用","tag":["NAS","fnOS","Docker","mihomo"],"excerpt":false,"description":"使用 mihomo 实现代理 安装 mihomo 这里以 fnOS 为例，使用 Docker Compose 来安装 mihomo。 在 dockerComposeConfig 文件夹下创建一个 mihomo 文件夹，然后在 mihomo 文件夹下创建一个 docker-compose.yml 文件，内容如下。 docker-compose.yml 其...","head":[["meta",{"property":"og:url","content":"https://blog.happierx.top/PlayNAS/%E4%BD%BF%E7%94%A8mihomo%E5%AE%9E%E7%8E%B0%E4%BB%A3%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"Happier's Blog"}],["meta",{"property":"og:title","content":"使用 mihomo 实现代理"}],["meta",{"property":"og:description","content":"使用 mihomo 实现代理 安装 mihomo 这里以 fnOS 为例，使用 Docker Compose 来安装 mihomo。 在 dockerComposeConfig 文件夹下创建一个 mihomo 文件夹，然后在 mihomo 文件夹下创建一个 docker-compose.yml 文件，内容如下。 docker-compose.yml 其..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://t.alcy.cc/fj?t=20250418133000"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-04-18T05:53:25.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://t.alcy.cc/fj?t=20250418133000"}],["meta",{"name":"twitter:image:alt","content":"使用 mihomo 实现代理"}],["meta",{"property":"article:tag","content":"NAS"}],["meta",{"property":"article:tag","content":"fnOS"}],["meta",{"property":"article:tag","content":"Docker"}],["meta",{"property":"article:tag","content":"mihomo"}],["meta",{"property":"article:published_time","content":"2025-04-18T13:30:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-04-18T05:53:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"使用 mihomo 实现代理\\",\\"image\\":[\\"https://t.alcy.cc/fj?t=20250418133000\\"],\\"datePublished\\":\\"2025-04-18T13:30:00.000Z\\",\\"dateModified\\":\\"2025-04-18T05:53:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Happier\\",\\"url\\":\\"/AboutMe/\\"}]}"]]},"git":{"createdTime":1744955605000,"updatedTime":1744955605000,"contributors":[{"name":"赵鸿飞","username":"赵鸿飞","email":"zhaohongfei@vasoyn.com","commits":1,"url":"https://github.com/赵鸿飞"}]},"readingTime":{"minutes":0.92,"words":275},"filePathRelative":"PlayNAS/使用mihomo实现代理.md","localizedDate":"2025年4月18日","excerpt":"","autoDesc":true}`);export{k as comp,d as data};
