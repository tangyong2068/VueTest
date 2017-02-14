
  <!--  <span  v-link="{path:'/manager/panel'}">项目管理列表</span>-->
  <template>
    <div class="mana-wrapper">

      <leftmenu :activetag.sync="url"></leftmenu>

      <div class="mana-right-content">
        <!-- {{leftMenuList | json}} -->
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
        leftMenuList:({leftMenu}) => leftMenu.leftMenuList
      }
    },
    data(){
      return{
        url:'/all'
      }
    },
    route:{
      activate:function() {
        this.getLeftMenuList(this.$route.path)
      }
    },

    created() {

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
