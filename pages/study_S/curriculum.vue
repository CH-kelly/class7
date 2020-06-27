<template>
	<div class="curriculum">
		<div class="box" v-for="(item,index) in list" :key="index" @click="pageJump('/pages/home_S/videoDetails?id='+item.id)">
			<image :src="item.img" mode="aspectFill"></image>
			<div class="text">
				<div class="name Ellipsis">{{item.title}}</div>
				<div class="type"><div>视频</div><p>{{item.chapter_num}}章节</p></div>
				<div class="Fabulous">
					<p>{{item.c_like}}人点赞</p>
				</div>
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
		name: 'curriculum',
		data() {
			return {
				list:[]
				
			}
		},
		onLoad(){
			Post('api/Study/collCourse',{
				uniacid:16,
				suid:main.userID
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
		},
		onReachBottom(){
			//滚动到底部
		},
	}
</script>

<style lang="scss" scoped>
.curriculum>.box{
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