<template>
	<div class="home">
		<div class="search">
			<div>
				<image src="/static/search.png"></image>
				<input type="text" v-model="searchname" placeholder="请输入关键词进行搜索" placeholder-style="color:#B5B5B5" />
			</div>
			<span @click="pageJump('/pages/home_S/video?text='+searchname)">搜索</span>
		</div>
		<div class="tab">
			<div @click="tab(index)" v-for="(item,index) in cate" :key="index" :class="index === cateIndex ? 'act' : ''">{{item.name}}</div>
		</div>
		<div class="Swiper">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" indicator-color="rgba(255,255,255,0.3)" indicator-active-color="#FFFFFF">
				<swiper-item v-for="(item,index) in cate[cateIndex].catedata" :key="index" >
					<image :src="item.img" mode="aspectFill" @click="pageJump('/'+item.url)"></image>
				</swiper-item>
			</swiper>
		</div>
		<div class="icon">
			<div @click="pageJump('/pages/home_S/video?text=')"><image src="/static/home_s/icon1.png"></image><p>视频学院</p></div>
			<div @click="pageJump('/pages/home_S/accompanyPracticeList')"><image src="/static/home_s/icon2.png"></image><p>课程陪练</p></div>
			<div @click="pageJump('/pages/home_S/onLine')"><image src="/static/home_s/icon3.png"></image><p>线上授课</p></div>
			<!-- <div @click="pageJump('/pages/home_S/aboutUs')"><image src="/static/home_s/icon4.png"></image><p>关于我们</p></div> -->
			<div @click="pageJump('/pages/home_S/growUp')"><image src="/static/home_s/icon5.png"></image><p>成长记录</p></div>
		</div>
		<div class="curriculum">
			<div class="title">
				<image src="/static/home_s/curriculum.png"></image>
				<div class="more" @click="pageJump('/pages/home_S/video?text=')">查看更多<image src="/static/home_s/more.png"></image></div>
			</div>
			<div class="box"  @click="pageJump('/pages/home_S/videoDetails?id='+item.id)" v-for="(item,index) in curriculum" :key="index">
				<div class="img">
					<image :src="item.img" mode="aspectFill"></image>
					<div class="type"><div>视频</div><p>{{item.total}}章节</p></div>
				</div>
				<div class="name Ellipsis">{{item.title}}</div>
				<div class="text"><p>{{item.sales}}人购买</p><p>{{item.likes}}人点赞</p></div>
			</div>
		</div>
		<div class="accompanyPractice">
			<p>推荐直播</p>
			<div class="more" @click="pageJump('/pages/home_S/onLine')">查看更多<image src="/static/home_s/more.png"></image></div>
		</div>
		<div class="accompanyPracticeList">
			<div class="onLinebox" @click="pageJump('/pages/home_S/onLineDetails?id='+item.id)" v-for="(item,index) in sowing" :key="index">
				<image :src="item.img" mode="aspectFill"></image>
				<div class="text">
					<div class="name Ellipsis">{{item.title}}</div>
					<!-- <div class="type"><div>零基础</div><div>零基础零基础</div><div>零基础零基础</div></div> -->
					<div class="money"><p>¥{{item.price}}</p><p>{{item.sign_num}}人已报名</p></div>
				</div>
			</div>
		</div>
		<div class="accompanyPractice">
			<p>推荐陪练</p>
			<div class="more" @click="pageJump('/pages/home_S/accompanyPracticeList')">查看更多<image src="/static/home_s/more.png"></image></div>
		</div>
		<div class="accompanyPracticeList">
			<div class="box" @click="pageJump('/pages/home_S/Appointment?id='+item.id)" v-for="(item,index) in teacher" :key="index">
				<div class="logo">
					<image :src="item.avatar" mode="aspectFill"></image><image v-if="item.gender !== 0" :src="item.gender === 2 ? '/static/home_s/woman.png':'/static/home_s/man.png'"></image>
				</div>
				<div class="text">
					<div class="name">
						<p class="Ellipsis">{{item.name}}</p>
						<span>{{item.school_name}}</span>
						<div><text>{{item.trainer_money}}</text><text>/课时</text></div>
					</div>
					<div class="label"><text space="nbsp" v-for="(text,i) in item.label" :key="i">{{text}} </text></div>
					<div class="Fabulous">{{item.likes_num}}人点赞</div>
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
		name: 'home',
		data() {
			return {
				cate:[],
				cateIndex:0,
				curriculum:[],
				teacher:[],
				sowing:[],
				searchname:''
			}
		},
		onLoad(){
			if(uni.getStorageSync('userID') === ""){
				main.toLoing()
			}else{
				main.openID = uni.getStorageSync('openID')
				main.userID = uni.getStorageSync('userID')
			}
		},
		onShow(){
			this.searchname = ''
			Post('api/index/index').then(res => {
				console.log(res)
				this.cate = res.cate
				this.curriculum = res.curriculum
				this.teacher = res.teacher
				this.sowing = res.sowing
			})
		},
		methods: {
			tab(i){
				this.cateIndex = i
			},
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
<style>
	page{
		height: 100%;
		background: #EBEFF2;
	}
</style>
<style lang="scss" scoped>
.search{
	width: 100%;
	height: 68rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	>div{
		width: 600rpx;
		height: 100%;
		float: left;
		background:rgba(241,241,241,1);
		border-radius:34rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		image{
			width: 26rpx;
			height: 26rpx;
		}
		input{
			width: calc(100% - 50rpx);
			line-height: 68rpx;
			font-size: 28rpx;
			height: 100%;
			margin-left: 15rpx;
		}
	}
	span{
		line-height: 68rpx;
		float: right;
		color: #3FCB85;
		font-size: 32rpx;
	}
}
.tab{
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	border-bottom: 1rpx solid #F1F1F1;
	background: #FFFFFF;
	color: #656565;
	font-size: 30rpx;
	display: flex;
	justify-content: space-between;
	div{
		padding: 0 20rpx;
	}
	.act{
		font-size: 36rpx;
		color: #000000;
		font-weight: bold;
		position: relative;
	}
	.act:after{
		content: '';
		width: 56rpx;
		height: 8rpx;
		background: #3FCB85;
		border-radius: 4rpx;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%);
	}
}
.Swiper{
	width: 100%;
	height: 290rpx;
	background: #FFFFFF;
	padding-top: 20rpx;
	.swiper{
		width: calc(100% - 60rpx);
		height: 290rpx;
		margin-left: 30rpx;
		border-radius: 20rpx;
		image{
			width: 100%;
			height: 100%;
			border-radius: 20rpx;
		}
	}
}
.icon{
	width: 100%;
	padding: 0 55rpx;
	height: 190rpx;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: linear-gradient(to bottom, #ffffff, #EBEFF2);
	div{
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		image{
			width: 90rpx;
			height: 90rpx;
		}
		p{
			width: 100%;
			color: #333333;
			font-size: 26rpx;
			text-align: center;
			padding-top: 15rpx;
		}
	}
}
.more{
	height: 100%;
	display: flex;
	align-items: center;
	color: #777777;
	font-size: 24rpx;
	image{
		width: 10rpx;
		height: 16rpx;
		margin-left: 10rpx;
	}
}
.curriculum{
	width: calc(100% - 40rpx);
	margin-left: 20rpx;
	background: #FFFFFF;
	border-radius:20rpx;
	padding: 30rpx 25rpx;
	box-sizing: border-box;
	overflow: hidden;
	.title{
		width: 100%;
		height: 36rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		>image{
			width: 150rpx;
			height: 36rpx;
		}
	}
	.box{
		width: 310rpx;
		margin-top: 30rpx;
		overflow: hidden;
		float: left;
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
			font-synthesis: 30rpx;
			font-weight: bold;
			width: 100%;
			padding: 15rpx 0;
		}
		.text{
			font-size: 20rpx;
			p:nth-child(1){
				display: inline-block;
				color: #3FCB85;
			}
			p:nth-child(2){
				display: inline-block;
				color: #999999;
				padding-left: 37rpx;
			}
		}
	}
	.box:nth-child(odd){
		float: right;
	}
}
.accompanyPractice{
	width: 100%;
	padding: 30rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	>p{
		color: #313233;
		font-size: 30rpx;
		font-weight: bold;
	}
}
.accompanyPracticeList{
	width: calc(100% - 40rpx);
	margin-left: 20rpx;
	background: #FFFFFF;
	border-radius:20rpx;
	overflow: hidden;
	.box{
		width: calc(100% - 50rpx);
		height: 180rpx;
		margin-left: 25rpx;
		border-bottom: 1rpx solid #E4E4E4;
		padding: 20rpx 0;
		box-sizing: border-box;
		.logo{
			width: 112rpx;
			height: 100%;
			float: left;
			image:nth-child(1){
				width: 112rpx;
				height: 112rpx;
				display: block;
				border-radius: 50%;
			}
			image:nth-child(2){
				width: 52rpx;
				height: 30rpx;
				margin-left: 30rpx;
				display: block;
				margin-top: -15rpx;
			}
		}
		.text{
			width: calc(100% - 142rpx);
			height: 100%;
			float: right;
			.name{
				width: 100%;
				height: 44rpx;
				p{
					color: #212121;
					font-weight: bold;
					font-size: 32rpx;
					max-width: 45%;
					float: left;
					line-height: 44rpx;
				}
				span{
					height: 32rpx;
					line-height: 32rpx;
					padding: 0 10rpx;
					background:rgba(63,203,133,1);
					border-radius:4rpx;
					color: #FFFFFF;
					font-size: 20rpx;
					float: left;
					margin-left: 10rpx;
					margin-top: 6rpx;
				}
				div{
					float: right;
					line-height: 44rpx;
					text:nth-child(1){
						color: #FFA901;
						font-size: 36rpx;
						font-weight: bold;
					}
					text:nth-child(2){
						font-size: 24rpx;
						color: #65657F;
					}
				}
			}
			.label{
				width: 100%;
				color: #323232;
				font-size: 24rpx;
				padding: 15rpx 0;
			}
			.Fabulous{
				width: 100%;
				font-size: 24rpx;
				color: #999999;
			}
		}
		
	}
	.onLinebox{
		width: calc(100% - 60rpx);
		height: 170rpx;
		margin-left: 30rpx;
		margin-top: 30rpx;
		margin-bottom: 10rpx;
		float: left;
		>image{
			width:280rpx;
			height:170rpx;
			border-radius:10rpx;
			float: left;
		}
		.text{
			width: calc(100% - 300rpx);
			height: 100%;
			float: right;
			position: relative;
			.name{
				width: 100%;
				font-size: 32rpx;
				color: #323232;
				font-weight: bold;
			}
			.type{
				width: 100%;
				overflow: hidden;
				div{
					background:rgba(237,237,237,1);
					border-radius:17rpx;
					height:34rpx;
					line-height: 34rpx;
					padding: 0 10rpx;
					margin-right: 20rpx;
					float: left;
					margin-top: 15rpx;
					color: #999999;
					font-size: 18rpx;
				}
			}
			.money{
				width: 100%;
				height: 38rpx;
				position: absolute;
				bottom: 0;
				p:nth-child(1){
					float: left;
					line-height: 38rpx;
					color: #EC1919;
					font-size: 32rpx;
					font-weight: bold;
				}
				p:nth-child(2){
					float: right;
					line-height: 38rpx;
					color: #9A9A9A;
					font-size: 24rpx;
				}
			}
		}
	}
}
</style>