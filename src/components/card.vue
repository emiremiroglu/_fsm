<script setup>
  import Peity from 'vue-peity'
  const props = defineProps({
    data: Object,
    label: String
  })
</script>

<template>
  <div class="card aspect-square">
    <strong>{{ label }}</strong>
    <Seperator />
    <strong class="text-5xl">{{ total }}</strong>
    <template v-for="item in data">
      <ol>
        <li class="flex gap-2 justify-between">
          <div>{{ item['name'] }}</div>
          <code class="opacity-40">{{ item['id'] }}</code>
        </li>
      </ol>
    </template>
  </div>
</template>