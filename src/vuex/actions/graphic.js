import * as TYPE from '../types'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { customAlertInfo } from './alertInfo.js'

Vue.use(VueResource);

//获取图表列表
export const getGraphicList = ({dispatch,state},projectid,pagenow,pagesize) => {
  let start = (pagenow-1)*pagesize;
  let size = pagesize;
  Vue.http.get(TYPE.ROOT_API+'chart/list/'+state.userInfo.token+'/'+projectid+'/'+start+'/'+size).then(function(response){
    if(response.data.status && response.data.code==200){
      for (var i = 0; i < response.data.data.dataList.length; i++) {
        response.data.data.dataList[i].imgurl = "../../assets/img/"+ response.data.data.dataList[i].type + '.png'
      }
      dispatch(TYPE.GET_GRAPHIC_LIST,response.data.data)
    }

  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}


//通过图表名查询图表
export const getGraphicListByName = ({dispatch,state},projectid,graphicname,pagenow,pagesize) => {
  let start = (pagenow-1)*pagesize;
  let size = pagesize;
  Vue.http.get(TYPE.ROOT_API+'chart/list/'+state.userInfo.token+'/'+projectid+'/'+start+'/'+size+'?parameter='+graphicname).then(function(response){
    if(response.data.status && response.data.code==200){
      for (var i = 0; i < response.data.data.dataList.length; i++) {
        response.data.data.dataList[i].imgurl = "../../assets/img/"+ response.data.data.dataList[i].type + '.png'
      }
      dispatch(TYPE.GET_GRAPHIC_LIST,response.data.data)
    }

  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}

//删除图表
export const deleteGraphList = ({dispatch,state},projectid,id,graphicLen,pagenow,pagesize) => {

  Vue.http.post(TYPE.ROOT_API+'chart/delete/'+state.userInfo.token+'/'+id).then(function(response){

    if(response.data.status && response.data.code==200){
      if(projectLen==1 &&　pagenow != 1){
        getGraphicList({dispatch,state},projectid,pagenow-1,pagesize)
      }
      else{
        getGraphicList({dispatch,state},projectid,pagenow,pagesize)
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

//添加图表
export const addGraphicList = ({dispatch,state},projectid,sourceId,title,pagesize) => {
  let para = {
    'projectId':projectid,
    'sourceId':sourceId,
    'title':title,
    'userId':state.userInfo.userid
  }

  Vue.http.post(TYPE.ROOT_API+'chart/add/'+state.userInfo.token,JSON.stringify(para)).then(function(response){
    if(response.data.status && response.data.code==200){
      getGraphicListByName({dispatch,state},projectid,'',1,pagesize)
      customAlertInfo({dispatch,state},'添加成功！',0,true);
    }
    else{
      customAlertInfo({dispatch,state},'添加失败！',0,true);
    }

    dispatch(TYPE.SET_SHOW_ADD_GAPHIC,false)

  },function(response){
    console.log('请求错误！');
    dispatch(TYPE.SET_SHOW_ADD_GAPHIC,false)
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}

//获取数据源
export const getSourceList = ({dispatch,state},projectid) => {

  Vue.http.get(TYPE.ROOT_API+'source/list/'+state.userInfo.token+'/'+projectid+'/0/-1').then(function(response){
    if(response.data.status && response.data.code==200){
      dispatch(TYPE.GET_SOURCE_LIST,response.data.data)
    }
    else{
      customAlertInfo({dispatch,state},'获取数据源异常！',0,true);
    }
  },function(response){
    console.log('请求错误！');
    customAlertInfo({dispatch,state},'系统异常！',0,true);
  });
}
