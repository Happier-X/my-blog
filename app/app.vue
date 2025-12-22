<template>
  <NuxtRouteAnnouncer />
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-300 text-white p-4">
      <nav class="max-w-6xl mx-auto">
        <h1 class="text-2xl font-bold">Blog</h1>
      </nav>
    </header>

    <main class="flex-1 max-w-6xl w-full mx-auto p-8">
      <NuxtPage />
    </main>

    <footer class="bg-gray-100 border-t border-gray-300 p-8 text-center">
      页脚
    </footer>
  </div>
</template>