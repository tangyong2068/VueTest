<template>
  <div class="top-bar">
    <div class="logo"></div>
    <div class="menu-bar">
      <ul>
        <li v-for="item in menuList" @click="toggleMenu(item.menuname,item.menuid,item.url)" :class="item.menuname == currentMenu ? 'active' : ''">
          <i class="iconfont icon-libaray" v-if="item.menuname=='数据项目'"></i>
          <i class="iconfont icon-company" v-if="item.menuname=='企业管理'"></i>
          {{item.menuname}}
        </li>
      </ul>
    </div>
    <!-- <div class="next-page-menu">
    <i class="iconfont icon-double-arrow-right"></i>
  </div>
  <div class="bell">
  <i class="iconfont icon-bell"></i>
</div> -->

<div class="user-info" id="btn-user-info"  @click="toggleInfoMenu">

  <p>
    <img v-if="user.url == '/avator.png' || !user.url" src="../../assets/img/avator.png" >
    <img v-else v-bind:src="user.url" >
    <span>{{ user.username }}</span>
    <i class="iconfont icon-arrow-down">
    </i>
  </p>
</div>

<div v-show="isUserInfoMenuShow" class="user-info-menu">
  <ul>
    <!-- <li v-link="{ path: '/modify' }">账号设置</li>
    <li v-link="{ path: '/password' }">修改密码</li> -->
    <li v-on:click = "accountSet('showUser')">账号设置</li>
    <li v-on:click = "accountSet('showPassword')">修改密码</li>
    <!-- <li v-link="{ path: '/cc' }">建议和BUG反馈</li> -->
    <li @click="logout()">安全退出</li>
  </ul>
</div>
</div>
<modifyuserinfo :show.sync = "showUser"></modifyuserinfo>
<modifypassword :show.sync = "showPassword"></modifypassword>
</template>

<script>
import * as actions from '../../vuex/actions.js'
import $ from 'jquery'
import * as TYPE from '../../vuex/types.js'
import modifyuserinfo from '../../views/ModifyUserInfo.vue'
import modifypassword from '../../views/ModifyPassword.vue'
var cookies = require('browser-cookies')
import { CookieDomain } from '../../config.js'

export default {
  components:{
    modifyuserinfo,
    modifypassword
  },
  vuex:{
    getters:{
      user: ({app}) => app,
      menuList:({app}) => app.menuList
    },
    actions
  },
  data () {
    return {
      isUserInfoMenuShow:false,
      currentMenu:'数据项目',
      showUser:false,
      showPassword:false,
    }
  },
  methods:{
    toggleInfoMenu () {
      this.isUserInfoMenuShow = !this.isUserInfoMenuShow
      setTimeout(() => {
        this.isUserInfoMenuShow = false
      }, 5000)
    },
    toggleMenu (menuname,id,url) {
      this.currentMenu = menuname
      cookies.set('pid',id,{domain:CookieDomain}) //设置当前父菜单id
      // this.$store.dispatch(TYPE.CURRENT_PARENTMENU,url)

      if(id=='1'){
          $('#subFrame').attr('src','http://'+'127.0.0.1:80')
      }
      else if(id=='11'){
          $('#subFrame').attr('src','http://'+'127.0.0.1:3030')
      }
      else {
        this.$store.dispatch(TYPE.CURRENT_PARENTMENU,url)
      }

    },
    accountSet(key){
      this[key] = true
    }
  },
  watch:{
    'menuList':function() {
      this.currentMenu = this.menuList[0].menuname
    }
  }
}

</script>

<style scoped>
.v-link-active {
  color: #4188e4;
}

.top-bar {
  width: 100%;
  height: 51px;
  background-color: #F5F5F7;
  display: flex;
  position: fixed;
  top:0;
  left:0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  min-width: 1366px;
  max-width: 1920px;
  z-index: 900;
  -moz-box-shadow: 0 5px 5px #C1C1C1;
  -webkit-box-shadow:0 5px 5px #C1C1C1;
  -o-box-shadow:0 5px 5px #C1C1C1;
  -ms-box-shadow:0 5px 5px #C1C1C1;
  box-shadow: 0 5px 5px #88888
}

.top-bar div {
  display: inline-block;
}

.logo{
  width: 245px;
  text-align: center;
  background-image: url('../../assets/img/logo.jpg');
  background-repeat: no-repeat;
  background-size: contain;
}

.menu-bar{
  flex: 1;
  overflow: hidden;
}

.menu-bar ul {
  padding-left: 19px;
  margin: 0;
  height: 51px;
  line-height: 51px;
}

.menu-bar li {
  display: inline-block;
  margin-right: 27px;
  color: #333333;
  font-size: 15px;
}

.menu-bar li.active {
  color: #4188e4;
}

.menu-bar li:hover {
  color: #4188e4;
}

.menu-bar li i {
  display: inline-block;
  padding: 0;
  margin-right:3px;
}

.menu-bar li:hover {
  cursor: pointer;
}


.menu-bar li i.active {
  color: #189EFF;
}

.next-page-menu {
  line-height: 51px;
  position: relative;
  z-index: 999;
  padding-right: 30px;
}

.next-page-menu i {
  font-size: 15px;
  color:#535353;
}

.next-page-menu i:hover {
  cursor: pointer;
}

.bell {
  line-height: 51px;
  border-left: 1px #ECECEC solid;
  border-right: 1px #ECECEC solid;
}

.bell i {
  font-size: 19px;
  color:#B4B6B5;
  padding: 0 20px;
}

.user-info {
  height: 51px;
  line-height: 51px;
  overflow: hidden;
  color: #535353;
  width: auto;
  padding-right: 20px;
}

.user-info p {
  margin: 0;
  padding: 0;
  height: 51px;
}

.user-info:hover {
  cursor: pointer;
}

.user-info img {
  width: 35px;
  height: 35px;
  vertical-align: middle;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  margin-left: 20px;
  margin-right: 5px;
  display: inline-block;
  margin-top: -40px;
}

.user-info i {
  font-size: 15px;
  color: #ABABAB;
  display: inline-block;
  height: 51px;
  vertical-align: top;
  margin-left: 20px;
}

.user-info span {
  display: inline-block;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  max-width: 60px;
  text-overflow: ellipsis;
  cursor: pointer;
  color:#7D8897;
  font-size: 15px;
}

.user-info-menu {
  width: 200px;
  background-color: #ffffff;
  position: fixed;
  top: 63px;
  right: 20px;
}

.user-info-menu ul{
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-info-menu li{
  text-align: left;
  padding: 0px 20px;
  height: 50px;
  line-height: 50px;
  color:#333;
}
.user-info-menu li a{
  display: block;
  color:#333;
  text-decoration: none;
}

.user-info-menu li:hover{
  background-color: #F5F5F5;
  cursor: pointer;
}

.user-info-menu li:not(:first-child){
  border-top: 1px solid #eeeeee;
}


.v-link-active {
  color:#1F324C!important;
}

.v-link-active i {
  color:#189EFD;
}

.ms-badge {
  display: inline-block;
  position: relative;
  font-size: 12px;
  background-color: #F15050;
  padding: 4px;
  left: -5px;
  top: -8px;
}
</style>
