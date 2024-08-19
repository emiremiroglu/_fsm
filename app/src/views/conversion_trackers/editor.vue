<!-- CONVERSION TRACKER EDITOR -->
<script setup>
  import { ref, onMounted, inject, watch } from 'vue';
  import { useRoute } from 'vue-router'
  import { VAceEditor } from 'vue3-ace-editor';

  // import session from '@/lib/session';
  import ace_config from '@/config/ace.json';
  import get from '@/lib/get';
  import shortid from 'shortid';
  
  import 'ace-builds/src-noconflict/mode-javascript';
  import 'ace-builds/src-noconflict/theme-dawn';

  import {
    ChevronLeftIcon,
    ArrowDownTrayIcon
  } from '@heroicons/vue/20/solid'

  const route = useRoute()

  const id = ref(route.query.id)
  const loading = ref(true)
  const tracker = ref({})
  
  const title = ref('')

  onMounted(() => {
    if(id.value) {
      get('/fsm/conversion_trackers/' + id.value).then(data => {
        tracker.value = data
        title.value = data.name
        loading.value = false
      })
    } else {
      title.value = 'New Conversion Tracker'
      tracker.value.code = '//JS goes here'
      tracker.value.filename = shortid.generate() + '.js'
      loading.value = false
    }
  })
</script>

<template>
  <main class="flex flex-col md:flex-row">
    <section v-if="!loading" class="flex flex-col gap-3 p-5 grow relative h-screen">
      <div class="flex items-center justify-between gap-5 pb-5 w-full">
        <router-link to="/conversion-trackers" class="button">
          <ChevronLeftIcon class="w-6"/>
        </router-link>
        <h1 class="text-2xl font-semibold leading-tight">
          <Title :_="title" />
        </h1>
        <button to="/" class="button">
          <ArrowDownTrayIcon class="w-6"/>
        </button>
      </div>
      <input class="w-full p-4" type="text" v-model="tracker.filename" disabled>
      <div class="relative flex-1">
        <v-ace-editor class="absolute w-full h-full rounded" ref="editor" v-model:value="tracker.code" lang="javascript" :options="ace_config" />
      </div>
    </section>
    <section v-if="loading" class="flex items-center justify-center absolute w-screen h-screen top-0 right-0 bottom-0 left-0">
      <Loader />
    </section>
  </main>
</template>