<!-- TRACKERS -->
<script setup>
  import { ref, onMounted } from 'vue';
  import get from '../lib/get.js';

  import {
    PlusCircleIcon,
    PencilSquareIcon,
  } from '@heroicons/vue/20/solid'


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
    <section v-if="!loading" class="grow p-6">
      <div class="flex justify-between">
        <div class="pb-6">
          <h1 class="text-3xl font-semibold leading-tight">Conversion Trackers</h1>
          <p class="opacity-50">A list of all the conversion trackers and their validations</p>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <router-link to="/conversion_trackers/create" class="button">
            <PlusCircleIcon class="w-6"/>
            New Tracker
          </router-link>
        </div>
      </div>
      <div class="min-w-full h-screen overflow-scroll">
        <table class="text divide-y w-full divide-gray-300 dark:divide-gray-700">
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
          <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
            <template v-for="tracker in trackers">
              <tr class="dark:hover:bg-gray-800/50">
                <td>
                  <div v-if="tracker.status" class="w-6 h-3 rounded-full bg-green-500"></div>
                  <div v-if="!tracker.status" class="w-6 h-3 rounded-full bg-gray-300 dark:bg-gray-800"></div>
                </td>
                <td>
                  <code class="text-xs">{{tracker.filename}}</code>
                </td>
                <td class="whitespace-nowrap">
                  {{ tracker.name }}
                </td>
                <td>
                  <a :href="tracker.website" target="_blank" class="underline opacity-80">{{ tracker.website }}</a>
                </td>
                <!-- <td class="whitespace-nowrap">
                  <a :href="tracker.script" target="_blank" class="underline opacity-80">{{ tracker.script }}</a>
                </td> -->
                <td>
                  <router-link :to="'/conversion_trackers/edit/'+tracker.id">
                    <PencilSquareIcon class="h-4" />
                  </router-link>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <section v-if="loading" class="flex items-center justify-center absolute w-screen h-screen top-0 right-0 bottom-0 left-0">
    <Loader tw="h-3 fill-gray-600 opacity-30" />
  </section>
</template>
<style scoped>
  table { @apply mb-10; }
  table th { @apply text-left font-semibold py-2 px-2 text-sm bg-gray-200 dark:bg-gray-800; }
  table td { @apply py-2 px-2; }
  
  table tr td:first-child,
  table tr th:first-child { @apply pl-0; }

  table tr td:last-child,
  table tr th:last-child { @apply pr-0; }
</style>