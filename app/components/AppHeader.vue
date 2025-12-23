<template>
    <UHeader title="Happier's Blog">
        <UNavigationMenu :items="items" variant="link" />
        <template #right>
            <UColorModeButton />
            <UTooltip text="访问 GitHub 仓库">
                <UButton color="neutral" variant="ghost" to="https://github.com/happier-x/my-blog" target="_blank"
                    icon="i-simple-icons-github" aria-label="GitHub" />
            </UTooltip>
        </template>
    </UHeader>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
    {
        label: '首页',
        to: '/',
        active: route.path === '/'
    },
    {
        label: '文章',
        to: '/articles',
        active: route.path.startsWith('/articles')
    },
    {
        label: '分类',
        to: '/categories',
        active: route.path.startsWith('/categories')
    },
    {
        label: '友链',
        to: '/links',
        active: route.path.startsWith('/links')
    },
    {
        label: '关于',
        to: '/about',
        active: route.path.startsWith('/about')
    },
])
</script>