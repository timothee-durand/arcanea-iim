import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Socket } from './plugins/socket'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(createPinia())
app.use(Socket)
app.mount('#app')
