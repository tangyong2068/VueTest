<template>

  <div class="right-wrap">
    <span class = "left-circle"></span>

    <div class="topWrap">
      <span class="addBtn" @click="showAdd()">
        <i  class="iconfont icon-add-inner"></i>
        <span>新建数据源</span>
      </span>

    </div>

    <div class="contentWrap">
      <div class="cardWrap">

        <table>
          <table>
            <thead class="table-title">
              <th >名称</th>
              <th >链接</th>
              <th >数据库名称</th>
              <th >数据库类型</th>
              <th >操作</th>
            </thead>
            <tbody>
              <tr v-for="item in dataSourceList.dataList" >
                <td class="bcolor" id="englishname" >{{item.sourceName}}</td>
                <td class="bcolor" id="chinaname" >{{item.ip}}</td>
                <td>{{item.name}}</td>
                <td>{{item.type}}</td>
                <td >
                  <span class="config" @click="toEdit(item.id)"><i class="iconfont icon-survey"></i><span >编辑</span></span>
                    <span class="config" @click="deleteDataSource(item.sourceId)"><i class="iconfont icon-delete"></i><span>删除</span></span>
                </td>

              </tr>
            </tbody>
          </table>

        </div>

        <div class="pageWrap">
          <pagination :pagenow.sync="pagenow" :pagesize="pagesize" :pagenum="pagenum"></pagination>
        </div>

    </div>

  </div>

  <adddatasource :showaddinfo.sync="showaddinfo" :pagesize.sync="pagesize"></adddatasource>
</template>

<script>

import actions from '../../vuex/actions'
import * as TYPE from '../../vuex/types.js'
import {formatDate} from '../../utils/checkAccess.js'
import pagination from '../Commons/Pagination.vue'
import adddatasource from './AddDataSource'
export default{
  components:{
    pagination,
    adddatasource
  },
  data(){
    return {
      pagenow:1,
      pagesize:10,
      pagenum:1,
      showaddinfo:false
    }
  },
  vuex:{
    getters:{
      proObj:({ project }) => project.proObj,
      dataSourceList:({ dataSource }) => dataSource.dataSourceList
    },
    actions
  },
  route:{
    activate:function (){
      this.getDataSourceList(this.proObj.projectId,this.pagenow,this.pagesize)
    }
  },
  watch:{
    pagenow:function(newVal,oldVal){
      this.getDataSourceList(this.proObj.projectId,this.pagenow,this.pagesize)
    },
    dataSourceList:function(newVal,oldVal){
      if(newVal.total == 0){
        this.pagenum = 1
      }
      else{
        this.pagenum = Math.ceil(newVal.total/this.pagesize);
      }
    },
  },
  methods:{
    deleteDataSource:function(id){
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
          this.deleteDataSourceList(1,id,this.dataSourceList.dataList.length,this.pagenow,this.pagesize)
        }
      });
    },
    showAdd(){

      this.showaddinfo=true
    }
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

.contentWrap{
  height: 90%;
  width: 100%;
  padding: 20px;
  overflow: auto;
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

.cardWrap table{
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  max-height: 718px;
  border-collapse: collapse;
  overflow: auto;
}
.table-title th {
  background-color: #e0e6ef;
  color: #000302;
  font-size: 13px;
  height: 41px;
}
.cardWrap table tr{
  border-bottom: 1px solid #ebebeb;
}
.cardWrap table{
  border-bottom: 1px solid #ebebeb;
}
.cardWrap table tr:hover{
  background-color: #f6f6f7;
}

.cardWrap table td{
  height: 51px;
  text-align: center;
  color: #666666;
  font-size: 13px;
  border-bottom: 1px solid #ebebeb;
}
.ishover:hover{
  color:#66adf6;
  cursor: pointer;
}
.table-wrap table{
  border-bottom: 1px solid #ebebeb;
}
.config{
  /*border: 1px solid red;*/
  margin-left: 20px;
}
.config:hover {
  cursor: pointer;
}
.config:hover span{
  color :#66adf6;
}

.config i{
  font-size: 15px;
  margin-right: 3px;
}
.config .icon-survey {
  color:#d96008;
}
.config .icon-delete {
  color:#ef6753;
}
.config span{
  font-size: 13px;
}
.cardWrap{
  min-height: 667px;
}
.pageWrap div{
  margin-right: 20px;
  float: right;
}



</style>
