<!-- TRACKERS -->
<script setup>
  import { inject, ref, onMounted } from 'vue';
  import get from '../lib/get.js';

  import {
    PlusCircleIcon,
    PencilSquareIcon,
  } from '@heroicons/vue/20/solid'

  const toast = inject('toast');

  const loading = ref(false)
  const trackers = ref([])

  onMounted(() => {
    loading.value = true
    get('/fsm/conversion_trackers').then(data => {
      trackers.value = data
      loading.value = false
    })
  })

</script>

<template>
  <main class="flex">
    <Sidebar />
    <section class="grow p-6 h-screen relative">
      <div v-if="!loading" class="flex items-center justify-between pb-6">
        <div>
          <h1 class="text-2xl font-semibold leading-tight">Conversion Trackers</h1>
        </div>
        <router-link to="/conversion-trackers/editor" class="button">
          <PlusCircleIcon class="w-6"/>
          New Tracker
        </router-link>
      </div>
      <div v-if="!loading" class="min-w-full h-screen overflow-scroll">
        <table class="text divide-y w-full divide-gray-300">
          <thead>
            <tr>
              <th></th>
              <th>ID</th>
              <th class="w-full">Name</th>
              <th>URL</th>
              <!-- <th>Script</th> -->
              <th></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <template v-for="tracker in trackers">
              <tr>
                <td>
                  <div v-if="tracker.status" class="w-5 h-3 rounded-full bg-green-500"></div>
                  <div v-if="!tracker.status" class="w-5 h-3 rounded-full bg-gray-300"></div>
                </td>
                <td>
                  <code class="text-sm">{{tracker.filename}}</code>
                </td>
                <td class="whitespace-nowrap">
                  {{ tracker.name }}
                </td>
                <td>
                  <a :href="tracker.website" target="_blank" class="text-mono opacity-80">{{ tracker.website }}</a>
                </td>
                <!-- <td class="whitespace-nowrap">
                  <a :href="tracker.script" target="_blank" class="underline opacity-80">{{ tracker.script }}</a>
                </td> -->
                <td>
                  <router-link :to="'/conversion-trackers/editor/?id=' + tracker.id">
                    <PencilSquareIcon class="h-5 opacity-60 hover:opacity-100" />
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div v-if="loading" class="flex items-center justify-center absolute w-full h-full top-0 right-0 bottom-0 left-0">
        <Loader tw="h-3 fill-gray-500 opacity-30" />
      </div>
    </section>
  </main>


</template>

<style scoped>
  table { @apply mb-10; }
  table th { @apply text-left font-semibold py-2 px-2 text-sm; }
  table td { @apply py-2 px-2; }
  
  table tr td:first-child,
  table tr th:first-child { @apply pl-0; }

  table tr td:last-child,
  table tr th:last-child { @apply pr-0; }
</style>