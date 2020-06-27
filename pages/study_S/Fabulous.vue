<template>
	<div class="Fabulous">
		<div class="tab">
			<div @click="actFun(1)" :class="type === 1 ? 'act' : ''">点赞课程</div>
			<div @click="actFun(2)" :class="type === 2 ? 'act' : ''">点赞老师</div>
		</div>
		<block v-if="type === 1">
			<div class="box1" v-for="(item,index) in list" :key="item.id" @click="pageJump('/pages/home_S/videoDetails?id='+item.id)">
				<image :src="item.img" mode="aspectFill"></image>
				<div class="text">
					<div class="name Ellipsis">{{item.title}}</div>
					<div class="type"><div>视频</div><p>{{item.chapter_num}}章节</p></div>
					<div class="Fabulous">
						<p>{{item.c_like}}人点赞</p>
					</div>
				</div>
			</div>
		</block>
		<block v-if="type === 2">
			<div class="box" v-for="(item,index) in list" :key="item.id" @click="pageJump('/pages/home_S/teacherDetails?id='+item.id)">
				<div class="logo">
					<image :src="item.avatar" mode="aspectFill"></image><image v-if="item.gender !== 0" :src="item.gender === 2 ? '/static/home_s/woman.png':'/static/home_s/man.png'"></image>
				</div>
				<div class="text">
					<div class="name">
						<p class="Ellipsis">{{ite3m.name}}</p>
						<span>{{item.school_name}}</span>
						<div><text>{{item.trainer_money}}</text><text>/课时</text></div>
					</div>
					<div class="label"><text>{{item.cate_name}}</text></div>
					<div class="Fabulous">{{item.likes_num}}人点赞</div>
				</div>
			</div>
			
		</block>
	</div>

	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'Fabulous',
		data() {
			return {
				type:1,
				list:[]
				
			}
		},
		onLoad(){
			this.onLoadFun()
		},
		onShow(){

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			actFun(i){
				this.type = i
				this.list=[]
				this.onLoadFun()
			},
			onLoadFun(){
				Post('api/Study/myLikes',{
					uniacid:16,
					suid:main.userID,
					type:this.type
				}).then(res => {
					console.log(res)
					this.list = res
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
.tab{
	width: 100%;
	height: 100rpx;
	padding: 0 100rpx;
	border-bottom: 1rpx solid #ECECEC;
	box-sizing: border-box;
	display: flex;
	justify-content: space-around;
	align-items: center;
	div{
		color: #232323;
		font-size: 28rpx;
		padding-bottom: 10rpx;
	}
	.act{
		color: #3FCB85;
		position: relative;
	}
	.act::after{
		content: '';
		width: 54rpx;
		height: 4rpx;
		background: #3FCB85;
		position: absolute;
		bottom: 0;
		left: 50%;
		margin-left: -27rpx;
		border-radius:2rpx;
	}
}
.box{
	width: calc(100% - 60rpx);
	height: 180rpx;
	margin-left: 30rpx;
	border-bottom: 1rpx solid #E4E4E4;
	padding: 20rpx 0;
	box-sizing: border-box;
	.logo{
		width: 112rpx;
		height: 100%;
		float: left;
		image:nth-child(1){
			width: 112rpx;
			height: 112rpx;
			display: block;
			border-radius: 50%;
		}
		image:nth-child(2){
			width: 52rpx;
			height: 30rpx;
			margin-left: 30rpx;
			display: block;
			margin-top: -15rpx;
		}
	}
	.text{
		width: calc(100% - 142rpx);
		height: 100%;
		float: right;
		.name{
			width: 100%;
			height: 44rpx;
			p{
				color: #212121;
				font-weight: bold;
				font-size: 32rpx;
				max-width: 45%;
				float: left;
				line-height: 44rpx;
			}
			span{
				height: 32rpx;
				line-height: 32rpx;
				padding: 0 10rpx;
				background:rgba(63,203,133,1);
				border-radius:4rpx;
				color: #FFFFFF;
				font-size: 20rpx;
				float: left;
				margin-left: 10rpx;
				margin-top: 6rpx;
			}
			div{
				float: right;
				line-height: 44rpx;
				text:nth-child(1){
					color: #FFA901;
					font-size: 36rpx;
					font-weight: bold;
				}
				text:nth-child(2){
					font-size: 24rpx;
					color: #65657F;
				}
			}
		}
		.label{
			width: 100%;
			color: #323232;
			font-size: 24rpx;
			padding: 15rpx 0;
		}
		.Fabulous{
			width: 100%;
			font-size: 24rpx;
			color: #999999;
		}
	}
	
}
.box1{
	width: calc(100% - 60rpx);
	height: 170rpx;
	margin-left: 30rpx;
	margin-top: 30rpx;
	margin-bottom: 10rpx;
	position: relative;
	>image{
		width:280rpx;
		height:170rpx;
		border-radius:10rpx;
		float: left;
	}
	.text{
		width: calc(100% - 300rpx);
		height: 100%;
		float: right;
		position: relative;
		.name{
			width: 100%;
			font-size: 32rpx;
			color: #323232;
			font-weight: bold;
		}
		.type{
			width: 100%;
			height: 34rpx;
			font-size: 26rpx;
			color: #7B8195;
			line-height: 34rpx;
			margin-top: 15rpx;
			div{
				height:34rpx;
				padding: 0 10rpx;
				background:rgba(63,203,133,1);
				border-radius:16rpx 17rpx 17rpx 6rpx;
				margin-right: 15rpx;
				float: left;
				color: #FFFFFF;
			}
		}
		.Fabulous{
			width: 100%;
			height: 50rpx;
			position: absolute;
			bottom: 0;
			p{
				float: left;
				line-height: 50rpx;
				color: #9A9A9A;
				font-size: 24rpx;
			}
		}
	}
}

</style>