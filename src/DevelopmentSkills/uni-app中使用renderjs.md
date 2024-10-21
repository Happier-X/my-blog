---
title: uni-app 中使用 renderjs
cover: https://t.alcy.cc/fj?t=1726106400000
date: 2024-09-12 10:00
category: 软件开发
tag: uni-app
excerpt: false
---
## 什么是 renderjs

官方解释：`renderjs` 是一个运行在视图层的 js，它只支持 app-vue 和 web

`renderjs` 的主要作用有 2 个：

1. 大幅降低逻辑层和视图层的通讯损耗，提供高性能视图交互能力
2. 在视图层操作 dom，运行 for web 的 js 库

## 基本使用

将 `script` 标签的 `lang` 设置为 `renderjs`

设置 `module` 用于通信 (相当于起了个名字)

```v
<script module="render" lang="renderjs">
</script>
```

## 与逻辑层通信

### 逻辑层调用 renderjs 中的方法

在行内调用：`renderjs模块名称.renderjs模块内的方法`

```vue
<template>
    <view>
        <button @click="render.test">点我触发render的test方法</button>
    </view>
</template>

<script module="render" lang="renderjs">
    export default {
        methods: {
            test() {
                console.log('我被逻辑层触发了')
            }
        }
    }
</script>

<script>
	// 这里书写逻辑层代码
</script>
```

注意：我们不能在逻辑层的方法中调用，后面会有解决办法

```vue
<script module="render" lang="renderjs">
    export default {
        methods: {
            test() {
                console.log('我被逻辑层触发了')
            }
	    }
    }
</script>

<script>
    export default {
        methods: {
            handleClick() {
                console.log('我想在逻辑层的方法中调用 renderjs 中的方法，但是这样不可行')
                this.render.test() // 在 app 上会报错
            }
        }
    }
</script>
```

### renderjs 调用逻辑层的方法

使用 `this.$ownerInstance.callMethod(方法名,传递的数据)` 可以调用逻辑层中 methods 中定义的方法，并能传递数据

```vue
<template>
    <view>
        <button @click="render.test">点我触发render的test方法</button>
    </view>
</template>

<script module="render" lang="renderjs">
    export default {
        methods: {
            test() {
            	console.log('我被逻辑层触发了')
            	setTimeout(() => {
                	this.$ownerInstance.callMethod('test1', { data: 'hello' })
                }, 2000)
            }
        }
    }
</script>

<script>
    export default {
        methods: {
            test1(value) {
                console.log('我被 renderjs 触发了，并接收到了数据', value)
            }
        }
    }
</script>
```

### 逻辑层向 renderjs 传递数据

在模板中某个元素上 (最多一层父元素) 添加要传递的属性，并监听其变化

```vue
<template>
	<view>
		<!-- 这里的 prop 是传递值的 key，可以起任意的名，message 是传递的值 -->
		<!-- 后面的 change 用来监听 prop 绑定值的变化，即 message -->
		<!-- 当 message 变化时会调用对应的方法 -->
		<view :prop="message" :change:prop="test1"></view>
		<button @click="render.test">点我触发render的test方法</button>
	</view>
</template>

<script module="render" lang="renderjs">
	export default {
		methods: {
			test() {
				console.log('我被逻辑层触发了', this.message)
				setTimeout(() => {
					this.$ownerInstance.callMethod('test1', {
						data: 'hello'
					})
				}, 2000)
			}
		}
	}
</script>

<script>
	export default {
		data() {
			return {
				message: '123'
			}
		},
		methods: {
			test1(value) {
				console.log('我被 renderjs 触发了，并接收到了数据', value)
			}
		}
	}
</script>
```

### renderjs 向逻辑层传递数据

见上文：renderjs 调用逻辑层的方法，调用方法时可以传递数据

## renderjs 不生效的原因

逻辑层在调用 renderjs 的方法不生效或者是逻辑层向 renderjs 传递数据的时候不生效，原因可能是

1. 使用 renderjs 时模板中只能有一层最外层
2. 有时在使用组件库的时候，如组件库中的 button，让其直接触发调用 renderjs 的方法的时候 (`renderjs模块名称.renderjs模块内的方法`) 可能会失效，解决方法是在逻辑层的方法中调用，如下

## 在逻辑层的方法中调用 renderjs 中的方法

在外层写一个专门用来通信的标签，然后进行传递数据、监听数据变化，通过监听值的变化自动触发事件

```vue
<template>
	<view>
		<view :prop="status" :change:prop="render.test"></view>
		<button @click="handleClick">点我触发render的test方法</button>
	</view>
</template>

<script module="render" lang="renderjs">
	export default {
		methods: {
			test() {
				if (this.status === true) {
					console.log('我被逻辑层触发了', this.status)
					// 这里书写其它代码
					this.$ownerInstance.callMethod('resetStatus')
				}
			}
		}
	}
</script>

<script>
	export default {
		data() {
			return {
				status: false
			}
		},
		methods: {
			handleClick() {
				this.status = true
				console.log('通过改变 status 的值触发 renderjs 的方法')
			},
			resetStatus() {
				this.status = false
			}
		}
	}
</script>
```

思路详解：

1. 在逻辑层中定义一个状态值，如 status
2. 在模板中添加一个专门用来通信的标签，向 renderjs 传递 status 并监听 status 的变化，当 status 变化时触发 renderjs 中的方法
3. 在逻辑层中定义一个方法，如 handleClick，当点击按钮时改变 status 的值，从而触发 renderjs 中的方法
4. 在 renderjs 的方法执行完后，重置 status 的值
5. 需要注意，只要 status 变化，就会触发 renderjs 中的方法，所以我们可以通过在要触发 renderjs 的方法中判断其值来决定要执行哪些操作
