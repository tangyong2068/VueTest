<template>

  <div class="right-wrap">
    <span class = "left-circle"></span>

    <div class="topWrap">
      <span class="addBtn" @click="showAdd()">
          <i  class="iconfont icon-add-inner"></i>
          <span>创建新图表</span>
      </span>
      <div class="searchBox">
        <input type="text" placeholder="请输入图表名称" v-model="graphicname" v-on:keyup.enter="searchGraphic()"/>
        <span>
          <i  class="iconfont icon-search" @click="searchGraphic()"></i>
        </span>
      </div>
    </div>

    <div class="contentWrap">

      <div class="cardWrap">

        <div class="card" v-for="item in graphicList.dataList">
          <div class="cardTop">
            <div class="name">
              <span>图表名称&nbsp;:&nbsp;</span>
              <span>{{item.title}}</span>
            </diV>
            <div class="time">
              <span>修改时间&nbsp;:&nbsp;</span>
              <span>{{item.setTime | formatDate}}</span>
            </diV>
          </div>
          <div class="imgWrap">
            <img  :src="item.imgurl" />
          </div>
          <div class="cardBottom">
            <span class="left">
              <span >创建时间&nbsp;:&nbsp;</span>
              <span>{{item.addTime | formatDate}}</span>
            </span>
            <span class="right">
              <i  class="iconfont icon-survey editor-color"></i>
              <i  class="iconfont icon-delete delete-color" @click="deleteGraph(item.chartId)"></i>
            </span>
          </div>
        </div>
        
      </div>

      <div class="pageWrap">
        <pagination :pagenow.sync="pagenow" :pagesize="pagesize" :pagenum="pagenum"></pagination>
      </div>

    </div>
  </div>

  <addgraphic :pagesize.sync="pagesize"></addgraphic>

</template>

<script>

import actions from '../../vuex/actions'
import * as TYPE from '../../vuex/types.js'
import {formatDate} from '../../utils/checkAccess.js'
import { myNiceScroll } from '../../utils/customScroll.js'
import pagination from '../Commons/Pagination.vue'
import addgraphic from './AddGraphic.vue'

export default{
  components:{
    pagination,
    addgraphic
  },

  data(){
    return {
      pagenow:1,
      pagesize:10,
      pagenum:1,
      graphicname:'',
      option:'all',
      showinfo:false,
    }
  },
  vuex:{
    getters:{
      graphicList:({ graphic }) => graphic.graphicList,

    },
    actions
  },
  route:{
    activate:function (){
      this.getGraphicList(1,this.pagenow,this.pagesize)
    }
  },
  watch:{
    pagenow:function(newVal,oldVal){
      if(this.option=='all'){
          this.getGraphicList(1,this.pagenow,this.pagesize)
      }
      else{
          this.getGraphicListByName(1,this.graphicname,this.pagenow,this.pagesize)
      }

    },
    graphicList:function(newVal,oldVal){
      if(newVal.total == 0){
        this.pagenum = 1
      }
      else{
        this.pagenum = Math.ceil(newVal.total/this.pagesize);
      }
    },
  },
  methods:{
    searchGraphic:function(){
      if(this.graphicname){
        this.option = 'search'
      }
      else{
        this.option = 'all'
      }
      if(this.pagenow!=1){
        this.pagenow = 1
      }
      else{
        this.getGraphicListByName(1,this.graphicname,this.pagenow,this.pagesize)
      }
    },
    deleteGraph:function(id){
      swal({
        title: `<span><i class="iconfont icon-exclamation"></i>请确认</span>`,
        text: `是否彻底删除？`,
        showCancelButton: true,
        confirmButtonColor: "#4187e5",
        confirmButtonText: "确定",
        ancelButtonColor: "#a0a0a0",
        cancelButtonText: "取消",
        closeOnConfirm: true,
        closeOnCancel: true,
        html: true
      }, (isConfirm) => {
        if (isConfirm) {
          this.option = 'all'
          this.deleteGraphList(1,id,this.graphicList.dataList.length,this.pagenow,this.pagesize)
        }
      });
    },
    showAdd(){
      this.getSourceList(1)
      this.$store.dispatch(TYPE.SET_SHOW_ADD_GAPHIC,true);
    }
  },
  ready(){
    myNiceScroll();

  },


}
</script>

<style scoped>

.right-wrap{
  font-family: "微软雅黑";
  font-size: 14px;
  color: #333;
}
.right-wrap{
  background-color: #fff;
  height: 90%;
  padding: 1px;
  margin-left: 9px;
  border-radius: 5px;
}
.left-circle{
  position: relative;
  float: left;
  left: -9px;
  top: 253px;
  display: block;
  width: 18px;
  height: 18px;
  z-index: 9;
  background-color: #fff;
  border-radius: 50%;
}
.topWrap{
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #d7d7d7;
}
.addBtn{
  position: absolute;
  top: 18px;
  display: inline-block;
  width: 112px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #4186e5;
  color: #fff;
  border-radius: 3px;
}
.addBtn:hover{
  background-color: #5998E2;
  cursor: pointer;
}
.searchBox{
  position: relative;
  top: 3px;
  float: right;
  left: -15px;
  color: #999999;
}
.searchBox input{
  padding-left: 10px;
  width: 218px;
  height: 30px;
}
.searchBox span{
  float: right;
  position: relative;
  display: inline-block;
  left: -25px;
  z-index:999;
}
.searchBox span i:hover{
  cursor: pointer;
}
.contentWrap{
  height: 90%;
  width: 100%;
  padding: 20px;
  overflow: auto;
}
.cardWrap{
  min-height: 690px;
}
.card{
  display: inline-block;
  margin-right: 20px;
  margin-bottom: 15px;
  width: 290px;
  height: 330px;
  background-color: #ebebeb;
  padding: 10px;
}

.cardTop .name{
  color: #333333;

  font-size: 14px;
}
.cardTop .time{
  color: #666666;
  margin-bottom: 6px;
  font-size: 12px;

}
.imgWrap {
     background-color: #fff;
     margin-bottom: 5px;

}
.imgWrap img{
  width: 270px;
  height: 245px;
}

.pageWrap div{
  margin-right: 20px;
  float: right;
}
.cardBottom .left{
  font-size: 10px;
  color: #999999;
}
.cardBottom .right{
  float: right;
  font-size: 10px;
  color: #999999;
}
.cardBottom .right i{
  margin-right: 10px;
}
.editor-color{
  color: #4d94dd;
}
.delete-color{
  color: #ff2626;
}
.right i:hover{
  cursor: pointer;
}


</style>
