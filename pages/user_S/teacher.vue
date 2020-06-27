<template>
	<div class="teacher">
		<div class="title">个人信息</div>
		<div class="box">
			<p>姓名</p>
			<image @click="name = ''" class="empty" src="/static/user_s/empty.png"></image>
			<input type="text" v-model="name" placeholder="请输入姓名" />
		</div>
		<div class="box" @click="addImg('avatar')">
			<p>头像</p>
			<image v-if="avatar !== ''" class="avatar" :src="avatar"></image>
			<image v-if="avatar === ''" class="right2" src="/static/user_s/right2.png"></image>
		</div>
		<div class="box">
			<p>电话</p>
			<image @click="tel = ''" class="empty" src="/static/user_s/empty.png"></image>
			<input v-model="tel" type="number" placeholder="请输入电话" />
		</div>
		<picker @change="sexPickerChange" :range="sexList">
		<div class="box">
			<p>性别</p>
			<image class="right2" src="/static/user_s/right2.png"></image>
			<input type="text" v-model="sex" :disabled="true" placeholder="请选择" />
		</div>
		</picker>
		<div class="title">学历信息</div>
		<picker @change="schoolPickerChange" :range="school" range-key="name">
			<div class="box">
				<p>学院名称</p>
				<image class="right2" src="/static/user_s/right2.png"></image>
				<input type="text" v-model="school_name" :disabled="true" placeholder="请选择" />
			</div>
		</picker>
		<div class="box" style="border: none;">
			<p>教师资格证</p>
		</div>
		<div class="img">
			<image @click="addImg('certificate')" :src="certificate === '' ? '/static/user_s/upload.png':certificate" mode="aspectFill"></image>
		</div>
		<div class="title">其他信息</div>
		<div class="box" style="border: none;">
			<p>备注<text>（可不填）</text></p>
		</div>
		<textarea v-model="remarks" maxlength="-1" placeholder="请输入..." />
		<div class="sure" @click="sure">立即申请</div>
		<div class="security">
			<image src="/static/user_s/security.png"></image>
			<p>您的资料已经进行安全保护</p>
		</div>
	</div>
</template>

<script>
	const {
	  Post,uploadImg,ChooseImage
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'teacher',
		data() {
			return {
				school:[],
				name:'',
				tel:'',
				avatar:'',
				school_id:'',
				school_name:'',
				certificate:'',
				gender:'',
				sex:'',
				sexList:['男','女'],
				remarks:'',
			}
		},
		onLoad(){
			Post('api/teacher/get_info',{
				openid:main.openID
			}).then(res => {
				console.log(res)
				if(res.teacher !== null){
					this.name=res.teacher.name
					this.tel=res.teacher.tel
					this.avatar=res.teacher.avatar
					this.school_id=res.teacher.school_id
					this.school_name=res.teacher.school_name
					this.certificate=res.teacher.certificate
					this.gender=res.teacher.gender
					this.sex=res.teacher.gender === 1?'男':'女'
					this.remarks=res.teacher.remarks
				}
				this.school = res.school
			})

		},
		onShow(){

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			addImg(text){
				ChooseImage(1).then(res => {
					uploadImg(res).then(imgRes => {
						this[text] = imgRes[0]
					})
				})
			},
			schoolPickerChange(e){
				console.log(e.detail.value)
				this.school_name = this.school[parseInt(e.detail.value)].name
				this.school_id = this.school[parseInt(e.detail.value)].id
			},
			sexPickerChange(e){
				this.gender=parseInt(e.detail.value) + 1
				this.sex= this.sexList[parseInt(e.detail.value)]
			},
			sure(){
				Post('api/teacher/teacher_apply',{
					openid:main.openID,
					name:this.name,
					tel:this.tel,
					school_id:this.school_id,
					certificate:this.certificate,
					avatar:this.avatar,
					gender:this.gender,
					remarks:this.remarks,
					school_name:this.school_name,
				}).then(res => {
					console.log(res)
					main.showToast('申请提交成功，请耐心等待。')
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

<style lang="scss" scoped>
.title{
	width:100%;
	height:80rpx;
	background:rgba(247,247,249,1);
	line-height: 80rpx;
	color: #B3B3B5;
	font-size: 28rpx;
	text-indent: 30rpx;
}
.box{
	width: 100%;
	height: 95rpx;
	border-bottom: 1rpx solid rgba(247,247,249,1);
	padding: 0 30rpx;
	box-sizing: border-box;
	p:nth-child(1){
		line-height: 95rpx;
		float: left;
		color: #41455E;
		font-size: 32rpx;
		font-weight: bold;
		text{
			line-height: 95rpx;
			color: #3FCB85;
			font-size: 26rpx;
		}
	}
	p:nth-child(3){
		line-height: 95rpx;
		float: right;
		margin-right: 25rpx;
		color: #41455E;
		font-size: 32rpx;
	}
	.empty{
		width: 32rpx;
		height: 32rpx;
		float: right;
		margin-top: 31rpx;
	}
	.avatar{
		width: 80rpx;
		height: 80rpx;
		float: right;
		border-radius: 50%;
	}
	.right2{
		width:14rpx;
		height: 24rpx;
		float: right;
		margin-left: 8rpx;
		margin-top: 35rpx;
	}
	input{
		width: 65%;
		height: 100%;
		line-height: 95rpx;
		color: #41455E;
		font-size: 32rpx;
		float: right;
		margin-right: 25rpx;
		text-align: right;
	}
}
.img{
	width: 100%;
	height: 315rpx;
	padding: 0 30rpx 25rpx 30rpx;
	box-sizing: border-box;
	image{
		width: 400rpx;
		height: 290rpx;
	}
}
textarea{
	width:690rpx;
	height:208rpx;
	background:rgba(244,244,244,1);
	border-radius:20rpx;
	margin-left: 30rpx;
	padding: 20rpx;
	box-sizing: border-box;
	font-size: 32rpx;
}
.sure{
	width:690rpx;
	height:94rpx;
	line-height: 94rpx;
	background:rgba(63,203,133,1);
	border-radius:47rpx;
	color: #FFFFFF;
	text-align: center;
	font-size: 34rpx;
	margin-top: 40rpx;
	margin-left: 30rpx;
}
.security{
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	image{
		width: 26rpx;
		height: 32rpx;
		margin-right: 15rpx;
	}
	p{
		color: #3FCB85;
		font-size: 26rpx;
	}
}
</style>