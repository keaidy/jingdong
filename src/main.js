import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import './style/base.scss'
import './style/reset.css'
import './style/iconfont.css'

createApp(App).use(router).use(store).mount('#app')
