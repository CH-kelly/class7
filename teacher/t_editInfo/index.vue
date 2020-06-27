<template>
	<view class="edit-info">
		<view class="flex-column avatar-info">
			<view class="avatar" @click="uploadAvatar">
				<image :src="info.avatar" mode=""></image>
			</view>
			<text class="t-text nickname">{{info.name}}</text>
		</view>
		
		<view class="padding-30 input-title">
			个人信息
		</view>
		
		<view class="padding-30 flex  input-content">
			<text  class="t-text input-label">姓名</text>
			<view class="flex input-right">
				<input class="t-text t-input" type="text"  maxlength="20"  :value="info.name"   @input="input" data-name="name"  />
				<image class="delete" src="/static/teacher/delete.png" mode="" @click="deleteImg('name')" ></image>
			</view>
		</view>
		<view class="t-line"></view>
		
		<view class="padding-30 flex  input-content">
			<text  class="t-text input-label">电话</text>
			<view class="flex input-right">				
				<input class="t-text t-input" type="number" maxlength="11" :value="info.tel"   @input="input" data-name="tel" />
				<image class="delete" src="/static/teacher/delete.png" mode=""  @click="deleteImg('tel')"  ></image>
			</view>
		</view>
		<view class="t-line"></view>
		
		<view class="padding-30 flex  input-content">
			<text  class="t-text input-label">性别</text>
			<view class="flex input-right">				
				<picker mode="selector" :range="array" :value="value" @change="changeSex">
					<text class="t-text gender">{{value}}</text>
					<image class="right" src="/static/teacher/right.png" mode=""></image>
				</picker>
			</view>
		</view>
		
		
		<view class="padding-30 input-title">
			学历信息
		</view>
		
		<view class="padding-30 flex  input-content">
			<text  class="t-text input-label">院校名称</text>
			<view class="flex input-right">				
				<input class="t-text t-input" type="text" maxlength="20" :value="info.school_name"   @input="input" data-name="school_name" />
				<image class="delete" src="/static/teacher/delete.png" mode="" @click="deleteImg('school_name')" ></image>
			</view>
		</view>
		<view class="t-line"></view>
		<view class="textarea-content">
			<text  class="t-text input-label">教师资格证</text>
			<view class="flex certificate" @click="uploadCert">
				<!-- <image v-if="info.certificate" :src="info.certificate" mode=""></image> -->
				<image :src="info.certificate || '/static/teacher/cer.png'" mode=""></image>
				<!-- <image v-else src='/static/teacher/cer.png' mode=""></image> -->
			</view>
		</view>
		
		<view class="padding-30 input-title">
			其他信息
		</view>
		<view class="textarea-content">
			<text  class="t-text input-label">备注</text>
			<textarea :value="info.remarks"
			maxlength=140
			placeholder="能在教课过程中尽量转变其学习态度和学习方法使其成绩、态度和方法得到整体提升"
			placeholder-class="placeholder-class"
			class="t-textarea"
			 @input="input" data-name="remarks"
			 />
			 <view class="submit" @click="submit">
			 	确定修改
			 </view>
		</view>
		
		
	</view>
</template>

<script>
	
	const { 
		Post,ChooseImage,uploadImg,
	 } = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	
	export default {
		data() {
			return {
				array:['不详','男','女'],
				value:'男',
				info:{
					avatar:'',
					name:'',
					tel:'',
					gender:'',
					school_name:'',
					certificate:'',
					remarks:'',
				},
				tid:0,
			}
		},
		onLoad(a) {
			// console.log(a);
			this.tid = a.tid;
			this.get_detail();
		},
		onShow() {},
		methods:{
			input(e){
				let value = e.mp.detail.value;
				let keys = e.mp.target.dataset.name;
				this.info[keys] = value;
			},
			changeSex(e){
				console.log(e);
				let index =  e.detail.value;
				this.info['gender'] =index
				this.value = this.array[index]
			},
			get_detail(){
				var that = this;
				Post("/api/Teacher/getTeacherDetail",{
					tid:this.tid
				}).then(res=>{
					if(res){
						that.info = res;
						that.value = that.array[res.gender]
						console.log(that.info);
					}
				})
			},
			deleteImg(type){
				console.log(type);
				this.info[type] = '';
			},
			// 上传资格证书
			uploadCert(){
				var that = this;
				ChooseImage(1).then(res=>{
					console.log(res);
					uploadImg(res).then(r=>{
						console.log(r);
						that.info.certificate = r[0];
						console.log(that.info);
					})
				})
			},
			// 上传头像
			uploadAvatar(){
				var that = this;
				ChooseImage(1).then(res=>{
					uploadImg(res).then(r=>{
						that.info.avatar = r[0];
					})
				})
			},
			submit(){
				let info = this.info;
				let that = this;
				for(let k in info){
					if(!info[k]){
						let title = '';
						if(k == 'avatar'){
							title = '请上传头像'
							return main.showToast(title)
						}else if(k == 'name'){
							title = '请输入姓名'
							return main.showToast(title)
						}else if(k == 'tel'){
							title = '请输入电话'
							return main.showToast(title)
						}else if(k == 'gender'){
							title = '请选择性别'
							return main.showToast(title)
						}else if(k == 'school_name'){
							title = '请输入院校名称'
							return main.showToast(title)
						}else if(k == 'certificate'){
							title = '请上传教师资格证书'
							return main.showToast(title)
						}else if(k == 'remarks'){
							title = '请输入备注'
							return main.showToast(title)
						}
					}
				}
				let {id,avatar,name,gender,tel,school_name,certificate,remarks}=info;
				// 检测是否是手机号
				if(main.isPhoneNumber(tel) == false){
					return main.showToast('请输入正确的手机号')
				}
				Post("/api/Teacher/saveTeacherData",{
					tid:id,avatar,name,gender,tel,school_name,certificate,remarks
				}).then(res=>{
					if(res == null){
						main.showToast('修改成功');
						setTimeout(()=>{
							main.navigateBack(1)
						},2000)
					}
				})
			},
		}
	}
</script>

<style scoped>
	.edit-info{
		width: 100vw;
	}
	.avatar-info{
		height:236rpx;
		background:rgba(65,205,138,1);
	}
	
	.avatar{
		width: 120rpx;
		height: 120rpx;
		border: 10rpx solid #FFFFFF;
		border-radius:50%;
	}
	.avatar>image{
		width:100%;
		height:100%;
		border-radius:50%;
	}
	.nickname{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	
	.padding-30{
		padding: 0 30rpx;
	}
	.input-title{
		display: flex;
		align-items: center;
		height:80rpx;
		background:rgba(248,248,250,1);
		
		color:rgba(180,180,182,1);
	}
	.input-content{
		/* width: 100%; */
		height:94rpx;
		background:rgba(255,255,255,1);
	}
	.input-label{
		font-size:32rpx;
		font-weight:bold;
		color:rgba(65,69,94,1);
		
	}
	.input-right{
		width: 80%;
		justify-content: flex-end;
	}
	.t-input{
		width: 70%;
		height: 100%;
		margin-right: 22rpx;
		text-align: right;
		
		font-size:32rpx;
		color:rgba(65,69,94,1);
	}
	.gender{
		font-size:32rpx;
		font-weight:500;
		color:rgba(65,69,94,1);
		
		margin-right: 22rpx;
	}
	.delete{
		width: 32rpx;
		height: 32rpx;
	}
	.right{
		width: 32rpx;
		height: 26rpx;
	}
	
	.certificate{
		width:400rpx;
		height:290rpx;
		border-radius:16rpx;
		overflow: hidden;
		background:rgba(244,244,244,1);
		margin-top: 30rpx;
	}
	.certificate>image{
		width: 100%;
		height: 100%;
	}
	
	.t-textarea{
		width:94%;
		height:208rpx;
		background:rgba(244,244,244,1);
		border-radius:20rpx;
		padding: 20rpx;
		
		font-size:31rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		/* line-height:45px; */
		
		margin: 30rpx 0 20rpx 0;
	}
	.placeholder-class{
		
		font-size:31rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		/* line-height:45rpx; */
	}
	.textarea-content{
		padding: 30rpx;	
	}
	
	.submit{
		width:690rpx;
		height:94rpx;
		line-height: 94rpx;
		text-align: center;
		background:rgba(63,204,134,1);
		border-radius:47rpx;
		
		
		font-size:34rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
</style>
