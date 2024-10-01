<script setup>
  import { ref, onMounted } from 'vue';
  import session from '../lib/session'
  import get from '../lib/get'

  const props = defineProps({
    data: Object
  })

  const loading = ref(true)
  const src = ref('')

  onMounted(()=> {
    loading.value = true
    fetch(props.data.preview, {
      headers: {
        'auth': session('token')
      }
    })
    .then(response => response.blob())
    .then(data => {
      console.log(data)
      loading.value = false
      src.value = URL.createObjectURL(data)
    })
  })
</script>

<template>
  <div v-if="loading" class="relative w-full h-full">
    <div class="absolute w-full h-full flex items-center justify-center">
      <Loader tw="h-3 fill-gray-500 opacity-30" />
    </div>
  </div>
  <img v-if="!loading" class="w-full" :src="src">
</template>