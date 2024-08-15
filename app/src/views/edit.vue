<!-- EDIT -->
<script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { VAceEditor } from 'vue3-ace-editor';
  import 'ace-builds/src-noconflict/mode-javascript';
  import 'ace-builds/src-noconflict/theme-dawn';

  import get from '../lib/get.js';

  const route = useRoute()
  
  const loading = ref(true)
  const tid = ref(route.params.tid)
  const tracker = ref({})
  const content = ref(``)

  onMounted(() => {
    get('/fsm/conversion_trackers/' + tid.value)
    .then(data => {
      content.value = data.code
      loading.value = false
      tracker.value = data
    })
  })

</script>

<template>
  <section v-if="!loading" class="p-6">
    <div class="flex items-center justify-between gap-6 pb-6 w-ful">
      <router-link to="/conversion_trackers" class="button">
        Back
      </router-link>
      <h1 class="text-2xl font-semibold leading-tight">{{ tracker.name }}</h1>
      <button to="/" class="button">
        Download
      </button>
    </div>
    <div class="flex flex-col gap-6">
      <input type="text" :value="tracker.filename" disabled>
      <v-ace-editor v-model:value="content" @init="aceInit" lang="javascript" theme="chrome" class="h-screen" :options="options" />
    </div>
  </section>
  <section v-if="loading" class="flex items-center justify-center absolute w-screen h-screen top-0 right-0 bottom-0 left-0">
    <Loader tw="h-3 fill-zinc-600 opacity-30" />
  </section>
</template>
<style scoped>

</style>