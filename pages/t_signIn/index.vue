<template>
	<view class="sign-up">
	<view class="flex navbar">
		<view class="t-text navbar-title" 
		 @click="changeNav(1)"
		 :class="{'active':current==1}"
		 style="margin-right: 60rpx;"
		 >
			考勤人数
			<view v-show="current==1"  class="title-border"></view>
		</view>
		<view class="t-text  navbar-title"  
		 @click="changeNav(2)"
		 :class="{'active':current==2}"  >
			未考勤人数
			<view v-show="current==2" class="title-border"></view>
		</view>
	</view>
		
		
		<view class="sign-list">
			<view class="flex">
				<view class="flex item">
					<image src="/static/logo.png" mode=""></image>
					<view class="info">
						<view class="t-text nickname">李静</view>
						<text v-show="current==1" class="t-text date">2020.06.01 观看4分钟</text>
						<text v-show="current==2" class="t-text date">2020.06.01 未观看</text>
					</view>
				</view>
				
				<view  v-show="current==1" class="status">
					在线
				</view>
				<view  v-show="current==2" class="status off-line">
					离线
				</view>
			</view>
			<view class="t-line"></view>
		</view>
		<view class="sign-list">
			<view class="flex">
				<view class="flex item">
					<image src="/static/logo.png" mode=""></image>
					<view class="info">
						<view class="t-text nickname">李静</view>
						<text class="t-text date">2020.06.01 报名</text>
					</view>
				</view>
				
				<view class="status">
					在线
				</view>
			</view>
			<view class="t-line"></view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				current:1,
			}
		},
		methods:{
			changeNav(i){
				this.current = i;
			}
		}
	}
</script>

<style scoped>
	.sign-list{
		padding: 0 32rpx;
	}
	
	.navbar{
		border-top: 1px solid rgba(238,238,238,1);
		border-bottom: 1px solid rgba(238,238,238,1);
		justify-content: center;
	}
	
	.navbar-title{
		padding: 26rpx 0 ;
		position: relative;
		
		
		font-size:30rpx;
		color:rgba(102,102,102,1);
	}
	.title-border{
		position: absolute;
		bottom: 0;
		left: 50%;
		right: 50%;
		transform: translate(-50%,-50%);
		
		width:56rpx;
		height:8rpx;
		background:rgba(63,204,134,1);
		border-radius:4rpx;
	}
	
	.active{
		font-size:34rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	.item{
		padding: 24rpx 0;
		justify-content: flex-start;
	}
	.item>image{
		width:78rpx;
		height:78rpx;
		border-radius:50%;
		margin-right: 10rpx;
	}
	.nickname{
		
		font-size:30rpx;
		font-weight:bold;
		color:rgba(34,34,34,1);
	}
	.date{
		font-size:24rpx;
		color:rgba(153,153,153,1);
	}
	.status{
		width:63rpx;
		height:33rpx;
		line-height: 33rpx;
		text-align: center;
		background:rgba(233,200,84,1);
		border-radius:10rpx;
		
		
		font-size:20rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.off-line{
		
		background:rgba(233,233,233,1);
		color:rgba(102,102,102,1);
	}
	
</style>
