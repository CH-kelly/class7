<template>
	<view class="c-refuse">
		<view class="refuse-background"  @click="close"></view>
		<view class="c-background">
			<view class="content">
				<view class="flex top">
					<image @click.stop="close" src="/static/teacher/close.png" mode=""></image>
					<text class="t-text title">拒绝陪练</text>
					<text @click.stop="submit" class="t-text submit">提交</text>
				</view>
				<view class="content-title">
					拒绝理由
				</view>
				<view class="reason">
					<view class="t-line"></view>
					<textarea class="t-text text-area"
					maxlength="100"
					:cursor-spacing="height + 'rpx'"
					@input="inputContent"
					@linechange="linechange"
					value="" placeholder="请输入拒绝理由"  placeholder-class="placeholder-class" />
					<text class="count">{{number}}/100</text>
				</view>
				<view class="t-text rule">
					连续拒绝三次,将取消您的资格.需重新联系平台获取资格！
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	const { Post } = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	
	export default {
		props:{
			orderId:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				number:0,
				height:320
			}
		},
		methods:{
			inputContent(e){
				let val = e.mp.detail.value;
				this.content = e.mp.detail.value;
				this.number = val.length;
			},
			linechange(e){	//行数变化
				let lineCount = e.mp.detail.lineCount;
				let num = (lineCount - 1) * 30
				this.height = 320 - num
				console.log(num,this.height);
			},
			close(){
				this.$emit("close");
			},
			submit(){
				let content = this.content;
				if(!content){
					return main.showToast('请输入拒绝理由');
				}
				let orderId = this.orderId;
				if(!orderId){
					return main.showToast('请选择订单');
				}
				Post("/api/Teacher/orderStatus",{
					order_id:orderId,
					status:40,
					content:content
				}).then(res=>{
					console.log(res);
					this.$emit("submit");
				})
			}
		}
	}
</script>

<style scoped>
	.c-refuse{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1;
		background-color: rgba(0,0,0,0.6);
	}
	.refuse-background{
		height: calc(100vh - 40%);
	}
	.c-background{
		height: calc(100vh - 60%);
		width: 100vw;
		position: absolute;
		bottom: 0;
	}
	.content{
		padding: 30rpx;
		background: rgba(255,255,255,1);
		border-radius:20px 20px 0px 0px;
	}
	.top>image{
		width: 27rpx;
		height: 27rpx;
	}
	
	.title{
		font-size:34rpx;
		color:rgba(25,25,25,1);
	}
	
	/* 提交 */
	.submit{
		font-size:34rpx;
		color:rgba(63,204,134,1);
	}
	
	
	
	.content-title{
		margin-top: 50rpx;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(68,68,68,1);
	}
	
	.text-area{
		padding: 30rpx 20rpx 30rpx 26rpx;
		width:94%;
		height:230rpx;
		background:rgba(247,247,247,1);
		border-radius:10rpx;
		
		line-height:30rpx;
		
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
		
	}
	.t-line{
		width:4rpx;
		height:35rpx;
		background:rgba(63,204,134,1);
		border-radius:2rpx;
		
	
		position: absolute;
		left: 20rpx;
		top: 30rpx;
		z-index: 1;
	}
	.placeholder-class{
		
		color:rgba(180,180,180,1);
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:500;
	}
	
	
	.reason{
		margin: 30rpx 0;
		position: relative;
		width: 100%;
	}

	.count{
		position: absolute;
		right: 20rpx;
		bottom: 10rpx;
		
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(216,216,216,1);
	}
	
	.rule{
		font-size:26rpx;
		color:rgba(255,170,1,1);
		
	}
	
	
	
	
	
</style>
