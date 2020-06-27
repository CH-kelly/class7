<template>
	<div class="user">
		<div class="Data" v-if="isLogin">
			<div class="logo">
				<image class="pic" :src="user.avatar"></image>
				<image class="sex" v-if="user.gender !== 0" :src="user.gender === 2 ? '/static/home_s/woman.png':'/static/home_s/man.png'"></image>
			</div>
			<p>{{user.nickname}}</p>
			<p>{{user.interest | interestFilters}}</p>
			<div class="edit" @click="pageJump('/pages/user_S/Data')">
				<image src="/static/user_s/edit.png"></image><p>编辑个人资料</p>
			</div>
		</div>
		<div class="Data" v-if="!isLogin">
			<button hover-class="none" type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">立即登陆</button>
		</div>
		<div class="vip">
			<image class="bj" src="/static/user_s/vip.png"></image>
			<p>VIP中心</p>
			<div class="line"></div>
			<p>全站海量视频无限学习为学习加速！</p>
			<div class="right" @click="pageJump('/pages/user_S/vip')"><p>VIP会员</p><p>去开通 <image src="/static/user_s/right.png"></image></p></div>
		</div>
		<div class="box" @click="pageJump('/pages/user_S/order')">
			<image src="/static/user_s/user1.png"></image><p>课程订单</p>
			<image class="right" src="/static/user_s/right2.png"></image>
		</div>
<!-- 		<div class="box">
			<image src="/static/user_s/user2.png"></image><p>我的陪练</p>
			<image class="right" src="/static/user_s/right2.png"></image>
		</div> -->
		<div class="box" @click="toTeacher">
			<image src="/static/user_s/user3.png"></image><p>教师中心</p>
			<image class="right" src="/static/user_s/right2.png"></image><i v-if="user.teacher === 0">提交教师资格证</i>
		</div>
		<div v-if="user.school === 1" class="box" @click="pageJump('/pages/user_S/admin')">
			<image src="/static/user_s/user4.png"></image><p>学校管理员中心</p>
			<image class="right" src="/static/user_s/right2.png"></image>
		</div>
		<div class="box" @click="pageJump('/pages/home_S/aboutUs')">
			<image src="/static/user_s/user5.png"></image><p>关于我们</p>
			<image class="right" src="/static/user_s/right2.png"></image>
		</div>
	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'user',
		data() {
			return {
				isLogin:false,
				userID:'',
				user:{
					school:0
				}
			}
		},
		onLoad(){

		},
		onShow(){
			if(main.userID  === ""){
				this.isLogin = false
			}else{
				this.isLogin = true 
				this.onShowFun()
			}
		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			getUserInfo(e){
				console.log(e.detail.userInfo)
				if(e.detail.userInfo !== undefined){
					uni.login({
					  provider: 'weixin',
					  success: (loginRes) => {
					    console.log(loginRes.code);
						Post('api/User/getUserOpenId',{
							code:loginRes.code,
							uniacid:16
						}).then(openidRes => {
							console.log(openidRes)
							uni.setStorageSync('openID', openidRes.data.openid)
							main.openID = openidRes.data.openid
							this.loginFun(e.detail.userInfo)
						})
					  }
					});
				}
			},
			// 登陆接口
			loginFun(e){
				Post('api/User/login',{
					uniacid:16,
					openid:uni.getStorageSync('openID'),
					nickname:e.nickName,
					avatarUrl:e.avatarUrl,
					gender:e.gender,
					province:e.province,
					city:e.city,
					country:e.country
				}).then(res => {
					uni.setStorageSync('userID', res.data.suid)
					main.userID = res.data.suid
					this.onShowFun()
				})
			},
			onShowFun(){
				Post('api/User/userCenter',{
					openid:uni.getStorageSync('openID'),
				}).then(res => {
					console.log(res)
					this.user = res
					this.isLogin = true 
					main.tid = res.teacher.id
				})
			},
			toTeacher(){
				console.log(this.user.teacher)
				if(this.user.teacher === 0){
					this.pageJump('/pages/user_S/teacher')
				}else{
					if(this.user.teacher.status === 1){
						
						uni.setStorageSync('tid', this.user.teacher.id);
						
						this.pageJump('/teacher/t_order/index')
						// main.showToast('去老师端')
					}else if(this.user.teacher.status === 2){
						main.showToast('您的申请待审核，请耐心等待。')
					}else if(this.user.teacher.status === 3){
						uni.showModal({
							title: '审核未通过',
							content: '您提交的申请暂未通过，可再次修改信息提交审核。',
							cancelText:'暂不修改',
							confirmText:'去修改',
							confirmColor:'#3FCB85',
							success: res => {
								if (res.confirm) {
									console.log('用户点击确定');
									this.pageJump('/pages/user_S/teacher')
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					}
				}
			}

		},

		filters: {
			//过滤器
			interestFilters(text){
				return text===""||text===null ?'这家伙很神秘，什么都没有留下~':text
			}
		},
		onReachBottom(){
			//滚动到底部
		},
	}
</script>

<style lang="scss" scoped>
.Data{
	width: 100%;
	height: 400rpx;
	position: relative;
	button{
		width: 300rpx;
		height: 90rpx;
		background: rgba(63,203,133,1);
		float: left;
		margin-left: 225rpx;
		margin-top: 155rpx;
	}
	.logo{
		width: 168rpx;
		height: 198rpx;
		margin:20rpx 291rpx;
		float: left;
		.pic{
			width: 168rpx;
			height: 168rpx;
			border-radius: 50%;
			border: 1rpx solid #000000;
			box-sizing: border-box;
			display: block;
		}
		.sex{
			width: 52rpx;
			height: 30rpx;
			display: block;
			margin-left: 58rpx;
			margin-top: -15rpx;
		}
	}
	>p{
		width: 100%;
		text-align: center;
	}
	>p:nth-child(2){
		color: #21272B;
		font-size: 42rpx;
		font-weight: bold;
	}
	>p:nth-child(3){
		color: #57575B;
		font-size: 28rpx;
		padding-top: 35rpx;
	}
	.edit{
		position: absolute;
		right: 0;
		top: 50rpx;
		width:220rpx;
		height:64rpx;
		background:rgba(63,203,133,1);
		border-radius:32rpx 0px 0px 32rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 27rpx;
			height: 32rpx;
			margin-right: 10rpx;
		}
		p{
			line-height: 24rpx;
		}
	}
}
.vip{
	width: 690rpx;
	height: 128rpx;
	margin-left: 30rpx;
	position: relative;
	.bj{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		z-index: -1;
	}
	>p:nth-child(2){
		width: 132rpx;
		float: left;
		color: #EC9B37;
		font-size: 24rpx;
		font-weight: bold;
		text-align: center;
		padding-top: 75rpx;
	}
	.line{
		width:2rpx;
		height:48rpx;
		background:rgba(255,169,1,1);
		margin-top: 40rpx;
		float: left;
	}
	>p:nth-child(4){
		width: 258rpx;
		height: 100%;
		float: left;
		color: #EC9B37;
		font-size: 26rpx;
		font-weight: bold;
		margin-left: 24rpx;
		display: flex;
		align-items: center;
	}
	.right{
		width:152rpx;
		height:80rpx;
		background:linear-gradient(90deg,rgba(255,141,0,1) 0%,rgba(255,180,51,1) 100%);
		border-radius:16rpx;
		float: right;
		margin-top: 24rpx;
		margin-right: 35rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		font-weight: bold;
		display: flex;
		justify-content: center;
		flex-direction: column;
		p{
			width: 100%;
			padding: 0 20rpx;
			box-sizing: border-box;
			line-height: 26rpx;
			image{
				width: 10rpx;
				height: 16rpx;
				margin-left: 10rpx;
			}
		}
	}
}
.box{
	width: calc(100% - 60rpx);
	height: 120rpx;
	margin-left: 30rpx;
	border-bottom: 1rpx solid #E4E4E4;
	padding: 37rpx 0;
	box-sizing: border-box;
	image:nth-child(1){
		width: 46rpx;
		height: 46rpx;
		float: left;
	}
	p{
		color: #1B1B25;
		font-size: 30rpx;
		line-height: 46rpx;
		float: left;
		margin-left: 20rpx;
		font-weight: bold;
	}
	.right{
		width: 12rpx;
		height: 20rpx;
		float: right;
		margin-top: 13rpx;
	}
	i{
		color: #bbbbbb;
		font-size: 24rpx;
		line-height: 46rpx;
		float: right;
		margin-right: 15rpx;
	}
}
</style>