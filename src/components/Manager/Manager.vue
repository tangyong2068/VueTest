<template>
  <div class="mana-wrapper">

    <leftmenu :activetag.sync="url"></leftmenu>

    <div class="mana-right-content">
      <router-view></router-view>
    </div>
  </div>

    <alertinfo ></alertinfo>


</template>

<script>
import leftmenu from '../Commons/LeftMenu.vue'
import { myNiceScroll } from '../../utils/customScroll.js'
import actions from '../../vuex/actions'
import alertinfo from '../Commons/AlertInfo.vue'


export default {
  components:{
    leftmenu,
    alertinfo,
  },
  vuex:{
    actions:actions,
    getters:{


    }
  },
  data(){
    return{
      url:'/manager/panel'
    }
  },
  route:{
    activate:function() {
      this.getLeftMenuList(this.$route.path)
    }
  },
  ready(){
    myNiceScroll();
  },
}
</script>

<style scoped>
.mana-right-content {
  flex: 1;
  margin-left: 30px;
}
</style>
