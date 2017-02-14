<template>
  <div class="model-password" v-if = "show">
  <div class="user-info-container">
    <div class="user-info-title">
      修改密码
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
        旧密码
      </div>
      <div class="user-info-control">
        <input v-model="oldPassword" type="password">
      </div>
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
        新密码
      </div>
      <div class="user-info-control">
        <input v-model="newPassword" type="password">
      </div>
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
        确认新密码
      </div>
      <div class="user-info-control">
        <input v-model="newPasswordConfirm" type="password">
      </div>
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
      </div>
      <div class="user-info-control">
        <div id="modify" @click="modify">保存</div>
      </div>
    </div>
    <div class="closemodel" v-on:click="closemodel">
        <!-- <i class="iconfont icon-close-single"></i> -->
        x
    </div>
  </div>
</div>
</template>

<script>
import * as actions from '../vuex/actions'
import alertinfo from '../components/Commons/AlertInfo.vue'
export default {
  props:['show'],
  components:{
    alertinfo
  },
  vuex: {
    getters: {
      // menu: ({menu}) => menu
    },
    actions: actions
  },
  data:function(){
    return {
      oldPassword:"",
      newPassword:"",
      newPasswordConfirm:""
    }
  },
  methods:{
    modify:function(){
      if(this.oldPassword !== "" && this.newPassword !== "" && this.newPasswordConfirm !== ""){
        if(this.newPassword === this.newPasswordConfirm){
          this.modifyPassword(this.oldPassword,this.newPassword);
        }else{
          //alert("两次填写的密码不一致！");
          this.customAlertInfo('两次填写的密码不一致！',0,true)
        }
      }else{
        //alert("请将信息填写完整！");
        this.customAlertInfo('请将信息填写完整！',2,true)
      }
    },
    closemodel:function(){
      this.show = false
    },
  },
}
</script>

<style scoped>

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.model-password{
  width: 100%;
  height:100%;
  position: fixed;
  top: 0px;
  left:0px;
  background-color: rgba(0,0,0,0.5);
  z-index: 10000;
}

.user-info-container {
  background: #ffffff;
  width: 900px;
  padding: 40px 80px;
  position: absolute;
  top: 40%;
  left: 50%;
  margin-top: -175px;
  margin-left: -450px;
}

.user-info-title {
  color: #333333;
  font-size: 22px;
  font-weight: bold;
}

.user-info-row {
  margin-top: 20px;
  width: 100%;
  display: table;
}

.user-info-label {
  width: 20%;
  height: 40px;
  line-height: 40px;
  color: #999999;
  font-size: 18px;
  font-weight: bold;
  float: left;
  position: relative;
}

.user-info-control {
  width: 60%;
  float: left;
  position: relative;
}

input {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  line-height: 26px;
  border-radius: 5px;
}

#modify {
  width: 100%;
  padding: 8px 15px;
  color: #ffffff;
  text-align: center;
  background-color: #19b6fc;
  border-radius: 5px;
  float: left;
  position: relative;
}

#modify:hover {
  cursor: pointer;
  background-color: #03A9F4;
}
.closemodel{
  width:32px;
  height:32px;
  position: absolute;
  top:-16px;
  right:-16px;
  background-color: #4187e6;
  border-radius: 50%;
  border: 4px solid #FFFFFF;
  cursor: pointer;
  line-height: 20px;
  text-align: center;
  color:#FFFFFF;
}
</style>
