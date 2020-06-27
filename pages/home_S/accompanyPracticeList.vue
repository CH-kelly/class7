<template>
	<div class="accompanyPracticeList">
		<scroll-view class="tab" scroll-x="true" >
			<div @click="tabFun(index)" v-for="(item,index) in tabList" :key="index" :class="tabIndex === index ? 'act' : ''">{{item.name}}</div>
		</scroll-view>
		<div class="box" @click="pageJump('/pages/home_S/Appointment?id='+item.id+'&money='+item.trainer_money)" v-for="(item,index) in List" :key="index">
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
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'accompanyPracticeList',
		data() {
			return {
				tabList:[],
				tabIndex:0,
				page:0,
				cateid:'',
				List:[]
			}
		},
		onLoad(){
			Post('api/teacher/teacher_cate').then(res => {
				console.log(res)
				this.tabList = res
			})
			this.onLoadFun()
		},
		onShow(){

		},
		methods: {
			tabFun(i){
				this.tabIndex = i
				this.page = 0
				this.cateid = this.tabList[i].id
				this.List = []
				this.onLoadFun()
			},
			pageJump(url) {
				main.pageJump(url)
			},
			onLoadFun(){
				Post('api/teacher/index',{
					page:this.page,
					cateid:this.cateid
				}).then(res => {
					console.log(res)
					this.List = this.List.concat(res.list)
					this.page += 1
				})
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
.tab{
	width: 100%;
	height: 100rpx;
	border-bottom: 1rpx solid #ECECEC;
	box-sizing: border-box;
	white-space: nowrap;
	div{
		width: 33.3333333%;
		height: 100rpx;
		line-height: 100rpx;
		color: #232323;
		font-size: 28rpx;
		text-align: center;
		display: inline-block;
	}
	.act{
		color: #3FCB85;
		position: relative;
	}
	.act::after{
		content: '';
		width: 54rpx;
		height: 4rpx;
		background: #3FCB85;
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		margin-left: -27rpx;
		border-radius:2rpx;
	}
}
.box{
	width: calc(100% - 60rpx);
	height: 180rpx;
	margin-left: 30rpx;
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
</style>