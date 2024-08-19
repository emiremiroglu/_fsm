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
import Sidebar from '@/components/sidebar.vue'
import Title from '@/components/title.vue'
import Card from '@/components/card.vue'
import Preview from '@/components/preview.vue'
import Seperator from '@/components/seperator.vue'
import Loader from '@/components/loader.vue'

app.component('Logo', Logo)
app.component('Sidebar', Sidebar)
app.component('Title', Title)
app.component('Card', Card)
app.component('Preview', Preview)
app.component('Seperator', Seperator)
app.component('Loader', Loader)

app.use(Toaster, {
  position: 'bottom',
  pauseOnHover: false
}).provide('toast', app.config.globalProperties.$toast);

app.mount('#app')
