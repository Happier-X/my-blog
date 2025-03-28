---
cover: https://t.alcy.cc/fj?t=20250321150000
date: 2025-03-21 15:00:00
order: -20250321150000
category: 开发
tag:
  - JavaScript
  - HTML
excerpt: false
---

# iframe 通信

主页面为 `parent.html`，iframe 页面为 `child.html`。

## 主页面向 iframe 页面发送消息

```html title="parent.html"
<iframe src="./child.html" id="childIframe"></iframe>
<script>
  // 获取子页面的iframe
  const childIframe = document.getElementById("childIframe");
  // 向子页面发送消息
  childIframe.addEventListener("load", () => {
    childIframe.contentWindow.postMessage("hello", "*"); // 第二个参数用于指定发送的域
  });
</script>
```

```html title="child.html"
<script>
  window.addEventListener("message", (event) => {
    console.log(event.data); // 接收到消息
  });
</script>
```

## iframe 页面向主页面发送消息

```html title="child.html"
<script>
  window.parent.postMessage("hello", "*"); // 发送消息给父页面
</script>
```

```html title="parent.html"
<iframe src="./child.html" id="childIframe"></iframe>
<script>
  window.addEventListener("message", (event) => {
    console.log(event.data); // 接收到消息
  });
</script>
```