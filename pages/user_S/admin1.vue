<template>
	<div class="admin1">
		<div class="box">
			<image src="/static/logo.jpg" mode="aspectFill"></image>
			<div class="text">
				<div class="money">
					<p class="Ellipsis">商务谈判商务谈判商务谈判商务谈判商务谈判</p>
					<p>+14.00</p>
				</div>
				<div class="user">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>Rocco</p>
					<p>2020.04.15  10:40:35</p>
				</div>
			</div>
		</div>
		<div class="box">
			<image src="/static/logo.jpg" mode="aspectFill"></image>
			<div class="text">
				<div class="money">
					<p class="Ellipsis">商务谈判商务谈判商务谈判商务谈判商务谈判</p>
					<p>+14.00</p>
				</div>
				<div class="user">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>Rocco</p>
					<p>2020.04.15  10:40:35</p>
				</div>
			</div>
		</div>
		<div class="box">
			<image src="/static/logo.jpg" mode="aspectFill"></image>
			<div class="text">
				<div class="money">
					<p class="Ellipsis">商务谈判商务谈判商务谈判商务谈判商务谈判</p>
					<p>+14.00</p>
				</div>
				<div class="user">
					<image src="/static/logo.jpg" mode="aspectFill"></image>
					<p>Rocco</p>
					<p>2020.04.15  10:40:35</p>
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
		name: 'admin1',
		data() {
			return {
				notYet:false
				
			}
		},
		onLoad(){

		},
		onShow(){

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
.box{
	width:100%;
	height:220rpx;
	background:rgba(255,255,255,1);
	padding: 25rpx 30rpx;
	box-sizing: border-box;
	>image{
		width:230rpx;
		height: 100%;
		border-radius:10rpx;
		float: left;
		display: block;
	}
	.text{
		width: calc(100% - 250rpx);
		height: 100%;
		float: right;
		.money{
			width: 100%;
			display: flex;
			align-items: center;
			padding-top: 10rpx;
			p{
				width: 50%;
			}
			p:nth-child(1){
				color: #323232;
				font-size: 34rpx;
				font-weight: bold;
			}
			p:nth-child(2){
				color: #FFA901;
				font-size: 36rpx;
				text-align: right;
			}
		}
		.user{
			width: 100%;
			height: 50rpx;
			padding-top:40rpx;
			image{
				width: 50rpx;
				height: 50rpx;
				border-radius: 50rpx;
				float: left;
			}
			p:nth-child(2){
				color: #323232;
				font-size: 26rpx;
				line-height: 50rpx;
				float: left;
				margin-left: 20rpx;
			}
			p:nth-child(3){
				color: #BBBBBB;
				font-size: 22rpx;
				line-height: 50rpx;
				float: right;
			}
		}
	}
}
</style>
