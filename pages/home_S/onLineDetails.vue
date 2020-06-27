<template>
	<div class="onLineDetails">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" indicator-color="#FFFFFF" indicator-active-color="rgba(255,255,255,0.3)">
			<swiper-item v-for="(item,index) in detail.imgs" :key="index">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<div class="details">
			<div class="title Ellipsis">{{detail.title}}</div>
			<div class="money">¥{{detail.price}}</div>
			<div class="Equity">
				<p>{{detail.sign_num}}人已报名</p>
				<div class="line"></div>
				<block v-for="(item,index) in detail.service" :key="index">
					<image src="/static/home_s/Equity.png"></image>
					<p>{{item}}</p>
				</block>
			</div>
		</div>
		<div class="class">
			<div @click="classFun(index)" :class="classID === item.id ?'box act':'box'" v-for="(item,index) in classData" :key="item.id">
				<div class="name Ellipsis">{{item.name }}</div>
				<div class="time">{{item.week}} {{item.one_time}}</div>
				<div class="num"><p>学员:{{item.total_num}}人</p><span :class="item.only ===1 ?'spanNO':'spanYES'">{{item.only | only}}</span><p>共{{item.count}}节课</p></div>
			</div>
		</div>
		<div class="tab">
			<div @click="isShow = 1" :class="isShow===1?'act':''">课程</div><div @click="isShow = 2" :class="isShow===2?'act':''">简介</div>
		</div>
		<div class="box2" v-show="isShow === 2">
			<div class="title">课程介绍</div>
			<div class="rich">
				{{detail.introduce}}
				<!-- <rich-text style="width: 100%;word-wrap:break-word" :nodes="detail.introduce"></rich-text> -->
			</div>
		</div>
		<div class="box1" v-show="isShow === 1">
			<div class="box" v-for="(item,index) in chapterData" :key="index">
				<text>第{{index+1}}课</text>
				<div class="text">
					<p class="Ellipsis">{{item.name}}</p>
					<p>{{item.time}}</p>
				</div>
			</div>
		</div>
		<div style="width: 100%;height: 100rpx;"></div>
		<div class="sure" @click="sure"><div>立即购买</div></div> 

	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'onLineDetails',
		data() {
			return {
				detail:{},
				chapterData:[],
				classData:[],
				classID:'',
				isShow:1
			}
		},
		onLoad(options){
			Post('api/Sowing/getSowingDetail',{
				uniacid:16,
				id:options.id,
				suid:main.userID
			}).then(res => {
				console.log(res)
				// res.detail.introduce = res.detail.introduce.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
				this.detail = res.detail
				this.chapterData = res.chapterData
				this.classData = res.classData
			})

		},
		onShow(){

		},
		methods: {
			sure(){
				Post('api/Video/getSig',{
					user_id:main.userID,
					type:'curriculum',
					status_id:4
				}).then(res => {
					this.pageJump('/pages/home_S/liveBroadcastDetails?SdkAppid='+res.SdkAppid+'&roomID='+res.roomID+'&userID='+res.userID+'&userSig='+res.userSig+'&teacher_open_id='+res.teacher_open_id+'&nickName='+res.nickName+'&user_avatar='+res.user_avatar)
				})
			},
			classFun(i){
				if(this.classData[i].only === 1){
					main.showToast('此班级学员已满')
				}else{
					this.classID = this.classData[i].id
				}
			},
			pageJump(url) {
				main.pageJump(url)
			},

		},

		filters: {
			//过滤器
			only(text){
				return text===1?'已满':'可报名'
			}
		},
		onReachBottom(){
			//滚动到底部
		},
	}
</script>

<style lang="scss" scoped>
.swiper{
	width: 100%;
	height:380rpx;
	line-height: 50rpx;
	image{
		width: 100%;
		height: 100%;
	}
}
.details{
	width:100%;
	background:rgba(255,255,255,1);
	border-radius:20rpx 20rpx 0px 0px;
	padding: 0 30rpx;
	box-sizing: border-box;
	margin-top: -30rpx;
	position: relative;
	z-index: 2;
	.title{
		width: 100%;
		height: 38rpx;
		padding-top: 30rpx;
		color: #232323;
		font-size: 34rpx;
		font-weight: bold;
		line-height: 38rpx;
	}
	.money{
		width: 100%;
		height: 38rpx;
		padding-top: 30rpx;
		color: #EC1919;
		font-size: 34rpx;
		font-weight: bold;
	}
	.Equity{
		width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-top: 30rpx;
		p{
			color: #7B7F93;
			font-size: 24rpx;
			margin-right: 15rpx;
		}
		.line{
			width:1px;
			height:24rpx;
			background:rgba(187,187,187,1);
			margin-right: 15rpx;
		}
		image{
			width: 26rpx;
			height: 26rpx;
			margin-right: 15rpx;
			display: block;
		}
	}
}
.class{
	width: 100%;
	height: 186rpx;
	overflow-x: scroll;
	overflow-y: hidden;
	padding-left: 30rpx;
	box-sizing: border-box;
	margin-top: 35rpx;
	white-space:nowrap;
	.box{
		width:405rpx;
		height:186rpx;
		background:rgba(245,245,245,1);
		border-radius:20rpx;
		padding: 20rpx;
		box-sizing: border-box;
		margin-right: 25rpx;
		display: inline-block;
		border:2rpx solid rgba(245,245,245,1);
		.name{
			width: 100%;
			font-size: 30rpx;
			color: #29323D;
			font-weight: bold;
			float: left;
		}
		.time{
			width: 100%;
			font-size: 22rpx;
			color: #7B7F93;
			float: left;
			padding-top: 10rpx;
		}
		.num{
			width: 100%;
			height: 30rpx;
			float: left;
			margin-top: 30rpx;
			p:nth-child(1){
				color: #E92121;
				font-size: 25rpx;
				float: left;
				line-height: 30rpx;
			}
			span{
				border-radius:8rpx;
				height: 30rpx;
				padding: 0 10rpx;
				color: #FFFFFF;
				font-size: 20rpx;
				float: left;
				margin: 0 20rpx;
			}
			.spanNO{
				background:rgba(226,46,46,1);
			}
			.spanYES{
				background:#84A437;
			}
			p:nth-child(3){
				color: #656565;
				font-size: 25rpx;
				float: left;
				line-height: 30rpx;
			}
		}
	}
	.act{
		background:rgba(226,247,236,1);
		border:2rpx solid rgba(63, 203, 133, 1);
		box-shadow:0px 0px 10rpx 0px rgba(63,203,133,0.22);
	}
}
.tab{
	width: 100%;
	height: 90rpx;
	border-bottom: 1rpx solid rgb(237,237,237);
	div:nth-child(1),div:nth-child(2){
		color: #656565;
		font-size: 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		float: left;
		margin-left: 50rpx;
		margin-right: 90rpx;
	}
	.act{
		color: #000000;
		font-size: 36rpx;
		font-weight: bold;
		position: relative;
	}
	.act::after{
		content: '';
		width:56rpx;
		height:8rpx;
		background:rgba(63,203,133,1);
		border-radius:4rpx;
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -28rpx;
	}
}
.box1{
	width: 100%;
	overflow: hidden;
	padding: 0 35rpx;
	box-sizing: border-box;
	.box{
		width: 100%;
		height: 100rpx;
		margin-top: 30rpx;
		margin-bottom: 20rpx;
		text{
			width: 100rpx;
			color: #999999;
			font-size: 28rpx;
			float: left;
		}
		.text{
			width: calc(100% - 130rpx);
			height: 100%;
			float: right;
			p{
				width: 100%;
			}
			p:nth-child(1){
				font-size: 28rpx;
				color: #29323D;
				font-weight: bold;
			}
			p:nth-child(2){
				font-size: 22rpx;
				color: #7B7F93;
				padding-top: 10rpx;
			}
		}
	}
}
.box2{
	width: 100%;
	overflow: hidden;
	.title{
		width: 100%;
		color: #29323D;
		font-size: 36rpx;
		font-weight: bold;
		padding: 30rpx;
		box-sizing: border-box;
	}
	.rich{
		width: 100%;
		padding:0 30rpx;
		box-sizing: border-box;
		font-size: 28rpx;
		line-height: 40rpx;
	}
}
.sure{
	width: 100%;
	height: 100rpx;
	position: fixed;
	bottom: 0;
	background: #FFFFFF;
	div{
		width:680rpx;
		height:80rpx;
		line-height: 80rpx;
		background:linear-gradient(90deg,rgba(243,223,141,1) 0%,rgba(247,199,77,1) 100%);
		border-radius:39rpx;
		margin-left: 35rpx;
		color: #A96700;
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
	}
}
</style>