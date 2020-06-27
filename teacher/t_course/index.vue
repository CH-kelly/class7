<template>
	<view >
		<scroll-view scroll-y="true" class="scroll-view" :style="{'height':'calc(100vh - '+height+'rpx );'}">
		
			<view class="flex course">
				<block v-for="(item,i) in lists" :key="i">
					<view class="flex-column item" @click="gotoDetail(item.cid,item.id)">
						<image :src="item.chapter.img" mode=""></image>
						<text class="t-text item-title">{{item.chapter.title}}</text>
					</view>
				</block>		
			</view>
		</scroll-view>
		
		<!-- 导航栏 tabbar -->
		<view class="tabbar"  :style="{bottom:bottom+'rpx'}">
			<view class="flex tabbar-lists">
				<view class="flex-column tabbar-item"  @click="gotoNavBar(1)">
					<image src="/static/teacher/order.png" mode=""></image>
					<text>订单管理</text>
				</view>
				<view class="flex-column tabbar-item"  @click="gotoNavBar(2)">
					<image src="/static/teacher/course_a.png" mode=""></image>
					<text class="active">课程管理</text>
				</view>
				<view class="flex-column tabbar-item"  @click="gotoNavBar(3)">
					<image src="/static/teacher/person.png" mode=""></image>
					<text>个人中心</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script >
	import utils from "common/utils.js"
	
	const { Post } = require('@/main/mainFun.js')
	 import main from '@/main/main.js'
	
	export default {
		data() {
			return {
				bottom:0,
				iphonex:false,
				current:0,
				lists:[],
				height:0,
				triggered:false
			}
		},
		onLoad() {
	
		},
		onShow(){
			this.bottom = utils.bottom	
			this.iphonex = utils.iphonex;
			this.get_lists()
			this.height = 100 + this.bottom;
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
			get_lists(){
				var that = this;
				
				let tid = main.tid || uni.getStorageSync('tid');
				
				Post("/api/Teacher/getMySowingList",{
					tid:tid
				}).then(res=>{
					that.lists = res;
				})
			},
			gotoDetail(cid,id){
				if(!cid){
					return main.showToast('请选择我的课程')
				}
				if(!id){
					return main.showToast('请选择我的课程')
				}
				main.pageJump("/teacher/t_courseDetail/index?cid="+cid+"&id="+id)
			},
			
		}
	}
</script>

<style scoped>
/* 	.scroll-view{
		height:calc(100vh - 100rpx - 30rpx);
	} */
	.course{
		padding: 0 20rpx;
		flex-wrap: wrap;
	}
	.item{
		margin-top: 30rpx;
		width: 49%;
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
