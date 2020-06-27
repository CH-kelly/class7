<template>
	<div class="admin2">
		<image class="bj" src="/static/user_s/bj.png"></image>
		<div class="money">
			<div>
				<div class="title">总课程销售</div>
				<div class="cmdCircle">
					<cmdCircle type="circle" :width="100" stroke-color="#669CF1" :percent="proportion1" :show-info="false"></cmdCircle>	
					<p>￥{{census.s_total}}</p>
				</div>
				<div class="text">
					<div><p>交易金额</p><p>¥{{census.s_total}}</p></div>
					<div><p>交易笔数</p><p>{{census.s_num}}笔</p></div>
				</div>
			</div>
			<div>
				<div class="title">总陪练销售</div>
				<div class="cmdCircle">
					<cmdCircle type="circle" :width="100" stroke-color="#37C17C" :percent="proportion2" :show-info="false"></cmdCircle>	
					<p>￥{{census.t_total}}</p>
				</div>
				<div class="text">
					<div><p>交易金额</p><p>¥{{census.t_total}}</p></div>
					<div><p>交易笔数</p><p>{{census.s_num}}笔</p></div>
				</div>
			</div>
		</div>
		<div class="title">
			<image src="/static/user_s/title.png"></image>
			<p>收入明细</p>
		</div>
		<div class="tab">
			<div @click="tabFun(1)" :class="isShow===1?'act':''">课程收入统计</div>
			<div @click="tabFun(2)" :class="isShow===2?'act':''">陪练老师收入统计</div>
		</div>
		<block v-if="isShow !== 1">
			<div class="item" v-for="(item,index) in list" :key="item.id">
				<image :src="item.avatar" mode="aspectFill"></image>
				<div class="text">
					<div>
						<p class="Ellipsis">{{item.name}}</p>
						<p>{{item.create_time}}</p>
					</div>
					<p>+{{item.price}}</p>
				</div>
			</div>
		</block>
		<block v-if="isShow !== 2">
		<div class="item" v-for="(item,index) in list" :key="item.id">
			<div class="text" style="width: 100%;">
				<div>
					<p class="Ellipsis">{{item.name}}</p>
					<p>{{item.create_time}}</p>
				</div>
				<p>+{{item.price}}</p>
			</div>
		</div>
		</block>
	</div>
</template>

<script>
	import cmdCircle from "@/components/cmd-circle/cmd-circle.vue"
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'admin2',
		data() {
			return {
				isShow:1,
				census:{},
				page:0,
				list:[],
				proportion1:0,
				proportion2:0,
				numList:[1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,15000,20000,25000,30000,35000,40000,45000,50000,55000,60000,65000,70000,75000,80000,85000,90000,95000,100000]
			}
		},
		components: {cmdCircle},
		onLoad(){
			this.onLoadFun()
		},
		onShow(){

		},
		methods: {
			pageJump(url) {
				main.pageJump(url)
			},
			onLoadFun(){
				Post('api/School/getSchoolIncome',{
					user_id:main.userID,
					type:this.isShow,
					page:this.page
				}).then(res => {
					let max = res.census.s_total>res.census.t_total ? res.census.s_total : res.census.t_total
					for(let i = 0;i<this.numList.length;i++){
						console.log(this.numList[i])
						if(max<this.numList[i]){
							this.proportion1 = res.census.s_total/this.numList[i]*100
							this.proportion2 = res.census.t_total/this.numList[i]*100
							break
						}
					}
					this.census = res.census
					this.list =this.list.concat(res.list.data) 
					this.page+=1
				})
			},
			tabFun(i){
				this.isShow = i 
				this.page = 0 
				this.list = []
				this.onLoadFun()
			}

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

<style lang="scss" scoped>
.bj{
	width: 100%;
	height: 280rpx;
	position: relative;
	z-index: -1;
}
.money{
	width:690rpx;
	height:410rpx;
	background:rgba(255,255,255,1);
	box-shadow:0px 10rpx 20rpx 0px rgba(0, 0, 0, 0.1);
	padding:  0 60rpx;
	box-sizing: border-box;
	border-radius:20rpx;
	margin-left: 30rpx;
	margin-top: -150rpx;
	float: left;
	>div{
		width: calc(50% - 1rpx);
		height: 100%;
		float: left;
		.title{
			width: 100%;
			text-align: center;
			color: #323232;
			font-size: 30rpx;
			padding: 25rpx 0;
		}
		.cmdCircle{
			width: 100%;
			height: 192rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			p{
				position: absolute;
				top: 50%;
				width: 100%;
				text-align: center;
				color: #1D55BB;
				font-size: 30rpx;
				line-height: 30rpx;
				margin-top: -15rpx;
			}
		}
		.text{
			width: 100%;
			overflow: hidden;
				padding-top: 15rpx;
			div{
				width: 100%;
				height: 24rpx;
				line-height: 24rpx;
				font-size: 24rpx;
				color: #999999;
				padding-top: 15rpx;
				p{
					float: left;
					margin-right: 20rpx;
				}
			}
		}
	}
}
.admin2>.title{
	width: 100%;
	height: 30rpx;
	line-height: 30rpx;
	position: relative;
	float: left;
	margin-top: 50rpx;
	p{
		width: 100%;
		text-align: center;
		color: #111111;
		font-size: 30rpx;
	}
	image{
		position: absolute;
		width: 186rpx;
		height: 22rpx;
		left: 50%;
		margin-left: -93rpx;
		top: 4rpx;
	}
}
.tab{
	width: 100%;
	height: 100rpx;
	padding: 0 100rpx;
	float: left;
	margin-top: 20rpx;
	border-bottom: 1rpx solid #ECECEC;
	box-sizing: border-box;
	display: flex;
	justify-content: space-around;
	align-items: center;
	div{
		color: #656565;
		font-size: 28rpx;
		padding-bottom: 10rpx;
	}
	.act{
		color: #000000;
		font-size: 36rpx;
		font-weight: bold;
		position: relative;
	}
	.act::after{
		content: '';
		width: 54rpx;
		height: 4rpx;
		background: #3FCB85;
		position: absolute;
		bottom:-20rpx;
		left: 50%;
		margin-left: -27rpx;
		border-radius:2rpx;
	}
}
.item{
	width: 100%;
	padding: 0 30rpx;
	box-sizing: border-box;
	height: 90rpx;
	float: left;
	margin-top: 30rpx;
	margin-bottom: 10rpx;
	image{
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		float: left;
	}
	.text{
		width: calc(100% - 110rpx);
		height: 100%;
		float: right;
		div{
			width: 70%;
			height: 100%;
			float: left;
			p{
				width: 100%;
			}
			p:nth-child(1){
				color: #323232;
				font-size: 32rpx;
				font-weight: bold;
				padding-top: 5rpx;
			}
			p:nth-child(2){
				color: #9A9A9A;
				font-size: 24rpx;
			}
		}
		>p{
			width: 30%;
			float: right;text-align: right;
			line-height: 90rpx;
			color: #FFA901;
			font-size: 36rpx;
			font-weight: bold;
		}
	}
}
</style>