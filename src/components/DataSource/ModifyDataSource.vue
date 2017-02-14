<template>
  <div class="bgWrap"  v-show="showaddinfo">
    <div class="addWrap">
      <span class="closeBtn" @click="close()">
          <i class="iconfont icon-close-single"></i>
      </span>
      <div class="top">
        新建数据源
      </div>

      <!-- step1 -->
      <div class="content" v-if="step == 1">
        <div class="card1">
          <div>
            <span class="selectTitle">数据库类型</span>

            <span class="selectWrap" @click="selctType('mysql')">
              <i class="iconfont icon-circle-checked checked"  v-if = "type == 'mysql'"></i>
              <i class="iconfont icon-circle-unchecked unchecked" v-else></i>
              <span>MySql</span>
            </span>
            <span class="selectWrap" @click="selctType('hive')">
              <i class="iconfont icon-circle-checked checked" v-if = "type=='hive'"></i>
              <i class="iconfont icon-circle-unchecked unchecked" v-else></i>
              <span>Hive</span>
            </span>
            <span class="selectWrap" @click="selctType('impala')">
              <i class="iconfont icon-circle-checked checked" v-if = "type=='impala'"></i>
              <i class="iconfont icon-circle-unchecked unchecked" v-else></i>
              <span>Impala</span>
            </span>
          </div>

          <div>
            <span class="selectTitle">文本类型&ensp;&ensp;</span>

            <span class="selectWrap" @click="selctType('excel')">
              <i class="iconfont icon-circle-checked checked" v-if = "type == 'excel'"></i>
              <i class="iconfont icon-circle-unchecked unchecked" v-else></i>
              <span>Excel</span>
            </span>
            <span class="selectWrap" @click="selctType('txt')">
              <i class="iconfont icon-circle-checked checked" v-if = "type == 'txt'"></i>
              <i class="iconfont icon-circle-unchecked unchecked" v-else></i>
              <span>TXT</span>
            </span>
            <span class="selectWrap" @click="selctType('csv')">
              <i class="iconfont icon-circle-checked checked" v-if = "type == 'csv'"></i>
              <i class="iconfont icon-circle-unchecked unchecked" v-else></i>
              <span>CSV</span>
            </span>
          </div>

          <div>
            <span class="selectTitle">API类型&ensp;&ensp;&ensp;</span>

            <span class="selectWrap" @click="selctType('baidu')">
              <i class="iconfont icon-circle-checked checked" v-if = "type == 'baidu'"></i>
              <i class="iconfont icon-circle-unchecked unchecked" v-else></i>
              <span>百度</span>
            </span>
            <span class="selectWrap" @click="selctType('juhe')">
              <i class="iconfont icon-circle-checked checked" v-if = "type == 'juhe'"></i>
              <i class="iconfont icon-circle-unchecked unchecked" v-else></i>
              <span>聚合数据</span>
            </span>
            <span class="selectWrap" @click="selctType('jindong')">
              <i class="iconfont icon-circle-checked checked" v-if = "type == 'jindong'"></i>
              <i class="iconfont icon-circle-unchecked unchecked" v-else></i>
              <span>京东云</span>
            </span>
          </div>
        </div>

      </div>
      <!-- step1 -->

      <!-- step2 -->
      <div class="content" v-if="step==2">
        <div class="card2">
          <div>
            <span>数据源名称&ensp;&ensp;&ensp;:&ensp;</span>
            <input type="text" placeholder="请输入数据源名称" v-model="sourceName"/>
          </div>
          <div>
            <span>主机名或IP&ensp;&ensp;&ensp;:&ensp;</span>
            <input type="text" placeholder="请输入主机名或IP" v-model="ip"/>
          </div>
          <div>
            <span>数据库端口&ensp;&ensp;&ensp;:&ensp;</span>
            <input type="text" placeholder="请输入数据库端口" v-model="port"/>
          </div>
          <div>
            <span>数据库用户名&ensp;:&ensp;</span>
            <input type="text" placeholder="请输入数据库用户名" v-model="userName"/>
          </div>
          <div>
            <span>用户名密码&ensp;&ensp;&ensp;:&ensp;</span>
            <input type="text" placeholder="请输入用户名密码" v-model="password"/>
          </div>
          <div>
            <span>数据库名&ensp;&ensp;&ensp;&ensp;&ensp;:&ensp;</span>
            <input type="text" placeholder="请输入数据库名" v-model="name"/>
          </div>

        </div>
      </div>
      <!-- step2 -->

      <!-- step3 -->
      <div class="content3" v-if="step==3">
        <div class="card3">
          <div >
            <div class="searchBox">
              <input type="text" placeholder="请输入项目名称" v-model="searchmsg" v-on:keyup.enter="searchVerifyList()"/>
              <span>
                <i  class="iconfont icon-search" @click="searchVerifyList()"></i>
              </span>
            </div>
            <div class="btnAll" @click="selectAll()">
              <span>全选</span>
              <i class="iconfont icon-right-angle"></i>
            </div>
          </div>
          <div class="line"></div>
          <div class="checkBoxWrap">
            <span class="checkBtn" v-for="item in checkList" >
              <span class="icon" @click="selectCheckList(item)">
                  <i class="iconfont icon-right-angle" v-show="item.isSlelect"></i>
              </span>
              <span class="desc">{{item.tableName}}</span>
            </span>
          </div>
        </div>
      </div>
      <!--  step3-->
      <div class="bottom">
        <div class="btnWrap">
          <span class="btn exit" @click="preStep()" v-if="step==2 ||step==3">上一步</span>
          <span class="btn confirm" @click="nextStep()" v-if="step==1 || step==2">下一步</span>
          <span class="btn confirm" @click="save()" v-if="step==3">保存</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>

import actions from '../../vuex/actions'
import * as TYPE from '../../vuex/types.js'
import memtree from '../Commons/MemberTree.vue'
import { customAlertInfo } from '../../vuex/actions/alertInfo.js'

export default{
  props:['showaddinfo','pagesize'],
  components:{
    memtree
  },
  vuex:{
    getters:{
      addStepTag:({ dataSource }) => dataSource.addStepTag,
      verifyList:({ dataSource }) => dataSource.verifyList

    },
    actions
  },
  data(){
    return {
      projectName:'',
      projectDesc:'',
      showTree:false,
      participantList:[],
      // sqlType:'mysql',
      // txtType:'excel',
      // apiType:'baidu',
      searchmsg:'',
      type:'mysql',
      step:1,
      sourceName:'',
      ip:'127.0.0.1',
      port:'3306',
      userName:'root',
      password:'root',
      name:'big_data',
      tableName:[],
      checkList:[]
    }
  },
  methods:{
    selectAll(){
      for (var i = 0; i < this.checkList.length; i++) {
        this.checkList[i].isSlelect = true
      }
    },
    searchVerifyList(){
      this.$store.dispatch(TYPE.SET_VERIFY_LIST,this.searchmsg);
    },
    selectCheckList(item){
      if(item.isSlelect){
        item.isSlelect = false
      }
      else{
        item.isSlelect = true
      }
    },
    close(){
      this.showaddinfo = false
    },
    nextStep(){
      if(this.step == 1){

          this.step+=1
      }
      else if (this.step==2) {
        if(this.sourceName &&this.ip &&this.port &&this.userName &&this.password &&this.name){
          this.getVerifyList(this.sourceName,this.ip,this.port,this.userName,this.password,this.name,this.type)
        }
        else{
          swal({
            title: `<span><i class="iconfont icon-exclamation"></i>请确认</span>`,
            text: `请完善信息！`,
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

            }
          });
        }
      }

    },
    preStep(){
      this.step-=1
    },
    save(){
      this.addDataSourceList(this.sourceName,this.ip,this.port,this.userName,this.password,this.name,this.type,this.checkList,this.pagesize)
      this.showaddinfo = false;
    },
    selctType(type){
      this.type = type;
    }
  },
  computed:{
    checkList:function(){
      return this.verifyList
    }
  },
  watch:{
    showaddinfo:function(newVal,oldVal){
      if(newVal){
        this.type='mysql'
        this.step=1
        this.sourceName=''
        this.ip='127.0.0.1'
        this.port='3306'
        this.userName='root'
        this.password='root'
        this.name='big_data'
        this.tableName =[]
      }
    },
    addStepTag:function(newVal,oldVal){
      if(this.step == '2'){
          this.step+=1
      }

    }
  }


}
//去重并添加参与人
function judgeMember (item,list){
  for (var i = 0; i < list.length; i++) {
    if(list[i].userid &&  list[i].userid == item.userid){
      return false
    }
  }
  return true
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
    margin-bottom: 30px;
  }
  .card1{
    width: 560px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;

  }

  .selectTitle{
    display: block;
    margin-bottom: 15px;
    border-bottom: 1px solid #d7d7d7;
    padding-bottom: 7px;
  }
  .card1 .selectWrap{
    margin-left: 20px;
    font-size: 13px;
    display: inline-block;
    width: 100px;

  }
  .selectWrap:hover{
    cursor: pointer;
  }
  .card1 .selectWrap i{
    margin-right: 3px;
    font-size: 13px;
  }
  .selectWrap .unchecked{
    color: #999999;
  }
  .selectWrap .checked{
    color: #4187e5;
  }
  .card2{
    margin-left: auto;
    margin-right: auto;
    margin-top: 35px;
    width: 455px;
    color: #666666;
  }
  .card2 input{
    width: 318px;
    padding-left: 10px;
    color: #666666;
  }
  .content3{
    min-height: 240px;
  }
  .card3{
    width: 560px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    /*border: 1px solid red;*/
  }
  .card3 .top{
    border:1px solid red;
    padding-bottom: 5px;
  }
  .searchBox{
    position: relative;
    top: 3px;
    display: inline-block;
    color: #999999;
  }
  .searchBox input{
    padding-left: 10px;
    width: 218px;
    height: 30px;
  }
  .searchBox span{
    /*float: right;*/
    position: relative;
    display: inline-block;
    left: -25px;
    z-index:999;
  }
  .searchBox span i:hover{
    cursor: pointer;
  }
  .btnAll{
    display: inline-block;
    width: 70px ;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #4187e4;
    color: #fff;
    border-radius: 3px;
    position: relative;
    top: 4px;
    /*border: 1px solid red;*/
  }
  .btnAll:hover{
    background-color: #2269c4;
    cursor: pointer;
  }
  .btnAll i{
    font-size: 14px;
  }
  .line{
    margin-top: 10px;
    border-bottom: 1px solid #d7d7d7;
  }
  .checkBoxWrap{
    margin-top: 15px;
    margin-bottom: 30px;
  }
  .checkBtn{
    display: inline-block;
    min-width: 255px;
    margin-bottom: 20px;
  }
  .checkBoxWrap{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .checkBtn .icon{
    background-color: #ffffff;
    border: 1px solid #a9a9a9;
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 7px;
    line-height: 16px;
  }
  .checkBtn:hover{
    cursor: pointer;
  }
  .checkBtn .icon i{

    color: #4187e4;
    font-size: 16px;
  }
  .closeBtn{
    background-color: #fafafa;
    display: block;
    float: right;
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    position: relative;
    top: -8px;
    left: 10px;
    color:#4187e5;
  }
  .closeBtn:hover{
    cursor: pointer;
  }
</style>
