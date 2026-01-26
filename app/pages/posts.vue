<template>
    <UChangelogVersions>
        <UChangelogVersion v-for="(version, index) in posts" :key="index" v-bind="version" />
    </UChangelogVersions>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: posts } = await useAsyncData(route.path, () => {
    return queryCollection('content').select('title', 'path', 'description').all()
})
</script>