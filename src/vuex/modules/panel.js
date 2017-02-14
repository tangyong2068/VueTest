import * as TYPE from '../types'


const state = {
    panelList:[],
    showAddInfo:false,
    showModifyInfo:false,
    panelObj:Object,
}

const mutations = {

  [TYPE.GET_PANEL_LIST] (state,list) {
    state.panelList = list
  },
  [TYPE.SET_SHOW_ADDPANEL_INFO] (state,showinfo) {
    state.showAddInfo = showinfo
  },
  [TYPE.SET_SHOW_MODIFYPANEL_INFO] (state,showinfo) {
    state.showModifyInfo = showinfo
  },
  [TYPE.SET_PANEL_OBJ] (state,obj) {
    state.panelObj = obj
  },


}

export default {
  state,
  mutations
}
