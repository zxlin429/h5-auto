/*
 * @Author       : zxlin
 * @Date         : 2023-05-02 14:57:51
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-04 10:19:31
 * @FilePath     : \h5-auto\src\views\home\hooks\useProject.ts
 * @Description  : 
 */
import { computed } from 'vue'
import { Store } from 'vuex';



export default function(store:Store<any>){
  class Project {
    id:string
    name:string
    assetsBaseUrl// 静态资源地址
    isRequire
    pageList:Page[]
    constructor(name = '新建项目',assetsBaseUrl='/',isRequire = false,pageList:Page[] = [],id:string = btoa(`${(Math.random() * 100000000).toFixed()}-${new Date().getTime()}`),isNewProject = true){
      this.id = id
      this.name = name
      this.assetsBaseUrl = assetsBaseUrl
      this.isRequire = isRequire
      this.pageList = pageList
      if(isNewProject){
        store.commit('project/handleAddProject', this)
      }else{
        this.id = id
      }
      
    }
  }
  class Page {
    id:string
    name:string
    bgUrl = '' //背景图
    thumbnail = '' //缩略图
    elementList
    constructor(name:string,elementList = [],id= btoa(`${(Math.random() * 100000000).toFixed()}/${new Date().getTime()}`)){
      this.id = id
      this.name = name
      this.elementList = elementList
    }
  }
  const currentProject = computed({
    get:()=>{
      return store.state.project.currentProject
    },
    set:(projectId:string)=>{
      store.commit('project/changeCurrentProject', projectId)
    }
  })
  const currentPage = computed({
    get:()=>{
      return store.state.project.currentPage
    },
    set:(pageId:string)=>{
      store.commit('project/changeCurrentPage', pageId)
    }
  })
  const currentElement = computed(()=>{
    return store.state.project.currentElement
  })
  const projectList = computed(()=>{
    return store.state.project.projectList
  })
  const currentProjectObject = computed(()=>{
    return store.getters['project/currentProjectObject']
  })
  const currentPageObject = computed(()=>{
    return store.getters['project/currentPageObject']
  })
  const currentElementObject = computed(()=>{
    return store.getters['project/currentElementObject']
  })
  function deleteProject(project:Project){
    store.commit('project/handleDeleteProject', project)
  }
  function addPage(project:Project){
    const page = new Page('新建页面')
    project.pageList.push(page)
    store.commit('project/changeCurrentPage', page.id)
  }
  function addPageAfter(project:Project,pageId:string){
    const oldPage = project.pageList.find(i=>i.id === pageId)
    if(oldPage){
      const index = project.pageList.indexOf(oldPage)
      if(index>=0){
        const newPage = new Page('新建页面')
        project.pageList.splice(index + 1,0,newPage)
        store.commit('project/changeCurrentPage', newPage.id)
      }
    }
  }
  function deletePage(project:Project,pageId:string){
    const page = project.pageList.find(i=>i.id === pageId)
    if(page){
      const index = project.pageList.indexOf(page)
      if(index>=0){
        project.pageList.splice(index,1)
      }
      if(project.pageList?.length === 0){
        store.commit('project/changeCurrentPage', '')
      }else{
        if(currentPage.value === pageId){
          store.commit('project/changeCurrentPage', project.pageList[0].id)
        }
      }
    }
  }
  // 触发vuex持久化更新
  function handleObserver(){
    store.commit('project/handleObserver')
  }
  return {
    Project,
    Page,
    currentProject,
    currentPage,
    currentElement,
    projectList,
    currentProjectObject,
    currentPageObject,
    currentElementObject,
    deleteProject,
    addPage,
    addPageAfter,
    deletePage,
    handleObserver
  }
}