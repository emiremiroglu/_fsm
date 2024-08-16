<script setup>
  import { ref, onMounted } from 'vue';
  import session from '../lib/session'
  import get from '../lib/get'

  const props = defineProps({
    data: Object
  })

  const loading = ref(false)
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
  <img class="w-full" :src="src">
</template>