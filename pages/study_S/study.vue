<template>
	<div class="study">
		<div class="num">
			<div><p>{{total}}<i>节</i></p><p>累计学习</p></div>
			<span></span>
			<div><p>{{today}}<i>节</i></p><p>今日学习</p></div>
		</div>
		<div class="bg">
			<div class="box" :style="chapter.length === 0 ?'border: none;':''" @click="pageJump('/pages/study_S/Learned?list=' + JSON.stringify(chapter))">
				<div class="img"><image src="/static/study/box1.png" style="width: 30rpx;height: 34rpx;"></image></div>
				<p>已学课程</p>
				<image src="/static/study/more.png"></image>
				<i>全部</i>
			</div>
			<div class="curriculum" v-if="chapter.length !== 0">
				<div class="list" v-for="(item,index) in chapter" :key="index"  @click="pageJump('/pages/home_S/videoDetails?id='+item.id)">
					<div class="img">
						<image :src="item.img" mode="aspectFill"></image>
						<div class="type"><div>视频</div><p>已学{{item.num}}章节</p></div>
					</div>
					<div class="name Ellipsis">{{item.title}}</div>
				</div>
			</div>
		</div>
		<div class="box" @click="pageJump('/pages/study_S/curriculum')">
			<div class="img"><image src="/static/study/box2.png" style="width: 35rpx;height: 33rpx;"></image></div>
			<p>收藏课程</p>
			<image src="/static/study/more.png"></image>
		</div>
		<div class="box" @click="pageJump('/pages/study_S/appointment')">
			<div class="img"><image src="/static/study/box3.png" style="width: 35rpx;height: 35rpx;"></image></div>
			<p>我的预约</p>
			<image src="/static/study/more.png"></image>
		</div>
		<div class="box" @click="pageJump('/pages/study_S/Fabulous')">
			<div class="img"><image src="/static/study/box4.png" style="width: 34rpx;height: 32rpx;"></image></div>
			<p>我的点赞</p>
			<image src="/static/study/more.png"></image>
		</div>
	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'study',
		data() {
			return {
				today:0,
				total:0,
				chapter:[],
				
			}
		},
		onLoad(){
			if(main.userID === ""){
				uni.showModal({
				    title: '暂未登陆',
				    content: '检测到您暂未登陆，马上去登陆吧！',
					cancelText:'随便看看',
					confirmText:'去登陆',
					confirmColor:'#3FCB85',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		},
		onShow(){
			if(main.userID !== ""){
				Post('api/Study/getUserStudy',{
					uniacid:16,
					suid:main.userID
				}).then(res => {
					console.log(res)
					this.today = res.today
					this.total = res.total
					this.chapter = res.chapter
				})
			}
			
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
.num{
	width: 100%;
	height:180rpx;
	background:rgba(255,255,255,1);
	border-radius:0px 0px 30rpx 30rpx;
	float: left;
	position: relative;
	z-index: 2;
	div{
		width: calc(50% - 1rpx);
		height: 100%;
		float: left;
		display: flex;
		justify-content: center;
		flex-direction: column;
		p:nth-child(1){
			width: 100%;
			text-align: center;
			color: #122633;
			font-size: 60rpx;
			font-weight: 800rpx;
			i{
				color: #B5B5B5;
				font-size: 24rpx;
				display: inline-block;
			}
		}
		p:nth-child(2){
			color: #9F9F9F;
			font-size: 24rpx;
			width: 100%;
			text-align: center;
			padding-top: 15rpx;
		}
	}
	span{
		width: 1rpx;
		height:70rpx;
		background:rgba(241,241,241,1);
		float: left;
		margin-top: 55rpx;
	}
}
.bg{
	width: 100%;
	overflow: hidden;
	padding-top: 30rpx;
	margin-top: -30rpx;
	background:linear-gradient(top,rgba(235,240,242,1),rgba(255,255,255,1));
	float: left;
}
.box{
	width: calc(100% - 60rpx);
	min-height: 90rpx;
	overflow: hidden;
	margin-left: 30rpx;
	border-bottom: 1rpx solid #E4E4E4;
	.img{
		width: 35rpx;
		height: 90rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		float: left;
	}
	p{
		float: left;
		color: #1B1B25;
		font-size: 30rpx;
		margin-left: 20rpx;
		font-weight: bold;
		line-height: 90rpx;
	}
	>image{
		width: 13rpx;
		height: 20rpx;
		float: right;
		margin-top: 35rpx;
	}
	i{
		float: right;
		line-height: 90rpx;
		color: #BBBBBB;
		font-size: 24rpx;
		margin-right: 15rpx;
	}
}
.curriculum{
	width: calc(100% - 60rpx);
	height: 250rpx;
	margin-left: 30rpx;
	box-sizing: border-box;
	overflow-x: scroll;
	overflow-y: hidden;
	white-space:nowrap;
	border-bottom: 1rpx solid #E4E4E4;
	.list{
		width: 310rpx;
		overflow: hidden;
		margin-right: 20rpx;
		display: inline-block;
		.img{
			width: 100%;
			height: 180rpx;
			position: relative;
			image{
				width: 100%;
				height: 100%;
				border-radius: 15rpx;
				display: block;
			}
			.type{
				width: 100%;
				height: 34rpx;
				position: absolute;
				bottom: 10rpx;
				left: 10rpx;
				font-size: 20rpx;
				color: #FFFFFF;
				line-height: 34rpx;
				div{
					height:34rpx;
					padding: 0 10rpx;
					background:rgba(63,203,133,1);
					border-radius:16rpx 17rpx 17rpx 6rpx;
					margin-right: 15rpx;
					float: left;
				}
			}
		}
		.name{
			color: #212426;
			font-size: 28rpx;
			font-weight: bold;
			width: 100%;
			padding: 15rpx 0;
		}
	}
}
</style>