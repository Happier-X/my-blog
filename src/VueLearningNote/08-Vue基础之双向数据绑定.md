---
title: Vue 基础之双向数据绑定
cover: https://t.alcy.cc/fj?t=1726639200000
order: 8
date: 2024-09-18 14:00
category: 软件开发
tag: Vue
excerpt: false
---
## 基本用法

使用 Vue 的 `v-model` 指令，可以在表单元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素

```html
<body>
    <div id="app">
        <h4>文本框：{{ data.text }}</h4>
        <h4>单选框：{{ data.radio }}</h4>
        <h4>复选框：{{ data.checkbox }}</h4>
        <h4>记住密码：{{ data.remember }}</h4>
        <h4>下拉框：{{ data.select }}</h4>

        <!-- 单向数据绑定：当数据发生改变时，视图会自动更新。但用户手动更改 input 的值，数据不会自动更新 -->
        单向数据绑定：<input type="text" :value="data.text">
        <hr>
        <!-- 双向数据绑定：当数据发生改变时，视图会自动更新。当用户手动更改 input 的值，数据也会自动更新 -->
        <!-- 对于 <input type="text">，v-model 绑定的是 input 元素的 value 属性 -->
        双向数据绑定：<input type="text" v-model="data.text">
        <hr>
        <!-- 对于 <input type="radio">，v-model 绑定的是 input 元素的选中状态 -->
        <input type="radio" v-model="data.radio" value="1">写作
        <input type="radio" v-model="data.radio" value="2">画画
        <hr>
        <!-- 对于 <input type="checkbox">，v-model 绑定的是 input 元素的选中状态 -->
        <input type="checkbox" v-model="data.checkbox" value="a">写作
        <input type="checkbox" v-model="data.checkbox" value="b">画画
        <input type="checkbox" v-model="data.checkbox" value="c">运动
        <hr>
        <!-- 记住密码 -->
        <input type="checkbox" v-model="data.remember">记住密码
        <hr>
        <!-- 对于 <select>，v-model 绑定的是 select 元素的选中状态 -->
        <select v-model="data.select">
            <option value="">请选择</option>
            <option value="A">写作</option>
            <option value="B">画画</option>
            <option value="C">运动</option>
        </select>
    </div>
    <script type="module">
        import { createApp, ref, computed } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
        createApp({
            setup() {
                const data = ref({
                    text: "你好", //文本框
                    radio: "", //单选框
                    checkbox: [], //复选框
                    remember: false, //单个复选框-记住密码
                    select: "" //下拉框
                })
                return {
                    data
                }
            }
        }).mount('#app')
    </script>
</body>
```

## 修饰符

- `.lazy`：在“change”时而非“input”时更新。即当失去焦点时，才会更新数据
- `.number`：自动将用户的输入值转为数值类型
- `.trim`：自动过滤用户输入的首尾空白字符
