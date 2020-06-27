<template>
	<div class='order'>
		<block v-for="(item,index) in list" :key="item.id">
			<div class="item" v-if="item.status === 20">
				<div class="text" style="width: 100%;">
					<div>
						<p class="Ellipsis">{{item.detail.title}}-{{item.class_name}}</p>
						<p>{{item.pay_time}}</p>
					</div>
					<p>-{{item.price }}</p>
				</div>
			</div>
			
		</block>

	</div>
</template>

<script>
	const {
	  Post
	} = require('@/main/mainFun.js')
	import main from '@/main/main.js'
	export default {
		name: 'order',
		data() {
			return {
				page:1,
				list:[]
			}
		},
		onLoad(){
			this.onLoaFun()
		},
		onShow(){

		},
		methods: {
			onLoaFun(){
				Post('api/User/getUserOrder',{
					user_id:main.userID,
					page:this.page
				}).then(res => {
					console.log(res)
					if(res.data.length === 0){
						return false
					}
					this.page = this.page+1
					this.list = this.list.concat(res.data)
				})
			}
		},
		filters: {
			//过滤器
		},
		onReachBottom(){
			//滚动到底部
			this.onLoaFun()
		},
	}
</script>

<style lang="scss" scoped>
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
