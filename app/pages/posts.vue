<template>
    <UChangelogVersions>
        <UChangelogVersion v-for="(version, index) in posts" :key="index" v-bind="version" />
    </UChangelogVersions>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: posts } = await useAsyncData(route.path, async () => {
    const [cubeBlind, playNAS, techShare] = await Promise.all([
        queryCollection('cubeBlind').select('title', 'path', 'description').all(),
        queryCollection('playNAS').select('title', 'path', 'description').all(),
        queryCollection('techShare').select('title', 'path', 'description').all(),
    ])
    return [
        ...cubeBlind.map(p => ({ ...p, collection: 'cubeBlind' })),
        ...playNAS.map(p => ({ ...p, collection: 'playNAS' })),
        ...techShare.map(p => ({ ...p, collection: 'techShare' })),
    ]
})
</script>