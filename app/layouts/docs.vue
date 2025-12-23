<template>
    <AppHeader />
    <UMain>
        <UContainer>
            <UPage>
                <template #left>
                    <UPageAside>
                        <UContentNavigation :navigation="navigation" />
                    </UPageAside>
                </template>
                <slot />
            </UPage>
        </UContainer>
    </UMain>
    <AppFooter />
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
</script>
