import * as TYPE from '../types'

const state = {
  depList:Object,
  groupList:[],
  CommonList:[],
  groupUserList:[],
  depUserList:[],
  searchList:[],
  partilist:[],
  memberList:[],
}

const mutations = {
  [TYPE.DEP_INITDEPTREE] (state,list) {
    state.depList = {
      departmentid:'company',
      departmentname:list.data[0].companyname,
      children:list.data
    }
  },

  [TYPE.DEP_INITGROUPTREE] (state,list) {
    state.groupList = list
  },

  [TYPE.DEPTREE_GETUSER] (state,users) {
    //  state.userList = users.dataList;
    var canAdd;
    if (users) {
      for (var i = 0; i < users.dataList.length; i++) {
        canAdd = true
        for (var j = 0; j < state.depUserList.length; j++) {
          //如果存在相同的用户id和该用户具有相同departmentid，则不添加
          if (users.dataList[i].userid == state.depUserList[j].userid && users.dataList[i].departmentid == state.depUserList[j].departmentid) {
            canAdd = false
          }
        }
        if (canAdd) {
          state.depUserList.push(users.dataList[i]);
        }
      }
    }
  },

  [TYPE.DEPTREE_GROUPUSER] (state,users) {
    state.groupUserList = users.dataList;
  },

  [TYPE.USER_SEARCHUSERLIST] (state,list) {
    state.searchList = list;
  },
  [TYPE.GET_MEMBER_LIST] (state,list) {
    var tempList = list
    state.memberList = tempList;
  },


}

export default {
  state,
  mutations
}
