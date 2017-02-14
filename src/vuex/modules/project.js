import * as TYPE from '../types'


const state = {
    projectList:[],
    showAddProInfo:false,
    proObj:Object,
    showModifyInfo:false,
}

const mutations = {

  [TYPE.GET_PROJECT_LIST] (state,list) {
    state.projectList = list
  },
  [TYPE.SET_SHOW_ADD_PRO_INFO] (state,showinfo) {
    state.showAddProInfo = showinfo
  },
  [TYPE.SET_PRO_OBJ] (state,obj) {
    state.proObj = obj
  },
  [TYPE.SET_SHOW_MODIFY_PRO_INFO] (state,showinfo) {
    state.showModifyInfo = showinfo
  },


}

export default {
  state,
  mutations
}
