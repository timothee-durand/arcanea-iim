import { createApp } from 'vue'
import './styles/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import {router} from "@/router";


const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(Toast)
app.mount('#app')
