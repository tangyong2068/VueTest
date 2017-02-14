import * as TYPE from '../types'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { customAlertInfo } from './alertInfo.js'

Vue.use(VueResource);

Vue.http.options.crossOrigin = true;
Vue.http.options.emulateJSON = true;

//通过面板名查询图表
export const getPanelList = ({dispatch,state},projectid,panelname,pagenow,pagesize) => {
    let start = (pagenow-1)*pagesize;
    let size = pagesize;
    if(panelname == ""){
      Vue.http.get(TYPE.ROOT_API+'panel/list/'+state.userInfo.token+'/'+projectid+'/'+start+'/'+size).then(function(response){
        if(response.data.status && response.data.code==200){
          dispatch(TYPE.GET_PANEL_LIST,response.data.data)
        }

      },function(response){
        console.log('请求错误！');
        customAlertInfo({dispatch,state},'系统异常！',0,true);
      });
    }
    else{
      Vue.http.get(TYPE.ROOT_API+'panel/list/'+state.userInfo.token+'/'+projectid+'/'+start+'/'+size+'?parameter='+panelname).then(function(response){
        if(response.data.status && response.data.code==200){
          dispatch(TYPE.GET_PANEL_LIST,response.data.data)
        }

      },function(response){
        console.log('请求错误！');
        customAlertInfo({dispatch,state},'系统异常！',0,true);
      });
    }
}


//添加面板
export const addPanelList = ({dispatch,state},projectid,type,panelName,description,pagesize) => {

  let para = {
    'projectId':projectid,
    'type':type,
    'panelName':panelName,
    'description':description,
    'userId':state.userInfo.userid
  }

  Vue.http.post(TYPE.ROOT_API+'panel/add/'+state.userInfo.token,JSON.stringify(para)).then(function(response){
    if(response.data.status && response.data.code==200){
      getPanelList({dispatch,state},projectid,'',1,pagesize)
      customAlertInfo({dispatch,state},'添加成功！',0,true);
    }
    else{
      customAlertInfo({dispatch,state},'添加失败！',0,true);
    }
    dispatch(TYPE.SET_SHOW_ADDPANEL_INFO,false)

  },function(response){
    console.log('请求错误！');
    dispatch(TYPE.SET_SHOW_ADDPANEL_INFO,false)
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}
//xiugai面板
export const updatePanelList = ({dispatch,state},projectid,panelId,type,panelName,description,pagesize) => {

  let para = {
    'projectId':projectid,
    'type':type,
    'panelName':panelName,
    'description':description,
    'userId':state.userInfo.userid,
    'panelId':panelId
  }

  Vue.http.post(TYPE.ROOT_API+'panel/update/'+state.userInfo.token,JSON.stringify(para)).then(function(response){
    if(response.data.status && response.data.code==200){
      getPanelList({dispatch,state},projectid,'',1,pagesize)
      customAlertInfo({dispatch,state},'修改成功！',0,true);
    }
    else{
      customAlertInfo({dispatch,state},response.data.data,0,true);
    }
    dispatch(TYPE.SET_SHOW_MODIFYPANEL_INFO,false)

  },function(response){
    console.log('请求错误！');
    dispatch(TYPE.SET_SHOW_ADDPANEL_INFO,false)
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}


//删除
export const deletePanelList = ({dispatch,state},projectid,id,graphicLen,pagenow,pagesize) => {

  Vue.http.post(TYPE.ROOT_API+'panel/delete/'+state.userInfo.token+'/'+id).then(function(response){

    if(response.data.status && response.data.code==200){
      if(projectLen==1 &&　pagenow != 1){
        getPanelList({dispatch,state},projectid,'',pagenow-1,pagesize)
      }
      else{
        getPanelList({dispatch,state},projectid,'',pagenow,pagesize)
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
