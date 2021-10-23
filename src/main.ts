import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'

import { registerComponents } from './components/register-components'

const app = createApp(App).use(createPinia()).use(router)

registerComponents(app)

app.mount('#app')
