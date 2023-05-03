/*
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-02 15:00:37
 * @FilePath     : /h5-auto/src/store/index.ts
 * @Description  : store
 */
import { createStore } from 'vuex'
import devTools from './modules/devTools'
import project from './modules/project'
export default createStore({
  modules: {
    devTools,
    project
  }
})
