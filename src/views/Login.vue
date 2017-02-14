<template>
  <div class="login-wrap">
    <div class="login-top">
        <div class="login-top-main">
          <a href="#">
            <img src="../assets/img/logoDacube.png">
          </a>
        </div>
    </div>

    <div class="login">
      <validator name="validation1">
      <div class="login-header">
        <img src="../assets/img/logoMop.png">
      </div>
      <div class="login-form">

          <p>
            <!-- <i class="iconfont icon-user"></i> -->
            <input id="username" class="form-control font-style text-gray" name="username" placeholder="用户名" @keyup.enter="loginPre($validation1.valid)"
            v-bind:value="localName"
            v-model="user.name"
            v-validate:username="['required']">
          </p>
          <p>
            <!-- <i class="iconfont icon-password"></i> -->
            <input id="password" class="form-control font-style text-gray" name="password" type="password" placeholder="密码" @keyup.enter="loginPre($validation1.valid)"
            v-bind:value="localPwd"
            v-model="user.password"
            v-validate:password="['required']" >
          </p>
          <p class="re-pwd">
            <input type="checkbox" id="pwd" v-model="repwd">
            <label for="pwd">记住密码</label>
          </p>
          <!-- <p id="message">{{msg}}</p> -->
          <div class="errors">
            <span v-if="$validation1.username.required || $validation1.password.required">用户名或密码不能为空<br></span>
            <!-- <span v-if="$validation1.password.required">Required your password.</span>  -->
            <span>{{msg}}</span>
          </div>

          <!-- <button v-if="!status && !clickLogin" class="btn-login" @click="showTip()">登&nbsp;&nbsp;录
          </button> -->
          <button v-if="!status && !clickLogin" class="btn-login" @click="loginPre($validation1.valid)">登&nbsp;&nbsp;录
          </button>
          <!-- <button v-else class="btn-login">登录中...</button> -->

      </div>
      <div class="border-main"></div>
      <p class="contact">*若需开通账号或修改密码请致电客服电话：0851-84396122</p>
      </validator>
    </div>
  </div>

  <companyinfo></companyinfo>
</template>

<script>
import * as actions from '../vuex/actions.js'
import companyinfo from '../components/Commons/companyTip.vue'

export default {
  replace: true,
  vuex:{
    getters:{
      msg: ({app}) => app.msg,
      localName:({app}) => app.localName,
      localPwd:({app}) => app.localPwd,
      status: ({app}) => app.status,
      clickLogin:({app}) => app.clickLogin,
    },
    actions:actions
  },
  components:{
    companyinfo
  },
  data(){
    return {
      user:{
        name:'',
        password:'',
      },
      repwd:true,
      loginClick:false,
      isShowTip:false
    }
  },
  methods:{
    loginPre(isValid) {
      if (isValid) {
        this.loginClick = true
        this.login(this.user,this.repwd)
      }
    },
    showTip:function(){
      this.isShowTip = true;
    }
  }
}
</script>

<style scoped>
.errors{
  width:370px;
  height:auto;
  line-height: 20px;
  padding-left: 2px;
  margin: 0 auto;
  /*background-color: #900b0b;*/
  /*opacity:0.45;*/
  color:red;
  margin-top: 18px;
}

.login-loading:hover {
  cursor: not-allowed!important;
}

.login-wrap {
  position: absolute;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
  background-image: url('../assets/img/backgroundImage.png');
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
}
.login-top{
  width: 100%;
  height:80px;
  position: absolute;
  top:0px;
  left:0px;
  background-color: #FFFFFF;
}
.login-top-main{
  width:1100px;
  height: 42px;
  margin:19px auto;
}
.login-top-main img{
  height: 42px;
  cursor: pointer;
}

.login {
  position: absolute;
  width: 450px;
  height:449px;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  margin-left: -225px;
  margin-top: -224px;
  background-color: rgba(0,0,0,0.5);
}

.login-header {
  /*text-align: right;
  background-image: url('../assets/img/login-img.png');
  background-size: cover;
  width: 450px;
  height: 120px;*/
  width: 100%;
  height:70px;
  background-color: #0F2336;
}

.login-header img{
  height:70px;
}

.login-form{
  width:100%;
  height: auto;
  position: absolute;
  top: 110px;
}

.login-form input{
  display: block;
  border: none;
  width: 82%;
  font-size: 1em;
  padding: 0px 35px;
  height: 40px;
  color: #333333;
  border-radius: 4px;
  font-family: inherit;
  margin: 0 auto;
}

.re-pwd {
  height: 20px;
  line-height: 20px;
  padding-left:42px;
}

.re-pwd input[type="checkbox"]{
  text-align: center;
  height: 20px;
  width: 20px;
  display: inline-block;
  vertical-align: middle;
}

.re-pwd label {
  margin-left: 10px;
  color:#F1FFFA;
  height: 20px;
  vertical-align: middle;
  letter-spacing: 1px;
  font-size: 15px;
}

.login-form i {
  position: absolute;
  margin: 11px 0 0 10px;
  color: #23b7e5;
  font-size: 18px;
  font-weight: 500;
}

.btn-login{
  display: block;
  width: 82%;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #ffffff;
  background-color: #23b7e5;
  border-color: #46b8da;
  padding: 0;
  height: 40px;
  font-size: 15px;
  font-weight:400;
  font-family: inherit;
  vertical-align: middle;
  margin: 0 auto;
  margin-top: 10px;
}

.btn-login:hover {
  cursor: pointer;
}

#message {
  color: red;
  text-align: left;
}
.border-main{
  width:82%;
  height:0px;
  position: absolute;
  bottom:50px;
  left:42px;
  border-top: 1px solid #546172;
}

.contact {
  display: block;
  position: absolute;
  width: 82.4%;
  text-align: center;
  bottom:5px;
  left:42px;
  word-wrap: break-word;
  word-break: break-all;
  font-size: 12px;
  color: #fff;
  font-family: inherit;
  line-height: 1.5em;
  letter-spacing: 1px;
}

</style>
