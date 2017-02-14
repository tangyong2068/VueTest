
<template>
  <div class="dropWrap" >
    <div class="selectMsg" @click="showDrop()" >
      <span>{{selectmsg}}</span>
      <i class="iconfont icon-down-arrow-small" ></i>
    </div>
    <div class="dropListWrap" v-show="showDropList">
      <ul id="dataSour">
        <li @click="select(item.msg,item.id)" v-for = "item in dropmsglist" id="{{item.id}}">{{item.msg}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import pagination from '../Commons/pagination.vue'
import $ from 'jquery'
import actions from '../../vuex/actions'
import * as TYPE from '../../vuex/types.js'
export default{
  props:["selectmsg","dropmsglist","dropmsg","selectid"],
  data(){
    return{
      showDropList:false,

    }
  },
  methods:{
    showDrop(){
      if (this.showDropList) {
        this.showDropList=false
      }
      else{
        this.showDropList=true
      }
    },
    select(msg,id){
      this.selectmsg = msg
      this.selectid = id
      this.showDropList=false
    }


  }
}
</script>
<style scoped>
  .dropWrap{
    position: relative;;
    width: 318px;
    z-index: 999;
  }
  .selectMsg{
    width: 100%;
    height: 28px;
    line-height: 28px;
    font-size: 13px;
    background-color: #fff;
    color: #333;
    border: 1px solid #d7d7d7;
  }
  .selectMsg span{
    float: left;
    display: inline-block;
    width: 260px;
    padding-left: 10px;
    color:#666666;
    font-size: 13px;

  }
  .selectMsg i{
    float: right;
    font-size: 38px;
    line-height: 24px;
    color: #8e8e8e;
  }
  .selectMsg:hover{
    cursor: pointer;
  }
  .dropListWrap{
    border: 1px solid #c2c9e4;
    margin: 0;
    padding: 0;
    background-color: #fff;
  }
  .dropListWrap ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .dropListWrap li{
    line-height: 28px;
    padding-left: 10px;
    height: 28px;
    font-size: 13px;
    color: #666;
    border-bottom: 1px solid #eee;
    background-color:#fff;
    cursor: pointer;
  }
  .dropListWrap li:hover{
    background-color:#f5f5f5;
  }
</style>
