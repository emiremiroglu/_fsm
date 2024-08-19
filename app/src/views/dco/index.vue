<!-- DCO EDITOR -->
<script setup>
  import { inject, ref, onMounted } from 'vue';
  import get from '@/lib/get.js';

  import {
    PencilSquareIcon,
  } from '@heroicons/vue/20/solid'

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
    <section class="grow p-5 h-screen overflow-y-scroll relative">
      <Title v-if="!loading" _="DCO Editor" />
      <table v-if="!loading">
        <thead>
          <tr>
            <th class="w-full">Name</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="banner in banners">
            <tr>
              <td>{{banner.name}}</td>
              <td>
                <router-link :to="'/dco/editor/?id=' + banner.id">
                  <PencilSquareIcon class="h-5 opacity-60 hover:opacity-100" />
                </router-link>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
      <div v-if="loading" class="flex items-center justify-center absolute w-full h-full top-0 right-0 bottom-0 left-0">
        <Loader />
      </div>
    </section>
  </main>
</template>