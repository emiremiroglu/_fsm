<script setup>
  import { ref, inject} from 'vue'

  import router from '../router';
  import session from '../lib/session';
  import post from '../lib/post';

  const toast = inject('toast');

  const loading = ref(false);
  const email = ref('');
  const password = ref('');

  const handleSubmit = () => {
    if(!(email.value && password.value)) {
      throw err
    } else {
      loading.value = true
      
      post('/fsm/auth', {
        email: email.value,
        password: password.value
      })
      .then((data) => {
        if(data) {
          session('token', data.token)
          session('user', {
            email: data.email,
            name: data.name
          })
          loading.value = false
          router.push({ path: '/' })
        }
      })
      .catch((err) => {
        toast.error(err)
        loading.value = false
      })
    }
  }
</script>
<template>
  <section class="w-screen h-screen flex items-center justify-center">
    <div class="flex flex-col gap-10 w-full max-w-sm">
      <Roundel tw="h-20 fill-gray-900" />
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
        <div class="flex flex-col gap-3">
          <input placeholder="Email Address" v-model="email" type="email" name="email" required>
          <input placeholder="Password" v-model="password" name="password" type="password" required>
        </div>
        <button class="button" type="submit">
          <span v-if="!loading">Sign In</span>
          <Loader v-if="loading" tw="h-3 fill-gray-500" />
        </button>
      </form>
    </div>
  </section>
</template>
<style scoped>
  input { @apply p-4; }
  button { @apply h-16; }
</style>