import { createApp } from 'vue'
import '@/assets/styles/fonts.scss'
import '@/assets/styles/reset.scss'
import '@/assets/styles/default.scss'

import App from './App.vue'
import router from "./router";


createApp(App).use(router).mount('#app')
