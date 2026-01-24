<template>
  <div class="min-h-screen flex flex-col">
    <UHeader>
      <template #title>
        <NuxtLink to="/" class="text-xl font-bold text-primary-600 dark:text-primary-400">
          Happier's Blog
        </NuxtLink>
      </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <UButton icon="i-heroicons-magnifying-glass" color="neutral" variant="ghost" size="sm" />
        <UColorModeButton />
      </template>
    </UHeader>

    <main class="flex-1">
      <UContainer class="py-8">
        <slot />
      </UContainer>
    </main>

    <UFooter>
      <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
        {{ year }} &copy; Happier's Blog. All rights reserved.
      </p>
    </UFooter>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  { label: '首页', to: '/', active: route.path === '/' },
  { label: '文章', to: '/posts', active: route.path.startsWith('/posts') },
  { label: '分类', to: '/categories', active: route.path.startsWith('/categories') },
  { label: '标签', to: '/tags', active: route.path.startsWith('/tags') },
  { label: '合集', to: '/collections', active: route.path.startsWith('/collections') },
  { label: '友链', to: '/friends', active: route.path === '/friends' },
  { label: '关于', to: '/about', active: route.path === '/about' }
])

const year = new Date().getFullYear()
</script>