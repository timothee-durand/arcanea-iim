import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Socket } from './plugins/socket'

const app = createApp(App)

app.use(Socket)
app.mount('#app')
