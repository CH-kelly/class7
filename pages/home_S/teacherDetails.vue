<template>
	<div class='teacherDetails'>
		<div class="user">
			<image class="BJ" src="/static/bj.png" mode="aspectFill"></image>
			<div class="logo">
				<image :src="details.avatar" mode="aspectFill"></image>
				<image v-if="details.gender !== 0" :src="details.gender === 2 ? '/static/home_s/woman.png':'/static/home_s/man.png'"></image>
			</div>
			<p>{{details.name}}</p>
			<!-- <h1>【批判性思维工具】</h1> -->
			<div class="label"><span>{{details.school_name}}</span></div>
		</div>
		<div class="introduction">
			<p>老师简介</p>
			<text>{{details.introduction}}</text>
		</div>

	</div>
</template>

<script>
	const {
		Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'teacherDetails',
		data() {
			return {
				details:{}
			}
		},
		onLoad(optinos){
			Post('api/Teacher/getTeacherIntr', {
				teacher_id: optinos.id
			}).then(res => {
				console.log(res)
				this.details = res
			})

		},
		onShow(){

		},
		methods: {

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

	.introduction{
		width: 100%;
		min-height: 300rpx;
		background: #FFFFFF;
		margin-top: -170rpx;
		p{
			width: 100%;
			text-align: center;
			color: #191919;
			font-size: 34rpx;
			font-weight: bold;
			padding-top: 30rpx;
			padding-bottom: 40rpx;
		}
		text{
			width: calc(100% - 80rpx);
			margin-left: 40rpx;
			color: #515955;
			font-size: 28rpx;
		}
	}
</style>
