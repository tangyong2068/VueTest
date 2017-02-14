<template>
  <div class="warning_main" v-show="showInfo">
    <div>
      <div class="div_style">
        <i v-if="alertType==0" class="iconfont icon-success warning_icon"></i>
        <i v-if="alertType==1" class="iconfont icon-warn-circle warning_icon"></i>
        <i v-if="alertType==2" class="iconfont icon-close-single warning_icon"></i>
      </div>
      <div class="div_style warning_text">{{alertMsg}}</div>
    </div>
  </div>

</template>

<script>

export default{
  vuex:{
    getters:{
      showInfo:({app}) => app.showinfo,
      alertMsg:({app}) => app.customMsg,
      alertType:({app}) => app.type,
    }
  }
}
</script>
<style scoped>
.div_style{
  display: inline-block;
}
.warning_main{
  min-width: 200px;
  line-height: 55px;
  background-color: rgba(0, 0, 0, 0.65);
  border-radius: 5px;
  position: fixed;
  padding: 0 10px;
  top: 30%;
  left: 45%;
  z-index: 10002;
}
.warning_icon{
  font-size: 18px;
  color: #fff;
  margin-left: 20px;
}
.warning_text{
  font-size: 15px;
  color: #fff;
  margin-left: 20px;
}
.warning_del_icon{
  font-size: 12px;
  color: #fff;
  margin-left: 20px;
  font-family: "微软雅黑";
}
.warning_del_icon:hover{
  cursor: pointer;
}

</style>
