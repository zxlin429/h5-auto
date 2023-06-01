/*
 * @Author       : zxlin
 * @Date         : 2023-06-01 14:08:36
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-06-01 15:26:29
 * @FilePath     : \h5-auto\src\views\home\hooks\usePhoneAdaptation.ts
 * @Description  : 手机页面适配
 */
export default function(store:any){
  function getTypeInfoById(id:string){
    return store.state.devTools.typeList?.find((i:{id:string})=>i.id === id)?.size
  }

  function getProjectList(){
   return store.state.project.projectList
  }

  function handleChange(oldVal:string,newVal:string){
    const oldValSize = getTypeInfoById(oldVal)
    const newValSize = getTypeInfoById(newVal)
    getProjectList()?.forEach((project:any) => {
      project.pageList?.forEach((page:any)=>{
        page.elementList?.forEach((element:any)=>{
          handleChangeElement(newValSize,element,computedElement(oldValSize,element))
        })
      })
    });
  }

  function handleChangeElement(size:any,element:any,comEle:any){
    element.width = size.width * comEle.width
    element.height = size.width * comEle.height
    if(comEle.x === 'center'){
      element.x = (size.width - element.width) / 2
    }else{
      element.x = size.width * comEle.x
    }
    if(comEle.y === 'center'){
      element.y = (size.height - element.height) / 2
    }else{
    element.y = size.height * comEle.y
    }
  }

  function computedElement(size:any,element:any){
    const comEle = {...element}
    const aspect = comEle.width / comEle.height
    comEle.aspect = aspect
    if(comEle.x * 2 + comEle.width === size.width){
      comEle.x = 'center'
    }else{
      comEle.x = comEle.x / size.width
    }
    if(comEle.y * 2 + comEle.height === size.height){
      comEle.y = 'center'
    }else{
      comEle.y = comEle.y / size.height
    }
    comEle.width = comEle.width / size.width
    comEle.height = comEle.width / aspect
    return comEle
  }
  return {
    handleChange,
    computedElement
  }
} 