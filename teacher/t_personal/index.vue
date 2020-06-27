<template>
	<view >
		<view class="safearea" :class="{'ipx':iphonex}"  >
			<image class="bj" src="/static/teacher/bj.png" mode=""></image>
			
			<view class="info" :class="{'ipx':iphonex}" >
				
				<view class="flex-column info-avatar">
					<image class="avatar" :src="info.avatar || '/static/logo.png'" mode=""></image>
					<image class="gender" wx:if="info.gender == 2" src="/static/teacher/girl.png" mode=""></image>
					<image class="gender" wx:if="info.gender == 1" src="/static/teacher/boy.png" mode=""></image>
				</view>
				<view class="flex-column nickname">{{info.name}}</view>
				<view class="label">
					<view class="t-text education">{{info.school_name}}</view>
				</view>
				<view class="label info-label" >
					<view class="t-text">教程{{info.curriculum_num || 0}}</view>
					<view class="label-line"></view>
					<view class="t-text">课时单价 ￥{{info.trainer_money || 0}}元</view>
					<view class="label-line"></view>
					<view class="t-text">教程点赞{{info.likes_num || 0}}</view>
				</view>
				<view class="flex-column">
					<!-- <view class="t-text signature">{{info.remarks}}</view> -->
					
					<view class="good-at">
						<view class="flex good-top">
							<view class="flex top-left">
								<image  class="good" src="/static/teacher/good.png" mode=""></image>
								<text class="t-text good-title">擅长课程</text>
							</view>
							<image class="add" src="/static/teacher/add.png" mode="" @click="goodCourses"  ></image>
						</view>
						<scroll-view
						scroll-y="true"
						class="scroll-view"
						 >
							 <view class="flex good-label">
								<block v-for="(item,i) in label" :key="index">
									<view class="t-text label-title">
										{{item.name}}
										<view class="flex label-close" @click="deleteLabel(i)">
											<image src="/static/teacher/delete.png" mode="" ></image>
										</view>
									</view>
								</block>
								<!-- <view class="t-text label-title">
									批判性思维工具
								</view>
								<view class="t-text label-title">
									是泡沫还是机遇？
								</view> -->
							 </view>
						 </scroll-view>
						
					</view>
					
					
					
				</view>
				
				<!-- 可预约时间 -->
				<view class="appointment" :style="{bottom:appointment+'rpx'}">
					<view class="flex good-top">
						<view class="flex top-left">
							<image  class="good" src="/static/teacher/time_4.png" mode=""></image>
							<text class="t-text good-title">可预约时间</text>
							<text class="t-text change-text">点击时间可进行更改</text>
						</view>
						<image class="add" @click="openAdd" src="/static/teacher/add.png" mode=""></image>
					</view>
					<view class="middle">
						<v-date :week="week"  :yuyuetime="yuyuetime" :teacherId="info.id"  
						 @changeItem="changeItem"
						@changYuYue="changYuYue" ></v-date>
					</view>
					<view class="bottom">
						
					</view>
				</view>
				
				
			</view>
			
			
			
			
		</view>
		
	
		
		<!-- 导航栏 tabbar -->
		<view class="tabbar"  :style="{bottom:bottom+'rpx'}">
			<view class="flex tabbar-lists">
				<view class="flex-column tabbar-item"  @click="gotoNavBar(1)">
					<image src="/static/teacher/order.png" mode=""></image>
					<text>订单管理</text>
				</view>
				<view class="flex-column tabbar-item"  @click="gotoNavBar(2)">
					<image src="/static/teacher/course.png" mode=""></image>
					<text>课程管理</text>
				</view>
				<view class="flex-column tabbar-item"  @click="gotoNavBar(3)">
					<image src="/static/teacher/person_a.png" mode=""></image>
					<text class="active">个人中心</text>
				</view>
			</view>
		</view>
		
		
		<!-- 添加空余时间 -->
		<view v-show="isClose == 1" >
			<free @close="closeRefuse" @submit="submitRefuse"  :teacherId="info.id" ></free>
		</view>
		
		
		<!-- 添加擅长课程 弹框 -->
		<view class="flex goods-courses" v-if="isShowGoods==1">
			<view class="goods-courses-item">
				<view class="goods-courses-title">添加擅长课程</view>
				<view class="goods-courses-input">
					<picker @change="inputLabel"  :range="array" range-key="name">
					    <view class="picker">
					      请选择：{{label_content}}
					    </view>
					  </picker>
					<!-- <input type="text" value=""  maxlength=20  @input="inputLabel"  class="courses-input" /> -->
				</view>
				<view class="flex goods-courses-buttom">
					<view class="courses-cancel" @click="cancel">取消</view>
					<view class="courses-cancel courses-confirm"  @click="confirm">确认</view>
				</view>
				
			</view>
			
		</view>
		
		
		<view class="edit-personal" @click="editPersonal">个人资料</view>
		
		<view class="edit-personal" @click="editDesc" style="top: 120rpx;">个人简介</view>
		
		
	</view>
</template>

<script >
	import utils from "common/utils.js"
	
	import date from "./child/date.vue"
	import free from "./child/free.vue"
	
	const { Post } = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	
	
	export default {
		data() {
			return {
				bottom:0,
				iphonex:false,
				appointment:0,
				isClose:0,
				info:{},
				label:[],
				week:[],
				yuyuetime:[],
				
				isShowGoods:0,
				label_content:'',
				teacher_id:0,
				tid:0,
				
				array:[],	//老师擅长科目的列表
				label_id:0,
			}
		},
		onLoad() {
			this.tid = main.tid || uni.getStorageSync('tid');
		},
		components:{
			"v-date":date,
			free
		},
		onShow(){
			this.bottom = utils.bottom	
			this.iphonex = utils.iphonex
			this.appointment =  this.bottom + 100;
			
			
			// 获取用户信息
			this.get_user_info();
			this.get_label_lists();
		},
		methods: {
			get_label_lists(){
				var that = this;
				Post("/api/teacher/getLabelList").then(res=>{
					that.array = res;
				})
			},
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
			goodCourses(){
				this.isShowGoods = 1;
			},
			openAdd(){
				this.isClose = 1;
			},
			closeRefuse(){
				this.isClose = 0;
			},
			submitRefuse(){
				this.isClose = 0;
				this.get_user_info();
			},
			changeItem(i){
				var that = this;
				let time = this.week[i];
				console.log(time);
				Post("api/teacher/getBookTime",{
					date:time.time,
					tid:this.tid,
				}).then(res=>{
					that.yuyuetime = res;
				})
			},
			get_user_info(){
				var that = this;
				let openid = main.openID || uni.getStorageSync('openID');
				Post("api/teacher/usercenter",{
					openid:openid
				}).then(res=>{
					if(res){
						that.label = res.label;
						that.info = res.teacher;
						that.week = res.week;
						that.yuyuetime = res.yuyuetime;
						that.teacher_id = res.teacher.id;
					}
				})
			},
			inputLabel(e){
				// this.label_content = e.mp.detail.value
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.label_content = this.array[e.mp.detail.value].name
				this.index = e.mp.detail.value
				this.label_id = this.array[e.mp.detail.value].id
				// this.setData({
				//   index: e.detail.value
				// })
			},
			// 取消添加擅长课程
			cancel(){
				this.isShowGoods = 0;
			},
			// 添加擅长课程
			confirm(){
				let label_id = this.label_id;
				if(!label_id){
					return main.showToast('请选择擅长的课程');
				}
				var that = this;
				Post("/api/teacher/add_label",{
					teacher_id:this.info.id,
					label_id:label_id
				}).then(res=>{
					that.isShowGoods = 0;
					main.showToast('添加成功');
					that.label = res;
				})
				
			},
			deleteLabel(i){
				console.log(i);
				var that = this;
				var labelid = this.label[i].id;
				Post("/api/teacher/del_label",{
					teacher_id:this.info.id,
					labelid:labelid
				}).then(res=>{
					main.showToast('删除成功');
					that.label = res;
				})
			},
			changYuYue(e){
				this.yuyuetime = e
			},
			editPersonal(){
				main.pageJump("/teacher/t_editInfo/index?tid="+this.teacher_id)
			},
			editDesc(){
				main.pageJump("/teacher/t_editDesc/index?tid="+this.teacher_id)
			}
		}
	}
</script>

<style scoped>
	.safearea{
		width: 100vw;
		height: calc(100vh - 100rpx);
		background-color: #EBEFF1;
		position: relative;
	}
	.safearea>.bj{
		width: 100%;
		
	}
	.info{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 0;
		background: rgba(0,0,0,0.3);
	}
	
	
	.info-avatar{
		position: relative;
		/* justify-content: center; */
	}
	.info-avatar>.avatar{
		width:160rpx;
		height:160rpx;
		border-radius:50%;
		border: 8rpx solid #fff;
		vertical-align: middle;
	}
	.info-avatar>.gender{
		position: absolute;
		bottom: -10rpx;
		left: 50%;
		transform: translateX(-50%);
		
		width: 52rpx;
		height: 31rpx;
	}
	
	
	.nickname{
		margin-top: 18rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(0,107,54,1);
	}
	.education{
		margin-top: 18rpx;
		width:137rpx;
		height:32rpx;
		line-height: 32rpx;
		text-align: center;
		background:rgba(49,189,119,1);
		border-radius:4rpx;
		
		
		font-size:20rpx;
		color:rgba(255,255,255,1);
	}
	
	.label{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.info-label{
		text-align: center;

		margin-top: 30rpx;
		justify-content: space-around;
		padding: 0 60rpx 20rpx 60rpx;
	}
	.label-line{
		width:2rpx;
		height:30rpx;
		background:rgba(0,0,0,0.2);
		margin: 0 30rpx;
	}
	
	.signature{
		width:540rpx;
		/* height:90rpx; */
		background:rgba(49,189,119,1);
		border-radius:20rpx 20rpx 0rpx 0rpx;
		padding: 18rpx 49rpx;
		text-align: center;
		
		font-size:24rpx;
		color:rgba(255,255,255,1);
		line-height:32rpx;
	}
	
	
	
	
	.good-at{
		width:650rpx;
		padding: 30rpx;
		/* height:260rpx; */
		background:rgba(255,255,255,1);
		border-radius:20rpx;
	}
	.top-left>text{
		font-size:30rpx;
		color:rgba(41,50,61,1);
	}
	
	.good{
		width: 36rpx;
		height: 38rpx;
	}
	.add{
		width: 46rpx;
		height: 46rpx;
	}
	.scroll-view{
		/* height: 200rpx; */
		height: 156rpx;
	}
	.good-label{
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-bottom: 40rpx;
	}
	.label-title{
		/* width:248rpx; */
		margin: 24rpx 30rpx 0 0;
		padding: 0 16rpx;
		height:50rpx;
		line-height: 50rpx;
		text-align: center;
		border:1rpx dashed rgba(88,95,122,1);
		border-radius:25rpx;
		
		font-size:28rpx;
		color:rgba(88,95,122,1);
		
		position: relative;
		
	}
	.label-close{
		position: absolute;
		top: -12rpx;
		right: -12rpx;
		background-color: #D0D0D0;
		border-radius: 50%;
		
		width:30rpx;
		height:30rpx;
		justify-content: center;
		
	}
	.label-close>image{
		
		width: 100%;
		height: 100%;
	}
	.good-title{
		padding: 0 16rpx;
	}
	
	
	
	
	/* 预约时间样式 */
	.appointment{
		width: 100vw;
		box-sizing: border-box;
		/* padding: 30rpx; */
		padding: 30rpx 30rpx 20rpx 30rpx;
		background-color: #ffffff;
		border-radius:20rpx 20rpx 0px 0px;
		
		
		position: fixed;
		bottom: 0px;
	}
	.change-text{
		font-size:22rpx !important;
		color:rgba(253,101,11,1) !important;
	}
	
	
	
	/* 添加擅长课程 */
	.goods-courses{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		background-color: rgba(0,0,0,0.5);
		justify-content: center;

	}
	.goods-courses-item{
		width: 80%;
		padding: 30rpx;
		background-color: #fff;
		border-radius:20rpx;
	}
	.goods-courses-title{
		height: 40rpx;
		text-align: center;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(65,69,94,1);
	}
	.goods-courses-input{
		padding: 30rpx 10rpx;

	}
	.courses-input{
		padding: 0 30rpx;
		height:80rpx;
		background:rgba(248,248,250,1);
		border-radius:20rpx;
	}
	.courses-cancel{
		
		width: 40%;
		height:80rpx;
		text-align: center;
		line-height: 80rpx;
		
		border-radius:40rpx;
		
		border: 2rpx solid #F4F4F4;
		color:#41455E;
		font-size:34rpx;
		font-family:PingFang SC;
		font-weight:500;
	}
	.courses-confirm{
		border: none;
		background:rgba(63,204,134,1);
		color:rgba(255,255,255,1);
	}
	
	.edit-personal{
		position: fixed;
		right: 0;
		top: 30rpx;
		z-index: 1;
		
		width:145rpx;
		height:60rpx;
		line-height: 60rpx;
		text-align: center;
		background:rgba(255,170,1,1);
		border-radius:30rpx 0px 0px 30rpx;
		
		
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	
</style>
