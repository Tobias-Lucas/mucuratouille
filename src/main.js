import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './vendor/bootstrap.min.css'
import './style.css'

createApp(App).use(router).mount('#app')
