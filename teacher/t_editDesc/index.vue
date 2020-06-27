<template>
	<view class="edit-info">
		<view class="textarea-content">
			<textarea :value="introduction"
			maxlength=140
			placeholder="请从个人简介、教育经历、资格证书、获奖情况、擅长方面等进行简单描述..."
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
				
				introduction:'',
				tid:0,
			}
		},
		onLoad(a) {
			this.tid = a.tid;
			this.get_detail();
		},
		onShow() {},
		methods:{
			input(e){
				let value = e.mp.detail.value;
				this.introduction = value;
			},
			
			get_detail(){
				var that = this;
				Post("/api/Teacher/getTeacherDetail",{
					tid:this.tid
				}).then(res=>{
					if(res){
						that.introduction = res.introduction;
					}
				})
			},
			submit(){
				let introduction = this.introduction;
				let that = this;
				if(!introduction){
					return main.showToast('请输入个人简介')
				}
				
				Post("/api/Teacher/saveTeacherData",{
					tid:this.tid,
					introduction
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
