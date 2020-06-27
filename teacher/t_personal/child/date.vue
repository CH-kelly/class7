<template>
	<view class="date">
			<view class="">
		<scroll-view scroll-x=true class='scrollContainer' >
			<view class="flex date-top">
				<view v-for="(item,i) in week" 	:key="i" 	class="date-item">
					<view 	@click="changeItem(i)"	class="flex-column item" :class="i == current ? 'active':''">
						<text class="t-text week">{{item.week}}</text>
						<text class="t-text day">{{item.day}}</text>
						<text class="t-text month">{{item.mouth}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
			</view>
		
		
		<view class="t-line"></view>
		
		<scroll-view 
		scroll-y="true"
		class="scroll-view"
		 >
			<view class="flex date-timer">
				<view v-for="(item,i) in yuyuetime"	:key="i" style="margin-right: 30rpx;">
					<view :class="{'no-item':item == ''}" class="timer-item">
						{{item.time || item.date}}
						<view class="flex label-close" @click="deleteLabel(i)">
							<image src="/static/teacher/delete.png" mode="" ></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	const { Post } = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	
	export default {
		props:{
			teacherId:{
				type:Number,
				default:0,			
			},
			week:{
				type:Array,
				default:{}
			},
			yuyuetime:{
				type:Array,
				default:{}
			}
		},
		data() {
			return {
				current:0,
			}
		},
		mounted() {},
		methods:{
			changeItem(i){
				this.current = i;
				this.$emit('changeItem',i);
			},
			deleteLabel(i){
				var that = this;
				var labelid = this.yuyuetime[i].id;
				Post("/api/teacher/del_teacher_yuyuetime",{
					teacher_id:this.teacherId,
					yuyueid:labelid
				}).then(res=>{
					main.showToast('删除成功');
					that.$emit('changYuYue',res)
				})
			},
		}
	}
</script>

<style scoped>

.scrollContainer {
  width: 100%;
  height: 168rpx;
  
}
	.date-top{
		margin: 22rpx 0;
		flex-wrap: nowrap;
	}
	
	
	.date-item{
		width: 14%;
		flex-shrink: 0;

	}
	.item{
		padding: 10rpx;
	}
	
	.week{
		font-size:24rpx;
		color:rgba(169,169,169,1);
	}
	.day{
		font-size:40rpx;
		
		font-weight:bold;
		color:rgba(80,80,80,1);
	}
	.month{
		font-size:20rpx;
		color:rgba(187,187,187,1);
	}
	
	.active{
		background: linear-gradient(to bottom,#3FCC86 8%,#2FB27F);
		box-shadow: 0 0 10rpx 10rpx rgba(49,189,119,0.1);
		border-radius: 20rpx;
	}
	.active>text{
		color: #ffffff !important;
	}
	
	.date-timer{
		flex-wrap: wrap;
		justify-content: flex-start;
		padding: 30rpx 30rpx 0 30rpx ;
		/* justify-content: space-evenly; */
	}
	.timer-item{
		height:58rpx;
		width:170rpx;
		line-height: 58rpx;
		text-align: center;
		border:1rpx solid rgba(191,191,191,1);
		border-radius:29rpx;
		
		
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(187,187,187,1);
		margin-bottom: 30rpx;
		
		position: relative;
		/* margin: 30rpx; */
		/* margin: 30rpx 50rpx 0 0; */
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
	
	
	.no-item{
		border: none;
	}
	
	.scroll-view{
		height: 200rpx;

		/* height: 140rpx; */
	}
</style>
