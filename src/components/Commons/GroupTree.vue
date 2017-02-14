<template>
  <div>
    <li v-for="model in models">
      <div @click="renderUsers(model.teamid)" class="userMountPoint" isopen="false">
        <i v-bind:class="['iconfont', model.teamid == currentId && open ? 'icon-arrow-down' : 'icon-arrow-right']"></i>{{model.teamname}}
      </div>
      <ul v-show="model.teamid == currentId && open" v-if="isFolder">
        <item :models="model.children" class="in">
        </item>
        <li v-for="user in users" class="users" @click="addChooseList($index)">
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
  props: {
    models:Array,
    list:Array,
  },
  vuex:{
    actions,
    getters:{
      users:({department}) => department.groupUserList
    }
  },
  data: function () {
    return {
      open: true,
      choosedList:this.list,
      currentIndex:0,
    }
  },
  computed: {
    isFolder: function () {
      return this.models &&
      this.models.length
    },
    currentId:function(){
      return this.currentIndex
    }
  },
  events:{
    'clearContainer':function() {
      this.choosedList.splice(0,this.choosedList.length);
      this.list = []
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    addChooseList: function(index) {
      var canAdd = true;
      //选择人时  同步部门和小组中选择的人的数组
      this.choosedList = this.list;
      let currentUser = this.users[index].userid
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
    renderUsers: function(groupid) {
      if(!this.open){
        this.open = true;
      }
      else {
        if(this.currentIndex == groupid){
          this.toggle()
        }
      }
      this.currentIndex = groupid
      if (groupid) {
        this.getGroupUser(groupid);
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
