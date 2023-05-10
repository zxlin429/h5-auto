/*
 * @Author       : zxlin
 * @Date         : 2023-05-02 14:57:51
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-10 17:15:33
 * @FilePath     : \h5-auto\src\views\home\hooks\useProject.ts
 * @Description  : 
 */
import { ElMessage } from 'element-plus';
import { computed } from 'vue'
import { Store } from 'vuex';
import { getKey } from '@/views/home/hooks/useElement';
export default function(store:Store<any>){
  class Project {
    id:string
    name:string
    assetsBaseUrl// 静态资源地址
    isRequire
    pageList:Page[]
    constructor(name = '新建项目',assetsBaseUrl='/',isRequire = false,pageList:Page[] = [],id:string = btoa(`${(Math.random() * 100000000).toFixed()}-${new Date().getTime()}`),isNewProject = true){
      this.id = id
      this.name = name || '新建项目'
      this.assetsBaseUrl = assetsBaseUrl || '/'
      this.isRequire = isRequire
      this.pageList = pageList
      if(isNewProject){
        store.commit('project/handleAddProject', this)
        changeCurrentElement('')
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

  class Element {
    id:string
    uid:string
    path:string
    width:number
    height:number
    x:number
    y:number
    zIndex:number
    opacity:number
    rotate:number
    active:boolean
    animation:string
    text = ''
    constructor(uid:string,path:string,width:number,height:number,x=0,y=0,zIndex=1,opacity = 1,rotate=0,active=false,animation='',id= btoa(`${(Math.random() * 100000000).toFixed()}/${new Date().getTime()}`)){
      this.id = id
      this.uid = uid
      this.path = path
      this.width = width
      this.height = height
      this.x = x
      this.y = y
      this.zIndex = zIndex
      this.opacity = opacity
      this.rotate = rotate
      this.active = active
      this.animation = animation
    }
  }

  class ElementText {
    id:string
    uid:string
    width:number
    height:number
    x:number
    y:number
    zIndex:number
    opacity:number
    rotate:number
    active:boolean
    animation:string
    text = ''
    constructor(uid:string,width:number,height:number,x=0,y=0,zIndex=1,opacity = 1,rotate=0,active=false,animation='',id= btoa(`${(Math.random() * 100000000).toFixed()}/${new Date().getTime()}`)){
      this.id = id
      this.uid = uid
      this.width = width
      this.height = height
      this.x = x
      this.y = y
      this.zIndex = zIndex
      this.opacity = opacity
      this.rotate = rotate
      this.active = active
      this.animation = animation
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
      changeCurrentElement('')
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
    changeCurrentElement('')
  }
  function changeProject(project:Project,changeObj:any){
    store.commit('project/handleChangeProject', {project,changeObj})
    changeCurrentElement('')
  }
  function addPage(project:Project){
    const page = new Page('新建页面')
    project.pageList.push(page)
    store.commit('project/changeCurrentPage', page.id)
    changeCurrentElement('')
  }
  function addPageAfter(project:Project,pageId:string){
    const oldPage = project.pageList.find(i=>i.id === pageId)
    if(oldPage){
      const index = project.pageList.indexOf(oldPage)
      if(index>=0){
        const newPage = new Page('新建页面')
        project.pageList.splice(index + 1,0,newPage)
        store.commit('project/changeCurrentPage', newPage.id)
        changeCurrentElement('')
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
      changeCurrentElement('')
    }
  }

  function addText() {
    if(!currentPage.value){
      ElMessage({
        message: '请先创建页面',
        type: 'error',
      })
      return false
    }
    const element = new ElementText('text', 150, 50);
    currentPageObject.value.elementList.push(element);
    changeCurrentElement(element.id);
  }

  async function addElement(item:any){
    await getKey(item.id).then((res) => {
      if(!currentPage.value){
        ElMessage({
          message: '请先创建页面',
          type: 'error',
        })
        return false
      }
      const img = new Image();
      img.src = res as string;
      img.onload = function () {
        const element = new Element(item.id, item.path, img.width * (200 / img.width), img.height * (200 / img.width));
        currentPageObject.value.elementList.push(element)
        changeCurrentElement(element.id)
      };
    });
    
  }

  function deleteElement(element:any){
    if(!currentPage.value){
      return false
    }
    const index = currentPageObject.value?.elementList.indexOf(element.value)
    if(index>=0){
      currentPageObject.value?.elementList.splice(index,1)
      handleObserver()
    }
  }
  function changeCurrentElement(elementId:string){
    store.commit('project/changeCurrentElement', elementId)
  }
  // 触发vuex持久化更新
  function handleObserver(){
    store.commit('project/handleObserver')
  }
  return {
    Project,
    Page,
    Element,
    currentProject,
    currentPage,
    currentElement,
    projectList,
    currentProjectObject,
    currentPageObject,
    currentElementObject,
    deleteProject,
    changeProject,
    addPage,
    addPageAfter,
    deletePage,
    addText,
    addElement,
    changeCurrentElement,
    deleteElement,
    handleObserver
  }
}