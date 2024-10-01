<!-- DCO EDITOR -->
<script setup>
  import { ref, onMounted, inject, watch } from 'vue'; import { useRoute } from 'vue-router'; import { VAceEditor } from 'vue3-ace-editor'; import get from '@/lib/get'; import session from '@/lib/session'; import ace_config from '@/config/ace.json'; import shortid from 'shortid'; import 'ace-builds/src-noconflict/mode-html'; import 'ace-builds/src-noconflict/theme-dawn';
  import { ChevronLeftIcon, ArrowDownTrayIcon, CameraIcon, CloudArrowUpIcon } from '@heroicons/vue/24/outline'

  const route = useRoute()

  const id = ref(route.query.id)
  const loading = ref(true)
  const banner = ref({})
  
  const title = ref('')

  onMounted(() => {
    if(id.value) {
      get('/fsm/dco/' + id.value).then(data => {
        banner.value = data
        title.value = data.name
        loading.value = false
      })
    } else {
      title.value = 'New DCO Banner'
      banner.value.html = '<html></html>'
      loading.value = false
    }
  })
</script>

<template>
  <main class="flex">
    <section v-if="!loading" class="flex flex-col justify-between p-5 flex-1">
      <div class="flex items-center justify-between gap-5">
        <router-link to="/dco" class="button">
          <ChevronLeftIcon class="w-6"/>
        </router-link>
        <h1 class="text-2xl font-semibold leading-tight">
          <Title :_="title" />
        </h1>
        <button to="/" class="button">
          <CloudArrowUpIcon class="w-6"/>
        </button>
      </div>
      <div class="flex items-center justify-center w-full">
        <iframe id="preview" width="300" height="600" class="shadow-lg bg-white rounded"></iframe>
      </div>
      <!-- Toolkit -->
      <div class="w-full flex items-center justify-between">
        <span class="text-teal-700 p-4">99 KB</span>
        <div id="frames" class="flex gap-3 items-center">
          <span class="opacity-60 hover:opacity-100 cursor-pointer">300x250</span>
          <span class="text-zinc-800 bg-zinc-200 dark:text-zinc-200 dark:bg-zinc-700 rounded-full py-2 px-4">300x600</span>
          <span class="opacity-60 hover:opacity-100 cursor-pointer">728x90</span>
        </div>
        <div class="flex gap-3">
          <button class="p-3 opacity-60 hover:opacity-100 transition-opacity">
            <CameraIcon class="w-6"/>
          </button>
          <button class="p-3 opacity-60 hover:opacity-100 transition-opacity">
            <ArrowDownTrayIcon class="w-6"/>
          </button>
        </div>
      </div>
    </section>
    <section v-if="!loading" class="flex flex-col flex-1 relative h-screen">
      <div class="relative flex-1">
        <v-ace-editor class="absolute w-full h-full" ref="editor" v-model:value="banner.html" lang="html" :options="ace_config" />
      </div>
    </section>
    <section v-if="loading" class="flex items-center justify-center absolute w-screen h-screen top-0 right-0 bottom-0 left-0">
      <Loader />
    </section>
  </main>
</template>