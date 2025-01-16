---
cover: https://t.alcy.cc/fj?t=1729666800000
date: 2024-10-23 15:00:00
order: -20241023150000
category: 开发
tag:
  - uni-app
excerpt: false
---

# uni-app 中 web-view 通信

## 主应用向 web-view 传递数据

使用 `uni.webview.js` 可以实现主应用向 web-view 传递数据。

你可以在 uni-app 官网 web-view 文档下的注意事项中找到最新版的下载地址。

主应用使用 web-view 节点的 `evalJS` 方法向 web-view 传递数据，这里我们需要获取到 web-view 节点，然后才可以传递数据。

```vue
<!-- 主应用中 -->
<template>
	<view class="container">
		<web-view src="http://192.168.78.37:5173/"></web-view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	// webView 节点
	const wvNode = ref(null)
	// 使用 evalJS 方法调用 webView 的事件并传递数据，这个方法的参数只能是字符串
	const sendMessage = (data) => {
		// 这里 getMessageFromApp 是 webView 里定义的事件，函数参数用于传递数据
		wvNode.value.evalJS(`getMessageFromApp(${JSON.stringify(data)})`)
	}
	// 获取 webView 节点
	const getWvNode = () => {
		wvNode.value = getCurrentPages().pop().$getAppWebview().children()[0]
	}
	onLoad(() => {
		// 如果是页面初始化时调用，需要延时来获取 webView 节点
		setTimeout(() => {
			getWvNode()
			sendMessage({
				msg: 'Hello!'
			})
		}, 1000)
	})
</script>
<style>
	.container {
		width: 100%;
		height: 100%;
	}
</style>
```

web-view 页面这里使用 Vue 框架开发，在 `index.html` 中引入 `uni.webview.js`。

```html
<!-- index.html -->
   <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
    <script type="module" src="./src/assets/uni.webview.js"></script>
  </body>
```

在 web-view 页面中定义 `getMessageFromApp` 事件，用于接收主应用传递的数据。

```vue
<!-- web-view 页面中 -->
<template>
  接收的消息为：{{ receiveData.msg }}
</template>
<script setup>
import { ref } from 'vue'
const receiveData = ref({})
/**
 * 监听来自App的消息
 */
window.getMessageFromApp = (data) => {
  receiveData.value = data
}
</script>
```

## web-view 向主应用传递数据

web-view 向主应用传递数据，需要使用 `uni.postMessage` 方法，将发送的数据放到 `data` 参数中。

```vue
<!-- web-view 页面中 -->
<template>
  <button @click="handleClick">向主应用发送数据</button>
</template>
<script setup>
import { ref } from 'vue'
const handleClick = () => {
  uni.postMessage({
    data: {
      msg: 'Hello!'
    }
  })
}
</script>
```

主应用中监听 web-view 的 `message` 事件，获取到 web-view 发送的数据。

```vue
<!-- 主应用中 -->
<template>
	<view class="container">
		<web-view src="http://192.168.78.37:5173/" @message="getMessageFromWebView"></web-view>
	</view>
</template>

<script setup>
	const getMessageFromWebView = (e) => {
		console.log(e.detail)
	}
</script>
<style>
	.container {
		width: 100%;
		height: 100%;
	}
</style>
```