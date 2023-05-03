/*
 * @Author       : zxlin
 * @Date         : 2023-04-27 14:39:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-03 21:10:33
 * @FilePath     : /h5-auto/src/store/index.ts
 * @Description  : store
 */
import createPersistedstate from 'vuex-persistedstate'
import { createStore } from 'vuex'
import devTools from './modules/devTools'
import project from './modules/project'
export default createStore({
  // plugins: [
  //   createPersistedstate({
  //     storage: window.localStorage,
  //     key: 'h5-auto-data'
  //   })
  // ],
  modules: {
    devTools,
    project
  }
})


// 实力化自定义方法
// const vuexPersist = new VuexPersistence({
//   key: 'my-app',
//   storage: window.localStorage,
//   reducer: (state) => ({ user: state.user }),
//   // 自定义 replacer 函数，将类实例转换为 JSON 可识别的形式
//   replacer: (key, value) => {
//     if (value instanceof MyClass) {
//       return { type: 'my-class', data: value.serialize() };
//     }
//     return value;
//   },
//   // 自定义 reviver 函数，将 JSON 反序列化为类实例
//   revive: (key, value) => {
//     if (typeof value === 'object' && value !== null && value.type === 'my-class') {
//       return new MyClass(value.data);
//     }
//     return value;
//   },
// });

// // MyClass 类的示例
// class MyClass {
//   constructor(data) {
//     this.data = data;
//   }

//   serialize() {
//     return this.data;
//   }
// }
