import * as TYPE from '../types'


const state = {
    graphicList:[],
    sourceList:[],
    showAddInfo:false,
}

const mutations = {

  [TYPE.GET_GRAPHIC_LIST] (state,list) {
    state.graphicList = list
  },
  [TYPE.GET_SOURCE_LIST] (state,list) {
    state.sourceList = list
  },
  [TYPE.SET_SHOW_ADD_GAPHIC] (state,showinfo) {
    state.showAddInfo = showinfo
  },

}

export default {
  state,
  mutations
}
