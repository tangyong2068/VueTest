<template>
  <topbar></topbar>
  <div class="ifram-container">
    <!-- <iframe :src="url" id="subFrame" name="subFrame"></iframe> -->
    <iframe src="http://127.0.0.1:3030" id="subFrame" name="subFrame" ></iframe>
    <alertinfo></alertinfo>
  </div>
</template>

<script>
import topbar from '../components/Home/Topbar.vue'
import * as actions from '../vuex/actions.js'
import alertinfo from '../components/Commons/AlertInfo.vue'
import modifyuserinfo from './ModifyUserInfo.vue'
export default {
  components: {
    topbar,
    alertinfo,
    modifyuserinfo
  },
  vuex:{
    getters:{
      token:({app}) => app.token,
      url:({app}) => app.currentUrl
    },
    actions
  },
  route:{
    activate:function (transition) {
      this.token?transition.next():transition.redirect('/login')
    }
  },
  ready() {
    // this.getMenuList()
  }
}
</script>

<style scoped>
@media screen and (max-height:768px) {
  .ifram-container {
    height: 590px!important;
  }
}

.ifram-container {
  height: 100%;
  width: 100%;
  position: relative;
  top:66px;
}

.ifram-container iframe{
  height: 100%;
  width: 100%;
  overflow:srcoll;
  border:none
}
</style>
