<template>
	<view class="sign-up">
	<view class="t-line"></view>
		
		
		<view class="sign-list">
			<view class="flex item">
				<image src="/static/logo.png" mode=""></image>
				<view class="info">
					<view class="t-text nickname">李静</view>
					<text class="t-text date">2020.06.01 报名</text>
				</view>
			</view>
			<view class="t-line"></view>
		</view>
		<view class="sign-list">
			<view class="flex item">
				<image src="/static/logo.png" mode=""></image>
				<view class="info">
					<view class="t-text nickname">李静</view>
					<text class="t-text date">2020.06.01 报名</text>
				</view>
			</view>
			<view class="t-line"></view>
		</view>
		
	</view>
</template>

<script>
</script>

<style scoped>
	.sign-list{
		padding: 0 32rpx;
	}
	
	.item{
		padding: 24rpx 0;
		justify-content: flex-start;
	}
	.item>image{
		width:78rpx;
		height:78rpx;
		border-radius:50%;
		margin-right: 10rpx;
	}
	.nickname{
		
		font-size:30rpx;
		font-weight:bold;
		color:rgba(34,34,34,1);
	}
	.date{
		font-size:24rpx;
		color:rgba(153,153,153,1);
	}
	
</style>
