import * as TYPE from '../types'
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateJSON = true;



//自定义信息提示
export const customAlertInfo = ({dispatch},msg,type,show) => {
  dispatch(TYPE.HANDLE_CUSTOMMSG,msg,type,show);
  setTimeout(() => {
    dispatch(TYPE.HANDLE_RESETALERTINFO);
  }, 2000)
}
