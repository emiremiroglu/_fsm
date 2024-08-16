<script setup>
  import {ref} from 'vue';
  import session from '../lib/session';

  const workspaces = ref(session('workspaces') || [])

</script>

<template>
  <main class="flex flex-col md:flex-row">
    <Sidebar />
    <section class="flex flex-col gap-6 p-6 w-full">
      <Title _="Dashboard"/>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-6">
        <Card :total="workspaces.length" label="Workspaces" />
      </div>
    </section>
  </main>
</template>