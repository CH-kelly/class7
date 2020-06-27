<template>
	<div class='Data'>
		<div class="user">
			<image :src="avatar" mode="aspectFill"></image>
			<p>{{nickname}}</p>
		</div>
		<div class="box">
			<div class="item">
				<text space="nbsp">姓  名</text>
				<input type="text" v-model="realname" placeholder="请输入姓名" placeholder-style="color:#666666" />
			</div>
			<div class="item">
				<text space="nbsp">个人签名</text>
				<input type="text" v-model="interest" placeholder="请输入个人签名..." placeholder-style="color:#666666" />
			</div>
		</div>
		<div class="sure" @click="sure">立即修改</div>
	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'Data',
		data() {
			return {
				nickname:'',
				realname:'',
				interest:'',
				avatar:'',
			}
		},
		onLoad(){
			Post('api/User/getuserinfo',{
				openid:main.openID
			}).then(res => {
				console.log(res)
				this.nickname = res.nickname
				this.realname = res.realname
				this.interest = res.interest
				this.avatar = res.avatar
			})
		},
		onShow(){

		},
		methods: {
			sure(){
				Post('api/User/userinfo_submit',{
					openid:main.openID,
					realname:this.realname,
					interest:this.interest,
				}).then(res => {
					main.showToast('修改成功')
				})
			}
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
.user{
	width:100%;
	height:236rpx;
	background:rgba(65,205,138,1);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	image{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		border: 4rpx solid #FFFFFF;
		display: block;
	}
	p{
		width: 100%;
		text-align: center;
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight: bold;
	}
}
.box{
	width:650rpx;
	height:180rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 1rpx 21rpx 0px rgba(167,167,167,0.23);
	border-radius:20rpx;
	margin-left: 50rpx;
	margin-top: 45rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	.item{
		width: 100%;
		height: 90rpx;
		border-bottom: 1rpx solid #EEEEEE;
		box-sizing: border-box;
		text{
			float: left;
			line-height: 90rpx;
			font-size: 28rpx;
		}
		input{
			width: 70%;
			float: right;
			height: 90rpx;
			line-height: 90rpx;
			font-size: 28rpx;
			text-align: right;
		}
	}
}
.sure{
	width:690rpx;
	height:94rpx;
	line-height: 94rpx;
	background:rgba(63,203,133,1);
	border-radius:47rpx;
	color: #FFFFFF;
	text-align: center;
	font-size: 34rpx;
	margin-top: 140rpx;
	margin-left: 30rpx;
}
</style>
