<!-- DCO EDITOR -->
<script setup>
  import { inject, ref, onMounted } from 'vue';
  import get from '@/lib/get.js';

  import {
    PlusIcon,
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
    <section class="grow h-screen overflow-y-scroll relative">
      <header v-if="!loading" class="flex items-center justify-between pb-6">
        <Title _="DCO Editor"/>
        <router-link to="/dco/editor" class="button">
          <PlusIcon class="w-6"/>
          New DCO
        </router-link>
      </header>
      <div class="p-6">
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
      </div>

      <div v-if="loading" class="flex items-center justify-center absolute w-full h-full top-0 right-0 bottom-0 left-0">
        <Loader />
      </div>
    </section>
  </main>
</template>