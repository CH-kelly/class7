<template>
	<view class="record">
		
		<view class="record-lists">
			
			<view class="record-item"   v-for="(item,i) in record" :key="i">
				<view class="flex item">
					<view class="flex item-left">
						<image :src="item.user.avatar"  mode=""></image>
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
			
				<view class="flex item">
					<view class="flex item-left">
						<image src="/static/logo.png" mode=""></image>
						<view class="item-info">
							<view class="t-text nickname">Rocco</view>
							<view class="t-text date">2019.08.02  10:58</view>
						</view>
					</view>
					<view class="t-text item-right">
						+200.00
					</view>
				</view>
				<view class="t-line"></view>
			</view>
			
		</view>
		
		
	</view>
	
	
</template>

<script>
	const { Post } = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	
	
	export default {
		data() {
			return {
				current:0,
				record:[],
				page:1,
			}
		},
		onLoad(e) {
			this.tid = main.tid || uni.getStorageSync('tid');
		},
		onShow() {
			this.get_record();
		},
		
		methods: {
			get_record(){
				var that = this;
				let list = this.record;
				let page = this.page;
				Post("/api/Teacher/getOrderPrice",{
					tid:this.tid,
					type:2,
					page:page,
				}).then(res=>{
					if(page ==1 ){
						list = res.data;
					}else{
						list.push(...res.data)
					}
					that.record = list;
					wx.stopPullDownRefresh();
				})
			},
		},
		// 下拉刷新
		onPullDownRefresh(){
			this.page = 1;
			this.get_record();
		},
		// 上拉加载
		onReachBottom(){
			this.page = this.page + 1;
			this.get_record();
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