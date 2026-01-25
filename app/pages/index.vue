<template>
    <UBlogPosts>
        <UBlogPost v-for="(post, index) in posts" :key="index" v-bind="post" :to="post.path" />
    </UBlogPosts>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('all-posts', async () => {
    const res = await Promise.all([
        queryCollection('techShare').select('title', 'path', 'description').all(),
        queryCollection('playNAS').select('title', 'path', 'description').all(),
        queryCollection('cubeBlind').select('title', 'path', 'description').all(),
    ])
    return res.flat()
})
</script>