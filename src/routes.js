export default{
  '/':{
        name:'project',
        component: require('./components/Main/Index.vue'),
        subRoutes:{
            '/': {//默认
                component: require('./components/AllProject/Index.vue'),
            },
            '/all': {//默认
                component: require('./components/AllProject/Index.vue'),
            },
            '/myCreate': {//默认
                component: require('./components/MyCreatePro/Index.vue'),
            },
            '/myParticipate': {//默认
                component: require('./components/MyParticipatePro/Index.vue'),
            },
        }
  },
  '/manager': {
        name:'manager',
        component: require('./components/Manager/Manager.vue'),
        subRoutes: {
            '/': {//默认
                component: require('./components/Panel/Index.vue'),
            },
            '/panel':{//数据开发
                component: require('./components/Panel/Index.vue'),
            },
            '/graphic':{//数据开发
                component: require('./components/Graphic/Index.vue'),
            },
            '/dataSource':{//数据开发
                component: require('./components/DataSource/Index.vue'),
            },

            '/baseProperty':{//数据开发
                component: require('./components/BaseProperty/Index.vue'),
            },

        }
    },
    // '/project':{
    //     name:'project',
    //     component: require('./components/Main/Index.vue'),
    //     subRoutes: {
    //         '/': {//默认
    //             component: require('./components/AllProject/Index.vue'),
    //         },
    //         '/all': {//默认
    //             component: require('./components/AllProject/Index.vue'),
    //         },
    //         '/myCreate': {//默认
    //             component: require('./components/MyCreatePro/Index.vue'),
    //         },
    //         '/myParticipate': {//默认
    //             component: require('./components/MyParticipatePro/Index.vue'),
    //         },
    //     }
    // }

}
