/*
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 11:14:25
 * @FilePath     : \h5-auto\src\main.ts
 * @Description  : 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/index.css'


createApp(App)
.use(store)
.use(router)
.use(ElementPlus)
.mount('#app')
