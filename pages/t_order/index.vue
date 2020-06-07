<template>
	<view>
		<view class="safearea" :class="{'ipx':iphonex}" >
			
			<view class="flex switch-option">
				<view class="" v-for="(item,i) in options" :key="i">
					<view class="t-text option-item " 
					@click="changeOption(i)"
					:class="{'optionActive' : i == current }" > 
						{{item}}
					</view>
				</view>
			</view>
			
			<!-- 订单列表 -->
			<view class="order">
				
				<view class="order-item">
					<view class="flex top">
						<view class="flex top-left">
							<image src="/static/teacher/time_3.png" mode=""></image>
							<text class="t-text">2020.05.09 11:40</text>
						</view>
						<view class="t-text top-right">
							待处理
						</view>
					</view>
					<view class="t-line"></view>
					<view class="middle">
						<view class="info">
							<image class="avatar" src="/static/logo.png" mode=""></image>
							<image class="gender" src="/static/teacher/girl.png" mode=""></image>
							<image class="gender" src="/static/teacher/boy.png" mode=""></image>
						</view>
						<view class="info-right">
							<view class="info-top">
								<text>Rocco</text>
								<view class="t-text info-type">
									商业的本质
								</view>
							</view>
							<view class="t-text desc hidden_1">
								有耐心，认真，为人亲切能与小朋有耐心，认真，为人亲切能与小朋
							</view>
						</view>
					</view>
					<view class="flex buttom">
						<view class="t-text refuse" @click="isRefuse">
							拒绝
						</view>
						<view class="t-text refuse accept">
							接受
						</view>
						<view class="t-text refuse accept">
							发起陪练
						</view>
						<view class="t-text refuse">
							查看佣金
						</view>
					</view>
					
					
				</view>
				
			
			</view>
			
		
		</view>
		
		<!-- 导航栏 tabbar -->
		<view class="tabbar"  :style="{bottom:bottom+'rpx'}">
			<view class="flex tabbar-lists">
				<view class="flex-column tabbar-item">
					<image src="/static/teacher/order_a.png" mode=""></image>
					<text class="active">订单管理</text>
				</view>
				<view class="flex-column tabbar-item">
					<image src="/static/teacher/course.png" mode=""></image>
					<text>课程管理</text>
				</view>
				<view class="flex-column tabbar-item">
					<image src="/static/teacher/person.png" mode=""></image>
					<text>个人中心</text>
				</view>
			</view>
		</view>
		
		<view v-show="isClose == 1" >
			<refuse @close="closeRefuse" ></refuse>
		</view>
		
	</view>
</template>

<script >
	import utils from "common/utils.js"
	
	import refuse from "./child/refuse"
	export default {
		data() {
			return {
				bottom:0,
				iphonex:false,
				current:0,
				isClose:0,
				options:[
					'全部',
					'待处理',
					'已接受',
					'已拒绝',
					'已完成',
				]
			}
		},
		components:{
			refuse
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
			isRefuse(){	//拒绝陪练
				this.isClose = 1;
			},
			closeRefuse(){
				this.isClose = 0;
			}
		}
	}
</script>

<style scoped>

.switch-option{
	height: 80rpx;
	padding: 0 30rpx;
}
.option-item{
	padding-bottom: 4rpx;
	border-bottom: 4rpx solid rgba(0,0,0,0);
}
.optionActive{
	color: #3FCB85;
	font-weight:bold;
	border-bottom: 4rpx solid #3FCB85;
	
}
	

.order{
	padding:20rpx;
}
	
.order-item{
	/* width:100%; */
	padding: 30rpx;
	/* height:320rpx; */
	background:rgba(255,255,255,1);
	border-radius:20px;
}
.order-item>.top{
	margin-bottom: 20rpx;
}
.order-item>.top image{
	width: 30rpx;
	height: 30rpx;
}

.order-item .top-left>text{
	margin-left: 10rpx;
	font-size:32rpx;
	font-weight:bold;
	color:rgba(35,35,35,1);
}
.top-right{
	font-size:24rpx;
	color:rgba(253,101,11,1);
}



.middle{
	
	margin-top: 20rpx;
	display: flex;
}
.info{
	position: relative;
	width:110rpx;
	height:110rpx;
}
.info>.avatar{
	width:110rpx;
	height:110rpx;
	border-radius:50%;
	vertical-align: middle;
}
.info>.gender{
	position: absolute;
	bottom: -10rpx;
	left: 50%;
	transform: translateX(-50%);
	
	width: 52rpx;
	height: 31rpx;
}

.info-right{
	margin-left: 30rpx;
}
.info-top{
	display: flex;
	align-items: center;
}
.info-top>text{
	font-size:32rpx;
	font-weight:bold;
}
.info-type{
	margin-left: 10rpx;
	
	height:32rpx;
	line-height: 32rpx;
	background:rgba(63,203,133,1);
	border-radius:4rpx;
	padding: 0 10rpx;
	
	
	font-size:20rpx;
	color:rgba(255,255,255,1);
}

.info-right>.desc{
	margin-top: 36rpx;
	font-size:22rpx;
	font-weight:500;
	color:rgba(50,50,50,1);
}



/* 按钮样式 */
.buttom{
	margin-top: 44rpx;
	justify-content: flex-end;
}
.refuse{
	margin-left: 30rpx;
	padding: 0 20rpx;
	height:50rpx;
	line-height: 50rpx;
	border:1rpx solid rgba(153,153,153,1);
	border-radius:25rpx;
	
	font-size:28rpx;
	color:rgba(153,153,153,1);
}
.accept{
	
	color:rgba(63,203,133,1);
	border:1px solid rgba(63,203,133,1);
}
</style>
