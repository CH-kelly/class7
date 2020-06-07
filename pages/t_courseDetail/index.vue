<template>
	<view class="">
		<view class="banner">
			<swiper class="swiper" 
				autoplay="true" 
				interval="3000" 
				@change="swiperChange"
					>
				<swiper-item v-for="(item , index) in banner" :key="index">
					<image class="swiper-image" :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<view class="banner-dots">
				<view class="flex banner-dots-lists" >
					<view 
					 v-for="(item , index) in banner" :key="index"
					:class="{'dots-active':current == index}"
					class="dots"></view>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="flex top">
				<view class="top-left">
					<view class="t-text left-title">
						小学四年级数学课程
					</view>
					<view class="t-text class">
						A班级
					</view>
				</view>
				<view class="t-text  top-right">
					报名情况
				</view>
			</view>
			<view class="t-line"></view>
			<view class="content-title">
				共4节课
				<view class="title-border"></view>
			</view>
			<view class="t-line"></view>
			
			<view class="course-list">
				
				<view class="flex course-item">
					<view class="item-left">
						<view class="course-item-title">
							<view class="course-one">
								第一课
							</view>
							<view class="course-two">
								四年级数学-鸡兔同笼问题
							</view>
						</view>
						<view class="course-item-title" style="margin-top: 16rpx;">
							<view class="flex course-one" v-if="isOver==1">
								<image src="/static/teacher/end.png" mode=""></image>
								<text class="course-end">已结束</text>
							</view>
							<view class="flex course-one" v-if="isOver==0">
								<image src="/static/teacher/time_2.png" mode=""></image>
								<text class="course-end" style="color: #3FCC86;">待开始</text>
							</view>
							<view class="course-two-right" style="color: #999999;">
								2020.05.30 14:00-14:45
							</view>
						</view>
					</view>
					<view class="item-right">签到情况</view>
				</view>
				<view class="t-line"></view>
				
				
				
				
				
				
			</view>
			
			
			
			
		</view>
		
		
		
	</view>
</template>

<script>
	export default {
		data(){
			return {
				banner:[
					'/static/teacher/banner.jpg','/static/teacher/banner.jpg','/static/teacher/banner.jpg'
				],
				current:0,
				isOver:0,
			}
		},
		methods:{
			swiperChange(e){
				console.log(e);
				this.current = e.mp.detail.current;
				
			}
		}
	}
</script>

<style scoped>
	/* 轮播图样式 */
	.banner{
		width:100vw;
		height:400rpx;
		position: relative;
	}
	.banner-dots{
		
		width: 100%;
		height: 20rpx;
		position: absolute;
		z-index: 1;
		bottom: 30rpx;
		left: 0;
		/* background-color: rgba(255,255,255,0.3); */
	}
	.banner-dots-lists{
		justify-content: center;
		width: 100%;
		height: 100%;
	}
	.dots{
		width:6rpx;
		height:6rpx;
		background:rgba(255,255,255,0.4);
		border-radius:3px;
		margin-right: 10rpx;
	}
	.dots-active{
		width:14rpx;
		height:6rpx;
		background:rgba(63,204,134,1);
		border-radius:6rpx;
	}
	
	.swiper,.swiper-image{
		width: 100%;
		height: 100%;
	}
	/* 轮播图样式结尾 */
	
	
	/* 正文样式 */
	.content{
		width: 100vw;
		height: calc(100vh - 380rpx);
		position: relative;
		top: -20rpx;
		background-color: #ffffff;
		border-radius:20rpx 20rpx 0rpx 0rpx;
	}
	.content>.top{
		padding: 30rpx;
	}
	.left-title{
	
		font-size:34rpx;
		font-weight:bold;
		color:rgba(35,35,35,1);
	}
	.class{
		margin-top: 20rpx;
		font-size:28rpx;
		color:rgba(102,102,102,1);
	}
	.top-right{
		width:156rpx;
		height:54rpx;
		line-height: 54rpx;
		text-align: center;
		background:rgba(178,192,60,1);
		border-radius:27rpx;
		
		font-size:26rpx;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	
	.content-title{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(63,204,134,1);
		
		position: relative;
	}
	.title-border{
		position: absolute;
		bottom: 0;
		left: 50%;
		right: 50%;
		transform: translate(-50%,-50%);
		
		
		width:53rpx;
		height:6rpx;
		background:rgba(63,204,134,1);
		border-radius:3px;
	}
	
	/* 课程列表样式 */
	.course-list{
		padding: 0 30rpx;
	}
	.course-item{
		height: 150rpx;
		
	}
	.item-left{
		width: 80%;
	}
	
	.item-right{
		width:156rpx;
		height:54rpx;
		line-height: 54rpx;
		text-align: center;
		background:rgba(233,233,233,1);
		border-radius:27rpx;
		
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(153,153,153,1);
	}
	
	.course-item-title{
		display: flex;
		align-items: center;
		
	}
	
	.course-one{
		width: 20%;
		text-align: right;
		justify-content: flex-end;
		
		font-size:28rpx;
		color:rgba(153,153,153,1);
	}
	.course-one>image{
		width: 26rpx;
		height: 26rpx;
		margin-right: 4rpx;
	}
	.course-two{
		width: 80%;padding-left: 20rpx;

	}
	.course-end{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(232,47,73,1);
	}
	.course-two-right{
		width: 80%;padding-left: 20rpx;

		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(124,128,148,1);
	}
	
</style>
