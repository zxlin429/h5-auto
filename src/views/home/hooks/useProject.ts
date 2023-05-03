/*
 * @Author       : zxlin
 * @Date         : 2023-05-02 14:57:51
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-03 21:15:39
 * @FilePath     : /h5-auto/src/views/home/hooks/useProject.ts
 * @Description  : 
 */
import { computed } from 'vue'
import { Store } from 'vuex';



export default function(store:Store<any>){
  class Project {
    id = btoa(`${(Math.random() * 100000000).toFixed()}-${new Date().getTime()}`)
    name:string
    assetsBaseUrl// 静态资源地址
    isRequire
    pageList:Page[]
    constructor(name = '新建项目',assetsBaseUrl='/',isRequire = false,pageList:Page[] = [],isNewProject = true){
      this.name = name
      this.assetsBaseUrl = assetsBaseUrl
      this.isRequire = isRequire
      this.pageList = pageList
      if(isNewProject){
        store.commit('project/handleAddProject', this)
      }
      
    }
    deleteProject(){
      store.commit('project/handleDeleteProject', this)
    }
    addPage(){
      const page = new Page('新建页面')
      this.pageList.push(page)
      store.commit('project/changeCurrentPage', page.id)
    }
    addPageAfter(pageId:string){
      const oldPage = this.pageList.find(i=>i.id === pageId)
      if(oldPage){
        const index = this.pageList.indexOf(oldPage)
        if(index>=0){
          const newPage = new Page('新建页面')
          this.pageList.splice(index + 1,0,newPage)
          store.commit('project/changeCurrentPage', newPage.id)
        }
      }
    }
    deletePage(pageId:string){
      const page = this.pageList.find(i=>i.id === pageId)
      if(page){
        const index = this.pageList.indexOf(page)
        if(index>=0){
          this.pageList.splice(index,1)
        }
        if(this.pageList?.length === 0){
          store.commit('project/changeCurrentPage', '')
        }else{
          if(currentPage.value === pageId){
            store.commit('project/changeCurrentPage', this.pageList[0].id)
          }
        }
      }
    }
  }
  class Page {
    id = btoa(`${(Math.random() * 100000000).toFixed()}/${new Date().getTime()}`)
    name:string
    bgUrl = '' //背景图
    thumbnail = '' //缩略图
    elementList
    constructor(name:string,elementList = []){
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

  return {
    Project,
    Page,
    currentProject,
    currentPage,
    currentElement,
    projectList,
    currentProjectObject,
    currentPageObject,
    currentElementObject
  }
}