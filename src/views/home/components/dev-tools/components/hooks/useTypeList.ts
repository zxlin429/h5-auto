/*
 * @Author       : zxlin
 * @Date         : 2023-04-28 12:06:27
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-04-28 15:38:14
 * @FilePath     : \h5-auto\src\views\home\components\dev-tools\components\hooks\useTypeList.ts
 * @Description  : 
 */

import { computed } from 'vue'
import { Store } from 'vuex';


export default function(store:Store<any>){
  const typeList = computed(()=>{
    return store.state.devTools.typeList
  })
  const currentType = computed({
    get:()=>{
      return store.state.devTools.currentType
    },
    set:(value)=>{
      store.commit('devTools/changeCurrentType', value)
    }
  })
  const currentTypeObject = computed(()=>{
    return store.getters['devTools/currentTypeObject']
  })
  const percentageList = computed(()=>{
    return store.state.devTools.percentageList
  })
  const currentPercentage = computed({
    get:()=>{
      return store.state.devTools.currentPercentage
    },
    set:(value)=>{
      store.commit('devTools/changeCurrentPercentage', value)
    }
  })
  function addTypeList(obj:any){
    store.commit('devTools/addTypeList', obj)
  }
  function deleteTypeList(typeId:string){
    return store.commit('devTools/deleteTypeList', typeId)
  }
  function resetTypeList(){
    return store.commit('devTools/resetTypeList')
  }
  return {
    typeList,
    currentType,
    currentTypeObject,
    percentageList,
    currentPercentage,
    addTypeList,
    deleteTypeList,
    resetTypeList
  }
}