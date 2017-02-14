<template>

  <div class="right-wrap">
    <span class = "left-circle"></span>

    <div class="topWrap">
      <span class="addBtn" @click="showAdd()">
          <i  class="iconfont icon-add-inner"></i>
          <span>创建新项目</span>
      </span>
      <div class="searchBox">
        <input type="text" placeholder="请输入项目名称" v-model="projectname" v-on:keyup.enter="getProject()"/>
        <span>
          <i  class="iconfont icon-search" @click="getProject()"></i>
        </span>
      </div>
    </div>

    <div class="contentWrap">
      <div class="cardWrap">

        <div class="card" v-for = "item in projectList.dataList">
          <div class="cardTop">
            <div class="name">
              <span class="modify" @click="goModify(item)">编辑</span>
              <span class="del" @click="deleteProject(item.projectId)">删除</span>
            </diV>
          </div>
          <div class="imgWrap">
            <img  :src="item.url" />
            <span v-link="{path:'/manager/panel'}" @click="goManage(item)"></span>
          </div>
          <div class="cardBottom">
            <div>
              <span>项目名称&nbsp;:&nbsp;</span>
              <span>{{item.projectName}}</span>
            </div>
            <div>
              <span>创建人&ensp;&ensp;&nbsp;:&nbsp;</span>
              <span>122</span>
            </div>
            <div>
              <span>创建时间&nbsp;:&nbsp;</span>
              <span>{{item.addTime | formatDate}}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="pageWrap">
        <pagination :pagenow.sync="pagenow" :pagesize="pagesize" :pagenum="pagenum"></pagination>
      </div>

    </div>


  </div>
  <addproject :pagesize.sync="pagesize"></addproject>
  <modifyproject :pagesize.sync = "pagesize" :pagenow.sync="pagenow" :projetcid="projetcid"></modifyproject>
</template>

<script>

import actions from '../../vuex/actions'
import * as TYPE from '../../vuex/types.js'
import {formatDate} from '../../utils/checkAccess.js'
import { myNiceScroll } from '../../utils/customScroll.js'
import pagination from '../Commons/Pagination.vue'
import addproject from '../Commons/AddProject'
import modifyproject from '../Commons/ModifyProject'

export default{
  components:{
    pagination,
    addproject,
    modifyproject

  },
  data(){
    return {
      pagenow:1,
      pagesize:10,
      pagenum:1,
      projectname:'',
      projetcid:''
      // showinfo:false
    }
  },
  vuex:{
    getters:{
      projectList:({ project }) => project.projectList,
      // showAddInfo:({ panel }) => panel.showAddInfo
    },
    actions
  },
  route:{
    activate:function (){
      this.getProjectList('create',this.projectname,this.pagenow,this.pagesize)
    }
  },
  watch:{
    pagenow:function(newVal,oldVal){
      this.getProjectList('create',this.projectname,this.pagenow,this.pagesize)
    },
    projectList:function(newVal,oldVal){
      if(newVal.total == 0){
        this.pagenum = 1
      }
      else{
        this.pagenum = Math.ceil(newVal.total/this.pagesize);
      }

    },
  },
  methods:{
    goModify(obj){
      this.projetcid = obj.projectId
      this.getProjectById(obj.projectId)
    },
    goManage:function(obj){
      this.$store.dispatch(TYPE.SET_PRO_OBJ,obj);
    },
    getProject:function(){
      if(this.pagenow!=1){
        this.pagenow = 1
      }
      else{
        this.getProjectList('create',this.projectname,this.pagenow,this.pagesize)
      }
    },
    deleteProject:function(id){
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
          this.projectname = ""
          this.deleteProjectList('create',id,this.projectList.dataList.length,this.pagenow,this.pagesize)
        }
      });

    },
    showAdd(){
      this.$store.dispatch(TYPE.SET_SHOW_ADD_PRO_INFO,true);
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
  color: #666666;
  font-size: 14px;
}
.name{
  padding-left: 4px;
  padding-right: 4px;
}
.modify{
  /*color: #4d94dd;*/
}
.modify:hover{
  cursor: pointer;
}
.del{
  /*color: #ff2626;*/
  float: right;
}
.del:hover{
  cursor: pointer;
}
.imgWrap{
  background-color: #fff;
  width: 270px;
  height: 220px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.imgWrap img{
  width: 100%;
  height: 100%;
}
.imgWrap span{
  position: relative;
  top: -225px;
  display: block;
  width: 100%;
  height: 100%;
  /*border: 1px solid red;*/
}
.imgWrap span:hover{
  background-color: rgba(0,0,0,0.66);
  cursor: pointer;
}

.pageWrap div{
  margin-right: 20px;
  float: right;
}
.cardBottom {
  /*border: 1px solid red;*/
}
.cardBottom div{
  font-size: 12px;
  color: #666666;
  margin-bottom: 5px;
}


</style>
