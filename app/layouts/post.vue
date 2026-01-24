<template>
    <AppHeader />
    <UMain>
        <UContainer>
            <UPage>
                <template #left>
                    <UPageAside>
                        <UContentNavigation />
                    </UPageAside>
                </template>
                <slot />
            </UPage>
        </UContainer>
    </UMain>
    <AppFooter />
</template>

<script setup lang="ts">
</script>
