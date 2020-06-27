<template>
	<div class="appointmentDetails">
		<div class="user">
			<image class="BJ" src="/static/bj.png" mode="aspectFill"></image>
			<div class="logo">
				<image :src="detail.avatar" mode="aspectFill"></image>
				<image v-if="detail.gender !== 0" :src="detail.gender === 2 ? '/static/home_s/woman.png':'/static/home_s/man.png'"></image>
			</div>
			<p>{{detail.name}}</p>
			<div class="label"><span>{{detail.school_name}}</span></div>
			<div class="num">
				<p>教程{{detail.cur_num}}</p><div class="line"></div><p>点赞{{detail.likes_num}}</p>
			</div>
			<div class="time">
				<image src="/static/study/time.png"></image>
				<text>{{detail.time}}</text>
			</div>
			<!-- <div class="title">预约课程</div> -->
		</div>
<!-- 		<div class="item">
			<div class="box">
				<image src="/static/logo.jpg" mode="aspectFill"></image>
				<div class="text">
					<div class="name Ellipsis">商业的本质商业的本质商业的本质</div>
					<div class="type"><div>视频</div><p>39章节</p></div>
					<div class="Fabulous">
						<p>375人点赞</p>
						<image src="/static/logo.jpg"></image>
					</div>
				</div>
			</div>
			<div class="sure" @click="notYet=!notYet">发起陪练</div>
		</div> -->
		<div class="sure" @click="sure()">发起陪练</div>
		<i v-if="curriculum.length !== 0">Ta的全部课程</i>
		<div class="box" v-for="(item,index) in curriculum" :key="item.id">
			<image :src="item.img" mode="aspectFill"></image>
			<div class="text">
				<div class="name Ellipsis">{{item.title}}</div>
				<div class="type"><div>视频</div><p>{{item.chapter}}章节</p></div>
				<div class="Fabulous">
					<p>{{item.like_num}}人点赞</p>
					<image :src="item.coll_num === 0 ?'/static/home_s/footer2.png':'/static/home_s/footer2Act.png'"></image>
				</div>
			</div>
		</div>
		<div class="model" v-if="notYet"> 
			<div class="box">
				<image class="leading" src="/static/study/notYet.png"></image>
				<image @click="notYet=!notYet" class="close" src="/static/home_s/close.png"></image>
				<p>未到指定时间</p>
				<p>请在指定时间内发起陪练哦</p>
				<div>确定</div>
			</div>
		</div>
		<div class="model" v-if="Completed"> 
			<div class="complete">
				<image @click="Completed=!Completed" class="close" src="/static/home_s/close.png"></image>
				<p>陪练已完成</p>
				<p>快给此次陪练点个赞吧!</p>
				<image class="completeIMG" src="/static/study/notYet.png"></image>
				<p>点个赞</p>
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
		name: 'appointmentDetails',
		data() {
			return {
				notYet:false,
				Completed:false,
				detail:{},
				curriculum:[],
				type:-1 //1暂未到时间 //2时间内 // 3时间已过
			}
		},
		onLoad(options){
			Post('api/Teacher/trainerDetail',{
				tid:options.id, 
				yid:options.yid,
				user_id:main.userID,
				uniacid:16
			}).then(res => {
				this.detail = res.detail
				this.curriculum = res.curriculum
				console.log(res.detail.start_time)
				console.log(res.detail.end_time)
				console.log(new Date().getTime())
				if(res.detail.start_time > new Date().getTime()){
					this.type = 1
				}else if(res.detail.end_time > new Date().getTime()){
					this.type = 2
				}else{
					this.type = 3
					if(res.detail.status === 2){
						this.Completed = true	
					}
				}
			})
		},
		onShow(){

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			sure(){
				if(this.detail.start_time > new Date().getTime()){
					this.type = 1
					this.notYet = true
				}else if(this.detail.end_time > new Date().getTime()){
					this.type = 2
				}else{
					this.type = 3
					if(this.detail.status === 2){
						this.Completed = true	
					}
				}
				
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
<style>
	page{
		background: #EBEFF1;
	}
</style>
<style lang="scss" scoped>
.user{
	width: 100%;
	// height: 470rpx;
	height: 410rpx;
	position: relative;
	.BJ{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -1;
	}
	.logo{
		width: 148rpx;
		height: 163rpx;
		margin: 0 301rpx;
		image:nth-child(1){
			width: 148rpx;
			height: 148rpx;
			border-radius: 50%;
			display: block;
		}
		image:nth-child(2){
			width: 52rpx;
			height: 30rpx;
			display: block;
			margin-top: -15rpx;
			margin-left: 48rpx;
		}
	}
	>p{
		width: 100%;
		color: #006B36;
		font-size: 28rpx;
		text-align: center;
		padding: 15rpx 0 10rpx 0;
	}
	.label{
		width: 100%;
		display:flex;
		justify-content: center;
		padding-top: 15rpx;
		span{
			height:32rpx;
			padding: 0 10rpx;
			background:rgba(49,189,119,1);
			border-radius:4rpx;
			color: #FFFFFF;
			font-size: 20rpx;
			line-height: 32rpx;
		}
	}
	.num{
		width: 100%;
		height: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
		p{
			font-size: 28rpx;
			width: 40%;
			text-align: right;
		}
		p:nth-child(3){
			text-align: left;
		}
		.line{
			width: 2rpx;
			height: 30rpx;
			background: #000000;
			margin: 0 60rpx;
		}
	}
	.time{
		width:450rpx;
		height:50rpx;
		background:rgba(49,189,119,1);
		border-radius:20rpx 20rpx 0px 0px;
		margin-left: 150rpx;
		margin-top: 30rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		image{
			width: 30rpx;
			height: 30rpx;
			margin-right: 15rpx;
		}
	}
	.title{
		width:710rpx;
		margin-left: 20rpx;
		line-height: 60rpx;
		color: #29323D;
		font-size: 26rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-radius:20rpx 20rpx 0 0 ;
		background: #FFFFFF;
	}
}
.sure{
	width:290rpx;
	height:80rpx;
	line-height: 80rpx;
	text-align: center;
	background:rgba(63,203,133,1);
	box-shadow:0px 10rpx 20rpx 0px rgba(0,107,54,0.2);
	border-radius:40rpx;
	color: #FFFFFF;
	font-size: 34rpx;
	margin-left: 210rpx;
	margin-top: 40rpx;
}
// .item{
// 	width:710rpx;
// 	height: 275rpx;
// 	background:rgba(255,255,255,1);
// 	margin-left: 20rpx;
// 	border-radius:0 0 20rpx 20rpx ;
// }
.box{
	width: calc(100% - 60rpx);
	height: 170rpx;
	margin-bottom: 10rpx;
	margin-left: 30rpx;
	padding-top: 20rpx;
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
			height: 34rpx;
			font-size: 26rpx;
			color: #7B8195;
			line-height: 34rpx;
			margin-top: 15rpx;
			div{
				height:34rpx;
				padding: 0 10rpx;
				background:rgba(63,203,133,1);
				border-radius:16rpx 17rpx 17rpx 6rpx;
				margin-right: 15rpx;
				float: left;
				color: #FFFFFF;
			}
		}
		.Fabulous{
			width: 100%;
			height: 38rpx;
			position: absolute;
			bottom: 0;
			p{
				float: left;
				line-height: 38rpx;
				color: #9A9A9A;
				font-size: 24rpx;
			}
			image{
				width: 40rpx;
				height: 38rpx;
				display: block;
				float: right;
			}
		}
	}
}
i{
	width: calc(100% - 60rpx);
	color: #29323D;
	font-size: 26rpx;
	margin-left: 30rpx;
	padding-top: 80rpx;
}
.model{
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0,0,0,.5);
	top: 0;
	z-index: 3;
	.box{
		width: 654rpx;
		height: 724rpx;
		position: absolute;
		top: 200rpx;
		left: 48rpx;
		.leading{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
		}
		.close{
			width: 23rpx;
			height: 23rpx;
			position: absolute;
			top:82rpx;
			right: 72rpx;
		}
		p{
			width: 100%;
			text-align: center;
			position: absolute;
		}
		p:nth-child(3){
			color: #FFA901;
			font-size: 36rpx;
			font-weight: bold;
			top: 410rpx;
		}
		p:nth-child(4){
			color: #999999;
			font-size: 28rpx;
			top: 480rpx;
		}
		div{
			width:410rpx;
			height:80rpx;
			background:rgba(255,169,1,1);
			border-radius:40rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			line-height: 80rpx;
			text-align: center;
			position: absolute;
			top: 560rpx;
			left: 122rpx;
		}
	}
	.complete{
		width: 550rpx;
		height: 530rpx;
		position: absolute;
		top: 200rpx;
		left:100rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		.close{
			width: 23rpx;
			height: 23rpx;
			position: absolute;
			top:30rpx;
			right: 20rpx;
		}
		p{
			width: 100%;
			text-align: center;
		}
		p:nth-child(2){
			color: #FFA901;
			font-size: 36rpx;
			font-weight: bold;
			padding-top: 65rpx;
		}
		p:nth-child(3){
			color: #999999;
			font-size: 28rpx;
			font-weight: bold;
			padding-top: 15rpx;
		}
		.completeIMG{
			width: 167rpx;
			height: 154rpx;
			margin-left: 191rpx;
			margin-top: 80rpx;
		}
		p:nth-child(5){
			color: #212121;
			font-size: 32rpx;
			font-weight: bold;
			padding-top: 40rpx;
		}
	}
}

</style>