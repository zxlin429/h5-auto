/*
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 11:45:48
 * @FilePath     : \h5-auto\src\store\index.ts
 * @Description  : store
 */
import { createStore } from 'vuex'
import devTools from './modules/devTools'
export default createStore({
  modules: {
    devTools
  }
})
