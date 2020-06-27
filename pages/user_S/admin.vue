<template>
	<div calss="admin">
		<div class="name">{{name}}</div>
		<!-- <i>请选择您所服务的具体领域</i> -->
		<div @click="pageJump('/pages/user_S/admin2')" style="background:linear-gradient(90deg,rgba(251,137,27,1) 0%,rgba(255,196,133,1) 100%);" class="box">
			<p>数据统计</p>
			<image src="/static/user_s/icon2.png"></image>
			<p>Statistics</p>
		</div>
	<!-- 	<div @click="pageJump('/pages/user_S/admin1')" style="background:linear-gradient(90deg,rgba(54,134,244,1) 0%,rgba(142,189,255,1) 100%);" class="box">
			<p>核销记录</p>
			<image src="/static/user_s/icon1.png"></image>
			<p>Verification records</p>
		</div> -->
	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'admin',
		data() {
			return {
				name:''
			}
		},
		onLoad(){
			Post('api/School/getSchoolName',{
				user_id:main.userID
			}).then(res => {
				console.log(res)
				this.name = res.name
			})
		},
		onShow(){

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},

		},

		filters: {
			//过滤器
		},
		onReachBottom(){
			//滚动到底部
		},
	}
</script>

<style lang="scss" scoped>
.name{
	width: 100%;
	padding: 0 60rpx;
	box-sizing: border-box;
	color: #232323;
	font-size: 54rpx;
	font-weight: bold;
	margin-top: 70rpx;
}
i{
	width: 100%;
	padding: 0 60rpx;
	box-sizing: border-box;
	color: #999999;
	font-size: 30rpx;
	margin-top: 40rpx;
}
.box{
	width:630rpx;
	height:224rpx;
	box-shadow:0px 10px 30px 0px rgba(255,139,1,0.2);
	border-radius:20px;
	margin-left: 60rpx;
	margin-top: 110rpx;
	p{
		width: calc(100% - 280rpx);
		float: left;
		text-indent: 47rpx;
		color: #FFFFFF;
	}
	p:nth-child(1){
		font-weight: bold;
		font-size: 50rpx;
		padding-top: 45rpx;
	}
	p:nth-child(3){
		font-size: 30rpx;
		padding-top: 10rpx;
	}
	image{
		width: 230rpx;
		height: 183rpx;
		float: right;
		margin-top: 20rpx;
		margin-right: 20rpx;
	}
}
</style>