<template>
  <UPage>
    <UPageHeader :title="page.title" :headline="page.headline" :links="page.links">
      <template #description>
        大约 {{ page.readingTime }} 分钟
      </template>
    </UPageHeader>
    <UPageBody>
      <ContentRenderer :value="page" />
      <USeparator />
      <UContentSurround :surround="surround" />
    </UPageBody>
    <template #right>
      <UContentToc :links="page.body.toc.links" />
    </template>
  </UPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs'
})
const route = useRoute()
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('content').path(route.path).first()
})
const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('content', route.path)
})
</script>
