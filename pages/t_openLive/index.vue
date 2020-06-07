<template>
	<view class="live">
		<view class="flex-column">
			<view class="info">
				<view class="flex  info-top">
					<image src="/static/teacher/time.png" mode=""></image>
					<text class="t-text">2020.06.01 14:00-14:45</text>
				</view>
				<view class="t-line"></view>
				<view class="title">
					四年级数学-四则运算
				</view>
			</view>
		</view>
		<view class="flex bottom">
			
			<view class="button">立即直播</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods:{
			
		}
	}
	
	
</script>

<style scoped>
	.live{
		width: 100vw;
		height: 100vh;
		/* background-color: radial-gradient(circle at top, rgb(220, 75, 200),rgb(0, 0, 75)); */
		background-image: -webkit-radial-gradient(circle at top, #584C62,#151E57);
		background-image: radial-gradient(circle at top, #584C62,#151E57);
		
	}
	.info{
		margin-top: 60rpx;
		width:690rpx;
		height:290rpx;
		background:rgba(255,255,255,0.2);
		border-radius:20rpx;
	}
	.info-top{
		padding: 20rpx 34rpx;
		
		justify-content: flex-start;
	}
	.info-top>image{
		width: 28rpx;
		height: 28rpx;
		margin-right: 10rpx;
	}
	.info-top>text{
		font-size:26rpx;
		color:rgba(255,255,255,1);
	}
	
	.title{
		width: 100%;
		padding: 70rpx 0;
		text-align: center;
		font-size:38rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	
	.button{
		width:690rpx;
		height:78rpx;
		line-height: 78rpx;
		text-align: center;
		background:linear-gradient(90deg,rgba(243,223,142,1) 0%,rgba(247,199,77,1) 100%);
		border-radius:39rpx;
		
		
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(170,104,0,1);
	}
	.bottom{
		width: 100vw;
		justify-content: center;
		
		position: fixed;
		bottom: 80rpx;
		left: 0;
	}
</style>
