/* global __DEV__ */
import Vue from 'vue'
import VueRouter from 'vue-router'
import { sync } from 'vuex-router-sync'
import app from './app'
import routes from './routes'
import Validator from 'vue-validator'
import VueResource from 'vue-resource'
import store from './vuex/store'
import filters from './utils/dateFilter'
import './vendors/sweetalert/sweetalert.min.js'
import './vendors/sweetalert/sweetalert.css'
import './vendors/datepicker/vue.datepicker.min.css'
import './vendors/datepicker/vue.datepicker.min.js'



Vue.use(VueRouter)
Vue.use(Validator)
Vue.use(VueResource)

//注册filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

if (__DEV__) {
  window.VueDev = Vue
}

const router = new VueRouter({
  hashbang: true,
  history: false
})

router.map(routes)
sync(store,router)
router.start(app, '#app')
