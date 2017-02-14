import * as TYPE from '../types'


const state = {
    dataSourceList:[],
    addStepTag:0,
    verifyList:[],
    temVerifyList:[]
}

const mutations = {

  [TYPE.GET_DATA_SOURCE_LIST] (state,list) {
    state.dataSourceList = list
  },
  [TYPE.GET_VERIFY_LIST] (state,list) {
    state.temVerifyList = list
    state.verifyList = list
    state.addStepTag += 1
  },
  [TYPE.SET_VERIFY_LIST] (state,searchmsg) {

    let arr = []
    for (var i = 0; i < state.temVerifyList.length; i++) {
      if(state.temVerifyList[i].tableName.indexOf(searchmsg)>=0){
        let obj =  new Object()
        obj.tableName = state.temVerifyList[i].tableName
        obj.id = i
        obj.isSlelect = false
        arr.push(obj)
      }
    }
    state.verifyList = arr
  },



}

export default {
  state,
  mutations
}
