---
title: Vue Router 路由传参
cover: https://t.alcy.cc/fj?t=1730082600000
order: 7
date: 2024-10-28 10:30
category: 软件开发
tag: 
    - Vue
    - Vue Router
excerpt: false
---

## 使用 query 传参

传递参数的方式如下。

```vue
<!-- 跳转并携带 query 参数，to的字符串写法 -->
<RouterLink :to="`/home/message/detail?id=${message.id}&title=${message.title}`">{{message.title}}</RouterLink>
				
<!-- 跳转并携带 query 参数，to的对象写法（推荐） -->
<RouterLink 
	:to="{
		path:'/home/message/detail',
		query:{
		   id: message.id,
	       title: message.title
		}
	}"
>{{message.title}}</RouterLink>
```

```JavaScript
// 编程式导航，携带 query 参数
router.push({
    name: 'Detail',
    query: {
        id: message.id,
        title: message.title
    }
})
```

接收参数的方式如下。

```JavaScript
// 接收 query 参数
const route = useRoute()
const id = route.query.id
const title = route.query.title
```

## 使用 params 传参

传递参数的方式如下。

```JavaScript
// 路由配置中使用占位符声明接收 params 参数
{
	path:'/home',
	component:Home,
	children:[
		{
			path:'news',
			component:News
		},
		{
			component:Message,
			children:[
				{
                    name:'Detail',
					path:'detail/:id/:title', // 使用占位符声明接收 params 参数
					component:Detail
				}
			]
		}
	]
}
```

```vue
<!-- 跳转并携带 params 参数，to 的字符串写法 -->
<router-link :to="/home/message/detail/${message.id}/${message.title}">跳转</router-link>
				
<!-- 跳转并携带 params 参数，to 的对象写法 -->
<router-link 
	:to="{
		name:'Detail', // 注意：使用 params 传参时，必须使用 name 配置项，不能使用 path 配置项
        params: {
          id: message.id,
          title: message.title,
        }
	}"
>跳转</router-link>
```

```JavaScript
// 编程式导航，携带 params 参数
router.push({
    name: 'Detail',
    params: {
        id: message.id,
        title: message.title
    }
})
```

接收参数的方式如下。

```JavaScript
// 接收 params 参数
const route = useRoute()
const id = route.params.id
const title = route.params.title
```

## query 和 params 的区别

1. query 传参会显示在 URL 中，而 params 传参不会显示在 URL 中。
2. query 传参使用的是 `?key=value` 的形式，而 params 传参使用的是 `/key/value` 的形式。
3. 使用 query 传参时，不需要在路由中配置，而使用 params 传参时，必须在路由中配置。
4. 使用 params 传参时，刷新页面会导致 params 传参丢失，而使用 query 传参时，刷新页面不会导致 query 传参丢失。

