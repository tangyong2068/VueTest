export default{
    '/': {
      component: require('./views/home')
    },

    '/login': {
      name:'login',
      component: require('./views/Login')
    },
    // '/modify':{
    //   component:require('./views/ModifyUserInfo')
    // },
    // '/password':{
    //   component:require('./views/ModifyPassword')
    // },

}
