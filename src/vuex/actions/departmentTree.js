import * as TYPE from '../types'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { customAlertInfo } from './alertInfo.js'

Vue.use(VueResource);
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateJSON = true;
//Vue.http.options.emulateHTTP = true;
//Vue.http.options.xhr = {withCredentials: true};

export const initDepTree = ({dispatch,state}) => {
  Vue.http.get(TYPE.DEPARTMENT_API + 'company/department/list?token='+state.userInfo.token).then(function(response){
    //success callback
    if(!response.ok){
      console.log('请求失败！');
    }
    if(response.data.status){
      dispatch(TYPE.DEP_INITDEPTREE,response.data);
    }
    if (!response.data.status) {
      if (response.data.code == 203) {
        // swal({
        //   title: '',
        //   text: '登录状态超时，请退出重新登录！',
        //   type: 'error',
        //   showCancelButton: false,
        //   confirmButtonText: '确认',
        //   confirmButtonColor: '#179eff'
        // })
        customAlertInfo({dispatch,state},'登录状态超时，请退出重新登录！',2,true)
      }
      // project.showAlertInfo({dispatch,state},response.data)
    }
  },function(response){
    console.log('请求错误！');
    // project.customAlertInfo({dispatch},'系统异常，请稍后再试！',0,true)
  });
}

export const initGroupTree = ({dispatch,state}) => {
  Vue.http.get(TYPE.DEPARTMENT_API + 'company/team/list?token='+state.userInfo.token).then(function(response){
    //success callback
    if(!response.ok){
      console.log('请求失败！');
    }
    if(response.data.status){
      dispatch(TYPE.DEP_INITGROUPTREE,response.data.data);
    }
    if (!response.data.status) {
      if (response.data.code == 203) {
        // swal({
        //   title: '',
        //   text: '登录状态超时，请退出重新登录！',
        //   type: 'error',
        //   showCancelButton: false,
        //   confirmButtonText: '确认',
        //   confirmButtonColor: '#179eff'
        // })
        customAlertInfo({dispatch,state},'登录状态超时，请退出重新登录！',2,true)
      }
    }
  },function(response){
    console.log('请求错误！');
    // project.customAlertInfo({dispatch},'系统异常，请稍后再试！',0,true)
  });
};

//点击部门，获取该部门下的用户列表
export const getDepUser = ({dispatch,state},departmentid) => {
  // dispatch(TYPE.DEPTREE_CLEARUSERS)
  if(departmentid) {
    Vue.http.get(TYPE.DEPARTMENT_API + 'company/department/'+departmentid+'/user?token='+state.userInfo.token + '&start=' + 0 + '&size=' + -1).then(function(response){
      //success callback
      if(!response.ok){
        console.log('请求失败！');
      }
      if(response.data.status){
        dispatch(TYPE.DEPTREE_GETUSER,response.data.data);
      }
      if (!response.data.status) {
        // project.showAlertInfo({dispatch,state},response.data)
      }
    },function(response){
      console.log('请求错误！');
      // project.customAlertInfo({dispatch},'系统异常，请稍后再试！',0,true)
    });
  }
};


//点击小组，获取该小组下的用户列表
export const getGroupUser = ({dispatch,state},groupid) => {
  if(groupid) {
    Vue.http.get(TYPE.DEPARTMENT_API + 'company/team/'+groupid+'/user?token='+state.userInfo.token + '&start=' + 0 + '&size=' + -1).then(function(response){
      //success callback
      if(!response.ok){
        console.log('请求失败！');
      }
      if(response.data.status){
        dispatch(TYPE.DEPTREE_GROUPUSER,response.data.data);
      }
      if (!response.data.status) {
        // project.showAlertInfo({dispatch,state},response.data)
      }
    },function(response){
      console.log('请求错误！');
      // project.customAlertInfo({dispatch},'系统异常，请稍后再试！',0,true)
    });
  }
};

//在部门树中，通过姓名获取人员列表
export const getUserListByName = ({dispatch,state},name) => {
  Vue.http.post(TYPE.DEPARTMENT_API + 'user/getUserByName?token=' + state.userInfo.token + '&userName=' + name).then(function(response){
    //success callback
    if(response.data.status){
      dispatch(TYPE.USER_SEARCHUSERLIST,response.data.data)
    }
    else{
      project.customAlertInfo({dispatch},response.data.data,0,true)
    }
  },function(response){
    // project.showAlertInfo({dispatch,state},response.data)
    console.log('请求错误！');
  });
};
