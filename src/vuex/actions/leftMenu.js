import * as TYPE from '../types'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { customAlertInfo } from './alertInfo.js'

Vue.use(VueResource);

//获取图表列表
export const getLeftMenuList = ({dispatch,state},route) => {
  if(route == '/manager/panel'){
    let data = [
        {
            "menuid":"1",
            "parentid":"",
            "menuname":"项目名称",
            "menucode":"",
            "type":"",
            "url":'/',
            "tier":null,
            "sort":null,
            "createtime":null,
            "updatetime":null,
            "tag":null,
            "project":"wx",
            "menuShow":true,
            "icon":'icon-back-circle',
            "children":[
                {
                    "menuid":"11",
                    "parentid":"1",
                    "menuname":"面板管理",
                    "menucode":"",
                    "type":"",
                    "url":"/manager/panel",
                    "tier":null,
                    "sort":null,
                    "createtime":null,
                    "updatetime":null,
                    "tag":null,
                    "project":"",
                    "menuShow":true,
                    "icon":null,
                    "children":null
                },
                {
                    "menuid":"12",
                    "parentid":"1",
                    "menuname":"图表管理",
                    "menucode":"",
                    "type":"",
                    "url":"/manager/graphic",
                    "tier":null,
                    "sort":null,
                    "createtime":null,
                    "updatetime":null,
                    "tag":null,
                    "project":"",
                    "menuShow":true,
                    "icon":null,
                    "children":null
                },
                {
                    "menuid":"13",
                    "parentid":"1",
                    "menuname":"数据源管理",
                    "menucode":"",
                    "type":"",
                    "url":"/manager/dataSource",
                    "tier":null,
                    "sort":null,
                    "createtime":null,
                    "updatetime":null,
                    "tag":null,
                    "project":"wx",
                    "menuShow":true,
                    "icon":null,
                    "children":null
                },
                {
                    "menuid":"14",
                    "parentid":"1",
                    "menuname":"项目基本属性管理",
                    "menucode":"",
                    "type":"",
                    "url":"/manager/baseProperty",
                    "tier":null,
                    "sort":null,
                    "createtime":null,
                    "updatetime":null,
                    "tag":null,
                    "project":"wx",
                    "menuShow":true,
                    "icon":null,
                    "children":null
                },
            ]
          }
      ]
    dispatch(TYPE.SET_LEFT_MENU_LIST,data)
  }
  else if(route == '/'){
    let data=  [
          { "menuid": "70000005", "parentid": "70000000", "menuname": "项目", "menucode": null, "type": null, "url": "/", "tier": null, "sort": null, "createtime": 1484556214000, "updatetime": 1484556217000, "tag": null, "project": null, "menuShow": true, "icon": null, "children": [
          { "menuid": "70000001", "parentid": "70000005", "menuname": "全部项目", "menucode": null, "type": null, "url":"/all", "tier": null, "sort": null, "createtime": 1484555427000, "updatetime": 1484555430000, "tag": null, "project": "BI", "menuShow": true, "icon": null, "children": null },
          { "menuid": "70000002", "parentid": "70000005", "menuname": "我创建的项目", "menucode": null, "type": null, "url": "/myCreate", "tier": null, "sort": null, "createtime": 1484555480000, "updatetime": 1484555483000, "tag": null, "project": "BI", "menuShow": true, "icon": null, "children": null },
          { "menuid": "70000003", "parentid": "70000005", "menuname": "我参与的项目", "menucode": null, "type": null, "url": "/myParticipate", "tier": null, "sort": null, "createtime": 1484555524000, "updatetime": 1484555526000, "tag": null, "project": "BI", "menuShow": true, "icon": null, "children": null } ] } ]
    dispatch(TYPE.SET_LEFT_MENU_LIST,data)
    // Vue.http.get(TYPE.MENU_API+'menu/child/'+state.userInfo.token+'/'+state.userInfo.pid).then(function(response){
    //   // if(response.data.status && response.data.code==200){
    //   //   dispatch(TYPE.SET_LEFT_MENU_LIST,response.data.data)
    //   // }
    //
    // },function(response){
    //   console.log('请求错误！');
    //   customAlertInfo({dispatch,state},'系统异常！',0,true);
    // });
  }
}
