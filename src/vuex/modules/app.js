import * as TYPE from '../types'
import { getLocal } from '../../utils/localStore.js'
var cookies = require('browser-cookies')

const state = {
  userid:cookies.get('userid') || null,
  username: cookies.get('name') || '',
  token: cookies.get('token') || null,
  email: cookies.get('email') || '',
  phone: cookies.get('phone') || '',
  position: cookies.get('position') || '',
  telephone: cookies.get('telephone') || '',
  url: cookies.get('url') || null,
  localName:getLocal('localname') || '',
  localPwd:getLocal('localpwd') || '',
  msg:'',
  clickLogin:false,
  status:false,
  menuList:[],
  currentUrl: '',
  customMsg: '',
  type: '',
  showinfo: false,
  showCom : false,
}

const mutations = {
  [TYPE.USER_SET] (state,user) {
    state.userid = user.userid;
    state.username = user.username;
    state.email = user.email;
    state.phone = user.phone;
    state.position = user.position;
    state.telephone = user.telephone;
    state.url = user.url;
    state.token = user.token;
  },

  [TYPE.USER_REMOVE] (state) {
    state.userid = '';
    state.username = '';
    state.email = '';
    state.phone = '';
    state.position = '';
    state.telephone = '';
    state.url = '';
    state.token = '';
  },

  [TYPE.USER_LOCALINFO] (state,name,pwd) {
    state.localName = name;
    state.localPwd = pwd;
  },

  [TYPE.LOGIN_MSG] (state,msg) {
    if (!msg) {
      state.msg = ''
    }
    else {
      state.msg = msg
    }
  },

  [TYPE.LOGIN_CLICKLOGIN] (state,flag) {
    state.clickLogin = flag;
  },

  [TYPE.MESSAGE_CLEARLIST] (state) {
    state.msg = '';
  },

  [TYPE.MENU_LISTSET] (state,list) {
    state.menuList = list
  },

  [TYPE.CURRENT_PARENTMENU] (state,url) {
    state.currentUrl = url
  },

  [TYPE.HANDLE_RESETALERTINFO] (state) {
    state.type = -1 //信息类型
    state.customMsg = ''
    state.showinfo = false
  },

  //自定义信息
  [TYPE.HANDLE_CUSTOMMSG] (state,msg,type,show) {
    state.customMsg = msg
    state.type = type
    state.showinfo = show
  },

//公司信息弹框显示
  [TYPE.SHOW_COMPANY] (state,show) {
    state.showCom = show
  },
}

export default {
  state,
  mutations
}
