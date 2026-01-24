<template>
  <UBlogPosts>
    <UBlogPost v-for="(post, index) in posts" :key="index" v-bind="posts" :to="post.path" />
  </UBlogPosts>
</template>

<script setup lang="ts">
const posts = ref([
  {
    title: '文章标题 1',
    path: '/post/1',
    description: '这是一篇文章的摘要内容...'
  },
])
</script>