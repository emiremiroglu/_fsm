<script setup>
  import { ref } from 'vue';
  const props = defineProps({
    total: Number,
    label: String
  })
</script>
<template>
  <div class="flex flex-col gap-3 p-12 bg-white shadow-xl rounded-xl w-full">
    <strong class="text-5xl">{{ total }}</strong>
    <span class="opacity-60">{{ label }}</span>
  </div>
</template>