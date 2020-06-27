<template>
	<div class='growUp'>
		<image src="/static/home_s/growUp.png" class="img1"></image>
		<div class="box">
			<image src="/static/home_s/kuang.png"></image>
			<div class="div">
				<p class="h1">{{record[0]}}</p>
				<p class="p">{{record[1]}}</p>
				<div class="box" v-for="(item,index) in records" :key="index">
					<span></span>
					<text>{{item}}</text>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'growUp',
		data() {
			return {
				record:[],
				records:[]
			}
		},
		onLoad(){
			if(uni.getStorageSync('userID') === ""){
				main.toLoing()
			}else{
				Post('api/index/getUserGrowRecord',{
					user_id:main.userID
				}).then(res => {
					console.log(res)
					this.record = res.record
					this.records = res.records
				})
			}

		},
		onShow(){

		},
		methods: {

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
.growUp{
	width: 100%;
	height: 100%;
	position: fixed;
	.img1{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}
	>.box{
		width: 690rpx;
		height: 580rpx;
		position: absolute;
		left: 30rpx;
		top: 42%;
		.div{
			width: calc(100% - 95rpx);
			height: calc(100% - 60rpx);
			margin-top: 30rpx;
			box-sizing: border-box;
			position: absolute;
			top: 0;
			left: 65rpx;
			z-index: 2;
			overflow: hidden;
			overflow-y: scroll;
		}
		.box{
			width:100%;
			margin-top: 50rpx;
			float: left;
			span{
				width: 25rpx;
				height: 25rpx;
				float: left;
				background:rgba(255,78,0,1);
				opacity:0.48;
				border-radius:50%;
				margin-top: 2rpx;
			}
			text{
				width: calc(100% - 45rpx);
				float: right;
				color: #333333;
				font-size: 28rpx;
				font-weight: bold;
				line-height: 28rpx;
			}
		}
		image{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
		}
		.h1{
			width: 100%;
			color: #FF4E00;
			font-size: 40rpx;
			font-weight: bold;
			padding-top: 20rpx;
			float: left;
		}
		.p{
			width: 100%;
			color: #333333;
			font-size: 28rpx;
			font-weight: bold;
			padding-top: 20rpx;
			float: left;
		}
	}
}
</style>
