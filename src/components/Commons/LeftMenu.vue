<template>
  <div class="left-wrapper">
    <!-- <div class="menu-wrap" >
      <div class="menu-title">
        <i class="iconfont icon-back-circle" title="返回" v-link="{path:'/'}"></i>
        项目名称
      </div>

      <ul>
        <li v-link="{path:'/manager/panel',activeClass:'active'}">
          面板管理
        </li>
        <li v-link="{path:'/manager/graphic',activeClass:'active'}">
          图表管理
        </li>
        <li v-link="{path:'/manager/dataSource',activeClass:'active'}">
          数据源管理
        </li>
        <li v-link="{path:'/manager/baseProperty',activeClass:'active'}">
          项目基本属性管理
        </li>
      </ul>
    </div> -->

    <div  class="menu-wrap"  v-for="list in leftMenuList">
      <div class="menu-title">
        <i class="iconfont" :class="list.icon" title="返回" v-link="{path:list.url}"></i>
        {{list.menuname}}
      </div>
      <ul>
        <li v-for="item in list.children" v-link="{path:item.url}" :class="[{active:this.activetag == item.url}]" @click="setActive(item.url)">
          {{item.menuname}}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import actions from '../../vuex/actions'
export default {
  props:['activetag'],
  vuex:{
    getters:{
      leftMenuList:({leftMenu}) => leftMenu.leftMenuList,
    },
    actions:actions
  },
  data () {
    return {
      currentId:'',
    }
  },
  route:{
    activate:function() {
      // this.getMenuList()
    }
  },
  methods:{
    setActive(url){
      this.activetag = url
    }
  },
  created() {
    // if (this.$route.path == '/') {
    //   /*隐藏 需要时可打开*/
    //   /*
    //   this.$router.go({path:'/OA-resources'})
    //   */
    //   this.$router.go({path:'/OA-articles'})
    // }
  },
}
</script>

<style scoped>
.left-wrapper {
  width: 225px;
  min-width: 225px;
  height: 100%;
  background-color: #fff;
  visibility:visible;
  height: 90%;
}

.menu-title {
  height: 50px;
  line-height: 54px;
  border-bottom: 1px #F2F2F2 solid;
  padding-left: 15px;
  font-size: 15px;
  /*border: solid 1px red*/
}

/*#basis_operate {
font-size: 24px;
margin-right: 8px;
}*/

.menu-title i {
  /*position: relative;*/
  float: left;
  margin-right: 13px;
  color:#4187e6;
  font-size: 21px;
  vertical-align: middle;
}
.menu-title i:hover{
  cursor: pointer;
}
.icon-larger-font{
  font-size: 18px  ! important ;
  /*color:red;*/
}
.menu-wrap ul {
  margin: 0;
  padding: 0;
  margin-bottom: 29px;
}

.menu-wrap li {
  position: relative;
  display: block;
  height: 38px;
  line-height: 38px;
  font-size: 13px;
  color:#333;
  padding-left: 49px;
}

.menu-wrap li:hover {
  color:#4187e6;
  cursor: pointer;
}

.menu-wrap li.active {
  background: #DFEBFC url('../../assets/img/menu_bg.png') no-repeat;
}

</style>
