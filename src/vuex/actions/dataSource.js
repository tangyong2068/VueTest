import * as TYPE from '../types'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { customAlertInfo } from './alertInfo.js'

Vue.use(VueResource);

//获取数据源列表
export const getDataSourceList = ({dispatch,state},projectid,pagenow,pagesize) => {
  let start = (pagenow-1)*pagesize;
  let size = pagesize;
  Vue.http.get(TYPE.ROOT_API+'source/list/'+state.userInfo.token+'/'+projectid+'/'+start+'/'+size).then(function(response){
    if(response.data.status && response.data.code==200){
      dispatch(TYPE.GET_DATA_SOURCE_LIST,response.data.data)
    }

  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}


//获取数据源列表
export const getVerifyList = ({dispatch,state},sourceName,ip ,port,userName,password,name,type) => {

  var para = {
    'sourceName':sourceName,
    'ip':ip,
    'port':port,
    'userName':userName,
    'password':password,
    'name':name,
    'projectId':state.project.proObj.projectId,
    'type':type
  }
  Vue.http.post(TYPE.ROOT_API+'source/verify/'+state.userInfo.token,JSON.stringify(para)).then(function(response){

    if(response.data.status && response.data.code==200){
      let arr = []
      for (var i = 0; i < response.data.data.length; i++) {
          let obj =  new Object()
          obj.tableName = response.data.data[i].tableName
          obj.id = i
          obj.isSlelect = false
          arr.push(obj)
      }
      dispatch(TYPE.GET_VERIFY_LIST,arr)
    }
    else{
      customAlertInfo({dispatch,state},response.data.data,0,true);
      //跳转

    }

  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
    //跳转

  });
}


export const addDataSourceList = ({dispatch,state},sourceName,ip ,port,userName,password,name,type,checkList,pagesize) => {

  let temArr = []
  for (var i = 0,j=0; i < checkList.length; i++) {
    if(checkList[i].isSlelect){
      temArr[j] = checkList[i].tableName
      j++
    }
  }
  var para = {
    'sourceName':sourceName,
    'ip':ip,
    'port':port,
    'userName':userName,
    'password':password,
    'name':name,
    'projectId':state.project.proObj.projectId,
    'type':type,
    'tableName':temArr
  }
  Vue.http.post(TYPE.ROOT_API+'source/add/'+state.userInfo.token,JSON.stringify(para)).then(function(response){

    if(response.data.status && response.data.code==200){
      getDataSourceList({dispatch,state},state.project.proObj.projectId,1,pagesize)
      customAlertInfo({dispatch,state},'添加成功！',0,true);
    }
    else{
        customAlertInfo({dispatch,state},response.data.data,0,true);
    }

  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}


export const deleteDataSourceList = ({dispatch,state},projectid,id,graphicLen,pagenow,pagesize) => {

  Vue.http.post(TYPE.ROOT_API+'source/delete/'+state.userInfo.token+'/'+id).then(function(response){

    if(response.data.status && response.data.code==200){
      if(projectLen==1 &&　pagenow != 1){
        getDataSourceList({dispatch,state},projectid,pagenow-1,pagesize)
      }
      else{
        getDataSourceList({dispatch,state},projectid,pagenow,pagesize)
      }
      customAlertInfo({dispatch,state},'删除成功！',0,true);
    }
    else{
        customAlertInfo({dispatch,state},response.data.data,0,true);
    }

  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}
