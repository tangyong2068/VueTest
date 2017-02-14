<template>

  <div class="right-wrap">
    <span class = "left-circle"></span>

    <div class="topWrap">
      top
    </div>

    <div class="contentWrap">
      <div class="cardWrap">
          基本属性


      </div>
    </div>

  </div>


</template>

<script>

import actions from '../../vuex/actions'
import * as TYPE from '../../vuex/types.js'
import {formatDate} from '../../utils/checkAccess.js'
import pagination from '../Commons/Pagination.vue'

export default{
  components:{
    pagination
  },
  data(){
    return {

      pagenow:1,
      pagesize:8,
      pagenum:1,

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


</style>
