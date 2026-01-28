---
cover: https://t.alcy.cc/fj?t=20250319093000
date: 2025-03-19 09:30:00
order: -20250319093000
category: 开发
tag:
  - Vue
  - ECharts
excerpt: false
---

# Vue 使用 ECharts

## 安装 ECharts

```sh
npm install echarts --save
```

## 引入 ECharts

```vue {2}
<script setup>
import * as echarts from "echarts";
</script>
```

## 使用 ECharts

```vue
<template>
  <div style="width: 100vw; height: 100vh">
    <div style="width: 100%; height: 100%" ref="chartRef"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { useTemplateRef, onMounted, ref, shallowRef } from "vue";
// 图表容器
const chartRef = useTemplateRef("chartRef");
// 图表实例
const chart = shallowRef();
// 图表配置
const option = ref({
  title: {
    text: "Stacked Line",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "Email",
      type: "line",
      stack: "Total",
      data: [120, 132, 101, 134, 90, 230, 210],
    },
    {
      name: "Union Ads",
      type: "line",
      stack: "Total",
      data: [220, 182, 191, 234, 290, 330, 310],
    },
    {
      name: "Video Ads",
      type: "line",
      stack: "Total",
      data: [150, 232, 201, 154, 190, 330, 410],
    },
    {
      name: "Direct",
      type: "line",
      stack: "Total",
      data: [320, 332, 301, 334, 390, 330, 320],
    },
    {
      name: "Search Engine",
      type: "line",
      stack: "Total",
      data: [820, 932, 901, 934, 1290, 1330, 1320],
    },
  ],
});

onMounted(() => {
  chart.value = echarts.init(chartRef.value);
  chart.value.setOption(option.value);
});
</script>
```

> 注意：图表实例需要使用 `shallowRef` 来创建，否则会导致图表 `tooltip` 无法正常显示。
