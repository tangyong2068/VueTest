<template>
  <div class="bgWrap"  v-show="showModifyInfo">
    <div class="addWrap">

      <div class="top">
        修改面板
      </div>

      <div class="content">
        <div class="name">
          <span>面板名称&nbsp;:&nbsp;</span>
          <input type="text" placeholder="请输入面板名称" v-model = "panelName"/>
        </div>
        <div class="type">
          <span>面板类型&nbsp;:&nbsp;</span>
          <div class="selectWrap">
             <droplist :dropmsglist.sync="dropmsglist" :selectmsg.sync = "selectmsg"></droplist>
          </div>
        </div>
        <div class="desc">
          <span>面板描述&nbsp;:&nbsp;</span>
          <textarea type="text" placeholder="请输入面板描述" v-model="panelDesc"></textarea>
        </div>

      </div>

      <div class="bottom">
        <div class="btnWrap">
          <span class="btn confirm" @click="addpanel()">确定</span>
          <span class="btn exit" @click="hideAdd()">取消</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import actions from '../../vuex/actions'
import * as TYPE from '../../vuex/types.js'
import droplist from '../Commons/DropList.vue'

export default{
  props:['pagesize'],
  components:{
    droplist
  },
  vuex:{
    getters:{
        showModifyInfo:({ panel }) => panel.showModifyInfo,
        panelObj:({ panel }) => panel.panelObj,
        proObj:({ project }) => project.proObj,
    },
    actions
  },
  data(){
    return {
      panelName:"",
      panelDesc:"",
      selectmsg:"PC",
      dropmsglist:[
        {"msg":"PC","id":"pc"},
        {"msg":"手机","id":"mobile"},
      ],
      panelId:''

    }
  },
  watch:{
    panelObj:function(newVal,oldVal){
      this.panelDesc = newVal.description
      this.panelName = newVal.panelName
      if(this.type == 1){
        this.selectmsg = "PC"
      }
      else if(this.type == 2){
        this.selectmsg = "手机"
      }
      this.panelId = newVal.panelId
    }
  },
  methods:{
    hideAdd:function(){
      this.$store.dispatch(TYPE.SET_SHOW_MODIFYPANEL_INFO,false);
    },
    addpanel(){
      let type =0;
      if(this.selectmsg == "PC"){
        type = 1
      }
      else if(this.selectmsg == "手机"){
        type = 2
      }
      this.updatePanelList(this.proObj.projectId,this.panelId,type,this.panelName,this.panelDesc,this.pagesize)
    }
  }


}

</script>

<style scoped>
  .bgWrap{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .addWrap{
    background-color: #fafafa;
    transition: all 1.3s ease;
    font-family: Microsoft YaHei,Helvetica,Arial,sans-serif;
    width: 600px;
    height: 400px;
    margin: 0 auto;
    position: relative;
    top: 130px;
    box-shadow: 0 2px 8px rgba(0,0,0,.33);
    border-radius: 3px;

  }
  .top{
    height: 40px;
    line-height: 40px;
    padding-left: 15px;
    border-bottom: 1px solid #d7d7d7;
  }
  .content{
    height: 310px;
    padding: 35px;
    color: #333;
    font-size: 14px;
    padding-left: 85px;
  }
  .bottom{
    background-color: #f3f2f2;
    height: 50px;
    border-top: 1px solid #d7d7d7;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .btnWrap{
    float: right;
    position: relative;
    top: 10px;
    /*border: 1px solid red;*/
  }
  .btnWrap .btn{
    display: inline-block;
    height: 30px;
    width: 70px;
    line-height: 30px;
    text-align: center;
    margin-right: 20px;
    color: #fff;
    border-radius: 3px;
  }
  .confirm{
    background-color: #4187e4;

  }
  .confirm:hover{
    background-color: #2269c4;
    cursor: pointer;
  }
  .exit{
    background-color: #909090;
  }
  .exit:hover{
    background-color: #7c7c7c;
    cursor: pointer;
  }

  .content div{
    /*border: 1px solid red;*/
    margin-bottom: 40px;
  }
  .selectWrap{
    position: absolute;
    top: 135px;
    left: 156px;
  }
  .name input{
    width: 318px;
    padding-left: 10px;
    color: #666666;
  }
  .desc textarea{
    width: 318px;
    height: 80px;
    padding-left: 10px;
    color: #666666;
    font-size: 14px;
  }
  .desc span{
    float: left;
    color: #333333;
  }

</style>
