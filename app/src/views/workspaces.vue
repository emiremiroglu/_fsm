<!-- WORKSPACES -->
<script setup>
  import {
    PlusIcon
  } from '@heroicons/vue/20/solid'
</script>

<template>
  <main class="flex flex-col md:flex-row">
    <Sidebar />
    <section class="grow p-5 h-screen relative">
      <div class="flex items-center justify-between pb-6">
        <div>
          <Title _="Workspaces"/>
        </div>
        <!-- <router-link to="/" class="button">
          <PlusIcon class="w-6"/>
          New Workspace
        </router-link> -->
      </div>
    </section>
  </main>
</template>