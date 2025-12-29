<template>
    <UPageGrid>
        <UPageCard v-for="(card, index) in cards" :key="index" v-bind="card" />
    </UPageGrid>
</template>

<script setup lang="ts">
const cards = ref([
    {
        title: '技术分享',
        to: '/tech-share',
    },
    {
        title: '玩转 NAS',
        to: '/play-nas',
    },
    {
        title: '三阶魔方盲拧',
        to: '/cube-blind',
    }
])
</script>