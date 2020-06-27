<template>
	<div class="vip">
		<div class="privilege">
			<p>会员四大特权</p>
		<!-- 	<image src="../../static/user_s/right2.png"></image>
			<i>特权详情</i> -->
		</div>
		<div class="icon">
			<image style="width: 118rpx;" src="../../static/user_s/vip1.png"></image>
			<image style="width: 86rpx;" src="../../static/user_s/vip2.png"></image>
			<image style="width: 146rpx;" src="../../static/user_s/vip3.png"></image>
			<image style="width: 118rpx;" src="../../static/user_s/vip4.png"></image>
		</div>
		<div class="MyPackage" v-if="MyVip.vipid !== '0'">
			<p>月卡套餐</p>
			<div>{{MyVip.vip_expire_time}}到期</div>
		</div>
		<div class="Package">
			<div class="title">
				<p>选择优惠套餐<i>现在购买立享5折哦</i></p>
			</div>
			<scroll-view class="list" scroll-x="true">
			<!-- <div class="list"> -->
				<div :class="vipIndex === index ? 'box act' : 'box'" v-for="(item,index) in list" :key="index" @click="actFun(index)">
					<p>{{item.name}}</p>
					<p>￥{{item.dayprice}}/天</p>
					<p><i>￥</i>{{item.line_price}}</p>
					<div>特惠价￥{{item.price}}</div>
				</div>
			</scroll-view>
			<!-- </div> -->
	<!-- 		<div class="automatic">
				<image src="/static/user_s/radio.png"></image>
				<p>到期后自动续费,可随时取消。</p>
			</div> -->
		</div>
		<div class="payment">
			<div class="title">支付方式</div>
			<div class="wx">
				<image src="/static/user_s/wx.png"></image>
				<p>微信支付</p>
				<image src="/static/user_s/radioAct.png" ></image>
			</div>
		</div>
		<div class="footer">
			<p>总价</p><p>￥{{list[vipIndex].price}}</p><p>￥{{list[vipIndex].line_price}}</p>
			<div class="sure" @click="sure">立即购买</div>
		</div>
	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'vip',
		data() {
			return {
				list:[],
				vipIndex:0,
				MyVip:{
					vipid:'0'
				}
			}
		},
		onLoad(){
			Post('api/vip/index',{
				openid:main.openID
			}).then(res => {
				console.log(res)
				this.list = res.list
				this.MyVip = res.user
			})
		},
		onShow(){

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			actFun(i){
				this.vipIndex = i
			},
			sure(){
				Post('api/Order/getUserPay', {
					card_id: this.list[this.vipIndex].id,
					user_id: main.userID,
					types: 'member',
					openid: main.openID,
					price: this.list[this.vipIndex].price,
					uniacid: 16,
				}).then(res => {
					console.log(res)
					wx.requestPayment({
						timeStamp: res.timeStamp,
						nonceStr: res.nonceStr,
						package:res.package,
						signType: res.signType,
						paySign: res.paySign,
						success(res) {
							console.log(1)
							main.showToast('支付成功')
						},
						fail(res) {
							console.log(2)
						}
					})
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
<style>
	page{
		background: #F5F5F5;
	}
</style>
<style lang="scss" scoped>
.privilege{
	width: 100%;
	height: 55rpx;
	padding: 25rpx 30rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	p{
		float: left;
		line-height: 30rpx;
		color: #232323;
		font-size: 30rpx;
		font-weight: bold;
	}
	i{
		line-height: 30rpx;
		float: right;
		color: #BBBBBB;
		font-size: 24rpx;
	}
	image{
		width: 12rpx;
		height: 20rpx;
		float: right;
		margin-top: 5rpx;
		margin-left: 10rpx;
	}
}
.icon{
	width: 100%;
	height: 189rpx;
	padding: 30rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	display: flex;
	justify-content: space-between;
	image{
		height: 100%;
	}
}
.MyPackage{
	width:100%;
	height:196rpx;
	margin-top: 15rpx;
	background: #FFFFFF;
	padding: 25rpx 30rpx;
	box-sizing: border-box;
	p{
		width: 100%;
		line-height: 30rpx;
		color: #232323;
		font-size: 30rpx;
		font-weight: bold;
	}
	div{
		// width:300rpx;
		width:500rpx;
		height:60rpx;
		// margin-left: 195rpx;
		margin-left: 95rpx;
		margin-top: 40rpx;
		background:rgba(255,170,1,1);
		border-radius:30rpx;
		text-align: center;
		line-height: 60rpx;
		color: #FFFFFF;
		font-size: 30rpx;
	}
}
.Package{
	width: 100%;
	margin-top: 15rpx;
	// height:430rpx;
	height:355rpx;
	background:rgba(255,255,255,1);
	padding: 25rpx 0 25rpx 30rpx;
	box-sizing: border-box;
	.title{
		width: 100%;
		height: 30rpx;
		line-height: 30rpx;
		p{
			color: #232323;
			font-size: 30rpx;
			font-weight: bold;
			display: inline-block;
			i{
				color: #999999;
				font-size: 24rpx;
				display: inline-block;
				margin-left: 15rpx;
			}
		}
	}
	.list{
		width: 100%;
		height: 250rpx;
		margin-top: 25rpx;
		// display: flex;
		// justify-content: space-between;
		white-space:nowrap;
		.box{
			width:214rpx;
			height:250rpx;
			border:2rpx solid rgba(228,228,228,1);
			border-radius:10rpx;
			box-sizing: border-box;
			margin-right: 20rpx;
			display: inline-block;
			>p{
				width: 100%;
				text-align: center;
			}
			>p:nth-child(1){
				color: #001337;
				font-size: 34rpx;
				font-weight: bold;
				line-height: 34rpx;
				padding-top: 30rpx;
			}
			>p:nth-child(2){
				color: #999999;
				font-size: 20rpx;
				line-height: 20rpx;
				padding-top:20rpx;
			}
			>p:nth-child(3){
				font-size: 40rpx;
				line-height: 50rpx;
				padding-top: 20rpx;
				font-weight: bold;
				display: inline-block;
				i{
					font-size: 24rpx;
					display: inline-block;
				}
			}
			div{
				width:170rpx;
				// padding: 0 15rpx;
				box-sizing: border-box;
				height:38rpx;
				line-height: 38rpx;
				text-align: center;
				border-radius:19rpx;
				color: #3FCB85;
				font-size: 22rpx;
				margin-top: 10rpx;
				margin-left: 22rpx;
			}
		}
		.act{
			background:#EBEFF3;
			border: none;
			div{
				background:rgba(63,203,133,1);
				color: #FFFFFF;
			}
		}
	}
	.automatic{
		width: 100%;
		height: 30rpx;
		margin-top: 35rpx;
		display: flex;
		align-items: center;
		image{
			width: 30rpx;
			height: 30rpx;
		}
		p{
			color: #999999;
			font-size: 24rpx;
			margin-left: 15rpx;
		}
	}
}
.payment{
	width: 100%;
	margin-top: 15rpx;
	height:190rpx;
	background:rgba(255,255,255,1);
	padding: 0 30rpx;
	box-sizing: border-box;
	.title{
		width: 100%;
		border-bottom: 1rpx solid #E4E4E4;
		height: 80rpx;
		line-height: 80rpx;
		color: #232323;
		font-size: 30rpx;
		font-weight: bold;
		box-sizing: border-box;
	}
	.wx{
		width: 100%;
		height: 110rpx;
		image:nth-child(1){
			width: 44rpx;
			height: 40rpx;
			float: left;
			margin-top: 35rpx;
		}
		image:nth-child(3){
			width: 32rpx;
			height: 32rpx;
			float: right;
			margin-top: 39rpx;
			
		}
		p{
			color: #41455E;
			font-size: 32rpx;
			float: left;
			font-weight: bold;
			margin-left: 20rpx;
			line-height: 110rpx;
		}
	}
}
.footer{
	width:100%;
	height:110rpx;
	background:rgba(255,255,255,1);
	box-shadow:-1px -1px 0px 0px rgba(221,221,221,1);
	position: fixed;
	bottom: 0;
	padding-left: 30rpx;
	box-sizing: border-box;
	p{
		line-height: 110rpx;
		float: left;
		margin-left: 15rpx;
	}
	p:nth-child(1){
		color: #323232;
		font-size: 32rpx;
		font-weight: bold;
	}
	p:nth-child(2){
		color: #FFA901;
		font-size: 32rpx;
		font-weight: bold;
	}
	p:nth-child(3){
		color: #999999;
		font-size: 24rpx;
		text-decoration:line-through;
	}
	.sure{
		width:300rpx;
		height:110rpx;
		background:linear-gradient(90deg,rgba(243,223,141,1) 0%,rgba(247,199,77,1) 100%);
		line-height: 110rpx;
		text-align: center;
		color: #AA6700;
		font-size: 36rpx;
		font-weight: bold;
		float: right;
	}
}
</style>