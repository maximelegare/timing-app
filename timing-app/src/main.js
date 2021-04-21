import { createApp, defineAsyncComponent } from 'vue'
import router from './router.js'
import store from './store/index.js'
import App from './App.vue'

// import BaseButton from './components/ui/BaseButton.vue'
// import BaseSpinner from './components/ui/BaseSpinner.vue'
// import BaseDialog from './components/ui/BaseDialog.vue'






const app = createApp(App)

const BaseButton = defineAsyncComponent(() => import('./components/ui/BaseButton.vue'))
const BaseSpinner = defineAsyncComponent(() => import('./components/ui/BaseSpinner.vue'))
const BaseDialog = defineAsyncComponent(() => import('./components/ui/BaseDialog.vue'))


app.use(store)
app.use(router)
app.component('base-button', BaseButton)
app.component('base-spinner', BaseSpinner)
app.component('base-dialog', BaseDialog)




app.mount('#app')