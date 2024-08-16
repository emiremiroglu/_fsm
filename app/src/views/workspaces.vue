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
    <section class="grow p-5 h-screen relative">
      <div class="flex items-center justify-between pb-6">
        <Title _="Workspaces"/>
        <router-link to="/" class="button">
          <PlusIcon class="w-6"/>
          New Workspace
        </router-link>
      </div>
      <div>
        <!-- {{ workspaces }} -->
      </div>
      <template v-if="workspaces.length">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th class="w-full">Name</th>
              <th>Advertisers</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="workspace in workspaces">
              <tr>
                <td class="font-mono">{{ workspace.id }}</td>
                <td>{{ workspace.name }}</td>
                <td>{{ workspace.advertisers.length }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </template>
      <template v-if="!workspaces.length">
        You do not have any workspaces
      </template>
    </section>
  </main>
</template>