<template>
	<div class="manuscript-container" v-show="showCompany">
		<div class="manuscript-tanchu">
			<!-- <div class="btnContainer">
			<button class="btn-close" @click="closeTip()">
			<i class="iconfont icon-close-single"></i>
		</button>
	</div> -->
	<div class="manuscript-tanchu-top">
		<div class="manuscript-top-title">
			请填写您的公司相关信息
		</div>
	</div>

	<div class="manuscript-top-main">
		<div class="info-input" style="margin-top:5px;">
			<i class="iconfont icon-company" style="color:#666;"></i>
			<span>公司名称：</span>
			<input type="text" v-model="companyName" placeholder="名称必填...">
		</div>
		<div class="info-input">
			<i class="iconfont icon-xiugainicheng" style="color:#145DC3;"></i>
			<span>公司地址：</span>
			<input type="text" v-model="companyAddress">
		</div>
		<div class="info-input">
			<i class="iconfont icon-biaodan" style="color:#6d4694;"></i>
			<span>公司描述：</span>
			<textarea rows="3" placeholder="描述..." v-model="companyDescri"></textarea>
		</div>
	</div>

<div id="companyErrorTip">
	<i class="iconfont icon-warn-circle" style="position:relative;top:2px;"></i>
	公司名称不能为空！
</div>

	<div class="manuscript-tanchu-bottom">
		<div class="commit-button" @click="submit()">
			<div class="commit-button-left">确认添加</div>
			<div class="commit-button-right"><i class="iconfont icon-right-angle"></i></div>
			<div class="commit-button-radius"></div>
		</div>
	</div>

</div>


</div>

<alertinfo></alertinfo>
</template>

<script>
import $ from 'jquery'
import * as actions from '../../vuex/actions.js'
import alertinfo from './AlertInfo.vue'

export default {
	// props: ['show'],
	vuex:{
		getters:{
			showCompany:({app}) => app.showCom
		},
		actions:actions
	},
	components: {
		alertinfo
	},
	data(){
		return{
			companyName:'',
			companyAddress:'',
			companyDescri:''
		}
	},
	methods:{
		closeTip:function () {
			this.show = false;
		},
		submit:function(){
			if (this.companyName == '') {
				$("#companyErrorTip").css('display', 'block');
			}else {
				$("#companyErrorTip").css('display', 'none');
				this.saveCompany(this.companyName,this.companyAddress,this.companyDescri);
			}
		}
	},

}

</script>

<style scoped>
#companyErrorTip{
	color:red;
	font-family:"微软雅黑";
	font-size:14px;
	margin-left: 50px;
	display: none;
}
.manuscript-container{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0px;
	left: 0px;
	background-color: rgba(0,0,0,0.5);
	font-size: 14px;
	z-index: 1000;
}
.manuscript-tanchu{
	width: 650px;
	max-height: 391px;
	position: relative;
	top: 20%;
	left: 50%;
	margin-left: -325px;
	background-color: #FFFFFF;
	border-radius: 5px;
}
.manuscript-tanchu-top{
	display: inline-block;
	width: 100%;
	height: 70px;
	margin: 0px 0px;

}
.manuscript-top-title{
	height: 16px;
	line-height: 16px;
	margin-left: 30px;
	margin-top: 23px;
	margin-bottom: 30px;
	font-family: "Microsoft YaHei";
	font-size: 16px;
	/*border: blue 1px solid;*/
}

.manuscript-top-main{
	overflow: auto;
	width: 590px;;
	margin-left: 30px;
	height: 190px;
}
.manuscript-tanchu-bottom{
	width: 100%;
	height: 60px;
	background-color: #F3F1F2;
	border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;
	position: relative;
	margin-top: 10px;
}

.commit-button{
	width: 115px;
	height: 35px;
	position: absolute;
	border-radius: 3px;
	right:30px;
	top: 12px;
	color: #FFFFFF;
	cursor: pointer;
}
.commit-button-left{
	width: 80px;
	height: 35px;
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
	line-height: 35px;
	text-align: center;
	background-color: #4187E6;
	float: left;
}
.commit-button-left:hover{
	background-color: #3676D1;
}
.commit-button-right{
	width: 35px;
	height: 35px;
	float: left;
	text-align: center;
	line-height: 34px;
	background-color: #145DC3;
	border-bottom-right-radius: 5px;
	border-top-right-radius: 5px;
}
.commit-button-radius{
	width: 14px;
	height: 14px;
	border-radius: 50%;
	position: absolute;
	left: 73px;
	top: 11px;
	background-color: #145DC3;
}
.manuscript-close{
	width: 32px;
	height: 32px;
	position: absolute;
	top:-16px;
	right: -16px;
	background-color: #FFF;
	border-radius: 50%;
	color: #4287E6;
	text-align: center;
	line-height: 32px;
	border:1px solid #999;
	cursor: pointer;
	font-size: 20px;
}
.btn-close {
	position: relative;

	padding: 0;
	border: 5px solid #fff;
	border-radius: 50%;
}

.btn-close i {
	position: relative;
	color: #fff;
	display: inline-block;
	font-size: 12px;
	background-color: #a6a6a6;
	padding: 5px;
	border-radius: 50%;
}

.btn-close i:hover{
	cursor:pointer;
	background-color: #5b95e3;
}
.btnContainer{

	position:absolute;
	top: -13px;
	left:11px;
	text-align: right;
	width: 100%;
	/*border:blue 1px solid;*/
}

.info-input{
	margin-top: 20px;
	font-family: "微软雅黑";
	color: #333;
}
.info-input i{
	margin-right: 10px;
	font-size: 16px;
}
.info-input input{
	width: 400px;
	outline: none;
	/*border-top: none;
	border-left: none;
	border-right: none;*/
	border-radius: 5px;
	border: 1px solid #999;
	padding-left: 5px;
	color: #999;
}
.info-input textarea{
	position: absolute;
	padding: 5px 10px;
	outline: none;
	width: 400px;
	margin-left: 4px;
	border-radius: 5px;
	border: 1px solid #999;
	color: #999;
}
</style>
