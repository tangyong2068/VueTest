import * as TYPE from '../types'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { customAlertInfo } from './alertInfo.js'

Vue.use(VueResource);

//获取项目列表
export const getProjectList = ({dispatch,state},type,serarchmsg,pagenow,pagesize) => {
  let start = (pagenow-1)*pagesize;
  let size = pagesize;
  let url = ''
  if(type=='all'){
    url = "project/allProject/"+state.userInfo.token+'/'+state.userInfo.userid+'/'+start+'/'+size+'?parameter='+serarchmsg
  }
  else if(type=="create"){
    url = "project/createProject/" +state.userInfo.token+'/'+state.userInfo.userid+'/'+start+'/'+size+'?parameter='+serarchmsg
  }
  else if(type == "pacrticipate"){
    url = "project/participationProject/"+state.userInfo.token+'/'+state.userInfo.userid+'/'+start+'/'+size+'?parameter='+serarchmsg
  }
  Vue.http.get(TYPE.ROOT_API+url).then(function(response){

    if(response.data.status && response.data.code==200){
      dispatch(TYPE.GET_PROJECT_LIST,response.data.data)
    }
    else{
      customAlertInfo({dispatch,state},response.data.data,0,true);
    }

  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}
//添加项目
export const addProjectList = ({dispatch,state},participantList,projectName,projectDesc,route,pagesize) => {

  let userArr = []
  for (var i = 0; i < participantList.length; i++) {
    userArr[i] = participantList[i].userid
  }
  let para = {
    'projectName':projectName,
    'description':projectDesc,
    'userId':state.userInfo.userid,
    'userIds':userArr
  }


  Vue.http.post(TYPE.ROOT_API+'project/add/'+state.userInfo.token,JSON.stringify(para)).then(function(response){
    if(response.data.status && response.data.code==200){
      let type =''
      if(route=='/' || route =='/all'){
        type='all'
      }
      else if(route =='/myCreate'){
        type= 'create'
      }
      else if(route=='/myParticipate'){
        type= 'pacrticipate'
      }
      getProjectList({dispatch,state},type,'',1,pagesize)
      customAlertInfo({dispatch,state},'添加成功！',0,true);
    }
    else{
      customAlertInfo({dispatch,state},'添加失败！',0,true);
    }

    dispatch(TYPE.SET_SHOW_ADD_PRO_INFO,false)

  },function(response){
    console.log('请求错误！');
    dispatch(TYPE.SET_SHOW_ADD_PRO_INFO,false)
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}



//删除
export const deleteProjectList = ({dispatch,state},type,projectid,projectLen,pagenow,pagesize) => {

  Vue.http.get(TYPE.ROOT_API+'project/delete/'+state.userInfo.token+'/'+projectid).then(function(response){

    if(response.data.status && response.data.code==200){
      if(projectLen==1 &&　pagenow != 1){
        getProjectList({dispatch,state},type,'',pagenow-1,pagesize)
      }
      else{
        getProjectList({dispatch,state},type,'',pagenow,pagesize)
      }
      customAlertInfo({dispatch,state},'删除成功！',0,true);
    }
    else{
      customAlertInfo({dispatch,state},'删除失败！',0,true);
    }

  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}

//获取单个项目信息
export const getProjectById = ({dispatch,state},projectid) => {

  Vue.http.get(TYPE.ROOT_API+'project/get/'+state.userInfo.token+'/'+projectid).then(function(response){
    if(response.data.status && response.data.code==200){
      dispatch(TYPE.SET_PRO_OBJ,response.data.data);
      dispatch(TYPE.SET_SHOW_MODIFY_PRO_INFO,true);
    }
    else{
      customAlertInfo({dispatch,state},response.data.data,0,true);
    }

  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}

//xiugai
export const modifyProjectList = ({dispatch,state},id,participantList,projectName,projectDesc,route,pagesize) => {

  let userArr = []
  for (var i = 0; i < participantList.length; i++) {
    userArr[i] = participantList[i].userid
  }
  let para = {
    'projectName':projectName,
    'description':projectDesc,
    'userId':state.userInfo.userid,
    'userIds':userArr,
    'projectId':id
  }


  Vue.http.post(TYPE.ROOT_API+'project/update/'+state.userInfo.token,JSON.stringify(para)).then(function(response){
    if(response.data.status && response.data.code==200){
      let type =''
      if(route=='/' || route =='/all'){
        type='all'
      }
      else if(route =='/myCreate'){
        type= 'create'
      }
      else if(route=='/myParticipate'){
        type= 'pacrticipate'
      }
      getProjectList({dispatch,state},type,'',1,pagesize)
      customAlertInfo({dispatch,state},'修改成功！',0,true);
    }
    else{
      customAlertInfo({dispatch,state},response.data.data,0,true);
    }

    dispatch(TYPE.SET_SHOW_MODIFY_PRO_INFO,false)

  },function(response){
    console.log('请求错误！');
    dispatch(TYPE.SET_SHOW_ADD_PRO_INFO,false)
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}
