<script setup>
  import { ref, watch } from 'vue';
  import session from '../lib/session';
  import get from '../lib/get';

  const loading = ref(false)
  const workspaces = ref(session('workspaces') || [])
  const workspace = ref(workspaces.value[0])
  const slides = ref([])

  watch(workspace, (w) => {
    update()
  })

  const update = () => {
    loading.value = true
    get('/fsm/pdf/' + workspace.value.id)
    .then(data => {
      console.log(data)
      slides.value = data
      loading.false = true
    })
  }

</script>

<template>
  <main class="flex flex-col md:flex-row">
    <Sidebar />
    <section class="flex flex-col gap-6 w-full relative">
      <header>
        <Title _="Screenshot PDFs"/>
        <select v-model="workspace">
          <option v-for="workspace in workspaces" :value="workspace">{{ workspace.name }}</option>
        </select>
      </header>
      <div class="p-16 grid">
        <template v-for="slide in slides">
          <img class="w-36" :src="slide">
        </template>
      </div>
    </section>
  </main>
</template>
