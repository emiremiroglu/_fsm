<!-- CONVERSION TRACKERS -->
<script setup>
  import { ref, onMounted, inject } from 'vue';

  // import session from '@/lib/session.js';
  import get from '@/lib/get.js';
  
  import {
    PlusIcon,
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
  <main class="flex flex-col md:flex-row">
    <Sidebar />
    <section class="grow h-screen overflow-y-scroll relative">
      <header v-if="!loading">
        <Title _="Conversion Trackers"/>
        <router-link to="/conversion-trackers/editor" class="button">
          <PlusIcon class="w-6"/>
          New Tracker
        </router-link>
      </header>
      <div v-if="!loading" class="min-w-full h-screen overflow-scroll p-5">
        <table>
          <thead>
            <tr>
              <th></th>
              <!-- <th>ID</th> -->
              <th class="w-full">Name</th>
              <!-- <th>URL</th> -->
              <!-- <th>Remote</th> -->
              <th></th>
            </tr>
          </thead>
          <tbody>
            <template v-for="tracker in trackers">
              <tr>
                <td>
                  <div v-if="tracker.status" class="w-5 h-3 rounded-full bg-green-500"></div>
                  <div v-if="!tracker.status" class="w-5 h-3 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                </td>
                <!-- <td>
                  <code class="text-sm">{{ tracker.id }}</code>
                </td> -->
                <td class="whitespace-nowrap">
                  {{ tracker.name }}
                </td>
                <!-- <td>
                  <a :href="tracker.website" target="_blank" class="text-mono opacity-80">{{ tracker.website }}</a>
                </td> -->
                <!-- <td class="whitespace-nowrap">
                  <a :href="'https://dojo.phluant.com/' + tracker.filename + '.js'" target="_blank">
                    <code class="text-sm">{{ 'https://dojo.phluant.com/' + tracker.filename + '.js' }}</code>
                  </a>
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
        <Loader />
      </div>
    </section>
  </main>
</template>