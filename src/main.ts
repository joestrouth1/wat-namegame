import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import createVuexStore from './store'

const store = createVuexStore()

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
