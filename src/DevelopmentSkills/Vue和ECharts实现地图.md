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

首先需要一个定义了宽高的 DOM 容器，它将作为地图的容器。

```vue
<template>
  <div ref="mapRef" style="width: 100%;height: 100%;"></div>
</template>
```

然后在 `onMounted` 生命周期中初始化地图实例，注册地图，并设置地图的配置项。

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

通过设置 `series` 下的 `data` 属性，其中 `name` 为区域名称，`value` 为该区域的值，`itemStyle` 为该区域的样式，`itemStyle` 中的 `areaColor` 可以设置该区域的颜色。

## 监听地图点击事件

通过 `map.value.on('click', function(params){})` 可以监听地图的点击事件，其中 `params` 为点击事件的相关参数，其中 `name` 为点击区域的名称。

## 监听地图漫游事件

通过 `map.value.on('georoam', function(params){})` 可以监听地图的漫游事件，其中 `params` 为漫游事件的相关参数。

## 地图漫游后重置地图拖拽位置及缩放

通过 `map.value.dispatchAction({ type: 'restore' })` 可以重置地图的拖拽位置及缩放。

## 更改地图大小

通过 `map.value.resize()` 可以更改地图的大小。

## 地图数据

+ 世界地图数据：[world-geo-json-zh](https://github.com/Surbowl/world-geo-json-zh)
  + [Json 文件预览](https://happier-blog.oss-cn-qingdao.aliyuncs.com/DevelopmentSkills/world.zh.json)
  + [内地和港澳台单独绘制版本预览](https://happier-blog.oss-cn-qingdao.aliyuncs.com/DevelopmentSkills/world-l.zh.json)
+ 中国地图数据：[DataV.GeoAtlas](https://datav.aliyun.com/portal/school/atlas/area_selector)

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

注意：该算法目前存在问题：南极洲部分区域显示异常，可以将南极洲部分区域删除。

### 关于国家按大洲划分版本

思路是根据 “ISO 3166-1” 二位代码进行判断。

代码实现：

```javascript
// ISOCode.js
const ISOCode = {
    Africa: ['DZ', 'TF', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CV', 'CM', 'CF', 'TD', 'KM', 'CG', 'CI', 'CD', 'DJ', 'EG', 'GQ', 'ER', 'SZ', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'TZ', 'TG', 'TN', 'UG', 'EH', 'ZM', 'ZW', 'IO', 'SH'],
    Antarctica: ['AQ', 'GS', 'HM'],
    Asia: ['AF', 'PH', 'KP', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'IN', 'ID', 'IR', 'IQ', 'IL', 'JP', 'JO', 'KZ', 'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN', 'MM', 'NP', 'OM', 'PK', 'PS', 'QA', 'SA', 'SG', 'KR', 'LK', 'SY', 'TJ', 'TH', 'TL', 'TR', 'TM', 'AE', 'UZ', 'VN', 'YE'],
    Europe: ['JE', 'GG', 'AX', 'IM', 'AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CZ', 'DK', 'EE', 'FO', 'FI', 'FR', 'DE', 'GR', 'VA', 'HU', 'IS', 'IE', 'IT', 'XK', 'LV', 'LI', 'LT', 'LU', 'MK', 'MT', 'MD', 'MC', 'ME', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'UA', 'GB'],
    NorthAmerica: ['AI', 'CR', 'AG', 'AW', 'BS', 'BB', 'BZ', 'BM', 'VG', 'CA', 'KY', 'CU', 'CW', 'DM', 'DO', 'SV', 'GL', 'GD', 'GT', 'HT', 'HN', 'JM', 'MX', 'MS', 'NI', 'PA', 'PR', 'BL', 'KN', 'LC', 'MF', 'PM', 'VC', 'SX', 'TT', 'TC', 'US', 'VI'],
    Oceania: ['AS', 'AU', 'CX', 'CK', 'FJ', 'PF', 'GU', 'KI', 'MH', 'FM', 'NR', 'NC', 'NZ', 'NU', 'NF', 'MP', 'PW', 'PG', 'PN', 'WS', 'SB', 'TO', 'TV', 'UM', 'VU', 'WF', 'WS'],
    SouthAmerica: ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE']
}
export default ISOCode
```

```javascript
// map.js
import worldJson from './world.zh.json'
import ISOCode from './ISOCode.js'

/**
 * 创建集合
 */
const createCollection = (codes) => ({
    type: 'FeatureCollection',
    features: worldJson.features.filter((item) => {
        return codes.includes(item.properties.iso_a2)
    })
})

/**
 * 特殊处理
 */
const specialProcess = (json) => {
    const process = (item) => {
        if (item > -30) {
            item = item - 180
        } else {
            item = item + 180
        }
        return item
    }
    const processGreenland = (item) => {
        return item + 180
    }
    json.features.map((district, index) => {
        if (district.properties.name === '格陵兰') {
            if (district.geometry.type === 'Polygon') {
                district.geometry.coordinates.map((border) => {
                    border.map((coord) => {
                        coord[0] = processGreenland(coord[0])
                    })
                })
            } else {
                district.geometry.coordinates.map((border) => {
                    border.map((coordinates) => {
                        coordinates.map((coord) => {
                            coord[0] = processGreenland(coord[0])
                        })
                    })
                })
            }
        } else {
            if (district.geometry.type === 'Polygon') {
                district.geometry.coordinates.map((border) => {
                    border.map((coord) => {
                        coord[0] = process(coord[0])
                    })
                })
            } else {
                district.geometry.coordinates.map((border) => {
                    border.map((coordinates) => {
                        coordinates.map((coord) => {
                            coord[0] = process(coord[0])
                        })
                    })
                })
            }
        }
    })
    return json
}

export const Asia = createCollection(ISOCode.Asia)
export const Africa = createCollection(ISOCode.Africa)
export const Europe = specialProcess(createCollection(ISOCode.Europe))
export const NorthAmerica = specialProcess(createCollection(ISOCode.NorthAmerica))
export const SouthAmerica = createCollection(ISOCode.SouthAmerica)
export const Oceania = specialProcess(createCollection(ISOCode.Oceania))
export const Antarctica = createCollection(ISOCode.Antarctica)
```

注意：未处理 “ISO 3166-1” 二位代码为 -99 的情况，需按需自行处理。
