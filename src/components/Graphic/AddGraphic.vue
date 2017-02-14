<template>
  <div class="bgWrap"  v-show="showAddInfo">
    <div class="addWrap">

      <div class="top">
        添加图表
      </div>

      <div class="content">

        <div class="name">
          <span>图表名称&nbsp;:&nbsp;</span>
          <input type="text" placeholder="请输入面板名称" v-model="title"/>
        </div>
        <div class="type">
          <span>数据源&nbsp;&nbsp;&nbsp;:&nbsp;</span>
          <div class="selectWrap">
             <droplist :dropmsglist.sync="dropmsglist" :selectmsg.sync = "selectmsg" :selectid.sync="sourceid"></droplist>
          </div>
        </div>

      </div>

      <div class="bottom">
        <div class="btnWrap">
          <span class="btn confirm" @click="addGraphic">确定</span>
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
import { customAlertInfo } from '../../vuex/actions/alertInfo.js'

export default{
  props:['pagesize'],
  components:{
    droplist
  },
  data(){
    return {
      title:"",
      sourceid:"all",
      selectmsg:"选择数据源",
      dropmsglist:[
        {"msg":"PC","id":"pc"},
        {"msg":"手机","id":"mobile"},
      ]
    }
  },
  vuex:{
    getters:{
      showAddInfo:({ graphic }) => graphic.showAddInfo,
      sourceList:({ graphic }) => graphic.sourceList,
    },
    actions
  },
  methods:{
    hideAdd(){
      this.$store.dispatch(TYPE.SET_SHOW_ADD_GAPHIC,false);
    },
    addGraphic(){
      if(this.sourceid =="all"){
        this.customAlertInfo('请选择数据源!',0,true);
      }
      else{
        this.addGraphicList(1,this.sourceid,this.title,this.pagesize)
        this.sourceid="all"
        this.selectmsg="选择数据源"
      }

    }
  },
  computed:{
    dropmsglist:function(){

      let arr = []
      for (var i = 0; i < this.sourceList.length; i++) {
        let obj = new Object()
        obj.msg = this.sourceList[i].sourceName
        obj.id = this.sourceList[i].sourceId
        arr[i] = obj
      }
      return arr
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
    padding: 99px;
    color: #333;
    font-size: 14px;
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
    top: 198px;
    left: 171px;
  }
  .name input{
    width: 318px;
    padding-left: 10px;
    color: #666666;
  }
</style>
