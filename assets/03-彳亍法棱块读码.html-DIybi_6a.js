import{_ as e,c as l,d as t,o as a}from"./app-CJR9IOiA.js";const o={};function c(n,i){return a(),l("div",null,i[0]||(i[0]=[t('<p>以下打乱均采用黄顶红前的坐标打乱</p><h2 id="正常情况" tabindex="-1"><a class="header-anchor" href="#正常情况"><span>正常情况</span></a></h2><p>打乱如下：</p><p><code>F2 L2 U2 L2 F2 U2 F R2 F D2 L2 U&#39; L2 B F&#39; U2 R&#39; B D2 B R2</code></p><figure><img src="https://happier-blog.oss-cn-qingdao.aliyuncs.com/3x3x3BLD/彳亍法棱块读码01.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>打乱完成后，先按坐标 (黄顶红前) 将魔方调整好</li><li>从缓冲块位置 (UR) 开始读码，也就是从编码的 GH 块的 G 开始读 (缓冲块的编码不需要读出来)</li><li>G 位置是黄红块的黄，它的编码是 A，那么第一个编码就是 A</li><li>然后看 A 位置，是白红块的白，它的编码是 I，那么第二个编码就是 I</li><li>然后看 I 位置，是白绿块的白，它的编码是 O，那么第三个编码就是 O</li><li>然后看 O 位置，是橙绿块的橙，它的编码是 Y，那么第四个编码就是 Y</li><li>然后看 Y 位置，是白蓝块的白，它的编码是 K，那么第五个编码就是 K</li><li>然后看 K 位置，是白橙块的橙，它的编码是 N，那么第六个编码就是 N</li><li>然后看 N 位置，是红蓝块的红，它的编码是 S，那么第七个编码就是 S</li><li>然后看 S 位置，是黄蓝块的蓝，它的编码是 D，那么第八个编码就是 D</li><li>然后看 D 位置，是黄橙块的橙，它的编码是 F，那么第九个编码就是 F</li><li>然后看 F 位置，是橙蓝块的橙，它的编码是 W，那么第十个编码就是 W</li><li>然后看 W 位置，是黄绿块的黄，它的编码是 G，这里说明已经回到了缓冲块，我们不需要读出来</li><li>所有棱块都读到了，编码完成</li><li>最终的编码如下：<code>AI OY KN SD FW</code></li></ol><h2 id="存在小循环" tabindex="-1"><a class="header-anchor" href="#存在小循环"><span>存在小循环</span></a></h2><p>打乱如下：</p><p><code>F R2 D B2 F2 L2 D&#39; R2 U R2 B U&#39; F U2 R F2 D2 U&#39; R</code></p><figure><img src="https://happier-blog.oss-cn-qingdao.aliyuncs.com/3x3x3BLD/彳亍法棱块读码02.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>打乱完成后，先按坐标 (黄顶红前) 将魔方调整好</li><li>从缓冲块块 (UR) 开始读码，也就是从编码的 GH 块的 G 开始读 (缓冲块的编码不需要读出来)</li><li>G 位置是红绿块的红，它的编码是 Q，那么第一个编码就是 Q</li><li>然后看 Q 位置，是红蓝块的蓝，它的编码是 T，那么第二个编码就是 T</li><li>然后看 T 位置，是黄绿块的绿，它是我们的缓冲块 (缓冲块的编码是不需要读出来的)，此时读码明显没有结束，还有很多棱块没有读到，此时我们需要借位</li><li>借位的原则是按色相借位，黄绿块的绿色是 “1” 位置，那么我们需要借一个 “1” 位置的，我们首选的借位是借 AB 位置 (如果 AB 位置已还原或已读码，则需要借其他位置)，那么第三个编码就是 B</li><li>然后看 B 位置，是黄橙块的橙，它的编码是 F，那么第四个编码就是 F</li><li>然后看 F 位置，是白蓝块的白，它的编码是 K，那么第五个编码就是 K</li><li>然后看 K 位置，是黄蓝块的蓝，它的编码是 D，那么第六个编码就是 D</li><li>然后看 D 位置，是黄红块的红，它的编码是 B，那么第七个编码就是 B</li><li>此时我们发现回到了刚才借的位置，但还有未读的棱块，所以我们需要继续按色相借位，我们借 IJ 位置的 J，那么我们的第八个编码就是 J</li><li>然后看 J 位置，是橙绿块的橙，它的编码是 Y，那么第九个编码就是 Y</li><li>然后看 Y 位置，是白红块的白，它的编码是 I，那么第十个编码就是 I</li><li>此时我们发现回到了刚才借的位置 (虽然不是 J，但是 IJ 在同一块上)，但还有未读的棱块，所以我们需要继续按色相借位，我们借 MN 位置的 M，那么第十一个编码就是 M</li><li>然后看 M 位置，是白绿块的白，它的编码是 O，那么第十二个编码就是 O</li><li>然后看 O 位置，是橙蓝块的蓝，它的编码是 X，那么第十三个编码就是 X</li><li>然后看 X 位置，是白橙块的白，它的编码是 M，那么第十四个编码就是 M</li><li>此时我们发现回到了刚才借的位置，并且最后一个是以 “0” 位置结束，所有棱块都读到了，编码完成</li><li>最终的编码如下：<code>QT BF KD BJ YI MO XM</code></li></ol><h2 id="存在翻色" tabindex="-1"><a class="header-anchor" href="#存在翻色"><span>存在翻色</span></a></h2><p>打乱如下：</p><p><code>F2 L2 D&#39; F2 D R2 B2 R2 D&#39; R2 U2 B&#39; R&#39; F L B2 D&#39; U2 B R</code></p><figure><img src="https://happier-blog.oss-cn-qingdao.aliyuncs.com/3x3x3BLD/彳亍法棱块读码03.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ol><li>打乱完成后，先按坐标 (黄顶红前) 将魔方调整好</li><li>从缓冲块块 (UR) 开始读码，也就是从编码的 GH 块的 G 开始读 (缓冲块的编码不需要读出来)</li><li>G 位置是白橙块的橙，它的编码是 N，那么第一个编码就是 N</li><li>然后看 N 位置，是黄绿块的黄，它是我们的缓冲块 (缓冲块的编码是不需要读出来的)，此时读码明显没有结束，还有很多棱块没有读到，此时我们需要借位</li><li>借位的原则是按色相借位，黄绿块的黄色是 “0” 位置，那么我们需要借一个 “0” 位置的，我们首选的借位是借 AB 位置 (如果 AB 位置已还原或已读码，则需要借其他位置)，那么第二个编码就是 A</li><li>然后看 A 位置，是红绿块的绿，它的编码是 R，那么第三个编码就是 R</li><li>然后看 R 位置，是橙蓝块的橙，它的编码是 W，那么第四个编码就是 W</li><li>然后看 W 位置，是红蓝块的红，它的编码是 S，那么第五个编码就是 S</li><li>然后看 S 位置，是黄橙块的黄，它的编码是 E，那么第六个编码就是 E</li><li>然后看 E 位置，是黄红块的红，它的编码是 B，那么第七个编码就是 B</li><li>此时我们发现回到了刚才借的位置 (虽然不是 A，但是 AB 在同一块上)，但还有未读的棱块，所以我们需要继续按色相借位，我们借 CD 位置的 D，那么第八个编码就是 D</li><li>然后看 D 位置，是白绿块的白，它的编码是 O，那么第九个编码就是 O</li><li>然后看 O 位置，是白红块的白，它的编码是 I，那么第十个编码就是 I</li><li>然后看 I 位置，是橙绿块的橙，它的编码是 Y，那么第十一个编码就是 Y</li><li>然后看 Y 位置，是黄蓝块的蓝，它的编码是 D，那么第十二个编码就是 D</li><li>此时我们发现回到了刚才借的位置，但是最后一个编码是以 “1” 位置结束，所以出现了翻色的情况，我们发现白蓝块需要翻色，所有棱块都读到了，编码完成</li><li>最终的编码如下：<code>NA RW SE BD OI YD</code></li></ol>',16)]))}const r=e(o,[["render",c],["__file","03-彳亍法棱块读码.html.vue"]]),s=JSON.parse(`{"path":"/3x3x3BLD/03-%E5%BD%B3%E4%BA%8D%E6%B3%95%E6%A3%B1%E5%9D%97%E8%AF%BB%E7%A0%81.html","title":"彳亍法棱块读码","lang":"zh-CN","frontmatter":{"title":"彳亍法棱块读码","cover":"https://t.alcy.cc/fj?t=1719453600","order":3,"date":"2024-06-27 10:00","category":"魔方","tag":["彳亍法","三阶魔方盲拧"],"excerpt":false,"description":"以下打乱均采用黄顶红前的坐标打乱 正常情况 打乱如下： F2 L2 U2 L2 F2 U2 F R2 F D2 L2 U' L2 B F' U2 R' B D2 B R2 打乱完成后，先按坐标 (黄顶红前) 将魔方调整好 从缓冲块位置 (UR) 开始读码，也就是从编码的 GH 块的 G 开始读 (缓冲块的编码不需要读出来) G 位置是黄红块的黄，它的编...","head":[["meta",{"property":"og:url","content":"https://blog.azhf8.top/3x3x3BLD/03-%E5%BD%B3%E4%BA%8D%E6%B3%95%E6%A3%B1%E5%9D%97%E8%AF%BB%E7%A0%81.html"}],["meta",{"property":"og:site_name","content":"Happier's Blog"}],["meta",{"property":"og:title","content":"彳亍法棱块读码"}],["meta",{"property":"og:description","content":"以下打乱均采用黄顶红前的坐标打乱 正常情况 打乱如下： F2 L2 U2 L2 F2 U2 F R2 F D2 L2 U' L2 B F' U2 R' B D2 B R2 打乱完成后，先按坐标 (黄顶红前) 将魔方调整好 从缓冲块位置 (UR) 开始读码，也就是从编码的 GH 块的 G 开始读 (缓冲块的编码不需要读出来) G 位置是黄红块的黄，它的编..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://t.alcy.cc/fj?t=1719453600"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-01T06:41:15.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:src","content":"https://t.alcy.cc/fj?t=1719453600"}],["meta",{"name":"twitter:image:alt","content":"彳亍法棱块读码"}],["meta",{"property":"article:tag","content":"彳亍法"}],["meta",{"property":"article:tag","content":"三阶魔方盲拧"}],["meta",{"property":"article:published_time","content":"2024-06-27T10:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-01T06:41:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"彳亍法棱块读码\\",\\"image\\":[\\"https://happier-blog.oss-cn-qingdao.aliyuncs.com/3x3x3BLD/%E5%BD%B3%E4%BA%8D%E6%B3%95%E6%A3%B1%E5%9D%97%E8%AF%BB%E7%A0%8101.jpg\\",\\"https://happier-blog.oss-cn-qingdao.aliyuncs.com/3x3x3BLD/%E5%BD%B3%E4%BA%8D%E6%B3%95%E6%A3%B1%E5%9D%97%E8%AF%BB%E7%A0%8102.jpg\\",\\"https://happier-blog.oss-cn-qingdao.aliyuncs.com/3x3x3BLD/%E5%BD%B3%E4%BA%8D%E6%B3%95%E6%A3%B1%E5%9D%97%E8%AF%BB%E7%A0%8103.jpg\\"],\\"datePublished\\":\\"2024-06-27T10:00:00.000Z\\",\\"dateModified\\":\\"2024-11-01T06:41:15.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Happier\\",\\"url\\":\\"/AboutMe/\\"}]}"]]},"headers":[{"level":2,"title":"正常情况","slug":"正常情况","link":"#正常情况","children":[]},{"level":2,"title":"存在小循环","slug":"存在小循环","link":"#存在小循环","children":[]},{"level":2,"title":"存在翻色","slug":"存在翻色","link":"#存在翻色","children":[]}],"git":{"createdTime":1719450400000,"updatedTime":1730443275000,"contributors":[{"name":"茕茕","email":"61277974+zhf521@users.noreply.github.com","commits":9},{"name":"zhf521","email":"3407085928@qq.com","commits":5},{"name":"赵鸿飞","email":"zhaohongfei@vasoyn.com","commits":3}]},"readingTime":{"minutes":6.52,"words":1956},"filePathRelative":"3x3x3BLD/03-彳亍法棱块读码.md","localizedDate":"2024年6月27日","excerpt":"","autoDesc":true}`);export{r as comp,s as data};
