<!-- WORKSPACES -->
<script setup>
  import {
    PlusCircleIcon,
    PencilSquareIcon,
  } from '@heroicons/vue/20/solid'
</script>

<template>
  <main class="flex flex-col md:flex-row">
    <Sidebar />
    <section class="grow p-5 h-screen relative">
      <div v-if="!loading" class="flex items-center justify-between pb-6">
        <div>
          <Title _="Workspaces"/>
        </div>
        <router-link to="/" class="button">
          <PlusCircleIcon class="w-6"/>
          New Workspace
        </router-link>
      </div>
      
    </section>
  </main>
</template>