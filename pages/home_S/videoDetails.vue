<template>
	<div class="videoDetails">
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" indicator-color="rgba(255,255,255,0.3)" indicator-active-color="#FFFFFF">
			<swiper-item v-for="(item,index) in Obj.banner" :key="item" @click="previewImage(index)">
				<image :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<div class="details">
			<div class="title">
				<span>{{Obj.catename}}</span>
				<p class="Ellipsis">{{Obj.title}}</p>
			</div>
			<div class="text"><p>共{{Obj.chapternum}}章节</p><div class="line"></div><p>{{Obj.sales}}人购买</p></div>
		</div>
		<div class="tab">
			<div @click="isShow = 1" :class="isShow === 1 ? 'act' : ''">章节</div><div @click="isShow = 2" :class="isShow === 2 ? 'act' : ''">简介</div>
			<div @click="pageJump('/pages/home_S/course?id='+Obj.id)"><p>图文教程</p><image src="/static/home_s/course.png"></image></div>
		</div>
		<div class="box2" v-show="isShow === 2">
			<div class="user">
				<div class="logo" @click="pageJump('/pages/home_S/teacherDetails?id='+Obj.teacher.id)">
					<image :src="Obj.teacher.avatar" mode="aspectFill"><image v-if="Obj.teacher.gender !== 0" :src="Obj.teacher.gender === 2 ? '/static/home_s/woman.png':'/static/home_s/man.png'"></image>
				</div>
				<div class="text">
					<div class="name">
						<p class="Ellipsis">{{Obj.teacher.name}}</p>
						<span>{{Obj.teacher.school_name}}</span>
					</div>
					<p>{{Obj.teacher.likes_num}}人点赞</p>
				</div>
				<image @click="teacherLike" :src="Obj.teacher.is_follow === 0 ? '/static/home_s/footer1.png':'/static/home_s/footer1Act.png'"></image>
			</div>
			<div class="title">课程介绍</div>
			<div class="rich">
				<rich-text style="width: 100%;word-wrap:break-word" :nodes="Obj.content"></rich-text>
			</div>
		</div>
		<div class="box1" v-show="isShow === 1">
			<div class="item" v-for="(item,index) in Obj.chapter" :key="item.id">
				<div class="title" @click="chapterShow(index)">
					<p>{{item.name}}</p>
					<image src="/static/home_s/item1.png" :style="item.show ? 'transform:rotate(180deg)':''"></image>
				</div>
				<div class="box" v-show="item.show" v-for="(data,i) in item.children" :key="data.id">
					<p class='Ellipsis'>{{data.title}}</p>
					<div class="content">
						<span>视频</span>
						<p>时长：{{data.minute}}分{{data.second}}秒</p>
						<div class="play"><image src="/static/home_s/play.png"></image><p @click="look(index,i)">立即观看</p></div>
					</div>
				</div>
			</div>
	<!-- 		<div class="item">
				<div class="title">
					<p>第一章：基础篇</p>
					<image src="/static/home_s/item1.png"></image>
				</div>
				<div class="box">
					<p class='Ellipsis'>1.2思维导图知识</p>
					<div class="content">
						<span>视频</span>
						<p>时长：07分26秒</p>
						<div class="play"><image src="/static/home_s/play.png"></image><p>免费试看</p></div>
					</div>
					<div class="audio">
						<image src="/static/home_s/audio.png"></image>
						<div class="slider">
							<slider value="60" step="1" block-size="16" block-color="#3FCB85" :disabled="true" activeColor="#3FCB85"/>
						</div>
						<p>04:25</p>
					</div>
				</div>
			</div> -->
		</div>
		<div style="width: 100%;height: 110rpx;"></div>
		<div class="footer">
			<div class="icon">
				<div @click="praiseAndCollection(1)"><image :src="Obj.is_dianzan === 0 ? '/static/home_s/footer1.png':'/static/home_s/footer1Act.png'"></image><p>{{Obj.likes}}</p></div>
				<div @click="praiseAndCollection(2)"><image :src="Obj.is_follow === 0 ? '/static/home_s/footer2.png':'/static/home_s/footer2Act.png'"></image><p>{{Obj.coll}}</p></div>
			</div>
			<div class="sure" @click="vipSure">
				<p>立即购买</p>
				<p>会员{{Obj.vipprice}}元</p>
			</div>
		</div>
		<div class="model" v-if="isLeading">
			<div class="box">
				<image class="leading" src="/static/home_s/leading.png"></image>
				<image @click="isLeading =!isLeading" class="close" src="/static/home_s/close.png"></image>
				<p>超前点播章节</p>
				<p>需要付费后才能查看哦</p>
				<div @click="isLeadingFun">立即购买</div>
			</div>
		</div>
		<div class="model" v-if="isVideo" @click="isVideo=!isVideo">
			<video @click.stop="" :src="src"></video>
		</div>

	</div>
</template>

<script>
	const {
	  Post,previewImage
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'videoDetails',
		data() {
			return {
				isLeading:false,
				leadingMoney:0,
				chapter_id:0,
				Obj:{},
				isShow:1,
				isVideo:false,
				src:''
				
			}
		},
		onLoad(options){
			this.id = options.id
		},
		onShow(){
			this.onLoadFun()
		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			look(index,i){
				console.log(this.Obj.chapter[index].children[i])
				let _this = this
				let data = this.Obj.chapter[index].children[i]
				this.src = this.Obj.chapter[index].children[i].video_url
				if(data.status === 1){
					//普通章节 直接观看
					this.isVideo = true
				}else if(data.status === 2){
					//付费章节 
					if(this.Obj.is_vip === 1){
						//是会员直接观看
						this.isVideo = true
					}else{
						uni.showModal({
							title: '提醒',
							content: '此为付费章节，开通会员即可免费观看',
							cancelText: '暂不开通',
							confirmText: '去开通',
							confirmColor: '#3FCB85',
							success: function(res) {
								if (res.confirm) {
									console.log('用户点击确定');
									_this.pageJump('/pages/user_S/vip')
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}else{
					//超前章节
					if(data.is_chaoqian === 1){
						//已购买 直接观看
						this.isVideo = true
					}else{
						this.isLeading = !this.isLeading
						this.leadingMoney = data.price
						this.chapter_id = data.id
					}
				}
			},
			isLeadingFun(){
				Post('api/Order/getUserPay', {
					uniacid: 16,
					user_id: main.userID,
					openid: main.openID,
					types: 'chapter',
					price: this.leadingMoney,
					chapter_id:this.chapter_id,
					cid:this.Obj.id,
				}).then(res => {
					console.log(res)
					wx.requestPayment({
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package:res.package,
						signType: res.signType,
						paySign: res.paySign,
						success(res) {
							console.log(1)
							main.showToast('支付成功')
							this.onLoadFun()
						},
						fail(res) {
							console.log(2)
						}
					})
				})
			},
			vipSure(){
				if(main.userID === ''){
					main.toLoing()
					return false
				}
				if(this.Obj.is_vip === 0){
					this.pageJump('/pages/user_S/vip')
				}else{
					main.showToast('您现在已是会员！可以免费观看')
				}
			},
			praiseAndCollection(type){
				if(main.userID === ''){
					main.toLoing()
					return false
				}
				Post('api/curriculum/set_like',{
					cid:this.Obj.id,
					user_id:main.userID,
					type
				}).then(res => {
					console.log(res)
					if(type === 1){
						main.showToast(this.Obj.is_dianzan === 0 ?'点赞成功':'取消成功')
						this.Obj.likes =  this.Obj.is_dianzan === 0 ? this.Obj.likes+1 : this.Obj.likes-1
						this.Obj.is_dianzan = this.Obj.is_dianzan === 0 ? 1 : 0
					}else{
						main.showToast(this.Obj.is_follow === 0 ?'收藏成功':'取消成功')
						this.Obj.coll =  this.Obj.is_follow === 0 ? this.Obj.coll+1 : this.Obj.coll
						this.Obj.is_follow = this.Obj.is_follow === 0 ? 1 : 0
					}
				})
				
			},
			teacherLike(){
				if(main.userID === ''){
					main.toLoing()
					return false
				}
				Post('api/teacher/set_like',{
					teacher_id:this.Obj.teacher_id,
					user_id:main.userID,
				}).then(res => {
					let type = this.Obj.teacher.is_follow
					main.showToast(type === 0?'点赞成功':'取消成功')
					this.Obj.teacher.likes_num = type === 0 ? this.Obj.teacher.likes_num+1 : this.Obj.teacher.likes_num-1
					this.Obj.teacher.is_follow = type === 0 ? 1 : 0
				})
				
			},
			onLoadFun(){
				Post('api/curriculum/curriculuminfo',{
					id:this.id,
					user_id:main.userID
				}).then(res => {
					res.chapter.forEach(item => {
						item.show = false
					})
					res.content = res.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
					this.Obj = res
				})
				
			},
			chapterShow(i){
				this.Obj.chapter[i].show = !this.Obj.chapter[i].show
			},
			previewImage(i){
				previewImage(i,this.Obj.banner)
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
	height:160rpx;
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
		span{
			padding: 0 15rpx;
			height:38rpx;
			background:rgba(63,203,133,0.14);
			border-radius:19rpx;
			color: #3FCB85;
			font-size: 24rpx;
			float: left;
		}
		p{
			width: 80%;
			color: #232323;
			font-size: 34rpx;
			font-weight: bold;
			line-height: 38rpx;
			margin-left: 15rpx;
			float: left;
		}
	}
	.text{
		width: 100%;
		display: flex;
		align-items: center;
		padding-top: 35rpx;
		p{
			font-size: 26rpx;
			line-height: 26rpx;
		}
		p:nth-child(1){
			color: #7B7F93;
		}
		p:nth-child(3){
			color: #A7ABBB;
		}
		.line{
			width: 1rpx;
			height: 24rpx;
			background: #CFCFD7;
			margin:  0 15rpx;
		}
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
	div:nth-child(3){
		width:200rpx;
		height:68rpx;
		background:rgba(255,169,1,1);
		border-radius:34rpx 0px 0px 34rpx;
		float: right;
		display: flex;
		align-items: center;
		justify-content: center;
		p{
			font-size: 32rpx;
			color: #FFFFFF;
			line-height: 32rpx;
		}
		image{
			width: 8rpx;
			height: 14rpx;
			margin-left: 20rpx;
		}
	}
}
.box1{
	width: 100%;
	overflow: hidden;
	.item{
		width: 100%;
		overflow: hidden;
		.title{
			width: 100%;
			height: 80rpx;
			background: #F7F9F9;
			padding: 0 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			p{
				color: #29323D;
				font-size: 28rpx;
			}
			image{
				width: 17rpx;
				height: 10rpx;
			}
		}
		.box{
			width: 100%;
			overflow: hidden;
			padding: 10rpx 30rpx 10rpx 75rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			>p{
				width: 100%;
				font-size: 30rpx;
				color: #29323D;
				font-weight: bold;
				padding-top: 10rpx;
			}
			.content{
				width: 100%;
				height: 53rpx;
				padding-top: 15rpx;
				span{
					height:32rpx;
					padding: 0 10rpx;
					border:1rpx solid rgba(167,171,187,1);
					border-radius:10rpx;
					color: #A7ABBB;
					font-size: 22rpx;
					line-height: 32rpx;
					float: left;
					margin-top: 10rpx;
				}
				>p{
					float: left;
					color: #A7ABBB;
					font-size: 26rpx;
					line-height: 53rpx;
					margin-left: 15rpx;
				}
				.play{
					width:174rpx;
					height:53rpx;
					background:rgba(255,255,255,1);
					border:1rpx solid rgba(41,49,61,1);
					border-radius:26rpx;
					box-sizing: border-box;
					float: right;
					display: flex;
					align-items: center;
					justify-content: center;
					color: #29323D;
					font-size: 26rpx;
					image{
						width: 30rpx;
						height: 30rpx;
					}
					p{
						color: #29323D;
						font-size: 26rpx;
						line-height: 26rpx;
						margin-left: 10rpx;
					}
				}
			}
			.audio{
				width: 100%;
				height: 50rpx;
				image{
					width: 30rpx;
					height: 30rpx;
					float: left;
					margin-top: 10rpx;
				}
				.slider{
					width: 80%;
					height: 100%;
					margin-left: 15rpx;
					display: flex;
					align-items: center;
					float: left;
					slider{
						width: 100%;
						margin: 0;
					}
				}
				p{
					font-size: 20rpx;
					color: #A7ABBB;
					float: right;
					line-height: 50rpx;
				}
			}
		}
	}
}
.box2{
	width: 100%;
	overflow: hidden;
	.user{
		width: 100%;
		height: 120rpx;
		padding: 0 30rpx;
		margin-top: 40rpx;
		box-sizing: border-box;
		box-shadow:0px 15px 10px -15px #ccc;
		.logo{
			width: 100rpx;
			height: 100%;
			float: left;
			image:nth-child(1){
				width: 100rpx;
				height: 100rpx;
				display: block;
				border-radius: 50%;
			}
			image:nth-child(2){
				width: 52rpx;
				height: 30rpx;
				margin-left: 24rpx;
				display: block;
				margin-top: -15rpx;
			}
		}
		.text{
			width: calc(100% - 130rpx - 60rpx);
			height: 100%;
			float: left;
			margin-left: 30rpx;
			.name{
				width: 100%;
				height: 44rpx;
				padding-top: 10rpx;
				p{
					color: #29323D;
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
			}
			>p{
				width: 100%;
				font-size: 24rpx;
				color: #29323D;
				padding-top: 10rpx;
			}
		}
		>image{
			width: 40rpx;
			height: 40rpx;
			float: right;
			margin-top: 40rpx;
		}
	}
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
	}
}
.footer{
	width:100%;
	height:110rpx;
	background:rgba(255,255,255,1);
	box-shadow:-1px -1px 0px 0px rgba(221,221,221,1);
	position: fixed;
	bottom: 0;
	.icon{
		width: 50%;
		height: 100%;
		float: left;
		div{
			height: 100%;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			float: left;
			margin-left: 50rpx;
			margin-right: 20rpx;
			image{
				width: 40rpx;
				height: 38rpx;
			}
			p{
				color: #818181;
				font-size: 24rpx;
				padding-top: 5rpx;
			}
		}
	}
	.sure{
		width:300rpx;
		height:110rpx;
		background:linear-gradient(90deg,rgba(243,223,141,1) 0%,rgba(247,199,77,1) 100%);
		float: right;
		display: flex;
		justify-content: center;
		flex-direction: column;
		p{
			width: 100%;
			text-align: center;
			color: #A96700;
		}
		p:nth-child(1){
			font-size: 30rpx;
		}
		p:nth-child(2){
			font-size: 22rpx;
			padding-top: 5rpx;
		}
		
	}
}
.model{
	width: 100%;
	height: 100%;
	position: fixed;
	background: rgba(0,0,0,.5);
	top: 0;
	z-index: 3;
	video{
		width: 80%;
		height: 400rpx;
		background: #000000;
		position: absolute;
		top: 200rpx;
		left: 10%;
	}
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
			top: 400rpx;
		}
		p:nth-child(4){
			color: #999999;
			font-size: 28rpx;
			top: 470rpx;
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
			top: 550rpx;
			left: 122rpx;
		}
	}
}
</style>
