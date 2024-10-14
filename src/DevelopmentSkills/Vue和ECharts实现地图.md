---
title: Vue 和 ECharts 实现地图
cover: https://t.alcy.cc/fj?t=1725951600000
date: 2024-09-10 15:00
category: 软件开发
tag: 
    - Vue
    - ECharts
excerpt: false
---

## 在 Vue 中安装并引入 ECharts

```sh
npm install echarts --save
```

```vue
<script setup lang="ts">
// 引入 ECharts
import * as echarts from 'echarts'
</script>
```

## 实现地图

首先需要一个定义了宽高的 DOM 容器，它将作为地图的容器

```vue
<template>
  <div ref="mapRef" style="width: 100%;height: 100%;"></div>
</template>
```

然后在 `onMounted` 生命周期中初始化地图实例，注册地图，并设置地图的配置项

```vue
<template>
  <div ref="mapRef" style="width: 100%;height: 100%;"></div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
// 引入 ECharts
import * as echarts from 'echarts'
// 引入地图数据
import mapJson from '@/assets/map.json'

// 地图
const map = ref(null)
// 地图容器
const mapRef = ref(null)

onMounted(()=>{
  // 初始化地图实例
  map.value = echarts.init(mapRef.value)
  // 注册地图，这里需要传入地图的 JSON 数据
  echarts.registerMap('mapName', mapJson)
  // 配置项
  const option = {
    series: [
      {
        type: 'map',  // 图表类型为地图
        map: 'mapName',  // 地图名称
        roam: true,  // 开启地图漫游
        zoom: 1.2,  // 地图初始缩放值
      }
    ]
  }
  // 使用配置项显示地图
  map.value.setOption(option)
})
</script>
```

## 设置地图某一区域颜色

通过设置 `series` 下的 `data` 属性，其中 `name` 为区域名称，`value` 为该区域的值，`itemStyle` 为该区域的样式，`itemStyle` 中的 `areaColor` 可以设置该区域的颜色

## 监听地图点击事件

通过 `map.value.on('click', function(params){})` 可以监听地图的点击事件，其中 `params` 为点击事件的相关参数，其中 `name` 为点击区域的名称

## 监听地图漫游事件

通过 `map.value.on('georoam', function(params){})` 可以监听地图的漫游事件，其中 `params` 为漫游事件的相关参数

## 地图漫游后重置地图拖拽位置及缩放

通过 `map.value.dispatchAction({ type: 'restore' })` 可以重置地图的拖拽位置及缩放

## 更改地图大小

通过 `map.value.resize()` 可以更改地图的大小

## 地图数据

世界地图数据：(world-geo-json-zh)[https://github.com/Surbowl/world-geo-json-zh]

中国地图数据：(DataV.GeoAtlas)[https://datav.aliyun.com/portal/school/atlas/area_selector]

### 关于世界地图中国居中版本

可以使用如下算法：

```javascript
import worldJson from './world.zh.json'
// 对世界地图的json文件中的经纬度坐标进行处理
const process = item => {
    if (item > -30) {
        item = item - 180
    } else {
        item = item + 180
    }
    return item
}
// 格陵兰处理
const processGreenland = item => {
    return item + 180
}

worldJson.features.map((district, index) => {
    if (district.properties.name === '格陵兰') {
        if (district.geometry.type === 'Polygon') {
            district.geometry.coordinates.map(border => {
                border.map(coord => {
                    coord[0] = processGreenland(coord[0])
                })
            })
        } else {
            district.geometry.coordinates.map(border => {
                border.map(coordinates => {
                    coordinates.map(coord => {
                        coord[0] = processGreenland(coord[0])
                    })
                })
            })
        }
    } else {
        if (district.geometry.type == 'Polygon') {
            district.geometry.coordinates.map(border => {
                border.map(coord => {
                    coord[0] = process(coord[0])
                })
            })
        } else {
            district.geometry.coordinates.map(border => {
                border.map(coordinates => {
                    coordinates.map(coord => {
                        coord[0] = process(coord[0])
                    })
                })
            })
        }
    }
})
export default worldJson
```

注意：该算法目前存在问题：南极洲部分区域显示异常，可以将南极洲部分区域删除