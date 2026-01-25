<template>
    <UBlogPosts>
        <UBlogPost v-for="(post, index) in posts" :key="index" v-bind="post" :to="post.path" />
    </UBlogPosts>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: posts } = await useAsyncData(route.path, () => {
    return queryCollection('cubeBlind').select('title', 'path', 'description').all()
})
</script>