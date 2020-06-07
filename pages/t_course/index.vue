<template>
	<view >
		<view class="flex course">
			
			<view class="flex-column item">
				<image src="/static/logo.png" mode=""></image>
				<text class="t-text item-title">批判性思维工具</text>
			</view>
			<view class="flex-column item">
				<image src="/static/logo.png" mode=""></image>
				<text class="t-text item-title">批判性思维工具</text>
			</view>
			<view class="flex-column item">
				<image src="/static/logo.png" mode=""></image>
				<text class="t-text item-title">批判性思维工具</text>
			</view>
			
			<view class="flex-column item">
				<image src="/static/logo.png" mode=""></image>
				<text class="t-text item-title">批判性思维工具</text>
			</view>
			
			
		</view>
		
		
		
		
		
		
		
		<!-- 导航栏 tabbar -->
		<view class="tabbar"  :style="{bottom:bottom+'rpx'}">
			<view class="flex tabbar-lists">
				<view class="flex-column tabbar-item">
					<image src="/static/teacher/order.png" mode=""></image>
					<text>订单管理</text>
				</view>
				<view class="flex-column tabbar-item">
					<image src="/static/teacher/course_a.png" mode=""></image>
					<text class="active">课程管理</text>
				</view>
				<view class="flex-column tabbar-item">
					<image src="/static/teacher/person.png" mode=""></image>
					<text>个人中心</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script >
	import utils from "common/utils.js"
	
	export default {
		data() {
			return {
				bottom:0,
				iphonex:false,
				current:0,
			}
		},
		onLoad() {
	
		},
		onShow(){
			this.bottom = utils.bottom	
			this.iphonex = utils.iphonex
		},
		methods: {
			changeOption(i){	
				this.current = i;
			},
			
		}
	}
</script>

<style scoped>
	.course{
		padding: 0 30rpx;
		flex-wrap: wrap;
	}
	.item{
		margin-top: 30rpx;
		width: 48%;
		align-items: flex-start;
	}
	.item>image{
		width:100%;
		height:240rpx;
		border-radius:10rpx;
	}
	.item-title{
		margin-top: 17rpx;
		font-size:30rpx;
		font-weight:bold;
		color:rgba(35,35,35,1);
	}
</style>
