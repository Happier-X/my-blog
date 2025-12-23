<template>
    <UPage>
        <UTimeline :items="items"></UTimeline>
    </UPage>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('index-posts', () =>
    queryCollection('content').select('title', 'path', 'createAt').all()
    , {
        transform: (data) => {
            console.log(data)
            return data
        }
    })
const items = ref([
    {
        date: '2025',
        icon: 'i-lucide-flower'
    },
    {
        date: '2024',
        icon: 'i-lucide-sun'
    },
    {
        date: '2023',
        icon: 'i-lucide-leaf'
    },
    {
        date: '2022',
        icon: 'i-lucide-snowflake'
    }
])
</script>