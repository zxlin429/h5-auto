/*
 * @Author       : zxlin
 * @Date         : 2023-05-05 09:40:03
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-05 14:46:51
 * @FilePath     : \h5-auto\src\views\home\hooks\useElement.ts
 * @Description  : 元素
 */
import { ElMessage } from 'element-plus';
import localforage from 'localforage'

const elementListKey = 'elementList'
export function getElementList(){
  return localforage.getItem(elementListKey)
}
export function setElementList(value:any){
  return localforage.setItem(elementListKey,value)
}
export function getKey(key:string){
  return localforage.getItem(key)
}
export function setKey(key:string,value:any){
  return localforage.setItem(key,value)
}
export function removeKey(key:string){
  return localforage.removeItem(key)
}
export function saveImg(store:any){
  return function(list:FileList,path:string){
    return new Promise((resolve)=>{
      if(list.length !== 1){
        ElMessage({
          message: '只能选择一张图片',
          type: 'error',
        })
        return false
      }
      const file = list[0]
      if(!['image/png','image/jpeg'].includes(file.type)){
        ElMessage({
          message: '请选择图片格式',
          type: 'error',
        })
        return false
      }
      const aBlob = new Blob([file],{type:file.type})
      const reader = new FileReader()
      reader.readAsDataURL(aBlob)
      reader.onload = async (e)=>{
        const baseUrl = e.target?.result
        const id =  btoa(`${(Math.random() * 100000000).toFixed()}|${new Date().getTime()}`)
        let elementList:any = await getElementList()
        if(!elementList){
          elementList = []
        }
        elementList.unshift({id,path})
        await setElementList(elementList).then(()=>{
          store.commit('imgList/changeImgList',elementList)
        })
        await setKey(id,baseUrl)
        resolve(true)
      }
    })
  }
}
export function updateImg(store:any){
  return async function(id:string,path:string){
    let elementList:any = await getElementList()
    if(!elementList){
      elementList = []
    }
    const element = elementList.find((i:{id:string})=>i.id === id)
    if(element){
      element.path = path
    }
    await setElementList(elementList).then(()=>{
      store.commit('imgList/changeImgList',elementList)
    })
  }
}
export function removeImg(store:any){
  return async function(id:string){
      let elementList:any = await getElementList()
    if(!elementList){
      elementList = []
    }
    const item = elementList.find((i:{id:string})=>i.id === id)
    const index = elementList.indexOf(item)
    index>=0 && elementList.splice(index,1)
    await setElementList(elementList).then(()=>{
      store.commit('imgList/changeImgList',elementList)
    })
    await removeKey(id)
  }
}