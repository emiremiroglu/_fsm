import { createApp } from 'vue'

import App from './app.vue'
import Router from './router'

// 3RD PARTY MODULES
import Toaster from "@meforma/vue-toaster";

// COMPONENTS
import Loader from '@/components/loader.vue'

import './app.css'

const app = createApp(App)

app.use(Router)

app.use(Toaster, {
  position: 'bottom',
  pauseOnHover: false
}).provide('toast', app.config.globalProperties.$toast);

app.component('Loader', Loader)

app.mount('#app')
