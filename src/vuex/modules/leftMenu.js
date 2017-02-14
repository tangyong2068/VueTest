import * as TYPE from '../types'


const state = {
    leftMenuList:[],
}

const mutations = {

  [TYPE.SET_LEFT_MENU_LIST] (state,list) {
    state.leftMenuList = list
  },
}

export default {
  state,
  mutations
}
