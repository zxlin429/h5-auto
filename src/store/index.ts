/*
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 10:23:45
 * @FilePath     : \h5-auto\src\store\index.ts
 * @Description  : store
 */
import createPersistedstate from 'vuex-persistedstate'
import { createStore } from 'vuex'
import devTools from './modules/devTools'
import project from './modules/project'
// import {Project,Page } from '@/views/home/hooks/useProject'
export default createStore({
  plugins: [
    createPersistedstate({
      storage: window.localStorage,
      key: 'h5-auto-data'
    })
  ],
  modules: {
    devTools,
    project
  }
})