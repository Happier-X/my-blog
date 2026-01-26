<template>
    <UBlogPosts>
        <UBlogPost v-for="(post, index) in posts" :key="index" v-bind="post" :to="post.path" />
    </UBlogPosts>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('all-posts', () => {
    return queryCollection('content').order('createdAt', 'DESC').all()
})
</script>