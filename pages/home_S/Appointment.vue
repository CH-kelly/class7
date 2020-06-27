<template>
	<div class="Appointment">
		<div class="user">
			<image class="BJ" src="/static/bj.png" mode="aspectFill"></image>
			<div class="logo">
				<image @click="pageJump('/pages/home_S/teacherDetails?id='+teacher.id)" :src="teacher.avatar" mode="aspectFill"></image>
				<image v-if="teacher.gender !== 0" :src="teacher.gender === 2 ? '/static/home_s/woman.png':'/static/home_s/man.png'"></image>
			</div>
			<p>{{teacher.name}}</p>
			<!-- <h1>【批判性思维工具】</h1> -->
			<div class="label"><span>{{teacher.school_name}}</span></div>
			<div class="num">
				<p>教程{{teacher.curriculum_num}}</p>
				<div class="line"></div>
				<p>点赞{{teacher.likes_num}}</p>
			</div>
		</div>
		<div class="Day">
			<div class="title">预约日期</div>
			<div class="week">
				<block v-for="(item,index) in week" :key="index">
					<div v-if="index<7">{{item.week}}</div>
				</block>
			</div>
			<div class="list">
				<block v-for="(item,index) in week" :key="index">
					<div @click="weekClick(index)" v-if="index<showTime" :class="index === weekIndex ? 'act div' :'div'" >
						<p>{{item.day}}</p>
						<p>{{item.mouth}}</p>
					</div>
				</block>
				<div class="Triangle" @click="Triangle"></div>
			</div>
		</div>
		<div class="title">预约时间</div>
		<div class="time">
			<div @click="timeClick(index)" v-for="(item,index) in time" :key="index" :class="timeIndex === index ? 'act':''">{{item.date}}</div>
		</div>
		<div class="remind" v-if="time.length === 0">暂无可预约时间</div>
		<div class="sure" @click="sure">预约</div>
	</div>
</template>

<script>
	const {
		Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'Appointment',
		data() {
			return {
				teacher: {},
				week: [],
				weekIndex: 0,
				time: [],
				timeIndex: 0,
				money:'',
				showTime:14
			}
		},
		onLoad(optinos) {
			this.money = optinos.money
			Post('api/Teacher/getBookDetail', {
				tid: optinos.id
			}).then(res => {
				console.log(res)
				this.teacher = res.teacher
				this.week = res.week
				this.time = res.yuyuetime
			})
		},
		onShow() {

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			Triangle(){
				this.showTime = this.showTime === 14 ? 32 : 14
			},
			sure() {
				if (this.time.length === 0) {
					main.showToast('暂无可预约时间')
					return false
				}
				Post('api/Order/getUserPay', {
					uniacid: 16,
					user_id: main.userID,
					openid: main.openID,
					types: 'teacher',
					price: this.money,
					tid: this.time[this.timeIndex].teacher_id,
					yuyue_id: this.time[this.timeIndex].id,
					start_time: this.time[this.timeIndex].starttime,
					end_time: this.time[this.timeIndex].endtime,
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
						},
						fail(res) {
							console.log(2)
						}
					})
				})
			},
			timeFun() {
				Post('api/teacher/getBookTime', {
					tid: this.teacher.id,
					date: this.week[this.weekIndex].time
				}).then(res => {
					console.log(res)
					this.time = res
				})
			},
			weekClick(i) {
				this.weekIndex = i
				this.timeFun()
			},
			timeClick(i) {
				this.timeIndex = i
			}



		},

		filters: {
			//过滤器
		},
		onReachBottom() {
			//滚动到底部
		},
	}
</script>

<style lang="scss" scoped>
	.user {
		width: 100%;
		height: 470rpx;
		position: relative;

		.BJ {
			width: 100%;
			height: 100%;
			position: absolute;
			z-index: -1;
		}

		.logo {
			width: 148rpx;
			height: 163rpx;
			margin: 0 301rpx;

			image:nth-child(1) {
				width: 148rpx;
				height: 148rpx;
				border-radius: 50%;
				display: block;
			}

			image:nth-child(2) {
				width: 52rpx;
				height: 30rpx;
				display: block;
				margin-top: -15rpx;
				margin-left: 48rpx;
			}
		}

		>p {
			width: 100%;
			color: #006B36;
			font-size: 28rpx;
			text-align: center;
			padding: 15rpx 0 10rpx 0;
		}

		h1 {
			width: 100%;
			color: #FFFFFF;
			font-size: 40rpx;
			font-weight: bold;
			text-align: center;
		}

		.label {
			width: 100%;
			display: flex;
			justify-content: center;
			padding-top: 15rpx;

			span {
				height: 32rpx;
				padding: 0 10rpx;
				background: rgba(49, 189, 119, 1);
				border-radius: 4rpx;
				color: #FFFFFF;
				font-size: 20rpx;
				line-height: 32rpx;
			}
		}

		.num {
			width: 100%;
			height: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 30rpx;

			p {
				font-size: 28rpx;
				width: 40%;
				text-align: right;
			}

			p:nth-child(3) {
				text-align: left;
			}

			.line {
				width: 2rpx;
				height: 30rpx;
				background: #000000;
				margin: 0 60rpx;
			}
		}
	}

	.Day {
		width: 100%;
		background: #FFFFFF;
		overflow: hidden;
		margin-top: -110rpx;

		.week {
			width: 100%;
			padding: 0 20rpx;
			color: #A9A9A9;
			font-size: 24rpx;
			box-sizing: border-box;

			div {
				width: calc(100% / 7);
				float: left;
				text-align: center;
			}
		}
		
		.list {
			width: calc(100% - 40rpx);
			margin-left: 20rpx;
			box-sizing: border-box;
			border-bottom: 1rpx solid #E1E1E1;
			padding-bottom: 25rpx;
			overflow: hidden;
			position: relative;
			.Triangle{
				position:absolute;
				width: 0;
				height: 0;
				border-width: 0 10rpx 15rpx;
				border-style: solid;
				border-color: transparent transparent rgba(71, 205, 139, 1);
				bottom: 0;
				left: 50%;
				margin-left: -10rpx;
			}
			.div {
				width: calc(100% / 7);
				height: 92rpx;
				float: left;
				text-align: center;
				border-radius: 10rpx;
				margin-top: 15rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;

				p {
					width: 100%;
					text-align: center;
				}

				p:nth-child(1) {
					color: #505050;
					font-size: 40rpx;
					font-weight: bold;
					line-height: 40rpx;
				}

				p:nth-child(2) {
					color: #BBBBBB;
					font-size: 20rpx;
					line-height: 20rpx;
					padding-top: 10rpx;
				}
			}

			.act {
				background: linear-gradient(180deg, rgba(71, 205, 139, 1) 0%, rgba(49, 183, 131, 1) 100%);
				box-shadow: 0px 6px 15px 0px rgba(41, 142, 102, 0.16);

				p:nth-child(1) {
					color: #FFFFFF;
				}

				p:nth-child(2) {
					color: #FFFFFF;
				}
			}
			

		}
	}

	.title {
		width: 100%;
		text-align: center;
		color: #191919;
		font-size: 34rpx;
		font-weight: bold;
		padding: 30rpx 0;
	}

	.time {
		width: calc(100% - 130rpx);
		margin-left: 65rpx;
		overflow: hidden;

		div {
			width: 170rpx;
			height: 58rpx;
			border-radius: 29rpx;
			box-sizing: border-box;
			text-align: center;
			line-height: 58rpx;
			font-size: 24rpx;
			border: 1rpx solid #BEBEBE;
			color: #BBBBBB;
			margin-bottom: 35rpx;
			float: left;
			margin-right: 53rpx;
		}

		.act {
			color: #59B76F;
			border: 1rpx solid rgba(63, 203, 133, 1);
		}

		div:nth-child(3n) {
			margin-right: 0;
		}
	}

	.remind {
		width: 100%;
		padding: 50rpx 0;
		text-align: center;
		font-size: 26rpx;
		color: #808080;
	}

	.sure {
		width: 670rpx;
		height: 80rpx;
		background: rgba(63, 203, 133, 1);
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 34rpx;
		color: #FFFFFF;
		margin-left: 40rpx;
	}
</style>
