/*
 * @Author       : zxlin
 * @Date         : 2023-05-05 11:25:59
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-05 11:27:33
 * @FilePath     : \h5-auto\src\store\modules\imgList.ts
 * @Description  : 图片列表
 */
export default {
  namespaced: true,
  state: () => ({ 
      imgList : []
   }),
  mutations: { 
    changeImgList(state:any,imgList:any){
      state.imgList = imgList
    },
    
   },
  actions: {  },
  getters: {  }
}