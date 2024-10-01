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
    <section class="grow h-screen overflow-y-scroll">
      <header>
        <Title _="Workspaces"/>
        <router-link to="/" class="button">
          <PlusIcon class="w-6"/>
          New Workspace
        </router-link>
      </header>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-5">
        <template v-for="workspace in workspaces">
          <div class="card aspect-video">
            <!-- <div class="card aspect-video" :style="{color: workspace.css.color.light, backgroundColor: workspace.css.color.dark}"></div> -->
            <strong>{{ workspace.name }}</strong>
          </div>
        </template>
      </div>
      <template v-if="!workspaces.length">
        You do not have any workspaces
      </template>
    </section>
  </main>
</template>