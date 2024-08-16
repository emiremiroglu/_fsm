import { createApp } from 'vue'

import App from './app.vue'
import Router from './router'
import './app.css'

const app = createApp(App)
app.use(Router)

// 3RD PARTY MODULES
import Toaster from "@meforma/vue-toaster";

// COMPONENTS
import Logo from '@/components/logo.vue'
import Roundel from '@/components/roundel.vue'
import Sidebar from '@/components/sidebar.vue'
import Loader from '@/components/loader.vue'

app.component('Logo', Logo)
app.component('Roundel', Roundel)
app.component('Sidebar', Sidebar)
app.component('Loader', Loader)

app.use(Toaster, {
  position: 'bottom',
  pauseOnHover: false
}).provide('toast', app.config.globalProperties.$toast);



app.mount('#app')
