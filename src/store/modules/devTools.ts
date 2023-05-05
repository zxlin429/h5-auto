/*
 * @Author       : zxlin
 * @Date         : 2023-04-28 11:41:17
 * @LastEditors  : zxlin
 * @LastEditTime : 2023-05-05 11:26:07
 * @FilePath     : \h5-auto\src\store\modules\devTools.ts
 * @Description  : 设备尺寸管理
 */
export default {
  namespaced: true,
  state: () => ({ 
    currentType:'1', // 当前选中尺寸
    currentPercentage:100, // 当前选中百分比
    typeList:[
      //尺寸列表
      {
        id:'1',
        title:'iPhone12 Pro',
        size:{
          width:390,
          height:844
        },
        dpr:3
      },
      {
        id:'2',
        title:'iPhoneSE',
        size:{
          width:375,
          height:667
        },
        dpr:3
      },
      {
        id:'3',
        title:'iPhone6/7/8',
        size:{
          width:375,
          height:667
        },
        dpr:3
      },
      {
        id:'4',
        title:'iPhone6/7/8 Plus',
        size:{
          width:414,
          height:736
        },
        dpr:3
      },
      {
        id:'5',
        title:'iPhoneX',
        size:{
          width:375,
          height:812
        },
        dpr:3
      },
      {
        id:'6',
        title:'iPhoneXR',
        size:{
          width:414,
          height:896
        },
        dpr:3
      },
    ],
    typeListCopy:[
      //尺寸列表
      {
        id:'1',
        title:'iPhone12 Pro',
        size:{
          width:390,
          height:844
        },
        dpr:3
      },
      {
        id:'2',
        title:'iPhoneSE',
        size:{
          width:375,
          height:667
        },
        dpr:3
      },
      {
        id:'3',
        title:'iPhone6/7/8',
        size:{
          width:375,
          height:667
        },
        dpr:3
      },
      {
        id:'4',
        title:'iPhone6/7/8 Plus',
        size:{
          width:414,
          height:736
        },
        dpr:3
      },
      {
        id:'5',
        title:'iPhoneX',
        size:{
          width:375,
          height:812
        },
        dpr:3
      },
      {
        id:'6',
        title:'iPhoneXR',
        size:{
          width:414,
          height:896
        },
        dpr:3
      },
    ],
    percentageList:[
      {
        percentage:100
      },{
        percentage:75
      },{
        percentage:50
      }
    ]
   }),
  mutations: { 
    changeCurrentType(state:any,currentType:string){
      state.currentType = currentType
    },
    changeCurrentPercentage(state:any,currentPercentage:number){
      state.currentPercentage = currentPercentage
    },
    addTypeList(state:any,obj:any){
      state.typeList.push(obj)
    },
    deleteTypeList(state:any,typeId:string){
      const index = state.typeList.map((i: { id: string })=>i.id).indexOf(typeId)
      if(index>=0){
        state.typeList.splice(index,1)
      }
      if(typeId === state.currentType){
        state.currentType = state.typeList[0].id
      }
      return true
    },
    resetTypeList(state:any){
      state.typeList.length = 0;
      state.typeListCopy.forEach((i: any) => {
        state.typeList.push(i)
      });
      state.currentType = state.typeList[0].id
    }
   },
  actions: {  },
  getters: { 
    currentTypeObject(state:any){
      return state.typeList.find((i: { id: string })=>{
        return i.id === state.currentType
      })
    }
  }
}