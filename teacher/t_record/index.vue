<template>
	<view class="record">
		
		<view class="total-amount">
			<image class="total-image" src="/static/teacher/withdrawal.png" mode=""></image>
			<view class="flex total-text">
				<view class="amount-left">
					<view class="t-text amount-title">总课时费（元）</view>
					<view class="t-text amount-money">{{price}}</view>
				</view>
				<view class="t-text amount-right" @click="gotoWithdrawal">提现</view>
			</view>
		</view>
		
		<view class="t-text title">
			课时费明细
		</view>
		
		<view class="t-line"></view>
		
		<view class="record-lists">
			
			<view class="record-item" v-for="(item,i) in record" :key="i">
				<view class="flex item">
					<view class="flex item-left">
						<image :src="item.user.avatar" mode=""></image>
						<view class="item-info">
							<view class="t-text nickname">{{item.user.nickname}}</view>
							<view class="t-text date">{{item.create_time}}</view>
						</view>
					</view>
					<view class="t-text item-right">
						+{{item.price}}
					</view>
				</view>
				<view class="t-line"></view>
			</view>
			
	
		</view>
		
		<view class="t-text more" @click="gotomore">查看更多>></view>
		
		
	</view>
	
	
</template>

<script>
	const { Post } = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	
	
	export default {
		data() {
			return {
				current:0,
				tid:0,
				price:0.00,
				record:[],
				
			}
		},
		onLoad(e) {
			this.tid = main.tid || uni.getStorageSync('tid');
		},
		onShow() {
			this.get_info();
			this.get_record();
		},
		
		methods: {
			get_info(){
				var that = this;
				Post("/api/Teacher/WithdrawalList",{
					tid:this.tid
				}).then(res=>{
					that.price = res.all_price;
					that.info = res.info;
				})
			},
			get_record(){
				var that = this;
				Post("/api/Teacher/getOrderPrice",{
					tid:this.tid,
					type:1
				}).then(res=>{
					that.record = res.list.data;
				})
			},
			// 查看更多
			gotomore(){
				main.pageJump("/teacher/t_recordList/index")
			},
			// 去提现
			gotoWithdrawal(){
				if(this.price<=0){
					return main.showToast('提现金额需要大于0')
				}
				main.pageJump("/teacher/t_withdrawal/index")
			},
		}
	}
</script>

<style scoped>
	.record{
		padding: 0 30rpx;
	}
	.total-amount{
		width: 690rpx;
		height: 200rpx;
		position: relative;
	}
	.total-image{
		width: 100%;
		height: 100%;
	}
	.total-text{
		width: 630rpx;
		height: 140rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		/* background-color: rgba(34,23,2,0.3); */
	}
	
	.amount-title{
		font-size:30rpx;
		color:rgba(255,255,255,1);
	}
	.amount-money{
		font-size:54rpx;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	
	.amount-right{
		width:126rpx;
		height:58rpx;
		line-height: 58rpx;
		text-align: center;
		background:rgba(255,255,255,1);
		border-radius:29rpx;
		
		
		font-size:32rpx;
		color:rgba(6,204,169,1);
	}
	
	
	
	.title{
		padding: 30rpx  0;
		font-size:28rpx;
		color:rgba(154,154,154,1);
	}
	.item{
		padding: 26rpx 0 ;
	}
	.item-left>image{
		width:90rpx;
		height:90rpx;
		border-radius:50%;
	}
	.item-info{
		margin-left: 26rpx;
	}
	.item-info>.nickname{
		font-size:32rpx;
		color:rgba(50,50,50,1);
	}
	.item-info>.date{
		font-size:24rpx;
		color:rgba(154,154,154,1);
	}
	.item-right{
		font-size:36rpx;
		font-weight:bold;
		color:rgba(255,170,1,1);
	}
	
	.more{
		padding-top: 50rpx;
		text-align: center;

		font-size:28rpx;
		color:rgba(153,153,153,1);
	}
	
</style>