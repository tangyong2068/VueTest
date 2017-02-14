<template>
  <div class="bgWrap"  v-show="showInfo">
    <div class="addWrap">

      <div class="top">
        添加项目
      </div>

      <div class="content">
        <div class="name">
          <span>项目名称&ensp;&ensp;&nbsp;:&nbsp;</span>
          <input type="text" placeholder="请输入项目名称" v-model = "projectName"/>
        </div>
        <div class="type">
          <span>项目参与人&nbsp;:&nbsp;</span>
          <div class="selectWrap">
            <div class="imgWrap" v-for="item in participantList">
              <img  :src="item.url"></img>
              <span title="{{item.username}}" @click="deleteParticipate(item.userId)">
                <i class="iconfont icon-close-single"></i>
              </span>
            </div>
            <i class="iconfont icon-add-inner" @click="initTree"></i>
          </div>
        </div>
        <div class="desc">
          <span>项目描述&ensp;&ensp;&nbsp;:&nbsp;</span>
          <textarea type="text" placeholder="请输入项目描述" v-model="projectDesc"></textarea>
        </div>
      </div>

      <div class="bottom">
        <div class="btnWrap">
          <span class="btn confirm" @click="addproject()">确定</span>
          <span class="btn exit" @click="hideAdd()">取消</span>
        </div>
      </div>

    </div>
  </div>
  <memtree :show.sync="showTree" ></memtree>
</template>

<script>

import actions from '../../vuex/actions'
import * as TYPE from '../../vuex/types.js'
import memtree from '../Commons/MemberTree.vue'

export default{
  props:['pagesize','showinfo'],
  components:{
    memtree
  },
  vuex:{
    getters:{
        showInfo:({project}) => project.showAddProInfo,
    },
    actions
  },
  data(){
    return {
      projectName:'',
      projectDesc:'',
      showTree:false,
      participantList:[]
    }
  },
  methods:{
    hideAdd:function(){
      this.$store.dispatch(TYPE.SET_SHOW_ADD_PRO_INFO,false);
    },
    addproject(){
      this.addProjectList(this.participantList,this.projectName,this.projectDesc,this.$route.path,this.pagesize)
    },
    initTree:function(id){
      this.showTree=true
      // this.articlenumber=id
      this.initDepTree()
      this.initGroupTree()
    },
  },
  events:{
    'participantList':function(list){
      for (var i = 0; i < list.length; i++) {
        if(judgeMember(list[i],this.participantList)){
          this.participantList.push(list[i])
        }
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
    height: 300px;
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
    height: 221px;
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
  .selectWrap{
    float: right;
    position: relative;
    left: -77px;
    top: -7px;
    height: 46px;
    overflow: auto;
    width: 316px;
    border:1px solid #a9a9a9;
    padding:3px;
  }
  .selectWrap .imgWrap{
    position: relative;
    width: 30px;
    height: 30px;
    display: inline-block;
    margin: 3px;
    border-radius: 50%;
  }
  .imgWrap img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .imgWrap span {
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #dedede;
    line-height: 40px;
    text-align: center;
  }
  .imgWrap:hover span{
    display: inline-block;
  }
  .imgWrap span i{
    font-size: 15px;
    color: #fff;
  }
  .selectWrap i{
    font-size: 28px;
    position: relative;
    top:-6px;
    color: #4187e6;
  }
  .selectWrap i:hover{
    cursor: pointer;
  }
  .name input{
    width: 318px;
    padding-left: 10px;
    color: #666666;

  }
  .desc{
    /*border: 1px solid  red;*/
    margin-top: 20px;
  }
  .desc textarea{
    /*border: 1px solid  red;*/
    position: relative;
    float: right;
    top: -26px;
    left: -77px;
    width: 316px;
  }
  /*.desc1{
    position: relative;
    top: -40px;
  }
  .desc1 span{
    float: left;
  }*/
  /*.desc textarea{
    position: relative;
    float: left;
    display: inline-block;
    top: -20px;
    left: 86px;
    width: 318px;
    height: 80px;
    padding-left: 10px;
    color: #666666;
    font-size: 14px;
  }
  .desc span{
    float: left;
    color: #333333;
  }*/
  /*.desc1 textarea{
    position: relative;
    float: left;
    display: inline-block;
    left: 4px;
    width: 318px;
    height: 80px;
    padding-left: 10px;
    color: #666666;
    font-size: 14px;
  }*/
</style>
