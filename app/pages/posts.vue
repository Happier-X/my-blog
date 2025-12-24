<template>
    <UChangelogVersions>
        <UChangelogVersion v-for="(version, index) in posts" :key="index" v-bind="version" />
    </UChangelogVersions>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData('index-posts', () =>
    queryCollection('content').all()
    , {
        transform: (data) => {
            console.log(data)
            return data
        }
    })
</script>