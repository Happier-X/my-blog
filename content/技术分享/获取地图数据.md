# 获取地图数据

type: Post
status: Published
date: 2024/11/22
tags: GIS
category: 技术分享

在开发中，我们可能需要获取各种级别的地图数据，比如世界、全国、省、市、区县、乡镇等。这里整理了一些获取地图数据的方法。

## 世界地图

地图数据来源：[world-geo-json-zh](https://github.com/Surbowl/world-geo-json-zh)。

文件预览：

- [世界地图 Json 文件预览](https://happier-blog.oss-cn-qingdao.aliyuncs.com/DevelopmentSkills/world.zh.json)
- [内地和港澳台单独绘制版本预览](https://happier-blog.oss-cn-qingdao.aliyuncs.com/DevelopmentSkills/world-more.zh.json)

### 关于世界地图中国居中版本

可以使用如下算法处理。

```jsx
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

[worldJson.features.map](http://worldJson.features.map)((district, index) => {
    if ([district.properties.name](http://district.properties.name) === '格陵兰') {
        if (district.geometry.type === 'Polygon') {
            [district.geometry.coordinates.map](http://district.geometry.coordinates.map)(border => {
                [border.map](http://border.map)(coord => {
                    coord[0] = processGreenland(coord[0])
                })
            })
        } else {
            [district.geometry.coordinates.map](http://district.geometry.coordinates.map)(border => {
                [border.map](http://border.map)(coordinates => {
                    [coordinates.map](http://coordinates.map)(coord => {
                        coord[0] = processGreenland(coord[0])
                    })
                })
            })
        }
    } else {
        if (district.geometry.type == 'Polygon') {
            [district.geometry.coordinates.map](http://district.geometry.coordinates.map)(border => {
                [border.map](http://border.map)(coord => {
                    coord[0] = process(coord[0])
                })
            })
        } else {
            [district.geometry.coordinates.map](http://district.geometry.coordinates.map)(border => {
                [border.map](http://border.map)(coordinates => {
                    [coordinates.map](http://coordinates.map)(coord => {
                        coord[0] = process(coord[0])
                    })
                })
            })
        }
    }
})
export default worldJson
```

> 该算法目前存在问题：南极洲部分区域显示异常，可以将南极洲部分区域删除。
> 

### 关于国家按大洲划分版本

思路是根据 `ISO 3166-1` 二位代码进行判断。

代码实现如下。

```jsx
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

```jsx
// map.js
import worldJson from './world.zh.json'
import ISOCode from './ISOCode.js'

/**
 * 创建集合
 */
const createCollection = (codes) => ({
    type: 'FeatureCollection',
    features: worldJson.features.filter((item) => {
        return codes.includes([item.properties](http://item.properties).iso_a2)
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
    [json.features.map](http://json.features.map)((district, index) => {
        if ([district.properties.name](http://district.properties.name) === '格陵兰') {
            if (district.geometry.type === 'Polygon') {
                [district.geometry.coordinates.map](http://district.geometry.coordinates.map)((border) => {
                    [border.map](http://border.map)((coord) => {
                        coord[0] = processGreenland(coord[0])
                    })
                })
            } else {
                [district.geometry.coordinates.map](http://district.geometry.coordinates.map)((border) => {
                    [border.map](http://border.map)((coordinates) => {
                        [coordinates.map](http://coordinates.map)((coord) => {
                            coord[0] = processGreenland(coord[0])
                        })
                    })
                })
            }
        } else {
            if (district.geometry.type === 'Polygon') {
                [district.geometry.coordinates.map](http://district.geometry.coordinates.map)((border) => {
                    [border.map](http://border.map)((coord) => {
                        coord[0] = process(coord[0])
                    })
                })
            } else {
                [district.geometry.coordinates.map](http://district.geometry.coordinates.map)((border) => {
                    [border.map](http://border.map)((coordinates) => {
                        [coordinates.map](http://coordinates.map)((coord) => {
                            coord[0] = process(coord[0])
                        })
                    })
                })
            }
        }
    })
    return json
}

export const Asia = createCollection([ISOCode.Asia](http://ISOCode.Asia))
export const Africa = createCollection([ISOCode.Africa](http://ISOCode.Africa))
export const Europe = specialProcess(createCollection(ISOCode.Europe))
export const NorthAmerica = specialProcess(createCollection(ISOCode.NorthAmerica))
export const SouthAmerica = createCollection(ISOCode.SouthAmerica)
export const Oceania = specialProcess(createCollection(ISOCode.Oceania))
export const Antarctica = createCollection(ISOCode.Antarctica)
```

注意：未处理 `ISO 3166-1` 二位代码为 `-99` 的情况，需按需自行处理。

## 中国地图

### 方式一

可以从[阿里云数据可视化平台](https://datav.aliyun.com/portal/school/atlas/area_selector)获取国、省、市、区县地图数据。

### 方式二

可以从[五级区划查询与下载](https://map.ruiduobao.com/)获取省、市、区县、乡镇、村庄地图数据。

开源地址：[gaode_MAP_CUN](https://github.com/ruiduobao/gaode_MAP_CUN)。