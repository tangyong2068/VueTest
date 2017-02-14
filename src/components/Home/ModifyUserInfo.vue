<template>
  <div class="user-info-container">
    <div class="user-info-title">
      账户信息
    </div>
    <div class="user-info-row">
      <div id="headImgLabel" class="user-info-label">
        头像
      </div>
      <div class="user-info-control">
        <img v-if="user.url" v-bind:src="user.url" id="avatorImg">
        <img v-else  src="#" id="avatorImg">

        <div id="upload" @click="PreviewImage">上传新头像</div>
        <input type="file" id="uploadImage" name="uploadImg" style="visibility:hidden" v-on:change="uploadAvator($event)">

      </div>
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
        姓名
      </div>
      <div class="user-info-control">
        <input v-model="userInfo.name" v-bind:value="user.username">
      </div>
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
        邮箱
      </div>
      <div class="user-info-control">
        <input  v-model="user.email" disabled="disabled">
      </div>
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
        手机
      </div>
      <div class="user-info-control">
         <input v-model="userInfo.phone" v-bind:value="user.phone"><!--:disabled="[user.phone =='' ? '' : disabled]" -->
      </div>
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
        联系电话
      </div>
      <div class="user-info-control">
        <input v-model="userInfo.telephone" v-bind:value="user.telephone">
      </div>
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
        地址
      </div>
      <div class="user-info-control">
        <input v-model="userInfo.address" v-bind:value="user.position">
      </div>
    </div>
    <div class="user-info-row">
      <div class="user-info-label">
      </div>
      <div class="user-info-control">
        <div id="saveUserInfo" @click="thisUpdateUser">保存</div>
      </div>
    </div>

  </div>
  <alertinfo></alertinfo>
</template>

<script>
import $ from 'jquery'
import * as actions from '../vuex/actions.js'
import alertinfo from '../components/Commons/AlertInfo.vue'
export default {
  components:{
    alertinfo
  },
  vuex: {
    getters: {
      user: ({app}) => app,
      // menu: ({menu}) => menu,
    },
    actions: actions
  },
  data:function(){
    return {
      avator:false,
      avatorBase:'',
      userInfo:{
        name:'',
        phone:'',
        telephone:'',
        address:'',
        url:''
      }
    }
  },
  methods:{
    thisUpdateUser:function(){
      if(this.avatorBase){
        this.updateUserAvator(this.user.url,this.avatorBase)
      }
      this.updateUser(this.userInfo);                    //更新用户数据
    },

    PreviewImage() {
      $('#uploadImage').click()
    },
    uploadAvator(thefile){
      var file = thefile.srcElement.files || thefile.target.files
      if(file) {
        this.avator = true
        this.avatorBase = file
        var filextension = file[0].name.substring(file[0].name.lastIndexOf('.'),file[0].name.length)
        if ((filextension!='.jpg')&&(filextension!='.gif')&&(filextension!='.jpeg')&&(filextension!='.png')&&(filextension!='.bmp'))
        {
          // alert("对不起,系统仅支持标准格式的照片,请您调整格式后重新上传 !");
          this.customAlertInfo('对不起,系统仅支持标准格式的照片,请您调整格式后重新上传',2,true)
          return
        }
        else
        {
          var reader = new FileReader();
          reader.onload = function (e) {
            $('#avatorImg').attr('src',e.target.result)
          }
          reader.readAsDataURL(file[0]);
        }
      }
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

.user-info-container {
  background: #ffffff;
  width: 900px;
  margin: 15px auto;
  padding: 40px 80px;
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

.user-info-control img {
  width: 120px;
  height: 120px;
  border-radius: 120px;
  float: left;
  position: relative;
  margin-right: 50px;
  border: 1px #19B6FC solid;
}

input {
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  line-height: 26px;
  border-radius: 5px;
}

#headImgLabel {
  margin-top: 40px;
}

#headImg {
  width: 120px;
  height: 120px;
  border-radius: 120px;
  float: left;
  position: relative;
  margin-right: 50px;
  background-clip: border-box;
  background-size: cover;
}



#upload {
  display: block;
  padding: 8px 15px;
  margin-top: 40px;
  color: #19b6fc;
  border: solid 1px #19b6fc;
  background-color: #ffffff;
  border-radius: 5px;
  float: left;
  position: relative;
}

#upload:hover {
  cursor: pointer;
  color: #ffffff;
  background-color: #03A9F4;
}

#saveUserInfo {
  width: 100%;
  padding: 8px 15px;
  color: #ffffff;
  text-align: center;
  background-color: #19b6fc;
  border-radius: 5px;
  float: left;
  position: relative;
}

#saveUserInfo:hover {
  cursor: pointer;
  background-color: #03A9F4;
}
</style>
