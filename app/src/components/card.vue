<script setup>
  import { ref } from 'vue';
  const props = defineProps({
    total: Number,
    label: String
  })
</script>
<template>
  <div class="card">
    <strong class="text-5xl">{{ total }}</strong>
    <span class="opacity-60">{{ label }}</span>
  </div>
</template>