<script setup>
  import { ref, watch } from 'vue';
  import session from '../lib/session';

  const workspaces = ref(session('workspaces') || [])
  const workspace = ref(workspaces.value[0])
  const src = ref('/fsm/pdf/' + workspace.value.id)

  watch(workspace, (w) => {
    update()
  })

  const update = () => {
    src.value = '/fsm/pdf/' + workspace.value.id
  }

</script>

<template>
  <main class="flex flex-col md:flex-row">
    <Sidebar />
    <section class="flex flex-col gap-6 p-6 w-full">
      <div class="flex items-center justify-between">
        <Title _="Screenshot PDFs"/>
        <select v-model="workspace">
          <option v-for="workspace in workspaces" :value="workspace">{{ workspace.name }}</option>
        </select>
      </div>
      <iframe :src="src" class="w-full h-full aspect-video bg-zinc-200 rounded-lg"></iframe>
    </section>
  </main>
</template>
