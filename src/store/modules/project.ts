/*
 * @Author       : zxlin
 * @Date         : 2023-05-02 14:59:15
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-02 19:04:51
 * @FilePath     : /h5-auto/src/store/modules/project.ts
 * @Description  : 项目管理
 */

export default {
  namespaced: true,
  state: () => ({ 
    currentProject:'', // 当前选中项目
    currentPage:'', // 当前选中页面
    currentElement:'', // 当前选中元素
    projectList:[
      //项目列表
      
    ]
   }),
  mutations: { 
    handleAddProject(state:any,project:any){
      state.projectList.push(project)
      state.currentProject = project.id
      if(project.pageList?.length){
        state.currentPage = project.pageList[0].id
      }else{
        state.currentPage = ''
      }
    },
    handleDeleteProject(state:any,project:any){
      const index = state.projectList.indexOf(project)
      if(index){
        state.projectList.splice(index,1)
        if(state.projectList?.length === 0){
          state.currentProject = ''
        }else{
          if(state.currentProject === project.id){
            state.currentProject = state.projectList[0].id
          }
        }
        const newProject = state.projectList.find((i: { id: string })=>i.id === state.currentProject)
        if(newProject?.pageList?.length){
          state.currentPage = newProject.pageList[0].id
        }else{
          state.currentPage = ''
        }
      }
      
    },
    changeCurrentPage(state:any,pageId:string){
      state.currentPage = pageId
    },
    changeCurrentProject(state:any,projectId:string){
      state.currentProject = projectId
      const project = state.projectList.find((i: { id: string })=>{
        return i.id === projectId
      })
      if(!project?.pageList.length){
        state.currentPage = ''
      }else{
        state.currentPage = project.pageList[0].id
      }
    }
   },
  actions: {  },
  getters: { 
    currentProjectObject(state:any){
      if(!state.currentProject) return {}
      return state.projectList.find((i: { id: string })=>{
        return i.id === state.currentProject
      })
    },
    currentPageObject(state:any){
      if(!state.currentPage) return {}
      return state.projectList.find((i: { id: string })=>{
        return i.id === state.currentProject
      })?.pageList?.find((i: { id: string })=>{
        return i.id === state.currentPage
      })
    },
    currentElementObject(state:any){
      if(!state.currentElement) return {}
      return state.projectList.find((i: { id: string })=>{
        return i.id === state.currentProject
      })?.pageList?.find((i: { id: string })=>{
        return i.id === state.currentPage
      })?.elementList?.find((i: { id: string })=>{
        return i.id === state.currentElement
      })
    }
  }
}