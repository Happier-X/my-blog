---
title: Echarts 实现3D柱状图
seo:
  title: Echarts-3d-bar file
  description: ""
---

```vue
<template>
    <div class="bar" id="main"></div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue"
import * as echarts from "echarts"

const option = reactive({
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
    },
    xAxis: [
        {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
                alignWithLabel: true,
            },
        },
    ],
    yAxis: [
        {
            type: "value",
        },
    ],
    series: [
        {
            type: "custom",
            data: [30, 50, 30, 30, 30],
            barWidth: 30,
            renderItem(params, api) {
                // 基础坐标

                //api.value(0)可以获取到对应的Index，value(1)获取到y轴value值
                //api.coord可以获取到某个点(索引,value)的坐标
                // console.log("coord", api.coord([api.value(0), 0]))
                const basicsCoord = api.coord([api.value(0), api.value(1)])
                console.log("basic", basicsCoord)
                // 顶部基础 y 轴,注意：是从顶部空白处到头部的距离
                const topBasicsYAxis = basicsCoord[1]
                // console.log("topBasic", topBasicsYAxis)
                // 基础 x 轴
                const basicsXAxis = basicsCoord[0]
                // 底部 y 轴  注意：y轴的距离都是从canvas左上角开始，到当前点位的距离
                const bottomYAxis = api.coord([api.value(0), 0])[1]
                console.log("bottomYAxis", bottomYAxis)

                return {
                    type: "group",
                    children: [
                        {
                            type: "leftShape",
                            shape: {
                                topBasicsYAxis,
                                basicsXAxis,
                                bottomYAxis,
                            },
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "rgb(0, 192, 238,0.8)",
                                    },

                                    {
                                        offset: 0.8,
                                        color: "rgb(0, 194, 239,0.2)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(0, 194, 239,0)",
                                    },
                                ]),
                                emphasis: {
                                    fill: "yellow", // 鼠标高亮时的填充颜色
                                },
                            },
                        },
                        {
                            type: "rightShape",
                            shape: {
                                topBasicsYAxis,
                                basicsXAxis,
                                bottomYAxis,
                            },
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: "#00CCF5 ",
                                    },

                                    {
                                        offset: 0.8,
                                        color: "rgb(4, 88, 115,0.8)",
                                    },
                                    {
                                        offset: 1,
                                        color: "rgb(4, 88, 115,0.6)",
                                    },
                                ]),
                            },
                        },
                        {
                            type: "topShape",
                            shape: {
                                topBasicsYAxis,
                                basicsXAxis,
                                bottomYAxis,
                            },
                            style: {
                                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0.3,
                                        color: "#6DF0FF",
                                    },
                                    {
                                        offset: 1,
                                        color: "#6DF0FF",
                                    },
                                ]),
                            },
                        },
                    ],
                }
            },
        },
    ],
})
const myChart = ref(null)

onMounted(() => {
    init()
})

function init() {
    const chartDom = document.getElementById("main")
    myChart.value = echarts.init(chartDom)
    setBar()
}
function setBar() {
    const leftShape = echarts.graphic.extendShape({
        buildPath(ctx, shape) {
            console.log("shape", shape)
            const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape
            // 侧面宽度
            const WIDTH = 15
            // 斜角高度
            const OBLIQUE_ANGLE_HEIGHT = 8

            const p1 = [basicsXAxis - WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT]
            const p2 = [basicsXAxis - WIDTH, bottomYAxis]
            const p3 = [basicsXAxis, bottomYAxis]
            const p4 = [basicsXAxis, topBasicsYAxis]

            ctx.moveTo(p1[0], p1[1])
            ctx.lineTo(p2[0], p2[1])
            ctx.lineTo(p3[0], p3[1])
            ctx.lineTo(p4[0], p4[1])
        },
    })
    const rightShape = echarts.graphic.extendShape({
        buildPath(ctx, shape) {
            const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape
            // 侧面宽度
            const WIDTH = 15
            // 斜角高度
            const OBLIQUE_ANGLE_HEIGHT = 8

            const p1 = [basicsXAxis, topBasicsYAxis]
            const p2 = [basicsXAxis, bottomYAxis]
            const p3 = [basicsXAxis + WIDTH, bottomYAxis]
            const p4 = [basicsXAxis + WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT]

            ctx.moveTo(p1[0], p1[1])
            ctx.lineTo(p2[0], p2[1])
            ctx.lineTo(p3[0], p3[1])
            ctx.lineTo(p4[0], p4[1])
        },
    })

    const topShape = echarts.graphic.extendShape({
        buildPath(ctx, shape) {
            const { topBasicsYAxis, basicsXAxis } = shape
            // 侧面宽度
            const WIDTH = 15
            // 斜角高度
            const OBLIQUE_ANGLE_HEIGHT = 8

            const p1 = [basicsXAxis, topBasicsYAxis]
            const p2 = [basicsXAxis + WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT]
            const p3 = [basicsXAxis, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT * 2]
            const p4 = [basicsXAxis - WIDTH, topBasicsYAxis - OBLIQUE_ANGLE_HEIGHT]

            ctx.moveTo(p1[0], p1[1])
            ctx.lineTo(p2[0], p2[1])
            ctx.lineTo(p3[0], p3[1])
            ctx.lineTo(p4[0], p4[1])
        },
    })

    echarts.graphic.registerShape("leftShape", leftShape)
    echarts.graphic.registerShape("rightShape", rightShape)
    echarts.graphic.registerShape("topShape", topShape)
    myChart.value.setOption(option)
}
</script>

<style lang="scss" scoped>
.bar {
    width: 400px;
    height: 300px;
}
</style>
```
