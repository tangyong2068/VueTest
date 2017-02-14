<template>
  <div class="modal-mask"  transition="modal" v-show="show">
    <div class="modal-wrapper">
      <div class="modal-container font-13">
        <div class="mt-wrapper" @click="listStatus = false">
          <button class="btn-close"  @click="closeTree()">
            <i class="iconfont icon-close-single"></i>
          </button>
          <div class="mt-search">
            <span>人员查找：</span>
            <input type="text" placeholder="输入人员姓名 回车确认" v-model="searchName" @keyup.enter="searchUser(searchName)" />
          </div>
          <div class="search-list" v-show="listStatus">
            <div class="list-wrap">
              <ul v-if="searchUsers != ''">
                <li v-for="user in searchUsers" track-by="$index" @click="addToContainer(user.userid,user.url,user.username)">
                  <img class="border-radius-circle" v-bind:src="user.url"/>
                  <span>{{user.username}}</span>
                </li>
              </ul>
              <ul v-else>
                <li class="user-empty"><i class="iconfont icon-empty" style="font-size:25px; margin-right:10px;"></i>没有找到...</li>
              </ul>
            </div>
          </div>
          <div class="mt-tree mt-comm  border-radius-8">
            <div class="mt-btn br-top-8">
              <span id="btn-dep-active" @click="openDep" v-bind:class="{'active':showDep}">部门</span>
              <span id="btn-group-active" @click="openGroup" v-bind:class="{'active':showGroup}">小组</span>
            </div>
            <div class="mt-deptree" v-show="showDep">
              <ul class="mt-list">
                <item :models="treeData" :list.sync="wrapContainer">
                </item>
              </ul>
            </div>
            <div class="mt-deptree" v-show="showGroup">
              <span class="mt-company">
                <i class="iconfont icon-running"></i>
                <!-- <i class="iconfont icon-triangle-down"></i> -->
                全部小组
              </span>
              <ul class="mt-list">
                <groupitem class="item" :models="groupTreeList" :list.sync="wrapContainer">
                </groupitem>
              </ul>
            </div>
          </div>
          <div class="middel-icon"><i class="iconfont icon-arrow-right-border"></i></div>
          <div class="mt-choosed mt-comm border-radius-8">
            <ul>
              <li v-for="p in chooseContainer" @click="toggleActive(this)" :class="{'active':choosed}">
                <img class="border-radius-circle" v-bind:src="p.url"/>
                <span class="choosed-name">{{p.username}}</span>
                <i class="iconfont icon-close-single" @click="removeItem($index)"></i>
              </li>
            </ul>
          </div>
          <div class="mt-add-btn">
            <div @click="addList()" class="btn-add">
              <span class="btn-text">确认添加</span>
              <span class="btn-point"></span>
              <i class="iconfont icon-right-angle"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import item from './TreeView.vue'
import actions from '../../vuex/actions'
import groupitem from './GroupTree.vue'
import * as TYPE from '../../vuex/types.js'
import { myNiceScroll } from '../../utils/customScroll.js'
export default {
  components:{
    item,
    groupitem
  },
  props: ['show','share','parti'],
  vuex:{
    getters:{
      treeData:({department}) => department.depList,
      groupTreeList:({department}) => department.groupList,
      searchUsers:({department}) => department.searchList,
      CommonList:({department}) => department.CommonList,
    },

    actions:actions
  },
  data() {
    return {
      choosed:false,
      chooseContainer:[],
      showDep:true,
      showGroup:false,
      searchName:'',
      listStatus:false,
    }
  },
  ready() {
    myNiceScroll()
  },
  computed:{
    wrapContainer:function(){
      return this.CommonList
    }
  },
  events:{
    'addChooseList': function(items) {
      this.chooseContainer = items;
    },
    'approve':function(projectid) {
      this.isApprove = true;
      this.approve_projectid = projectid;
    }
  },
  watch:{
    'show':function(){
      if(this.show){
          this.$broadcast('clearContainer')
      }
    }
  },
  methods:{
    toggleActive: function(person) {
      // remove active from all people
      this.people.forEach(function(person){
        person.$set('choosed',false);
      });
      //set active to clicked person
      person.$set('choosed',true);
    },
    removeItem(index) {
      this.chooseContainer.splice(index,1)
    },
    addList() {
      this.$dispatch('participantList',this.chooseContainer)
      this.show = false
    },
    closeTree(key){
      this.show=false;
    },
    openDep() {
      this.showDep = true
      this.showGroup = false
    },
    openGroup() {
      this.showDep = false
      this.showGroup = true
    },
    searchUser(name){
      this.listStatus = true
      this.getUserListByName(name)
      this.searchName = ''
    },
    addToContainer(id,url,name) {
      var canAdd = true
      if (this.chooseContainer.length > 0) {
        for (var i = 0; i < this.chooseContainer.length; i++) {
          if (this.chooseContainer[i].userid == id) {
            this.customAlertInfo("请不要重复添加!",1,true)
            canAdd = false
            break;
          }
        }
      }
      if (canAdd) {
        this.chooseContainer.push({
          userid:id,
          url:url,
          username:name
        })
      }
    }
  }
}
</script>

<style scoped>

.btn-close {
  width: 30px;
  height: 30px;
  position: relative;
  top: -15px;
  margin-left: 700px;
  padding: 0;
  border: 5px solid #fff;
  border-radius: 50%;
}

.btn-close i {
  width: 20px;
  height: 20px;
  position: relative;
  color: #fff;
  display: inline-block;
  font-size: 15px;
  background-color: #a6a6a6;
  border-radius: 50%;
  line-height: 20px;
}

.btn-close i:hover{
  cursor:pointer;
  background-color: #5b95e3;
}

.btn-add {
  border-radius: 5px;
  border: 1px solid;
  width: 120px;
  height: 35px;
  line-height: 35px;
  text-align: left;
  background-color: #4289E3;
  color: #fff;
  position: relative;
  left: 570px;
  top: 8px;
}

.btn-add:hover {
  cursor:pointer;
}

.btn-text {
  font-size: 14px;
  margin-left: 12px;
}

.btn-point {
  height: 10px;
  width: 10px;
  position: absolute;
  background-color: #1261C0;
  border-radius: 50%;
  left: 77px;
  top: 12px;
}

.btn-add i {
  display: inline-block;
  float: right;
  color: #fff;
  padding: 0 8px;
  background-color: #1261C0;
  height: 33px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

.middel-icon {
  display: inline-block;
}

.middel-icon i {
  display: inline-block;
  color: #3f8ae2;
  font-size: 20px;
  position: relative;
  top: 50%;
  margin-top: -20px;
}

.item-dep {
  margin-top: 20px;
  margin-left: -15px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  overflow: hidden;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  color:#5A5A5A;
}

@media screen and  (max-height:768px) {
  .modal-container {
    height: 600px;
  }

  .mt-comm {
    height: 435px;

  }

  .mt-deptree{
    overflow: scroll;
    height: 385px;
  }
}

@media screen and  (min-height:769px) {
  .modal-container {
    height: 725px;
  }

  .mt-comm {
    height: 560px;
  }

  .middel-icon {
    height: 560px;
  }

  .mt-deptree{
    overflow: scroll;
    height: 510px;
  }
}

.mt-deptree {
  font-size: 13px;
}

.add-btn-float{
  float: right;
}

.search-list {
  position: relative;

}

.list-wrap {
  position: absolute;
  border: 1px #C6CBD2 solid;
  width: 200px;
  height: 160px;
  overflow-y: scroll;
  left: 70px;
  background-color: #fff;
  z-index: 1099;
}

.list-wrap ul {
  margin: 0;
  padding: 0;
}

.list-wrap li {
  /*display: block;
  height: 30px;
  line-height: 30px;*/
  padding: 3px;
  margin-top: 2px;
}

.list-wrap li:hover{
  background-color: #EEEEEE;
}

.list-wrap li img {
  vertical-align: middle;
  height: 30px;
  width: 30px;
  margin-right: 10px;
  margin-left: 5px;
}

.user-empty {
  text-align: center;
}

.mt-wrapper {
  height: 100%;
  width: 100%;
  padding: 0 30px;
  position: relative;

}
.mt-search{
  float: left;
  width: 100%;
  height: 27px;
}
.mt-search span{
  font-size: 15px;
}
.mt-search input {
  width: 265px;
  height: 25px;
  line-height: 25px;
  border: none;
  border-bottom: 1px #C6CBD2 solid;
  padding: 0 10px;
  font-size: 13px;
}

.mt-search input:focus {
  border: 1px #4187e5 solid;
  outline: none;
  border-top: none;
  border-left: 10px;
  border-right: 10px;
}

.mt-search img {
  float: right;
  vertical-align: middle;
  cursor: pointer;
}


.mt-comm {
  width:330px;
  border: 1px #C6CBD2 solid;
  display: inline-block;
  margin-top: 20px;
}

.mt-tree .mt-btn {
  display: flex;
  background-color: #EEF1F4;
  text-align: center;
  border-bottom:1px #C1C7CF solid;
}
.mt-tree .mt-btn span {
  display: inline-block;
  height: 45px;
  line-height: 45px;
  flex:1;
}

#btn-dep-active.active {
  background-color: #189EFF;
  color:#fff;
  border-top-left-radius: 8px;
}

#btn-group-active.active {
  background-color: #189EFF;
  color:#fff;
  border-top-right-radius: 8px;
}

.mt-btn span:first-child {
  border-right:1px #C1C7CF solid;
}

.mt-choosed {
  float: right;
  overflow-y: scroll;
  font-size: 13px;
  display:inline-block;
}

.mt-choosed:hover {
  border: 1px solid #3F88E4;
}

.mt-choosed ul {
  margin: 20px 0;
  padding: 0;
}

.mt-choosed li {
  height: 30px;
  line-height: 30px;
  display: block;
  padding: 0 20px;
}

.mt-choosed li.active {
  background-color: #F2F4F5;
}

.mt-choosed li:hover{
  background-color: #F2F4F5;
}

.mt-choosed li img {
  height: 25px;
  width: 25px;
  vertical-align:middle;
}

.mt-choosed li span {
  padding-left: 10px;
}

.mt-choosed li i {
  cursor: pointer;
  display: inline-block;
  float: right;
  font-size: 15px;
  color: #F15050;
}

.mt-add-btn{
  width: 100%;
  height: 50px;
  position: absolute;
  bottom: 0;
  left: 0px;
  background-color: #f3f2f2;
}

.modal-container {
  width: 750px!important;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family:"Microsoft YaHei",Helvetica, Arial, sans-serif;
}

.modal-enter, .modal-leave {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
