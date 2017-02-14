import * as TYPE from './types'
import Vue from 'vue'
import VueResource from 'vue-resource'
import { saveLocal } from '../utils/localStore.js'
import VueRouter from 'vue-router'
var cookies = require('browser-cookies')
import { CookieDomain } from '../config.js'

Vue.use(VueResource);
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateJSON = true;
//Vue.http.options.emulateHTTP = true;
//Vue.http.options.xhr = {withCredentials: true};

export const isCompanyNull = ({dispatch,router,state},userid,token) => {
  Vue.http.get(TYPE.ROOT_API+ 'CompanyUser/getCompanyUserByUserid/' + userid+'?token=' + token).then(function(response){
    if (response.data.status) {
        if (response.data.data == null) {
          showALLCompany({dispatch},true);
        }else {
          getMenuList({dispatch,state})//获取顶部菜单
          router.go({path:'/'})
        }
    }else {
      dispatch(TYPE.LOGIN_MSG,"用户信息异常！")
    }
  });
}

export const saveCompany = ({dispatch,router,state},name,address,desc) => {
    Vue.http.post(TYPE.ROOT_API+ 'company/add?token=' + state.app.token,{companyname:name,address:address,description:desc}).then(function(response){
      if (response.data.status) {
            showALLCompany({dispatch},false);
            getMenuList({dispatch,state})//获取顶部菜单
            router.go({path:'/'})
      }else {
          customAlertInfo({dispatch},"保存公司信息失败！",2,true)
      }
    });
}


export const login = ({dispatch,router,state},user,repwd) => {
  let loginname = user.name
  let password = user.password
  if (repwd) {
    saveLocal('localname',loginname)
    saveLocal('localpwd',password)
    dispatch(TYPE.USER_LOCALINFO,loginname,password)
  }
  Vue.http.post(TYPE.ROOT_API + 'user/login/',{loginname,password}).then(function(response){
    //success callback
    if(!response.ok){
      console.log('请求失败！');
      dispatch(TYPE.LOGIN_MSG,"数据请求失败，请稍后再试")
      dispatch(TYPE.LOGIN_CLICKLOGIN,false)
    }
    if(response.data.status){
      cookies.set('userid',response.data.data.userid,{domain:CookieDomain})
      cookies.set('name',response.data.data.username,{domain:CookieDomain})
      cookies.set('token',response.data.data.token,{domain:CookieDomain})
      cookies.set('url',response.data.data.url ||"",{domain:CookieDomain})
      cookies.set('phone',response.data.data.phone ||"",{domain:CookieDomain})
      cookies.set('telephone',response.data.data.telephone ||"",{domain:CookieDomain})
      cookies.set('position',response.data.data.position ||"",{domain:CookieDomain})
      cookies.set('email',response.data.data.email ||"",{domain:CookieDomain})
      cookies.set('type',response.data.data.type ||"",{domain:CookieDomain})
      // cookies.set('user',JSON.stringify(response.data.data),{domain:CookieDomain})
      dispatch(TYPE.USER_SET,response.data.data)
      dispatch(TYPE.LOGIN_CLICKLOGIN,false)
      if (response.data.data.type == "admin") {
         isCompanyNull({dispatch,router,state},response.data.data.userid,response.data.data.token);
      }else {
        getMenuList({dispatch,state})//获取顶部菜单
        router.go({path:'/'})
      }
    }else{
      dispatch(TYPE.LOGIN_MSG,response.data.data);
      dispatch(TYPE.LOGIN_CLICKLOGIN,false)
    }

  },function(response){
    //error callback
    dispatch(TYPE.LOGIN_MSG,"数据请求错误，请稍后再试");
    dispatch(TYPE.LOGIN_CLICKLOGIN,false)
    console.log('请求错误！');
  });
};

export const logout = ({dispatch,state,router}) => {

  Vue.http.post(TYPE.ROOT_API + 'user/logout?token='+state.app.token).then(function(response){
    dispatch(TYPE.USER_REMOVE);
    dispatch(TYPE.MESSAGE_CLEARLIST)
    cookies.erase('userid')
    cookies.erase('name')
    cookies.erase('token')
    cookies.erase('url')
    cookies.erase('phone')
    cookies.erase('telephone')
    cookies.erase('position')
    cookies.erase('email')
    cookies.erase('pid')
  },function(response){
    console.log('请求错误！');
  });
  if (!router) {
    let innerRouter = new VueRouter();
    router = innerRouter
  }
  router.go({path:'/login'});
}

export const getMenuList = ({dispatch,state}) => {
  Vue.http.get(TYPE.MENU_API + 'mrpMenu/queryParentMenuList/'+state.app.token+'/BI').then(function(response){

    if (response.data.status) {
      saveLocal('topmenu',response.data.data) //把菜单列表存入localStorage中
      dispatch(TYPE.MENU_LISTSET,response.data.data)
      let value = response.data.data[0].menuid
      // saveCookie('pid',value) //设置第一个父菜单，默认加载第一菜单应用
      cookies.set('pid',value,{domain:CookieDomain})
      dispatch(TYPE.CURRENT_PARENTMENU,response.data.data[0].url)
    }
    else {
      if (response.data.code == 203 || response.data.code == 211) {
        customAlertInfo({dispatch},"登录信息超时，请退出重新登录！",2,true)
      }
    }
  },function(response){
    console.log('请求错误！');
  });
}

export const customAlertInfo = ({dispatch},msg,type,show) => {
  dispatch(TYPE.HANDLE_CUSTOMMSG,msg,type,show);
  setTimeout(() => {
    dispatch(TYPE.HANDLE_RESETALERTINFO);
  }, 2000)
}


//修改用户信息
export const updateUser = ({dispatch,state,router},info) => {
  let avatorUrl = cookies.get('url')
  Vue.http.post(TYPE.ROOT_API + 'user/update?token=' + state.app.token,{
    username:info.name,
    phone:info.phone,
    telephone:info.telephone,
    position:info.address,
    url:avatorUrl
  }).then(function(response){
    //success callback
    if(!response.ok){
      console.log('请求失败！');
    }
    dispatch(TYPE.LOGIN_MSG,{recivData: response.data})
    if(response.data.status){
      cookies.set('name',info.name,{domain:CookieDomain})
      cookies.set('phone',info.phone,{domain:CookieDomain})
      cookies.set('telephone',info.telephone,{domain:CookieDomain})
      cookies.set('position',info.address,{domain:CookieDomain})
      customAlertInfo({dispatch},'修改成功！',1,true)
      // router.go({path:'/'});
      window.location.reload()
    }
    if (!response.data.status) {
      showAlertInfo({dispatch,state},response.data)
    }

  },function(response){
    //error callback
    console.log('请求错误！');
  });
};

//头像

export const updateUserAvator = ({dispatch,state},oldUrl,newAvator) => {
  var data = new FormData()
  data.append('uploadImg', newAvator[0])
  Vue.http.post(TYPE.ROOT_API + 'user/add/img?token=' + state.app.token,data).then(function(response){
    //success callback
    if(response.data.status){
      console.log(response.data.data)
      // saveCookie('url',response.data.data)
      cookies.set('url',response.data.data,{domain:CookieDomain})
      dispatch(TYPE.USER_UPDATEAVATOR,response.data.data)
    }
    else{
      customAlertInfo({dispatch},'头像更新失败！',0,true)
    }

  },function(response){
    //error callback
    console.log('请求错误！');
  });
};


// 修改密码
export const modifyPassword = ({dispatch,state,router},oldPassword,newPassword) => {
  Vue.http.post(TYPE.ROOT_API + 'user/set/password?token=' + state.app.token,{
    oldPassword:oldPassword,
    password:newPassword
  }).then(function(response){
    //success callback
    if(response.data.status){
      customAlertInfo({dispatch},'修改成功！正在跳转到登录页……',1,true)
      dispatch(TYPE.LOGOUT);
      dispatch(TYPE.USER_REMOVE);
      router.go({path:'/login'});

    }else{
      alert(response.data.data);
    }

  },function(response){
    //error callback
    console.log('请求错误！');
  });
};

export const showALLCompany = ({dispatch,state},isShow) => {
   dispatch(TYPE.SHOW_COMPANY,isShow);
}
