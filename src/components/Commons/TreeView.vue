<template id="item-template" >
  <div>
    <li>
      <div @click="renderUsers(models.departmentid)" class="userMountPoint" isopen="false">
        <i v-bind:class="['iconfont',open ? 'icon-arrow-down' : 'icon-arrow-right']"></i><i v-show="models.departmentid == 'company'" class="iconfont icon-folder-open"></i>{{models.departmentname}}
      </div>
      <ul v-show="open" v-if="isFolder">
        <item v-for="models in models.children" :models="models" :list.sync="list" class="in">
        </item>
        <li v-for="user in users" class="users" @click="addChooseList($index)" v-show="user.departmentid == models.departmentid">
          <img v-if="!user.url || user.url == '/avator.png'" class="border-radius-circle" src="../../assets/img/avator.png"/>
          <img v-else class="border-radius-circle" v-bind:src="user.url"/>
          <span class="choosed-name">{{user.username}}</span>
        </li>
      </ul>
    </li>
  </div>

</template>
<script>
import item from './TreeView.vue'
import actions from '../../vuex/actions'

export default {
  name:'item',
  components: {
    item
  },
  props:['models','list'],
  vuex:{
    actions,
    getters:{
      users:({department}) => department.userList
    }
  },
  data: function () {
    return {
      open: false,
      choosedList:this.list,
      currentIndex:0,
    }
  },
  events:{
    'clearContainer':function() {
      this.choosedList.splice(0,this.choosedList.length);
      this.list = []

    }
  },
  computed: {
    isFolder: function () {
      return (this.models.children &&
        this.models.children.length) || (this.models.departmentname)
      },
      currentId:function(){
        return this.currentIndex
      },

    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          this.open = !this.open
        }
      },
      addChooseList: function(index) {
        //选择人时  同步部门和小组中选择的人的数组
        this.choosedList = this.list;
        var canAdd = true
        let currentUser = this.users[index].userid
        if (this.choosedList.length > 0) {
          for (var i = 0; i < this.choosedList.length; i++) {
            if (currentUser === this.choosedList[i].userid) {
              this.customAlertInfo('请不要重复添加！',1,true)
              // swal({
              //   title: "",
              //   type:'warning',
              //   text: "请不要重复添加!",
              //   timer: 1500,
              //   showConfirmButton: false
              // });
              canAdd = false
              break;
            }
          }
        }
        if (canAdd) {
          this.choosedList.push({
            userid:this.users[index].userid,
            url:this.users[index].url,
            username:this.users[index].username
          });

          this.$dispatch('addChooseList',this.choosedList)
        }
      },
      renderUsers: function(departmentid) {
        // if(!this.open){
        //   this.open = true;
        // }
        // else {
        //   if(this.currentIndex == departmentid){
        //     this.toggle(departmentid)
        //   }
        // }
        this.toggle()
        this.currentIndex = departmentid
        if (departmentid) {
          this.getDepUser(departmentid);
        }
      },
      addChild: function (index) {
        if (this.users) {
          for (var user in this.users) {
            this.models[index].children.push({
              departmentname: user.name,
              img: user.url,
            })
          }
        }
      },
    },
  }
  </script>

  <style scoped>
  .active {
    background-color: #f3f2f2;
  }
  .btn-addPerson {
    float: right;
  }

  .users img {
    height: 25px;
    width: 25px;
    vertical-align:middle;
  }

  .btn-addPerson {
    padding-right: 5px;
  }
  </style>
