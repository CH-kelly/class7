<template>
	<view class="sign-up">
	<view class="t-line"></view>
		
		
		<view class="sign-list"  v-for="(item,i) in list" :key="i">
			<view class="flex item">
				<image :src="item.user.avatar" mode=""></image>
				<view class="info">
					<view class="t-text nickname">{{item.user.nickname}}</view>
					<text class="t-text date">{{item.create_time}} 报名</text>
				</view>
			</view>
			<view class="t-line"></view>
		</view>
		
	</view>
</template>

<script>
	
	const { Post } = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	 
	export default {
		data(){
			return {
				cid:0,
				class_id:0,
				list:[]
			}
		},
		onLoad(e) {
			console.log(e);
			this.cid = e.cid;
			this.class_id = e.class_id;
		},
		onShow() {
			this.getMySowingList();
		},
		methods:{
			getMySowingList(){
				var that = this;
				Post("/api/Teacher/getSowingSign",{
					cid:this.cid,
					class_id:this.class_id
				}).then(res=>{
					that.list = res;
				})
			}
		},
	}
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
