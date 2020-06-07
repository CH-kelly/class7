<template>
	<view >
		<view class="safearea" :class="{'ipx':iphonex}"  >
			<image class="bj" src="/static/teacher/bj.png" mode=""></image>
			
			<view class="info" :class="{'ipx':iphonex}" >
				
				<view class="flex-column info-avatar">
					<image class="avatar" src="/static/logo.png" mode=""></image>
					<image class="gender" src="/static/teacher/girl.png" mode=""></image>
					<image class="gender" src="/static/teacher/boy.png" mode=""></image>
				</view>
				<view class="flex-column nickname">
					CGMOOCS
				</view>
				<view class="label">
					<view class="t-text education">
						成都农业大学
					</view>
				</view>
				<view class="label" style="margin-top: 30rpx;">
					<text class="t-text">教程340</text>
					<view class="label-line"></view>
					<text class="t-text">教程点赞375</text>
				</view>
				<view class="flex-column">
					<view class="t-text signature">能在教课过程中尽量转变其学习态度和学习方法使其成绩、态度和方法得到整体提升</view>
					
					<view class="good-at">
						<view class="flex good-top">
							<view class="flex top-left">
								<image  class="good" src="/static/teacher/good.png" mode=""></image>
								<text class="t-text good-title">擅长课程</text>
							</view>
							<image class="add" src="/static/teacher/add.png" mode=""></image>
						</view>
						<scroll-view
						scroll-y="true"
						class="scroll-view"
						 >
							 <view class="flex good-label">
								<view class="t-text label-title">
									探索潜意识
								</view>
								<view class="t-text label-title">
									批判性思维工具
								</view>
								<view class="t-text label-title">
									是泡沫还是机遇？
								</view>
							 </view>
						 </scroll-view>
						
					</view>
					
					
					
				</view>
				
				<!-- 可预约时间 -->
				<view class="appointment" :style="{bottom:appointment+'rpx'}">
					<view class="flex good-top">
						<view class="flex top-left">
							<image  class="good" src="/static/teacher/time_4.png" mode=""></image>
							<text class="t-text good-title">可预约时间</text>
							<text class="t-text change-text">点击时间可进行更改</text>
						</view>
						<image class="add" @click="openAdd" src="/static/teacher/add.png" mode=""></image>
					</view>
					<view class="middle">
						<v-date></v-date>
						
					</view>
					<view class="bottom">
						
					</view>
				</view>
				
				
			</view>
			
			
			
			
		</view>
		
	
		
		<!-- 导航栏 tabbar -->
		<view class="tabbar"  :style="{bottom:bottom+'rpx'}">
			<view class="flex tabbar-lists">
				<view class="flex-column tabbar-item">
					<image src="/static/teacher/order.png" mode=""></image>
					<text>订单管理</text>
				</view>
				<view class="flex-column tabbar-item">
					<image src="/static/teacher/course.png" mode=""></image>
					<text>课程管理</text>
				</view>
				<view class="flex-column tabbar-item">
					<image src="/static/teacher/person_a.png" mode=""></image>
					<text class="active">个人中心</text>
				</view>
			</view>
		</view>
		
		
		<!-- 添加空余时间 -->
		<view v-show="isClose == 1" >
			<free @close="closeRefuse" ></free>
		</view>
		
		
	</view>
</template>

<script >
	import utils from "common/utils.js"
	
	import date from "./child/date.vue"
	import free from "./child/free.vue"
	export default {
		data() {
			return {
				bottom:0,
				iphonex:false,
				appointment:0,
				isClose:0,
			}
		},
		onLoad() {
	
		},
		components:{
			"v-date":date,
			free
		},
		onShow(){
			this.bottom = utils.bottom	
			this.iphonex = utils.iphonex
			this.appointment =  this.bottom + 100;
		},
		methods: {
			openAdd(){
				this.isClose = 1;
			},
			closeRefuse(){
				this.isClose = 0;
			}
		}
	}
</script>

<style scoped>
	.safearea{
		width: 100vw;
		height: calc(100vh - 100rpx);
		background-color: #EBEFF1;
		position: relative;
	}
	.safearea>.bj{
		width: 100%;
		
	}
	.info{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 0;
		background: rgba(0,0,0,0.3);
	}
	
	
	.info-avatar{
		position: relative;
		/* justify-content: center; */
	}
	.info-avatar>.avatar{
		width:160rpx;
		height:160rpx;
		border-radius:50%;
		border: 8rpx solid #fff;
		vertical-align: middle;
	}
	.info-avatar>.gender{
		position: absolute;
		bottom: -10rpx;
		left: 50%;
		transform: translateX(-50%);
		
		width: 52rpx;
		height: 31rpx;
	}
	
	
	.nickname{
		margin-top: 18rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,107,54,1);
	}
	.education{
		margin-top: 18rpx;
		width:137rpx;
		height:32rpx;
		line-height: 32rpx;
		text-align: center;
		background:rgba(49,189,119,1);
		border-radius:4rpx;
		
		
		font-size:20rpx;
		color:rgba(255,255,255,1);
	}
	
	.label{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.label-line{
		width:2rpx;
		height:30rpx;
		background:rgba(0,0,0,0.2);
		margin: 0 60rpx;
	}
	
	.signature{
		width:540rpx;
		/* height:90rpx; */
		background:rgba(49,189,119,1);
		border-radius:20rpx 20rpx 0rpx 0rpx;
		padding: 18rpx 49rpx;
		text-align: center;
		
		font-size:24rpx;
		color:rgba(255,255,255,1);
		line-height:32rpx;
	}
	
	
	
	
	.good-at{
		width:650rpx;
		padding: 30rpx;
		/* height:260rpx; */
		background:rgba(255,255,255,1);
		border-radius:20rpx;
	}
	.top-left>text{
		font-size:30rpx;
		color:rgba(41,50,61,1);
	}
	
	.good{
		width: 36rpx;
		height: 38rpx;
	}
	.add{
		width: 46rpx;
		height: 46rpx;
	}
	.scroll-view{
		height: 200rpx;
	}
	.good-label{
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-bottom: 40rpx;
	}
	.label-title{
		/* width:248rpx; */
		margin: 24rpx 30rpx 0 0;
		padding: 0 16rpx;
		height:50rpx;
		line-height: 50rpx;
		text-align: center;
		border:1rpx dashed rgba(88,95,122,1);
		border-radius:25rpx;
		
		font-size:28rpx;
		color:rgba(88,95,122,1);
		
	}
	.good-title{
		padding: 0 16rpx;
	}
	
	
	
	
	/* 预约时间样式 */
	.appointment{
		width: 100vw;
		box-sizing: border-box;
		/* padding: 30rpx; */
		padding: 30rpx 30rpx 20rpx 30rpx;
		background-color: #ffffff;
		border-radius:20rpx 20rpx 0px 0px;
		
		
		position: fixed;
		bottom: 0px;
	}
	.change-text{
		font-size:22rpx !important;
		color:rgba(253,101,11,1) !important;
	}
	
</style>
