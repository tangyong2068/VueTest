import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/logger'

import index from './modules'

Vue.use(Vuex)

const middlewares = []

if (__DEV__) {
  // middlewares.push(createLogger())
}

import modules from './modules'

export default new Vuex.Store({
  modules
})


// const store = new Vuex.Store({
//   modules: {
//     index
//   },
//   middlewares
// })
//
// export default store
//
// if (module.hot) {
//   module.hot.accept([
//     './modules/index'
//   ], () => {
//     try {
//       store.hotUpdate({
//         modules: {
//           index: require('./modules/index').default
//         }
//       })
//     } catch (e) {
//       console.log(e.stack)
//     }
//   })
// }
