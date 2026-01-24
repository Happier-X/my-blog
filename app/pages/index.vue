<template>
  <div class="space-y-8">
    <section class="text-center py-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        欢迎来到 My Blog
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        这里分享技术、生活和思考
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
        最新文章
      </h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <UCard v-for="i in 6" :key="i" class="hover:ring-2 hover:ring-primary-500 transition-all cursor-pointer">
          <template #header>
            <div class="h-40 bg-gray-100 dark:bg-gray-800 rounded" />
          </template>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            文章标题 {{ i }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            这是一篇文章的摘要内容...
          </p>
          <template #footer>
            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>2026-01-{{ 20 + i }}</span>
              <UButton color="neutral" variant="link" size="sm" label="阅读更多" />
            </div>
          </template>
        </UCard>
      </div>
    </section>
  </div>
</template>