<template>
    <UBlogPosts>
        <UBlogPost v-for="(post, index) in posts" :key="index" v-bind="post" :to="post.path" />
    </UBlogPosts>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('index-posts', () => {
    return queryCollection('content').select('title', 'path', 'description').limit(12).all()
})
</script>