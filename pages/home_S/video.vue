<template>
	<div class="video" :style="isShow?'position: fixed;top: 0;width:100%':''">
		<div class="search">
			<div>
				<image src="/static/search.png"></image>
				<input v-model="searchname" type="text" placeholder="请输入关键词进行搜索" placeholder-style="color:#B5B5B5" />
			</div>
			<span @click="search">搜索</span>
		</div>
		<div class="dropDown">
			<p>共{{total}}个课程</p>
			<div>
				<div @click="showFun(2)"><p>科目</p><image src="/static/home_s/dropDown.png"></image></div>
				<div @click="showFun(1)"><p>年级</p><image src="/static/home_s/dropDown.png"></image></div>
			</div>
		</div>
		<div style="width: 100%;height: 155rpx;"></div>
		<div class="box" @click="pageJump('/pages/home_S/videoDetails?id='+item.id)" v-for="(item,index) in List" :key="item.id">
			<image :src="item.img" mode="aspectFill"></image>
			<div class="text">
				<div class="name Ellipsis">{{item.title}}</div>
				<div class="type"><div>视频</div><p>{{item.total}}章节</p></div>
				<div class="Fabulous">
					<p>{{item.likes}}人点赞</p>
					<image :src="item.is_follow === 0 ? '/static/home_s/footer2.png' : '/static/home_s/footer2Act.png'"></image>
				</div>
			</div>
		</div>
		<div class="model" @click="isShow=false" v-if="isShow === 1 || isShow===2">
			<div class="category" @click.stop="">
				<div v-show="isShow === 1" class="list" v-for="(item,index) in classList" :key="item.id">
					<div class="text">{{item.name}}</div>
					<div class="box">
						<div @click="gradeFun(data.id)" v-for="(data,index) in item.children" :key="data.id" :class="grade_id === data.id ?'act':''">{{data.name}} <image v-if="grade_id === data.id" src="/static/home_s/checked.png"></image></div>
					</div>
				</div>
				<div v-show="isShow === 2" class="list" v-for="(item,index) in subject" :key="item.id">
					<div class="text">{{item.name}}</div>
					<div class="box">
						<div @click="subjectFun(data.id)" v-for="(data,index) in item.children" :key="data.id" :class="subject_id === data.id ?'act':''">{{data.name}} <image v-if="subject_id === data.id" src="/static/home_s/checked.png"></image></div>
					</div>
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
		name: 'video',
		data() {
			return {
				total:'',
				classList:[],
				subject:[],
				isShow:false,
				page:0,
				grade_id:'',
				subject_id:'',
				searchname:'',
				List:[]
			}
		},
		onLoad(options){
			this.searchname = options.text
			this.onLoadFun()
			Post('api/curriculum/class_curriculum').then(res => {
				this.total = res.total
				this.classList = res.class
				this.subject = res.subject
			})
		},
		onShow(){

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			onLoadFun(){
				Post('api/curriculum/index',{
					page:this.page,
					grade_id:this.grade_id,
					subject_id:this.subject_id,
					searchname:this.searchname,
					user_id:main.userID
				}).then(res => {
					console.log(res)
					this.List = this.List.concat(res.list)
					this.page +=1
				})
			},
			search(){
				this.page = 0
				this.List = []
				this.grade_id = []
				this.subject_id = []
				this.onLoadFun()
			},
			gradeFun(i){
				this.grade_id = i === this.grade_id ? '' :i
				this.page = 0
				this.List = []
				this.onLoadFun()
			},
			subjectFun(i){
				this.subject_id = i === this.subject_id ? '' :i
				this.page = 0
				this.List = []
				this.onLoadFun()
			},
			showFun(i){
				this.isShow = i
			},

		},

		filters: {
			//过滤器
		},
		onReachBottom(){
			//滚动到底部
			this.onLoadFun()
		},
	}
</script>
<style>
	page{
		position: relative;
	}
</style>
<style lang="scss" scoped>
.search{
	width: 100%;
	height: 68rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	background: #FFFFFF;
	position: absolute;
	top: 0;
	>div{
		width: 600rpx;
		height: 100%;
		float: left;
		background:rgba(241,241,241,1);
		border-radius:34rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		image{
			width: 26rpx;
			height: 26rpx;
		}
		input{
			width: calc(100% - 50rpx);
			line-height: 68rpx;
			font-size: 28rpx;
			height: 100%;
			margin-left: 15rpx;
		}
	}
	span{
		line-height: 68rpx;
		float: right;
		color: #3FCB85;
		font-size: 32rpx;
	}
}
.dropDown{
	width: 100%;
	height: 88rpx;
	padding: 10rpx 30rpx 0 30rpx;
	border-bottom: 1rpx solid #ECECEC;
	box-sizing: border-box;
	position: absolute;
	top: 68rpx;
	color: #7B8195;
	font-size: 28rpx;
	>p{
		float: left;
		line-height: 78rpx;
	}
	>div{
		float: right;
		height: 100%;
		overflow: hidden;
		div{
			float: right;
			height: 100%;
			margin-left: 80rpx;
			display: flex;
			align-items: center;
			image{
				width: 19rpx;
				height: 11rpx;
				margin-left: 15rpx;
			}
		}
	}
}
.video>.box{
	width: calc(100% - 60rpx);
	height: 170rpx;
	margin-left: 30rpx;
	margin-top: 30rpx;
	margin-bottom: 10rpx;
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
			height: 38rpx;
			position: absolute;
			bottom: 0;
			p{
				float: left;
				line-height: 38rpx;
				color: #9A9A9A;
				font-size: 24rpx;
			}
			image{
				width: 40rpx;
				height: 38rpx;
				display: block;
				float: right;
			}
		}
	}
}
.model{
	width: 100%;
	height: calc(100% - 88rpx - 68rpx);
	position: fixed;
	top: 156rpx;
	background: rgba(0,0,0,.4);
	z-index: 2;
	.category{
		width: 100%;
		max-height: 70%;
		background: #FFFFFF;
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
		overflow-x: hidden;
		border-radius:0px 0px 20px 20px;
		overflow-y: scroll;
		.list{
			width: 100%;
			overflow: hidden;
			.text{
				width: 100%;
				color: #27323F;
				font-size: 30rpx;
				font-weight: bold;
				padding-top: 25rpx;
			}
			.box{
				width: 100%;
				overflow: hidden;
				div{
					min-width: 150rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
					background:rgba(247,247,249,1);
					border-radius:30px;
					height: 60rpx;
					line-height: 60rpx;
					color: #7B8095;
					font-size: 26rpx;
					margin-right: 20rpx;
					float: left;
					margin-top: 25rpx;
					text-align: center;
					position: relative;
				}
				.act{
					background:rgba(247,181,30,0.14);
					color: #F7B51E;
					image{
						width: 26rpx;
						height: 26rpx;
						position: absolute;
						top: 0;
						right: 0;
					}
				}
			}
		}
	}
}

</style>