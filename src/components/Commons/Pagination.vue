<template>
  <div class="page-bar">
    <ul>
      <li v-bind:class="isFirstPage">
        <a v-on:click="prePage()">上一页</a>
      </li>
      <li v-for="page in pages"  v-bind:class="{ active: pagenow == page.index}">
        <a v-on:click="jumpPage(page.index)">{{ page.index }}</a>
      </li>
      <li class="page-total">
        <a><input v-model="jumpToPage" v-on:keyup.enter="enterToPage()" />/{{pagenum}}页</a>
      </li>
      <li v-bind:class="isLastPage">
        <a v-on:click="nextPage()" >下一页</a>
      </li>
    </ul>
  </div>

</template>

<script>
import actions from '../../vuex/actions'
export default {

  props:['pagenow','pagesize','pagenum'],

  data() {
    return {
      jumpToPage:1, //输入要跳转的页数
    }
  },
  computed: {
    pages: function(){
      var left = 1;
      var right = this.pagenum;
      var pageArray = [];
      var i=1;
      while(i<=this.pagenum){
        pageArray.push({index:i});
        i++;
      }

      if(this.pagenum>7) {

        if(this.pagenow<=4){
          pageArray.splice(4,this.pagenum-5,{index:'...'});
        }

        if(this.pagenow>=4 && this.pagenow<= this.pagenum-3){
          pageArray.splice(1,this.pagenum-2,{index:'...'},{index:this.pagenow-1},{index:this.pagenow},{index: this.pagenow + 1},{index:'...'});
        }

        if(this.pagenow>= this.pagenum-2 && this.pagenow<= this.pagenum){
          pageArray.splice(1,this.pagenum-2,{index:'...'},{index:this.pagenum-3},{index:this.pagenum-2},{index:this.pagenum-1});
        }
      }

      if(this.pagenum<=7){
        pageArray.splice(0,7);
        var i=1;
        while(i<=this.pagenum){
          pageArray.push({index:i});
          i++;
        }
      }
      return pageArray;
    },

    isFirstPage:function() {
      if (this.pagenow == 1) {
        return 'disabled'
      }
      else {
        return 'active'
      }
    },

    isLastPage:function() {
      if (this.pagenow == this.pagenum) {
        return 'disabled'
      }
      else {
        return 'active'
      }
    },
  },
  watch:{
    pagenow:function(newVal,oldVal){
      this.jumpToPage = newVal;
    }
  },

  methods:{
    prePage(){
      if (this.pagenow >1) {
        this.pagenow--
      }
    },
    nextPage() {
      if (this.pagenow < this.pagenum) {
        this.pagenow++
      }
    },

    jumpPage:function(i) {
      if(i > 0 && i <= this.pagenum) {
        this.pagenow = i;
      }
    },

    enterToPage:function(){
      if(!isNaN(parseInt(this.jumpToPage)) && parseInt(this.jumpToPage)>=1 && parseInt(this.jumpToPage)<=this.pagenum){
        this.pagenow=parseInt(this.jumpToPage);
      }
      else{
        alert("页码错误");
      }
    },
  },
}


</script>

<style scoped>


.canClick{
  background-color: #5998E2;
  color:#FFFFFF;
}

.notClick{
  background-color: #E4E4E4;
  color:#999999;
}


ul,li{
  margin: 0px;
  padding: 0px;
}
.page-bar{
  max-width: 600px;
  right: 45px;

}
.page-bar li{
  list-style: none;
  display: inline-block;
}

.page-bar a{
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  margin-left: 8px;
  line-height: 1.42857143;
  cursor: pointer;
  font-size: 14px;
  font-family: "黑体";
  width: 33px;
  height: 33px;
  line-height: 33px;
  text-align: center;
}
.page-bar li:first-child a {
  width:73px;
  height: 33px;
}
.page-bar li:last-child a {
  width:73px;
  height: 33px;
}

.page-total a{
  width: 86px;
}
.page-total a input{
  width: 25px;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
  color: #333333;
  font-size: 14px;
}
.page-total a input:focus{

}
.page-bar a:hover{
  background-color: #eee;
}
.page-bar .active a{
  color: #ffffff;
  cursor: pointer;
  background-color: #5998E2;

}
.page-bar .disabled a{
  background-color: #E5E5E5;
  color:#999999;
  cursor: pointer;
}
.page-bar i{
  font-style:normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}

</style>
