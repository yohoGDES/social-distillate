import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { store, key } from './store'

import { registerComponents } from './components/register-components'

const app = createApp(App).use(store, key).use(router)

registerComponents(app)

app.mount('#app')