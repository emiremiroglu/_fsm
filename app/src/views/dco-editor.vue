<!-- DCO EDITOR -->
<script setup>
  import { inject, ref, onMounted } from 'vue';
  import get from '../lib/get.js';

  const toast = inject('toast');

  const loading = ref(false)
  const banners = ref([])

  onMounted(() => {
    loading.value = true
    get('/fsm/dco').then(data => {
      banners.value = data
      loading.value = false
    })
  })
</script>

<template>
  <main class="flex flex-col md:flex-row">
    <Sidebar />
    <section class="p-5 w-full">
      <Title _="DCO Editor" />
      <Seperator />
      <div class="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-6 w-full overflow-visible">
        <div v-for="banner in banners" class="aspect-square bg-white shadow-md rounded-b-lg">
          <Preview :data=banner />
          <div class="p-3">{{banner.name}}</div>
        </div>
      </div>
    </section>
  </main>
</template>