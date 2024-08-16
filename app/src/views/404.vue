<template>
  <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
    <div class="text-center">
      <p class="text-base font-semibold opacity-50">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Page not found</h1>
      <p class="text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
      <div class="mt-6 flex items-center justify-center gap-x-6">
        <router-link to="/" class="button">Go to Dashboard</router-link>
      </div>
    </div>
  </main>
</template>

<style scoped>
  section { @apply flex items-center justify-center h-screen; }
</style>