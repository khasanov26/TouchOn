import { createApp, reactive } from 'vue'
import App from './App.vue'

const GStore = reactive({ errorMessage: '' })

createApp(App).provide('GStore', GStore).mount('#app')
