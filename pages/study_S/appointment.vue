<template>
	<div class="appointment">
		<div class="box" @click="pageJump('/pages/study_S/appointmentDetails?id='+item.teacher.id+'&yid='+item.yuyue_id)" v-for="(item,index) in list" :key="item.id">
			<div class="user">
				<image :src="item.teacher.avatar " mode="aspectFill"></image>
				<div class="text">
					<div><p>{{item.teacher.name}}</p><p :class="item.status === 1 ?'no':''">{{item.status | statusFilters}}</p></div>
					<p class="Ellipsis"><text space="ensp" v-for="(data,i) in item.teacher.label" :key="i">{{data}}  </text></p>
				</div>
			</div>
			<div class="money">
				<text>{{item.teacher.trainer_money}}<text>/课时</text></text>
				<p>{{item.teacher.school_name }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'appointment',
		data() {
			return {
				list:[]
			}
		},
		onLoad(){
			Post('api/Teacher/trainerList',{
				user_id:main.userID,
				uniacid:16
			}).then(res => {
				console.log(res)
				this.list = res
			})
		},
		onShow(){

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},

		},

		filters: {
			//过滤器
			statusFilters(text){
				return text=== 1 ?'未陪练':'已陪练'
			}
		},
		onReachBottom(){
			//滚动到底部
		},
	}
</script>
<style>
page{
	width: 100%;
	background: #EBEFF1;
}
</style>
<style lang="scss" scoped>
.box{
	width:710rpx;
	height:237rpx;
	background:rgba(255,255,255,1);
	border-radius:10rpx;
	float: left;
	margin-left: 20rpx;
	margin-top: 50rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	.user{
		width: 100%;
		height: 156rpx;
		border-bottom: 1rpx dashed #E1E1E1;
		image{
			width: 140rpx;
			height: 140rpx;
			border: 3rpx solid #FFFFFF;
			box-sizing: border-box;
			border-radius: 50%;
			float: left;
			margin-top: -25rpx;
			box-shadow: 0 -4px 15px -3px rgb(214,218,220);  
		}
		.text{
			width: calc(100% - 160rpx);
			height: 100%;
			float: right;
			div{
				width: 100%;
				padding-top: 30rpx;
				p:nth-child(1){
					float: left;
					color: #212121;
					font-size: 32rpx;
					line-height: 32rpx;
				}
				p:nth-child(2){
					float: right;
					color: #BBBBBB;
					font-size: 24rpx;
					line-height: 32rpx;
				}
				.no{
					color: #3FCB85 !important;
				}
			}
			>p{
				width: 100%;
				color: #323232;
				font-size: 30rpx;
				font-weight: bold;
				padding-top: 25rpx;
			}
		}
	}
	.money{
		width: calc(100% - 160rpx);
		height: 80rpx;
		line-height: 80rpx;
		float: right;
		>text{
			float: left;
			color: #FFA901;
			font-size: 36rpx;
			font-weight: bold;
			float: left;
			text{
				color: #65657F;
				font-size: 24rpx;
			}
		}
		p{
			float: right;
			color: #65657F;
			font-size: 24rpx;
		}
	}
}
</style>