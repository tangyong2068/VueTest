import * as TYPE from '../types'
var cookies = require('browser-cookies')

const state = {
  token:cookies.get('token') || null,
  userid:cookies.get('userid') || null,
  username: cookies.get('name') || '',
  url: cookies.get('url') || null,
  pid: cookies.get('pid') || null
}

const mutations = {

  [TYPE.USER_INFO] (state,user) {
    state.token = user
  },

}

export default {
  state,
  mutations
}
