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
			<scroll-view scroll-y="true"  refresher-enabled="true" 
			    :refresher-triggered="triggered"
			    refresher-default-style="black" 
			    @refresherrefresh="bindrefresherrefresh"
			    @refresherabort="bindrefresherabort"
			    @scrolltolower="loadMore"
			class="scroll-view">
				
				<view class="order">
					<view class="order-item" v-for="(item,i) in lists" :key="i">
						<view class="flex top">
							<view class="flex top-left">
								<image src="/static/teacher/time_3.png" mode=""></image>
								<text class="t-text">{{item.start_time}}</text>
							</view>
							<view class="t-text top-right" v-if="item.order_status == 10">待处理</view>
							<view class="t-text top-right" v-if="item.order_status == 20">已接受</view>
							<view class="t-text top-right" v-if="item.order_status == 30"  style="color: #323232;"  >已完成</view>
							<view class="t-text top-right" v-if="item.order_status == 40">已拒绝</view>
						</view>
						<view class="t-line"></view>
						<view class="middle">
							<view class="info">
								<image class="avatar" :src="item.user.avatar" mode=""></image>
								<image class="gender" v-if="item.user.gender == 2" src="/static/teacher/girl.png" mode=""></image>
								<image class="gender" v-else src="/static/teacher/boy.png" mode=""></image>
							</view>
							<view class="info-right">
								<view class="info-top">
									<text>{{item.user.nickname}}</text>
									<!-- <view class="t-text info-type">
										商业的本质
									</view> -->
								</view>
								<!-- <view class="t-text desc hidden_1">
									有耐心，认真，为人亲切能与小朋有耐心，认真，为人亲切能与小朋
								</view> -->
							</view>
						</view>
						<view class="flex buttom">
							<view class="t-text refuse" @click="isRefuse(item.id)" v-if="item.order_status == 10">
								拒绝
							</view>
							<view class="t-text refuse accept"  @click="accept(item.id)" v-if="item.order_status == 10">
								接受
							</view>
							<view class="t-text refuse accept"  @click="launch(item.id)" v-if="item.order_status == 20">
								发起陪练
							</view>
							<view class="t-text refuse" @click="gotorecord" v-if="item.order_status == 30">
								查看佣金
							</view>
						</view>
						
						
					</view>
					
				
				</view>
				
			</scroll-view>
		
		</view>
		
		<!-- 导航栏 tabbar -->
		<view class="tabbar"  :style="{bottom:bottom+'rpx'}">
			<view class="flex tabbar-lists">
				
				<view class="flex-column tabbar-item" @click="gotoNavBar(1)">
						<image src="/static/teacher/order_a.png" mode=""></image>
						<text class="active">订单管理</text>
				</view>
				
				<view class="flex-column tabbar-item" @click="gotoNavBar(2)">
					<image src="/static/teacher/course.png" mode=""></image>
					<text>课程管理</text>
				</view>
				<view class="flex-column tabbar-item" @click="gotoNavBar(3)">
					<image src="/static/teacher/person.png" mode=""></image>
					<text>个人中心</text>
				</view>
			</view>
		</view>
		
		<view v-show="isClose == 1" >
			<refuse @close="closeRefuse"  @submit="submitRefuse" :orderId="orderId"></refuse>
		</view>
		
	</view>
</template>

<script >
	import utils from "common/utils.js"
	
	import refuse from "./child/refuse"
	
	const { Post } = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	
	
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
				],
				order_status:0,	//0全部  10待处理，20已接受，30已完成，40已拒绝
				page:1,
				tid:0,
				lists:[],
				triggered:true,
				orderId:0,
			}
		},
		components:{
			refuse
		},
		onLoad() {
			this.tid = main.tid || uni.getStorageSync('tid');
		},
		onShow(){
			this.bottom = utils.bottom	
			this.iphonex = utils.iphonex
			
			this.get_lists();
		},
		methods: {
			// 底部导航栏跳转
			gotoNavBar(key){
				let url = '';
				if(key == 1){
					url = main.t_order
				}else if (key == 2){
					url = main.t_course
				}else{
					url = main.t_personal
				}
				main.redirectTo(url);
			},
			
			  
		  loadMore() { // 触底加载更多
			console.log('触底加载更多');
			this.page = this.page + 1;
			this.get_lists();
		  },
			
		  bindrefresherrefresh(){
			console.log('下拉');
			
			this.page = 1;
			this.get_lists();
		  },
			changeOption(i){	//0全部  10待处理，20已接受，30已完成，40已拒绝
				// '全部',
				// '待处理',
				// '已接受',
				// '已拒绝',
				// '已完成',
				this.current = i;
				let status = 0;
				if(i==0){
					status = 0;
				}else if(i == 1){
					status = 10;
				}else if(i == 2){
					status = 20;
				}else if(i == 3){
					status = 40;
				}else if(i == 4){
					status = 30;
				}
				this.page = 1;
				this.order_status = status;
				
				this.get_lists();
			},
			isRefuse(id){	//拒绝陪练
				this.isClose = 1;
				this.orderId = id;
				console.log(this.orderId)
			},
			
			closeRefuse(){
				this.isClose = 0;
			},
			submitRefuse(){
				this.isClose = 0;
				this.get_lists();
			},
			get_lists(){
				var that = this;
				let page = this.page;
				Post("/api/Teacher/getTeacherOrder",{
					tid:this.tid,
					order_status:this.order_status,
					page:page
				}).then(res=>{
					let lists = that.lists
					if(page == 1){
						 lists = res.data;
					}else{
						lists.push(...res.data)
					}
					that.lists = lists;
					that.triggered = false;
				})
			},
			// 查看佣金
			gotorecord(){
				main.pageJump("/teacher/t_record/index")
			},
			// 接受
			accept(id){
				if(!id){
					return main.showToast('请选择订单');
				}
				Post("/api/Teacher/orderStatus",{
					order_id:id,
					status:20,
					content:''
				}).then(res=>{
					console.log(res);
				})
				
				this.get_lists();
			},
			// 发起
			launch(){
				main.showToast('在开发中')
			},
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
	margin-bottom: 20rpx;

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


.scroll-view{
	height: calc(100% - 88rpx );
}

</style>
