<template>
	<div class="onLine">
		<scroll-view class="tab" scroll-x="true" >
			<div @click="tabFun(index)" v-for="(item,index) in tabList" :key="index" :class="tabIndex === index ? 'act' : ''">{{item.name}}</div>
		</scroll-view>
		<div class="box" @click="pageJump('/pages/home_S/onLineDetails?id='+item.id)" v-for="(item,index) in list" :key="index">
			<image :src="item.img" mode="aspectFill"></image>
			<div class="text">
				<div class="name Ellipsis">{{item.title}}</div>
				<!-- <div class="type"><div>零基础</div><div>零基础零基础</div><div>零基础零基础</div></div> -->
				<div class="money"><p>¥{{item.price}}</p><p>{{item.sign_num}}人已报名</p></div>
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
		name: 'onLine',
		data() {
			return {
				tabList:[],
				tabIndex:0,
				cate_id:0,
				list:[]
			}
		},
		onLoad(){
			this.onLoadFun()
		},
		onShow(){

		},
		methods: {
			tabFun(i){
				this.tabIndex = i
				this.cate_id = this.tabList[i].id
				this.onLoadFun()
			},
			onLoadFun(){
				Post('api/Sowing/getSowingList',{
					uniacid:16,
					cate_id:this.cate_id
				}).then(res => {
					console.log(res)
					this.tabList = res.cate
					this.list = res.list
				})
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
.onLine>.box{
	width: calc(100% - 60rpx);
	height: 170rpx;
	margin-left: 30rpx;
	margin-top: 30rpx;
	margin-bottom: 10rpx;
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
</style>