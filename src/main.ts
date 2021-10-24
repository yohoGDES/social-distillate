import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import { registerComponents } from './components/register-components'
import { initApi } from './utilities/api'

initApi()
const pinia = createPinia()
const app = createApp(App).use(pinia).use(router)

registerComponents(app)

app.mount('#app')
