<!-- WORKSPACES -->
<script setup>
  import {ref} from 'vue';
  import session from '../lib/session';
  const workspaces = ref(session('workspaces') || [])
  import { PlusIcon } from '@heroicons/vue/20/solid'
</script>

<template>
  <main class="flex flex-col md:flex-row">
    <Sidebar />
    <section class="grow p-5 h-screen overflow-y-scroll">
      <div class="flex items-center justify-between pb-6">
        <Title _="Workspaces"/>
        <router-link to="/" class="button">
          <PlusIcon class="w-6"/>
          New Workspace
        </router-link>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-5">
        <template v-for="workspace in workspaces">
          <div class="card aspect-video">
            <strong>{{ workspace.name }}</strong>
            <Seperator class="opacity-70" />
            <Chart />
          </div>
        </template>
      </div>
      <template v-if="!workspaces.length">
        You do not have any workspaces
      </template>
    </section>
  </main>
</template>