import * as TYPE from "../types.js"

const state = {
  type:-1, //信息类型:0:success,1:warning
  msg:'',
  showinfo:false, //提示框
};

const mutations = {

  [TYPE.HANDLE_RESETALERTINFO] (state) {
    state.type = -1 //信息类型
    state.msg = ''
    state.showinfo = false
  },
  //自定义信息
  [TYPE.HANDLE_CUSTOMMSG] (state,msg,type,show) {
    state.msg = msg
    state.type = type
    state.showinfo = show
  },


};

export default {
  state,
  mutations
}
