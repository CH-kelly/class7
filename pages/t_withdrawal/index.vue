<template>
	<view class="withdrawal">
		<view class="list">
			<view class="flex top">
				<text class="t-text top-title">提现到</text>
				<view class="flex top-right">
					<image src="/static/teacher/time_4.png" mode=""></image>
					<text class="t-text">微信钱包</text>
				</view>
			</view>
			<view class="t-line"></view>
			<view class="t-text top-title title">提现金额</view>
			<view class="flex input-money">
				<text>￥</text>
				<input type="number" value=""
				 class="t-text input"
				 placeholder="请输入提现金额"
				 placeholder-class="placeholder-class"
				/>
			</view>
			
			<view class="t-line"></view>
			<view class="flex buttom">
				<view class="all-money">
					<text>可提现金额</text>
					<text style="margin-right10rpx;color: #EE2323;">￥70</text>
				</view>
				<text  style="color: #FF0000;">全部提现</text>
			</view>
			
		</view>
		<view class="t-text button">
			提现
		</view>
		<view class="explain">
			<view class="explain-text">
				说明
			</view>
			<view class="content">
				1.说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
				2.说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明
				                            
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.withdrawal{
		height: 100vh;
		padding: 30rpx;
		
		background-color: #F6F6F6;
	}
	.list{
		/* padding: 34rpx; */
		padding: 34rpx 30rpx 10rpx 30rpx;
		height:338rpx;
		background:rgba(255,255,255,1);
	}
	.top{
		margin-bottom: 33rpx;
	}
	.top image{
		width:36rpx;
		height:32rpx;
	}
	.top-title{
		font-size:30rpx;
		color:rgba(51,51,51,1);
	}
	.top-right>text{
		
		font-size:28rpx;
		color:rgba(0,183,0,1);
	}
	
	.title{
		padding: 30rpx 0 ;
	}
	.input-money{
		justify-content: flex-start;
		margin-bottom: 30rpx;
	}
	.input-money>text{
		font-size:40rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		margin-right: 30rpx;
	}
	.input{
		font-size:34rpx;
	}
	.placeholder-class{
		font-size:34rpx;
		color:rgba(187,187,187,1);
	}
	
	
	
	.buttom text{
		
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:600;
		color:rgba(153,153,153,1);
	}
	.buttom{
		margin-top: 18rpx;
	}
	
	
	.button{
		margin-top: 45rpx;
		width: 100%;
		height:70rpx;
		line-height: 70rpx;
		text-align: center;
		background:rgba(63,204,134,1);
		border-radius:36rpx;
		
		font-size:30rpx;
		font-weight:bold;
	}
	.explain-text{
		margin-top: 34rpx;
		font-size:26rpx;
		color:rgba(187,187,187,1);
	}
	.content{
		margin-top: 23rpx;
		font-size:26rpx;
		color:rgba(187,187,187,1);
	}
</style>
